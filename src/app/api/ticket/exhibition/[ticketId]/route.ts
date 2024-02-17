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

    if (existingTicket.regisData?.verified) {
      return NextResponse.json(
        { message: 'Ticket has been verified' },
        { status: 400 },
      );
    }

    const updatedRegisData = await prisma.regisExhiData.update({
      where: {
        id: existingTicket.regisData?.id,
      },
      data: {
        verified: value === 'true' ? true : false,
      },
      include: {
        tickets: true,
      },
    });

    if (value === 'true') {
      const emailsTemp = updatedRegisData.tickets.map((t) => {
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${JSON.stringify(
          {
            ticketId: t.id,
            email: t.email,
          },
        )}&amp;size=200x200`;

        // console.log(qr)
        const heading = 'Registration Process for Your Grand Seminar Ticket';
        const content =
          'We would like to inform you that we have received your ticket order. The QRcode below confirms your registration for the Grand Seminar and Exhibition. You can present this barcode before the event starts, and it will be scanned by the committee to verify your attendance. If you have any questions or need further assistance, please do not hesitate to contact our support team at this email address <sandboxieeewebsite@gmail.com>. Thank you and warm regards,';

        const mailOptions = {
          from: '"Sandbox IEEE" <sandboxieeewebsite@gmail.com>',
          to: t.email,
          subject: 'Registration Process for Your Grand Seminar Ticket',
          html: render(
            Email({
              heading: heading,
              content: content,
              name: t.name,
              qrUrl: qrUrl,
            }),
            { pretty: true },
          ),
        };

        return transporter.sendMail(mailOptions);
      });

      await Promise.all(emailsTemp);
      // eslint-disable-next-line no-console
      console.log('PATCH_TICKET: email was sent');
    }

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
