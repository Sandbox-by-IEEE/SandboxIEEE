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
      competitionType,
      teamName,
      chairmanName,
      memberNames,
      emails,
      institutions,
      phoneNumbers,
      ages,
      twibbonProofs,
      studentProofs,
    } = await req.json();

    if (
      !competitionType ||
      !teamName ||
      !chairmanName ||
      !memberNames ||
      !emails ||
      !institutions ||
      !phoneNumbers ||
      !ages ||
      !twibbonProofs ||
      !studentProofs
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

    const ticket = await prisma.ticketCompetition.create({
      data: {
        userId: session.user.id,
        teamName,
        chairmanName,
        memberNames,
        emails,
        phoneNumbers,
        ages,
        twibbonProofs,
        studentProofs,
        competitionType,
        institutions,
      },
    });

    ticketIdTemp = ticket.id;

    const data = {
      ticketId: ticket.id,
      teamName: ticket.teamName,
      chairmanName: ticket.chairmanName,
      memberNames: ticket.memberNames.join(', '),
      emails: ticket.emails.join(', '),
      institutions: ticket.institutions.join(', '),
      phoneNumbers: ticket.phoneNumbers.join(', '),
      ages: ticket.ages.join(', '),
      twibbonProofs: ticket.twibbonProofs.join(', '),
      studentProofs: ticket.studentProofs.join(', '),
    };

    const sheetAPI = process.env.API_SHEET_TICKET_URL || '';

    const response = await fetch(`${sheetAPI}?type=${ticket.competitionType}`, {
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

    const content =
      'We would like to inform you that we have received your ticket purchase order. Currently, our team is in the process of verifying this transaction to ensure its security and accuracy. Please be patient for a moment, as our team is diligently working to expedite this verification. We promise to provide you with the latest update as soon as the verification process is completed. We appreciate your understanding and patience throughout this process. If you have any questions or need further assistance, please do not hesitate to contact our support team at this email address. Thank you and warm regards,';

    const mailOptions = {
      from: '"Sandbox IEEE" <sandboxieeewebsite@gmail.com>',
      to: session.user.email || '',
      subject: 'Verification Process for Your Ticket Purchase',
      html: render(
        Email({
          content,
          heading: 'Ticket validation',
          name: ticket.chairmanName,
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
        await prisma.ticketCompetition.delete({
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
