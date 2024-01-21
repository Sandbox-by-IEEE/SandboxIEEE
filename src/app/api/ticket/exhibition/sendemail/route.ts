import Email from '@/components/emails/Emails';
import { prisma } from '@/lib/db';
import { resend, transporter } from '@/lib/mailTransporter';
import { render } from '@react-email/render';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const ticketsVerified = await prisma.regisExhiData.findMany({
      where: {
        verified: true,
      },
      include: {
        tickets: true,
      },
    });

    for (let i = 0; i < ticketsVerified.length; i++) {
      const emails = ticketsVerified[i].tickets.map((t) => {
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${JSON.stringify(
          {
            ticketId: t.id,
            email: t.email,
          },
        )}&amp;size=200x200`;

        // console.log(qr)
        const heading = '';
        const content = '';

        const mailOptions = {
          from: '"Sandbox IEEE" <sandboxieeewebsite@gmail.com>',
          to: t.email,
          subject: 'Your Ticket Verified',
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

        return mailOptions;
      });

      const { error } = await resend.batch.send(emails);

      if (error) {
        throw new Error('Something went wrong while sending email');
      }
    }

    return NextResponse.json({ message: 'email was sent' }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.log('ERROR_SEND_EMAIL_EXHI_QR: ', error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
