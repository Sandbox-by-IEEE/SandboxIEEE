import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/db';

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
      take: 2,
      include: {
        ticketGS: {
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
      collectiveType: `collective ${t.ticketGS.length}`,
      tickets: t.ticketGS,
    }));

    // console.log(JSON.stringify(dataSheet));

    const response = await fetch(
      `${process.env.SHEET_EXHI_MID}?type=tickets` || '',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transactions: dataSheet,
        }),
      },
    );

    const resBody = await response.json();

    // console.log(resBody)

    if (resBody.status > 299 || resBody.status < 200) {
      throw new Error(`Failed to create data, ${resBody.message}`);
    }

    const updated = transactions.map((t) => {
      return prisma.transactionDetail.update({
        where: {
          id: t.id,
        },
        data: {
          statusData: 'sheet',
        },
      });
    });

    await Promise.all(updated);

    return NextResponse.json(
      { message: 'Data sheet send successfully' },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
