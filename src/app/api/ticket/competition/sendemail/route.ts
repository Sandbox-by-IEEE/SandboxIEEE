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

    const headingVerified = 'haiidaieidajeaied';
    const contentverified =
      'diaineiadindoidnoaieneoaidnaoiedaoiednoiaednaoidnaoidnaoiedniaednaoiendaoidn';

    ticketVerified.forEach(async (ticket) => {
      const mailOptions = {
        from: '"Sandbox IEEE" <sandboxieeewebsite@gmail.com>',
        to: ticket.team?.members[0].email,
        subject: 'Your Ticket Verified',
        html: render(
          Email({
            heading: headingVerified,
            content: contentverified,
            name: ticket.team?.chairmanName || '',
          }),
          { pretty: true },
        ),
      };
      await transporter.sendMail(mailOptions);
    });

    const headingNotVerified = 'haiidaieidajeaied';
    const contentNotverified =
      'diaineiadindoidnoaieneoaidnaoiedaoiednoiaednaoidnaoidnaoiedniaednaoiendaoidn';

    ticketNotVerified.forEach(async (ticket) => {
      const mailOptions = {
        from: '"Sandbox IEEE" <sandboxieeewebsite@gmail.com>',
        to: ticket.team?.members[0].email,
        subject: 'Your Ticket Verified',
        html: render(
          Email({
            heading: headingNotVerified,
            content: contentNotverified,
            name: ticket.team?.chairmanName || '',
          }),
          { pretty: true },
        ),
      };
      await transporter.sendMail(mailOptions);
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
