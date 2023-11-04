import { hash } from 'bcrypt';
import { NextResponse } from 'next/server';

import { prisma } from '@/lib/db';

export async function PATCH(req: Request) {
  try {
    const { email, newPassword } = await req.json();

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!existingUser) {
      return NextResponse.json(
        { message: 'There is no user with this email' },
        { status: 404 },
      );
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

    const updatedUser = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        password: hashPassword,
      },
    });

    // eslint-disable-next-line unused-imports/no-unused-vars
    const { password, ...rest } = updatedUser;

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
