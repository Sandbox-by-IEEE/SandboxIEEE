import { render } from '@react-email/render';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import Email from '@/components/emails/Emails';
import { authOptions } from '@/lib/authOptions';
import { prisma } from '@/lib/db';
import { transporter } from '@/lib/mailTransporter';

export async function POST(req: NextRequest) {
  let regisIdTemp = '';
  try {
    const { paymentMethod, paymentProof, registrationType, participants } =
      await req.json();

    if (!paymentMethod || !paymentProof || !registrationType || !participants) {
      return NextResponse.json(
        { message: 'Missing some data!!' },
        { status: 400 },
      );
    }

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (
      session.user.ticket?.exhibition &&
      session.user.ticket.exhibition.normal.buy
    ) {
      return NextResponse.json(
        { message: 'You have purchased Exhibition tickets before' },
        { status: 400 },
      );
    }

    let collectiveType = '';
    const len = participants.length;

    if (len === 1) {
      collectiveType = 'single';
    } else if (participants.length === 3) {
      collectiveType = 'collective 3';
    } else if (participants.length === 5) {
      collectiveType = 'collective 5';
    }

    const regisData = await prisma.regisExhiData.create({
      data: {
        paymentMethod,
        paymentProof,
        registrationType,
        collectiveType,
        userId: session.user.id,
        // userId: 'cls79p4ut0000botcaognv5hr',
      },
    });

    regisIdTemp = regisData.id;

    // - Nama
    // - Email
    // - Nomor
    // - ID Line (opsional)

    const tickets: any[] = [];

    for (let i = 0; i < participants.length; i++) {
      const ticket = await prisma.ticketGS.create({
        data: {
          email: participants[i].email,
          idLine: participants[i].idLine,
          name: participants[i].name,
          phone: participants[i].phone,
          regisId: regisData.id,
        },
      });

      tickets.push(ticket as any);
    }

    const data = {
      paymentMethod,
      paymentProof,
      collectiveType,
      registrationType,
      tickets,
    };

    const sheetAPI = process.env.API_SHEET_EXHIBITION_URL || '';

    const response = await fetch(`${sheetAPI}?type=ticket`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const resBody = await response.json();

    if (resBody.status > 299 || response.status < 200) {
      throw new Error(`Failed to create ticket, ${resBody.message}`);
    }

    const heading = 'Verification Process for Your Exhibition Ticket Purchase';
    const content =
      'We would like to inform you that we have received your ticket purchase order. Currently, our team is in the process of verifying this transaction to ensure its security and accuracy. Please be patient for a moment, as our team is diligently working to expedite this verification. We promise to provide you with the latest update as soon as the verification process is completed. We appreciate your understanding and patience throughout this process. If you have any questions or need further assistance, please do not hesitate to contact our support team at this email address. Thank you and warm regards,';

    const emails = participants.map((p) => {
      const mailOptions = {
        from: '"Sandbox IEEE" <sandboxieeewebsite@gmail.com>',
        to: p.email,
        subject: 'Verification Process for Your Exhibition Ticket Purchase',
        html: render(
          Email({
            content: content,
            heading: heading,
            name: p.name,
          }),
          { pretty: true },
        ),
      };
      return transporter.sendMail(mailOptions);
    });

    await Promise.all(emails);
    // for (let i = 0; i < participants.length; i++) {
    //   const mailOptions = {
    //     from: '"Sandbox IEEE" <sandboxieeewebsite@gmail.com>',
    //     to: participants[i].email,
    //     subject: 'Verification Process for Your Exhibition Ticket Purchase',
    //     html: render(
    //       Email({
    //         content: content,
    //         heading: heading,
    //         name: participants[i].name,
    //       }),
    //       { pretty: true },
    //     ),
    //   };

    //   await transporter.sendMail(mailOptions);
    // }

    // eslint-disable-next-line no-console
    console.log('POST_TICKET: email was sent');

    return NextResponse.json(
      {
        data: data,
        message: 'ticket purchase successful and please check your email',
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof Error) {
      if (regisIdTemp) {
        await prisma.regisExhiData.delete({
          where: {
            id: regisIdTemp,
          },
        });
      }
      // eslint-disable-next-line no-console
      console.log('ERROR_POST_TICKET', error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
