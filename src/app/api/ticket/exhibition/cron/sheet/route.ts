import { prisma } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const transactions = await prisma.transactionDetail.findMany({
      where: {
        status: 'success',
        statusData: 'waiting',
      },
      orderBy: {
        customerName: 'asc',
      },
      take: 3,
      include: {
        ticketExhibition: {
          select: {
            email: true,
            id: true,
            idLine: true,
            name: true,
            phone: true,
          },
        },
      },
    });

    const dataSheet = transactions.map((t) => ({
      registrationType: t.registrationType,
      collectiveType: `collective ${t.ticketExhibition.length}`,
      tickets: t.ticketExhibition,
    }));

    const response = await fetch(
      `${process.env.SHEET_EXHI_MID}?type=tickets` || '',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataSheet),
      },
    );

    const resBody = await response.json();

    // console.log(resBody)

    if (resBody.status > 299 || resBody.status < 200) {
      throw new Error(`Failed to create data, ${resBody.message}`);
    }

    const updated = transactions.map(t => {
      return prisma.transactionDetail.update({
        where: {
          id: t.id
        },
        data: {
          status: "sheet"
        }
      })
    })

    await Promise.all(updated);
  

    return NextResponse.json(
      { message: 'Data sheet send successfully' },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
