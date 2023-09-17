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

    if (!existingUser)
      return NextResponse.json(
        { message: 'There is no user with this email' },
        { status: 404 },
      );

    const hashPassword = await hash(newPassword, 10);

    const updatedUser = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        password: hashPassword,
      },
    });

    const { password, ...rest } = updatedUser;

    return NextResponse.json(
      { user: rest, message: 'Success change password' },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log("ERROR_CHANGEPASS: ", error)
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
