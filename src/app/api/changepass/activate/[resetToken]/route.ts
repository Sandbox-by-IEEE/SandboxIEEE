import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/db';

interface Params {
  resetToken: string;
}

export async function GET(
  req: NextRequest,
  { params: { resetToken } }: { params: Params },
) {
  const baseUrl = process.env.NEXTAUTH_URL || '';

  if (!resetToken) {
    return NextResponse.json(
      { message: 'Missing reset token!!' },
      { status: 400 },
    );
  }

  let aToken;
  try {
    aToken = await prisma.resetToken.findUnique({
      where: {
        token: resetToken,
      },
      include: {
        user: true,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      // eslint-disable-next-line no-console
      console.log('ERROR_RESET_PASS: ', error);
      redirect(`${baseUrl}?resetMsgErr=${error.message}`);
    }
  }

  if (!aToken) {
    redirect(`${baseUrl}?resetMsgErr=No token found!!`);
  }

  if (aToken.activatedAt) {
    redirect(`${baseUrl}?resetMsgErr=Token has been used!!`);
  }

  if (aToken.createdAt < new Date(Date.now() - 24 * 60 * 60 * 1000)) {
    redirect(`${baseUrl}?resetMsgErr=Token expired`);
  }

  redirect(`${baseUrl}/login?resetToken=${resetToken}`);
}
