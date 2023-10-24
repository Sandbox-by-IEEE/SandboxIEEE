import { NextRequest, NextResponse } from 'next/server';

// import { render } from '@react-email/render';
import { prisma } from '@/lib/db';
// import Email from '@/components/emails/Emails';
// import { transporter } from '@/lib/mailTransporter';

interface Params {
  ticketId: string;
}

export async function PATCH(
  req: NextRequest,
  { params: { ticketId } }: { params: Params },
) {
  // let isUpdated = false;
  try {
    const v = req.nextUrl.searchParams.get('v');
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

    let updatedTicket;

    if (v === 'true') {
      // if (existingTicket.verified) {
      //   return NextResponse.json(
      //     { message: 'Ticket has been verified' },
      //     { status: 400 },
      //   );
      // }

      updatedTicket = await prisma.ticketCompetition.update({
        where: {
          id: ticketId,
        },
        data: {
          verified: true,
        },
      });
    } else if (v === 'false') {
      updatedTicket = await prisma.ticketCompetition.update({
        where: {
          id: ticketId,
        },
        data: {
          verified: false,
        },
      });
    }

    // const heading = 'haiidaieidajeaied';
    // const content =
    //   'diaineiadindoidnoaieneoaidnaoiedaoiednoiaednaoidnaoidnaoiedniaednaoiendaoidn';

    // for (let i = 0; i < updatedTicket.emails.length; i++) {
    //   const mailOptions = {
    //     from: '"Sandbox IEEE" <sandboxieeewebsite@gmail.com>',
    //     to: updatedTicket.emails[i],
    //     subject: 'Your Ticket Verified',
    //     html: render(
    //       Email({
    //         heading: heading,
    //         content: content,
    //         name: updatedTicket.chairmanName,
    //       }),
    //       { pretty: true },
    //     ),
    //   };

    //   await transporter.sendMail(mailOptions);
    // }

    // console.log('PATCH_TICKET: email was sent');

    return NextResponse.json(
      { ticket: updatedTicket, message: 'Ticket data updated successful' },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      // if (isUpdated) {
      //   await prisma.ticketCompetition.update({
      //     where: {
      //       id: ticketId,
      //     },
      //     data: {
      //       verified: false,
      //     },
      //   });
      // }
      console.log('ERROR_PATCH_TICKET: ', error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
