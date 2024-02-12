import { prisma } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const count = await prisma.ticketGS.findMany({
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
      select: {
        id: true,
      },
    });

    return NextResponse.json(
      {
        message: 'get data succesfull',
        data: { count: count.length },
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: 'Something went wrong',
        },
        {
          status: 500,
        },
      );
    }
  }
}
