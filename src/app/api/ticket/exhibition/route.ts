import { render } from '@react-email/render';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import Email from '@/components/emails/Emails';
import { authOptions } from '@/lib/authOptions';
import { prisma } from '@/lib/db';
import { transporter } from '@/lib/mailTransporter';

export async function POST(req: NextRequest) {
  let ticketIdTemp = '';
  try {
    const {
      nameCustomer,
      paymentMethod,
      ticketType,
      proof,
      names,
      email,
      phone,
      address,
      institution,
      phoneNumber,
      ages,
      amountPrice,
    } = await req.json();

    if (
      !nameCustomer ||
      !paymentMethod ||
      !ticketType ||
      !proof ||
      !names ||
      !email ||
      !phone ||
      !address ||
      !institution ||
      !phoneNumber ||
      !ages ||
      !amountPrice
    ) {
      return NextResponse.json(
        { message: 'Missing some data!!' },
        { status: 400 },
      );
    }

    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (session.user.exhibition && session.user.exhibition.buy) {
      return NextResponse.json(
        { message: 'You have purchased Exhibition tickets before' },
        { status: 400 },
      );
    }

    const ticket = await prisma.ticketExhibition.create({
      data: {
        userId: session.user.id,
        nameCustomer,
        paymentMethod,
        ticketType,
        proof,
        names,
        email,
        phone,
        address,
        institution,
        phoneNumber,
        ages: `${ages}`,
        amountPrice: `${amountPrice}`,
      },
    });

    ticketIdTemp = ticket.id;

    const data = {
      ticketId: ticket.id,
      nameCustomer: nameCustomer,
      paymentMethod: paymentMethod,
      ticketType: ticketType,
      proof: proof,
      names: names,
      email: email,
      phone: phone,
      address: address,
      institution: institution,
      phoneNumber: phoneNumber,
      ages: ticket.ages,
      amountPrice: ticket.amountPrice,
    };

    const sheetAPI = process.env.API_SHEET_TICKET_URL || '';

    const response = await fetch(`${sheetAPI}?type=Exhibition`, {
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

    const heading = 'jiajisjaj';
    const content =
      'We would like to inform you that we have received your ticket purchase order. Currently, our team is in the process of verifying this transaction to ensure its security and accuracy. Please be patient for a moment, as our team is diligently working to expedite this verification. We promise to provide you with the latest update as soon as the verification process is completed. We appreciate your understanding and patience throughout this process. If you have any questions or need further assistance, please do not hesitate to contact our support team at this email address. Thank you and warm regards,';

    const mailOptions = {
      from: '"Sandbox IEEE" <sandboxieeewebsite@gmail.com>',
      to: ticket.email,
      subject: 'Verification Process for Your Ticket Purchase',
      html: render(
        Email({
          content: content,
          heading: heading,
          name: ticket.nameCustomer,
        }),
        { pretty: true },
      ),
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('POST_TICKET: email was sent');

    return NextResponse.json({
      ticket: ticket,
      message: 'ticket purchase successful and please check your email',
    });
  } catch (error) {
    if (error instanceof Error) {
      if (ticketIdTemp) {
        await prisma.ticketExhibition.delete({
          where: {
            id: ticketIdTemp,
          },
        });
      }
      console.log('ERROR_POST_TICKET', error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
