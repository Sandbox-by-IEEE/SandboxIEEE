import { render } from '@react-email/render';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import Email from '@/components/emails/Emails';
import { authOptions } from '@/lib/authOptions';
import { transporter } from '@/lib/mailTransporter';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (!data) {
      return NextResponse.json(
        { message: 'Missing some data!!' },
        { status: 400 },
      );
    }

    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const sheetAPI = process.env.API_SHEET_TICKET_URL || '';
    const bodyReq = JSON.stringify({
      id: session.user.id,
      mainGuest: data[0],
      otherGuests: data.slice(1),
    });

    const response = await fetch(`${sheetAPI}?type=RSVP`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: bodyReq,
    });

    const resBody = await response.json();

    if (resBody.status > 299 || resBody.status < 200) {
      throw new Error(`Failed to create form RSVP, ${resBody.message}`);
    }

    const content = `
    Thank you for filling out the reservation RSVP as VIP Guests in Sandbox IEEE ITB.
    ${
      data[0].attendOption !== 'Not attending' &&
      `We eagerly await welcoming you to this event. 
       Looking forward to our next gathering, The Sandbox By IEEE ITB SB`
    }
    `;

    const mailOptions = {
      from: '"The Sandbox by IEEE" <sandboxieeewebsite@gmail.com>',
      to: session.user.email as string,
      subject: `[SANDBOX] RSVP VIP Guest`,
      html: render(
        Email({
          content,
          heading: 'RSVP VIP Guest Sandbox ITB',
          name: data[0].name,
        }),
        { pretty: true },
      ),
    };

    await transporter.sendMail(mailOptions);

    // eslint-disable-next-line no-console
    console.log('POST_RSVP: email was sent');

    return NextResponse.json(
      {
        message: 'Your RSVP data has been sent successfully!',
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof Error) {
      // eslint-disable-next-line no-console
      console.log('ERROR_RSVP', error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
