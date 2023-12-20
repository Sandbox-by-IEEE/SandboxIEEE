import { hash } from 'bcrypt';
import { NextResponse } from 'next/server';

import { prisma } from '@/lib/db';

export async function PATCH(req: Request) {
  try {
    const { token, newPassword } = await req.json();

    if (!token || !newPassword) {
      return NextResponse.json(
        { message: 'Missing parameter!!!' },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        resetToken: {
          some: {
            AND: [
              {
                activatedAt: null,
              },
              {
                createdAt: {
                  gt: new Date(Date.now() - 24 * 60 * 60 * 1000),
                },
              },
              {
                token: token,
              },
            ],
          },
        },
      },
    });

    if (!existingUser) {
      return NextResponse.json({ message: 'No user found!!' }, { status: 404 });
    }

    if (!existingUser.credential) {
      return NextResponse.json(
        { message: 'User is register with google' },
        { status: 400 },
      );
    }

    if (!existingUser.active) {
      return NextResponse.json(
        { message: 'User is not activate' },
        { status: 400 },
      );
    }

    const hashPassword = await hash(newPassword, 10);

    const updatedUser = prisma.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        password: hashPassword,
      },
    });

    const updatedToken = prisma.resetToken.update({
      where: {
        token: token,
      },
      data: {
        activatedAt: new Date(Date.now()),
      },
    });

    const transaction = await prisma.$transaction([updatedUser, updatedToken]);

    // eslint-disable-next-line unused-imports/no-unused-vars
    const { password, ...rest } = transaction[0];

    return NextResponse.json(
      { user: rest, message: 'Success change password' },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      // eslint-disable-next-line no-console
      console.log('ERROR_CHANGEPASS: ', error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
