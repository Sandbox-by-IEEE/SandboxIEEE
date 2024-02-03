import { prisma } from '@/lib/db';
import { snap } from '@/lib/midtrans';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

const products = {
  collective1: {
    name: '1',
    price: 20000,
  },
  collective3: {
    name: '3',
    price: 30000,
  },
  collective5: {
    name: '5',
    price: 40000,
  },
};

export async function POST(req: NextRequest) {
  try {
    const { userId, name, email, participants, regisType } = await req.json();

    const exist = await prisma.ticketExhibition.findMany({
      where: {
        OR: participants.map((p) => ({
          email: p.email,
          transactionDetail: {
            AND: [
              {
                status: 'success',
              },
              {
                status: 'pending',
              },
            ],
          },
        })),
      },
      include: {
        transactionDetail: {
          select: {
            status: true
          }
        }
      }
    });

    if (exist.length > 0) {
      return NextResponse.json(
        {
          data: exist,
          message:
            'Some participant email has been used to buy ticket before (ticket status may be pending or success)',
        },
        { status: 400 },
      );
    }

    let prod: any;

    if (participants.length === 1) {
      prod = products.collective1;
    } else if (participants.length === 3) {
      prod = products.collective3;
    } else if (participants.length === 5) {
      prod = products.collective5;
    }

    const parameter = {
      transaction_details: {
        order_id: uuidv4(),
        amount_gross: prod.price,
      },
      item_details: {
        name: prod.name,
        price: prod.price,
        quantity: 1,
      },
      enable_payments: ['bca_va', 'gopay'],
    };

    const transaction = await snap.createTransaction(parameter);

    const newTransac = await prisma.transactionDetail.create({
      data: {
        customerEmail: email,
        customerName: name,
        snapToken: transaction.token,
        snapRedirectURL: transaction.redirect_url,
        status: 'pending',
        total: BigInt(prod.price),
        id: parameter.transaction_details.order_id,
        userId,
        regisType
      },
    });

    const newTicket = await prisma.ticketExhibition.createMany({
      data: participants.map((p) => ({
        email: p.email,
        name: p.name,
        idLine: p.idLine,
        phone: p.phone,
        transactionId: newTransac.id,
      })),
    });

    return NextResponse.json(
      {
        data: {
          ...newTransac,
          tickets: newTicket,
          total: newTransac.total.toString(),
        },
        message: 'Token has been generated succesfully',
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: `Something went wrong in server: ${error.message}` },
        { status: 500 },
      );
    }
  }
}
