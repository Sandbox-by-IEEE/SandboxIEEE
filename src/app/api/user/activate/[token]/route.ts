import { render } from '@react-email/render';
import { randomUUID } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

import EmailAuth from '@/components/emails/EmailsAuth';
import { prisma } from '@/lib/db';
import { transporter } from '@/lib/mailTransporter';

interface Params {
  token: string;
}

export async function GET(
  req: NextRequest,
  { params: { token } }: { params: Params },
) {
  try {
    if (!token) {
      return NextResponse.json({ message: 'Missing token!!' }, { status: 400 });
    }

    const aToken = await prisma.activateToken.findUnique({
      where: {
        token: token,
      },
      include: {
        user: true,
      },
    });

    const baseUrl = process.env.NEXTAUTH_URL || '';

    if (!aToken) {
      return NextResponse.json({ message: 'No token found' }, { status: 404 });
    }

    if (aToken.activatedAt) {
      return NextResponse.json(
        { message: 'Token has been activated, please try to login' },
        { status: 400 },
      );
    }

    if (aToken.user.active) {
      return NextResponse.json(
        { message: 'User has been activated, please try to login' },
        { status: 400 },
      );
    }

    if (aToken.createdAt < new Date(Date.now() - 24 * 60 * 60 * 1000)) {
      //token expired 1 day
      const newToken = `${randomUUID()}${randomUUID()}${randomUUID()}`.replace(
        '/-/g',
        '',
      );

      const newActivateToken = await prisma.activateToken.create({
        data: {
          token: newToken,
          userId: aToken.user.id,
        },
        include: {
          user: true,
        },
      });
      const mailOptions = {
        from: '"Sandbox IEEE" <sandboxieeewebsite@gmail.com>',
        to: newActivateToken.user.email || '',
        subject: 'Please activate your account',
        html: render(
          EmailAuth({
            name:
              newActivateToken.user.name ||
              newActivateToken.user.username ||
              '',
            token: newToken,
            baseUrl: baseUrl,
          }),
          { pretty: true },
        ),
      };

      await transporter.sendMail(mailOptions);

      return NextResponse.json(
        {
          message: 'Token is expired, please check your email for a new token',
        },
        { status: 400 },
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        activateToken: {
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

    if (!user) {
      return NextResponse.json(
        { message: 'Token invalid, user not found' },
        { status: 404 },
      );
    }

    if (!user.credential) {
      return NextResponse.json(
        { message: 'User register with google' },
        { status: 404 },
      );
    }

    const [updatedToken, updatedUser] = await prisma.$transaction([
      prisma.activateToken.update({
        where: {
          token: token,
        },
        data: {
          activatedAt: new Date(Date.now()),
        },
      }),
      prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          active: true,
        },
      }),
    ]);

    return NextResponse.json(
      { user: updatedUser, message: 'User activated succesfull' },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log('ERROR_ACTIVATED_USER: ', error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
