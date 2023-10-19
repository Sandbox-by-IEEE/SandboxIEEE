import { render } from '@react-email/render';
import { NextRequest, NextResponse } from 'next/server';

import Email from '@/components/emails/Emails';
import { prisma } from '@/lib/db';
import { transporter } from '@/lib/mailTransporter';

interface Params {
  ticketId: string;
}

export async function PATCH(
  req: NextRequest,
  { params: { ticketId } }: { params: Params },
) {
  let isUpdated = false;
  try {
    if (!ticketId) {
      return NextResponse.json(
        { message: 'Missing parameter!!' },
        { status: 400 },
      );
    }

    const existingTicket = await prisma.ticketCompetition.findUnique({
      where: {
        id: ticketId,
      },
    });

    if (!existingTicket) {
      return NextResponse.json(
        { message: 'Ticket not found!!!' },
        { status: 404 },
      );
    }

    if (existingTicket.verified) {
      return NextResponse.json(
        { message: 'Ticket has been verified' },
        { status: 400 },
      );
    }

    const updatedTicket = await prisma.ticketCompetition.update({
      where: {
        id: ticketId,
      },
      data: {
        verified: true,
      },
    });

    isUpdated = true;

    const heading = 'haiidaieidajeaied';
    const content =
      'diaineiadindoidnoaieneoaidnaoiedaoiednoiaednaoidnaoidnaoiedniaednaoiendaoidn';

    const mailOptions = {
      from: '"Sandbox IEEE" <sandboxieeewebsite@gmail.com>',
      to: updatedTicket.emails[0],
      subject: 'Your Ticket Verified',
      html: render(
        Email({
          heading: heading,
          content: content,
          name: updatedTicket.chairmanName,
        }),
        { pretty: true },
      ),
    };

    await transporter.sendMail(mailOptions);

    console.log('PATCH_TICKET: email was sent');

    return NextResponse.json(
      { ticket: updatedTicket, message: 'Ticket data updated successful' },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      if (isUpdated) {
        await prisma.ticketCompetition.update({
          where: {
            id: ticketId,
          },
          data: {
            verified: false,
          },
        });
      }
      console.log('ERROR_PATCH_TICKET: ', error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
