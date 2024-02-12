// import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

import { prisma } from '@/lib/db';
import { snap } from '@/lib/midtrans';

// const products = {
//   collective1: {
//     name: 'collective1',
//   },
//   collective3: {
//     name: 'collective3',
//   },
//   collective5: {
//     name: 'collective5',
//   },
// };

export async function POST(req: NextRequest) {
  let idT = '';
  try {
    const { userId, name, price, email, participants, registrationType } =
      await req.json();

    const exist = await prisma.ticketGS.findMany({
      where: {
        transactionDetail: {
          OR: [
            {
              status: 'pending',
            },
            {
              status: 'success',
            },
          ],
        },
      },
      include: {
        transactionDetail: {
          select: {
            status: true,
          },
        },
      },
    });

    const count = exist.length;

    const emails: string[] = participants.map((p) => p.email);

    const fnd = exist.filter((v) => emails.includes(v.email));

    console.log(exist);

    if (fnd.length > 0) {
      return NextResponse.json(
        {
          data: fnd.map((v) => v.email),
          message:
            'Some participant email has been used to buy ticket before (ticket status may be pending or success)',
        },
        { status: 400 },
      );
    }

    if (count >= 100) {
      return NextResponse.json(
        {
          message: 'Ticket has been sold out',
        },
        { status: 400 },
      );
    }

    let prod = '';

    if (participants.length === 1) {
      prod = 'single';
    } else if (participants.length === 3) {
      prod = 'colective 3';
    } else if (participants.length === 5) {
      prod = 'collective 5';
    }

    // console.log(prod)

    const parameter = {
      transaction_details: {
        order_id: uuidv4(),
        gross_amount: price,
      },
      item_details: [
        {
          name: `${prod} - The Sandbox Exhibition and Seminar`,
          price: price,
          quantity: 1,
        },
      ],
      customer_details: {
        email: email,
      },
      enable_payments: ['bca_va', 'gopay'],
      callbacks: {
        finish: process.env.WEB_URL,
        error: process.env.WEB_URL,
        pending: process.env.WEB_URL,
      },
    };

    // console.log(parameter)

    const transaction = await snap.createTransaction(parameter);

    const newTransac = await prisma.transactionDetail.create({
      data: {
        customerEmail: email,
        customerName: name,
        snapToken: transaction.token,
        snapRedirectURL: transaction.redirect_url,
        status: 'no-status',
        total: BigInt(price),
        id: parameter.transaction_details.order_id,
        userId,
        registrationType,
      },
    });

    idT = newTransac.id;

    const newTicket = await prisma.ticketGS.createMany({
      data: participants.map((p) => ({
        email: p.email,
        name: p.name,
        idLine: p.lineId,
        phone: p.phoneNumber,
        transactionDetailId: newTransac.id,
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
      // if (error instanceof PrismaClientKnownRequestError){
      //   if (error.code === 'P2002') {
      //     console.log('The character already exists', error)
      //     return NextResponse.json(
      //       { message: `Some email has be` },
      //       { status: 500 },
      //     );
      //   }
      // }
      if (idT) {
        await prisma.transactionDetail.delete({
          where: {
            id: idT,
          },
        });
      }
      console.log(error);
      return NextResponse.json(
        { message: `Something went wrong in server: ${error.message}` },
        { status: 500 },
      );
    }
  }
}
