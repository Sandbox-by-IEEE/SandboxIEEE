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
  try {
    const value = req.nextUrl.searchParams.get('value');

    if (!ticketId) {
      return NextResponse.json(
        { message: 'Missing parameter!!' },
        { status: 400 },
      );
    }

    const existingTicket = await prisma.ticketGS.findUnique({
      where: {
        id: ticketId,
      },
      include: {
        regisData: true,
      },
    });

    if (!existingTicket) {
      return NextResponse.json(
        { message: 'Ticket not found!!!' },
        { status: 404 },
      );
    }

    if (existingTicket.regisData.verified) {
      return NextResponse.json(
        { message: 'Ticket has been verified' },
        { status: 400 },
      );
    }

    const updatedRegisData = await prisma.regisExhiData.update({
      where: {
        id: existingTicket.regisData.id,
      },
      data: {
        verified: value === 'true' ? true : false,
      },
      include: {
        tickets: true,
      },
    });

    // const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${JSON.stringify(
    //   {
    //     ticketId,
    //     email: updatedTicket.email,
    //   },
    // )}&amp;size=200x200`;

    // // console.log(qr)
    // const heading = '';
    // const content = '';

    // const mailOptions = {
    //   from: '"Sandbox IEEE" <sandboxieeewebsite@gmail.com>',
    //   to: updatedTicket.email,
    //   subject: 'Your Ticket Verified',
    //   html: render(
    //     Email({
    //       heading: heading,
    //       content: content,
    //       name: updatedTicket.name,
    //       qrUrl: qrUrl,
    //     }),
    //     { pretty: true },
    //   ),
    // };

    // await transporter.sendMail(mailOptions);

    // // eslint-disable-next-line no-console
    // console.log('PATCH_TICKET: email was sent');

    return NextResponse.json(
      { ticket: updatedRegisData, message: 'Ticket data updated successful' },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      // eslint-disable-next-line no-console
      console.log('ERROR_PATCH_TICKET_EXHI: ', error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
