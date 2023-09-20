import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/authOptions';
import { prisma } from '@/lib/db';
import { transporter } from '@/lib/mailTransporter';

export async function POST(req: NextRequest) {
  let ticketIdTemp = '';
  try {
    const {
      nameCustomer,
      ticketType,
      paymentMethod,
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
      !ticketType ||
      !paymentMethod ||
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

    const ticket = await prisma.ticket.create({
      data: {
        userId: session.user.id,
        ticketType,
        nameCustomer,
        paymentMethod,
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
      'Ticket Id': ticket.id,
      'Name Customer': nameCustomer,
      'Ticket Type': ticketType,
      'Payment Method': paymentMethod,
      Proof: proof,
      Names: names,
      Email: email,
      Phone: phone,
      Address: address,
      Institution: institution,
      'Phone Number': phoneNumber,
      Ages: ages,
      'Amount Price': amountPrice,
    };

    const response = await fetch(process.env.SHEETMONKEY_API_URL || '', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create ticket');
    }

    const mailOptions = {
      from: '"Sandbox IEEE" <sandboxieeewebsite@gmail.com>',
      to: email,
      subject: 'Verification Process for Your Ticket Purchase',
      html: `<p>Dear ${nameCustomer},</p>

    <p>We would like to inform you that we have received your ticket purchase order. Currently, our team is in the process of verifying this transaction to ensure its security and accuracy.</p>
    
    <p>Please be patient for a moment, as our team is diligently working to expedite this verification. We promise to provide you with the latest update as soon as the verification process is completed.</p>
    
    <p>We appreciate your understanding and patience throughout this process. If you have any questions or need further assistance, please do not hesitate to contact our support team at this email address.</p>
    
    <p>Thank you and warm regards,</p>`,
    };

    // transporter.sendMail(mailOptions, async (error) => {
    //   if (error) {
    //     await prisma.ticket.delete({
    //       where: {
    //         id: ticket.id,
    //       },
    //     });
    //     throw error;
    //   } else {
    //     console.log('POST_TICKET: ', 'email was sent');
    //   }
    // });

    const info = await transporter.sendMail(mailOptions);

    console.log('POST_TICKET: email was sent');

    return NextResponse.json({
      ticket: ticket,
      message: 'ticket purchase successful and please check your email',
    });
  } catch (error) {
    if (error instanceof Error) {
      if (!ticketIdTemp) {
        await prisma.ticket.delete({
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
