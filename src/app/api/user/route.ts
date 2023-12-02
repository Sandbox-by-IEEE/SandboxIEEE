import { render } from '@react-email/render';
import { hash } from 'bcrypt';
import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';

import EmailAuth from '@/components/emails/EmailsAuth';
import { prisma } from '@/lib/db';
import { transporter } from '@/lib/mailTransporter';

export async function POST(req: Request) {
  let tempUserId, tempToken;
  try {
    const body = await req.json();

    const { email, username, password } = body;

    if (!email || !username || !password) {
      return NextResponse.json(
        { message: 'Missing username, email, or password' },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { username: username }],
      },
    });

    if (existingUser) {
      const message =
        existingUser.email === email
          ? 'User with this email already exists'
          : 'User with this username already exists';

      return NextResponse.json({ message: message }, { status: 409 });
    }

    const hashPassword = await hash(password, 10);

    const token = `${randomUUID()}${randomUUID()}${randomUUID()}`.replace(
      '/-/g',
      '',
    );

    const newUser = await prisma.user.create({
      data: {
        email: email,
        username: username,
        password: hashPassword,
        credential: true,
        activateToken: {
          create: {
            token: token,
          },
        },
      },
      include: {
        activateToken: true,
      },
    });

    tempUserId = newUser.id;
    tempToken = token;
    const baseUrl = process.env.NEXTAUTH_URL || '';

    const mailOptions = {
      from: '"Sandbox IEEE" <sandboxieeewebsite@gmail.com>',
      to: newUser.email || '',
      subject: 'Please activate your account',
      html: render(
        EmailAuth({
          name: newUser.name || newUser.username || '',
          token: token,
          baseUrl: baseUrl,
        }),
        { pretty: true },
      ),
    };

    await transporter.sendMail(mailOptions);

    // eslint-disable-next-line unused-imports/no-unused-vars
    const { password: passwordNewUser, ...rest } = newUser;

    return NextResponse.json(
      { user: rest, message: 'user created succesfully' },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof Error) {
      if (tempToken) {
        await prisma.activateToken.delete({
          where: {
            token: tempToken,
          },
        });
      }
      if (tempUserId) {
        await prisma.user.delete({
          where: {
            id: tempUserId,
          },
        });
      }
      // eslint-disable-next-line no-console
      console.log('ERROR_CREATED_USER: ', error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
