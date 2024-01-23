import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/db';

interface Params {
  userId: string;
}

export async function PATCH(
  req: NextRequest,
  { params: { userId } }: { params: Params },
) {
  try {
    const body = await req.json();

    const { imageUrl } = body;

    if (!userId || !imageUrl) {
      return NextResponse.json(
        { message: 'some data is missing' },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!existingUser) {
      return NextResponse.json({ message: 'user not found' }, { status: 404 });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        image: imageUrl,
      },
    });

    return NextResponse.json(
      { data: updatedUser, message: 'upoald image succesfull' },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      // eslint-disable-next-line no-console
      console.log('ERROR_UPLOAD_IMAGE__USER: ', error.message);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
