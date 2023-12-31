import { render } from '@react-email/render';
import { NextResponse } from 'next/server';

import Email from '@/components/emails/Emails';
import { prisma } from '@/lib/db';
import { transporter } from '@/lib/mailTransporter';

export async function POST() {
  try {
    const failedAbstracts = await prisma.abstract.findMany({
      where: {
        OR: [
          {
            status: 'waiting',
          },
          {
            status: 'failed',
          },
        ],
      },
      include: {
        team: {
          select: {
            chairmanEmail: true,
            chairmanName: true,
            teamName: true,
          },
        },
      },
    });

    const headingFailed = ``;
    const contentFailed = ``;

    for (let i = 0; i < failedAbstracts.length; i++) {
      const mailOptions = {
        from: '"The Sandbox by IEEE" <sandboxieeewebsite@gmail.com>',
        to: failedAbstracts[i].team?.chairmanEmail,
        subject: ``,
        html: render(
          Email({
            heading: headingFailed,
            content: contentFailed,
            name: failedAbstracts[i].team?.teamName || '',
          }),
          { pretty: true },
        ),
      };
      await transporter.sendMail(mailOptions);
    }

    await prisma.abstract.updateMany({
      where: {
        OR: [
          {
            status: 'waiting',
          },
          {
            status: 'failed',
          },
        ],
      },
      data: {
        status: 'failed',
      },
    });

    const successAbstracts = await prisma.abstract.findMany({
      where: {
        status: 'success',
      },
      include: {
        team: {
          select: {
            chairmanEmail: true,
            chairmanName: true,
            teamName: true,
          },
        },
      },
    });

    const headingSuccess = ``;
    const contentSuccess = ``;

    for (let i = 0; i < successAbstracts.length; i++) {
      const mailOptions = {
        from: '"The Sandbox by IEEE" <sandboxieeewebsite@gmail.com>',
        to: successAbstracts[i].team?.chairmanEmail || '',
        subject: ``,
        html: render(
          Email({
            heading: headingSuccess,
            content: contentSuccess,
            name: successAbstracts[i].team?.teamName || '',
          }),
          { pretty: true },
        ),
      };
      await transporter.sendMail(mailOptions);
    }

    

    console.log('POST_SEND_EMAIL_REGIST_2: All email was sent');
    return NextResponse.json(
      { message: 'All email was sent' },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log('ERROR_POST_SEND_EMAIL_REGIST_2: ', error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
