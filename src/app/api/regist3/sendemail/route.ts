import { render } from '@react-email/render';
import { NextRequest, NextResponse } from 'next/server';

import Email from '@/components/emails/Emails';
import { prisma } from '@/lib/db';
import { transporter } from '@/lib/mailTransporter';

// export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const type = req.nextUrl.searchParams.get('type');
    let failedRegist3 = await prisma.regist3Data.findMany({
      where: {
        OR: [
          {
            statusPayment: 'waiting',
          },
          {
            statusPayment: 'failed',
          },
        ],
      },
      include: {
        team: {
          select: {
            chairmanEmail: true,
            chairmanName: true,
            teamName: true,
            ticketCompetition: {
              select: {
                competitionType: true,
              },
            },
          },
        },
      },
    });

    if (type === 'PTC') {
      failedRegist3 = failedRegist3.filter(
        (regist) => regist.team.ticketCompetition.competitionType === 'PTC',
      );
    } else if (type === 'TPC') {
      failedRegist3 = failedRegist3.filter(
        (regist) => regist.team.ticketCompetition.competitionType === 'TPC',
      );
    }

    const headingFailed =
      type === 'TPC'
        ? `[SANDBOX] Announcement of Full Paper Submission`
        : `[SANDBOX] Announcement of Video Pitching Submission`;
    const contentFailed = ` 
    Thank you for your participation in the Sanbox project. Unfortunately, our team has verified that your team did not fulfill the requirements by the deadline. If you believe that this is a mistake, please reach out to our team at the contact center that we have shared with you. We appreciate your interest and wish you all the best in your future endeavors.
    `;

    const promises: any[] = [];

    for (let i = 0; i < failedRegist3.length; i++) {
      const mailOptions = {
        from: '"The Sandbox by IEEE" <sandboxieeewebsite@gmail.com>',
        to: failedRegist3[i].team?.chairmanEmail,
        subject:
          type === 'TPC'
            ? `[SANDBOX] Announcement of Full Paper Submission`
            : `[SANDBOX] Announcement of Video Pitching Submission`,
        html: render(
          Email({
            heading: headingFailed,
            content: contentFailed,
            name: failedRegist3[i].team?.teamName || '',
          }),
          { pretty: true },
        ),
      };
      promises.push(transporter.sendMail(mailOptions));
    }

    await Promise.all(promises);

    await prisma.regist3Data.updateMany({
      where: {
        OR: [
          {
            statusPayment: 'waiting',
          },
          {
            statusPayment: 'failed',
          },
        ],
      },
      data: {
        statusPayment: 'failed',
      },
    });

    let successRegist3 = await prisma.regist3Data.findMany({
      where: {
        statusPayment: 'success',
      },
      include: {
        team: {
          select: {
            chairmanEmail: true,
            chairmanName: true,
            teamName: true,
            ticketCompetition: {
              select: {
                competitionType: true,
              },
            },
          },
        },
      },
    });

    if (type === 'PTC') {
      successRegist3 = successRegist3.filter(
        (regist) => regist.team.ticketCompetition.competitionType === 'PTC',
      );
    } else if (type === 'TPC') {
      successRegist3 = successRegist3.filter(
        (regist) => regist.team.ticketCompetition.competitionType === 'TPC',
      );
    }

    const headingSuccess =
      type === 'TPC'
        ? `[SANDBOX] Announcement of Full Paper Submission`
        : `[SANDBOX] Announcement of Video Pitching Submission`;
    const contentSuccess = `
    Thank you for your participation in the Sanbox project. Your data has been confirmed, please wait for further announcements. Good luck!
    `;

    const promises2: any[] = [];

    for (let i = 0; i < successRegist3.length; i++) {
      const mailOptions = {
        from: '"The Sandbox by IEEE" <sandboxieeewebsite@gmail.com>',
        to: successRegist3[i].team?.chairmanEmail || '',
        subject:
          type === 'TPC'
            ? `[SANDBOX] Announcement of Full Paper Submission`
            : `[SANDBOX] Announcement of Video Pitching Submission`,
        html: render(
          Email({
            heading: headingSuccess,
            content: contentSuccess,
            name: successRegist3[i].team?.teamName || '',
          }),
          { pretty: true },
        ),
      };
      promises2.push(transporter.sendMail(mailOptions));
    }

    await Promise.all(promises2);

    await prisma.regist3Data.updateMany({
      where: {
        statusPayment: 'success',
      },
      data: {
        statusPayment: 'verified',
      },
    });

    // eslint-disable-next-line no-console
    console.log('POST_SEND_EMAIL_REGIST_3: All email was sent');

    return NextResponse.json(
      { message: 'All email was sent' },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      // eslint-disable-next-line no-console
      console.log('ERROR_POST_SEND_EMAIL_REGIST_3: ', error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
