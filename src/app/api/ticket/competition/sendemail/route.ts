import { render } from '@react-email/render';
import { NextRequest, NextResponse } from 'next/server';

import Email from '@/components/emails/Emails';
import { prisma } from '@/lib/db';
import { transporter } from '@/lib/mailTransporter';

export async function POST(req: NextRequest) {
  try {
    const allTicketCompetition = await prisma.ticketCompetition.findMany({
      include: {
        team: {
          include: {
            members: true,
          },
        },
      },
    });

    const ticketVerified = allTicketCompetition.filter(
      (ticket) => ticket.verified,
    );
    const ticketNotVerified = allTicketCompetition.filter(
      (ticket) => !ticket.verified,
    );

    const headingVerified = ` You've Cleared the Verification Stage!`;

    for (let i = 0; i < ticketVerified.length; i++) {
      const mailOptions = {
        from: '"Sandbox IEEE" <sandboxieeewebsite@gmail.com>',
        to: ticketVerified[i].team?.chairmanEmail,
        subject: 'Your Ticket Verified',
        html: render(
          Email({
            heading: headingVerified,
            content: `
            We are pleased to inform ${ticketVerified[i].team?.teamName} that your documents have been successfully verified, and your team has been selected to advance to the next stage of the competition. Congratulations on reaching this milestone!
            We are excited to see what your team will achieve in the upcoming stages. Make sure to prepare well and give your best performance.
            If you have any questions or need further information regarding the next stages of the competition, please do not hesitate to reach out to us. We are here to assist you and ensure your successful participation in the event.
            Once again, congratulations and best of luck in the next stages of the competition!
            Warm regards,`,
            name: ticketVerified[i].team?.chairmanName || '',
          }),
          { pretty: true },
        ),
      };
      await transporter.sendMail(mailOptions);
    }

    const headingNotVerified = 'Document Verification Update';

    for (let i = 0; i < ticketNotVerified.length; i++) {
      const mailOptions = {
        from: '"Sandbox IEEE" <sandboxieeewebsite@gmail.com>',
        to: ticketNotVerified[i].team?.chairmanEmail,
        subject: 'Your Ticket Verified',
        html: render(
          Email({
            heading: headingNotVerified,
            content: `
            We regret to inform ${ticketNotVerified[i].team?.teamName} that your documents did not pass our verification process, and unfortunately, your team has not been selected to advance to the next stage of the competition.
            We understand that this may be disappointing, and we encourage you to review the document requirements and submission guidelines for future competitions. If you have any questions or concerns about the verification process, please feel free to reach out to us at [support email address]. We are here to assist you and provide clarification as needed.
            Thank you for your interest and participation in our event. We hope to see you in future competitions and wish you the best in your future endeavors.
            Warm regards,`,
            name: ticketNotVerified[i].team?.chairmanName || '',
          }),
          { pretty: true },
        ),
      };
      await transporter.sendMail(mailOptions);
    }

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
