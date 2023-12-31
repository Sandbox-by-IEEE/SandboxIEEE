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

    const headingFailed = `Announcement of Abstract Stage`;
    const contentFailed = ` 
    Greetings, Sandbox Participants,

    We appreciate your participation in our competition. Unfortunately, we regret to inform you that your abstract submission did not meet the criteria for advancement to the next stage.
    We understand the effort and dedication you put into your submission, and we encourage you to review our guidelines carefully. If you have any inquiries or need feedback to improve for future participation, please feel free to reach out to us.

    Thank you for your interest in our event, and we hope to see you in future competitions.`;

    for (let i = 0; i < failedAbstracts.length; i++) {
      const mailOptions = {
        from: '"The Sandbox by IEEE" <sandboxieeewebsite@gmail.com>',
        to: failedAbstracts[i].team?.chairmanEmail,
        subject: `[SANDBOX] Announcement of Abstract Stage`,
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

    const headingSuccess = `Announcement of Abstract Stage`;
    const contentSuccess = `
    Greetings, Sandbox Participants!

    Congratulations! You have successfully completed the abstract submission stage and are now progressing to the next phase – the semifinals, which involve full paper submission. Additional detailed information regarding full paper requirements can be found in our guidelines document in our website.
`;

    for (let i = 0; i < successAbstracts.length; i++) {
      const mailOptions = {
        from: '"The Sandbox by IEEE" <sandboxieeewebsite@gmail.com>',
        to: successAbstracts[i].team?.chairmanEmail || '',
        subject: `[SANDBOX] Announcement of Abstract Stage`,
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

    await prisma.abstract.updateMany({
      where: {
        status: 'success',
      },
      data: {
        status: 'qualified',
      },
    });

    // eslint-disable-next-line no-console
    console.log('POST_SEND_EMAIL_REGIST_2: All email was sent');

    return NextResponse.json(
      { message: 'All email was sent' },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      // eslint-disable-next-line no-console
      console.log('ERROR_POST_SEND_EMAIL_REGIST_2: ', error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
