import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/db';

interface Params {
  abstractId: string;
}

export async function PATCH(
  req: NextRequest,
  { params: { abstractId } }: { params: Params },
) {
  try {
    if (!abstractId) {
      return NextResponse.json(
        { message: 'some data is missing' },
        { status: 400 },
      );
    }

    const existingAbstract = await prisma.abstract.findUnique({
      where: {
        id: abstractId,
      },
    });

    if (!existingAbstract) {
      return NextResponse.json(
        { message: 'abstract not found' },
        { status: 404 },
      );
    }

    const updatedAbstract = await prisma.abstract.update({
      where: {
        id: abstractId,
      },
      data: {
        status: 'success',
      },
    });

    return NextResponse.json(
      { data: updatedAbstract, message: 'Abstract update succesfull' },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      // eslint-disable-next-line no-console
      console.log('ERROR_UPDATED_ABSTRACT: ', error.message);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
