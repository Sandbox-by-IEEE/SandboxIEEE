import { NextRequest, NextResponse } from 'next/server';

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

    const existingTicket = await prisma.ticket.findUnique({
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

    const updatedTicket = await prisma.ticket.update({
      where: {
        id: ticketId,
      },
      data: {
        verified: true,
      },
    });

    isUpdated = true;

    let qr = '';
    if (
      updatedTicket.ticketType === 'seminar' ||
      updatedTicket.ticketType === 'exhibition'
    ) {
      qr = `https://api.qrserver.com/v1/create-qr-code/?data=${JSON.stringify({
        ticketId,
        userId: updatedTicket.userId,
      })}&amp;size=200x200`;
    }

    // console.log(qr)

    const mailOptions = {
      from: '"Sandbox IEEE" <sandboxieeewebsite@gmail.com>',
      to: updatedTicket.email,
      subject: 'Your Ticket Verified',
      html: qr
        ? `<p>Dear ${updatedTicket.nameCustomer},</p> 
      <img width="400" height="400" alt='qr' src=${qr}/>`
        : `<p>Dear ${updatedTicket.nameCustomer},</p>
      <p>Ticket was verifed<p/>`,
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
        await prisma.ticket.update({
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
