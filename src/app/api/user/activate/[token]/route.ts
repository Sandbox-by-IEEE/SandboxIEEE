import { render } from '@react-email/render';
import { randomUUID } from 'crypto';
import { redirect } from 'next/navigation';
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
  const baseUrl = process.env.NEXTAUTH_URL || '';

  if (!token) {
    return NextResponse.json({ message: 'Missing token!!' }, { status: 400 });
  }

  let aToken;
  try {
    aToken = await prisma.activateToken.findUnique({
      where: {
        token: token,
      },
      include: {
        user: true,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      // eslint-disable-next-line no-console
      console.log('ERROR_ACTIVATED_USER: ', error);
      redirect(`${baseUrl}?activationMsg=${error.message}`);
    }
  }

  if (!aToken) {
    redirect(`${baseUrl}?activationMsg=No token found!!`);
  }

  if (aToken.activatedAt) {
    redirect(
      `${baseUrl}?activationMsg=Token has been activated, please try to login!!`,
    );
  }

  if (aToken.user.active) {
    redirect(
      `${baseUrl}?activationMsg=User has been activated, please try to login`,
    );
  }

  if (aToken.createdAt < new Date(Date.now() - 24 * 60 * 60 * 1000)) {
    //token expired 1 day
    const newToken = `${randomUUID()}${randomUUID()}${randomUUID()}`.replace(
      '/-/g',
      '',
    );

    let newActivateToken;

    try {
      newActivateToken = await prisma.activateToken.create({
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
    } catch (error) {
      if (error instanceof Error) {
        // eslint-disable-next-line no-console
        console.log('ERROR_ACTIVATED_USER: ', error);
        redirect(`${baseUrl}?activationMsg=${error.message}`);
      }
    }

    redirect(
      `${baseUrl}?activationMsg=Token is expired, please check your email for a new token`,
    );
  }

  let user;

  try {
    user = await prisma.user.findFirst({
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
  } catch (error) {
    if (error instanceof Error) {
      // eslint-disable-next-line no-console
      console.log('ERROR_ACTIVATED_USER: ', error);
      redirect(`${baseUrl}?activationMsg=${error.message}`);
    }
  }

  if (!user) {
    redirect(`${baseUrl}?activationMsg=Token invalid, user not found`);
  }

  if (!user.credential) {
    redirect(`${baseUrl}?activationMsg=User register with google`);
  }

  let transaction;
  try {
    // eslint-disable-next-line unused-imports/no-unused-vars
    transaction = await prisma.$transaction([
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
  } catch (error) {
    if (error instanceof Error) {
      // eslint-disable-next-line no-console
      console.log('ERROR_ACTIVATED_USER: ', error);
      redirect(`${baseUrl}?activationMsg=${error.message}`);
    }
  }

  redirect(`${baseUrl}/login?activationMsg=User activated succesfull`);
}
