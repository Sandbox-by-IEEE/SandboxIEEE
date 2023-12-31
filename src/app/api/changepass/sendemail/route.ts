import { render } from '@react-email/render';
import { randomUUID } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

import EmailResetPass from '@/components/emails/EmailsResetPass';
import { prisma } from '@/lib/db';
import { transporter } from '@/lib/mailTransporter';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { message: 'Missing email!!!' },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!existingUser) {
      return NextResponse.json(
        { message: 'No user with this email' },
        { status: 404 },
      );
    }

    if (!existingUser.credential) {
      return NextResponse.json(
        { message: 'This user register with google' },
        { status: 400 },
      );
    }

    if (!existingUser.active) {
      return NextResponse.json(
        { message: 'This user is not active' },
        { status: 400 },
      );
    }

    const resetToken =
      `${randomUUID()}r${randomUUID()}r${randomUUID()}`.replaceAll('-', '');

    // eslint-disable-next-line unused-imports/no-unused-vars
    const newResetToken = await prisma.resetToken.create({
      data: {
        token: resetToken,
        userId: existingUser.id,
      },
    });
    const url = `${process.env.NEXTAUTH_URL}/api/changepass/activate/${resetToken}`;

    const mailOptions = {
      from: '"Sandbox IEEE" <sandboxieeewebsite@gmail.com>',
      to: email,
      subject: 'Password Reset Confirmation!',
      html: render(
        EmailResetPass({
          name: existingUser.name || existingUser.username || '',
          url: url,
        }),
        { pretty: true },
      ),
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Please check your email to reset your password' },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof Error) {
      // eslint-disable-next-line no-console
      console.log('ERROR_POST_SEND_EMAIL_RESET_PASS: ', error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
