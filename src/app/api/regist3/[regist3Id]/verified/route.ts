import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/db';

interface Params {
  regist3Id: string;
}

export async function PATCH(
  req: NextRequest,
  { params: { regist3Id } }: { params: Params },
) {
  try {
    const value = req.nextUrl.searchParams.get('value');
    console.log(regist3Id);
    if (!regist3Id || !value) {
      return NextResponse.json(
        { message: 'some data is missing' },
        { status: 400 },
      );
    }

    const existingRegist3Data = await prisma.regist3Data.findUnique({
      where: {
        id: regist3Id,
      },
    });

    if (!existingRegist3Data) {
      return NextResponse.json({ message: 'data not found' }, { status: 404 });
    }

    const updatedRegist3Data = await prisma.regist3Data.update({
      where: {
        id: regist3Id,
      },
      data: {
        statusPayment: value === 'true' ? 'success' : 'waiting',
      },
    });

    return NextResponse.json(
      { data: updatedRegist3Data, message: 'Data update succesfull' },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      // eslint-disable-next-line no-console
      console.log('ERROR_UPDATED_REGIST3: ', error.message);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
