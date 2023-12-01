import { render } from '@react-email/render';
import { NextRequest, NextResponse } from 'next/server';

import Email from '@/components/emails/Emails';
import { prisma } from '@/lib/db';
import { transporter } from '@/lib/mailTransporter';

export async function POST(req: NextRequest) {
  try {
    const ticketNotVerified = await prisma.ticketCompetition.findMany({
      where: {
        OR: [
          {
            verified: 'rejected',
          },
          {
            verified: 'pending',
          },
        ],
      },
      include: {
        team: {
          include: {
            members: true,
          },
        },
      },
    });

    const headingNotVerified = `${ticketNotVerified[0].competitionType} Verification Update`;

    for (let i = 0; i < ticketNotVerified.length; i++) {
      const mailOptions = {
        from: '"The Sandbox by IEEE" <sandboxieeewebsite@gmail.com>',
        to: ticketNotVerified[i].team?.chairmanEmail,
        subject: `[SANDBOX] Announcement of Verification Results of Your ${ticketNotVerified[i].competitionType} Ticket`,
        html: render(
          Email({
            heading: headingNotVerified,
            content: `
            We regret to inform to your team ${ticketNotVerified[i].team?.teamName} that your documents did not pass our verification process, and unfortunately, your team has not been selected to advance to the next stage of the competition.
            We understand that this may be disappointing, and we encourage you to review the document requirements and submission guidelines for future competitions. If you have any questions or concerns about the verification process, please feel free to reach out to us at our website. We are here to assist you and provide clarification as needed.
            Thank you for your interest and participation in our event. We hope to see you in future competitions and wish you the best in your future endeavors.
           `,
            name: ticketNotVerified[i].team?.teamName || '',
          }),
          { pretty: true },
        ),
      };
      await transporter.sendMail(mailOptions);
    }

    await prisma.ticketCompetition.updateMany({
      where: {
        verified: 'pending',
      },
      data: {
        verified: 'rejected',
      },
    });

    console.log('POST_SEND_EMAIL: All email was sent');
    return NextResponse.json(
      { message: 'All email was sent' },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log('ERROR_POST_SEND_EMAIL: ', error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
