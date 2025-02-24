import { render } from '@react-email/render';
import { NextRequest, NextResponse } from 'next/server';

import Email from '@/components/emails/Emails';
import { prisma } from '@/lib/db';
import { transporter } from '@/lib/mailTransporter';

interface Params {
  ticketId: string;
  stage: string;
}

export async function PATCH(
  req: NextRequest,
  { params: { ticketId, stage } }: { params: Params },
) {
  let isUpdated = false;
  const { status } = await req.json();
  try {
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

    const updatedTicket = await prisma.ticketCompetition.update({
      where: {
        id: ticketId,
      },
      data: {
        stage: Number(stage) + 0.5,
      },
      include: {
        team: {
          select: {
            teamName: true,
            chairmanName: true,
            chairmanEmail: true,
          },
        },
      },
    });

    isUpdated = true;

    let heading = '';
    let content = '';

    if (status === 'verified') {
      heading = `Your Team Cleared Stage ${stage}!`;
      content = `
        Congratulations on completing your re-registration! We are happy to confirm that we have successfully received and verified your payment, finalizing your registration process.        https://bit.ly/PTC25AbstractScore
        To facilitate communication, we invite you to join the WA Group for Semifinalists, as it is essential for all members to be part of this group.
        https://chat.whatsapp.com/LWTYHmJ7lvG6QBmKggGEwT
        If you need any assistance or have questions, please feel free to reach out to us.
        Once again, congratulations! We wish you the best of luck in the upcoming stages!
        `;
    } else if (status === 'rejected') {
      heading = `Your Team Didn't Clear Stage ${stage}`;
      content = `
        We’re sorry to inform you that we were unable to process your payment for re-registration due to some incorrect details. We understand this can be frustrating, and we encourage you to review your transaction and try again. 
        If you need any assistance or have any questions, please don’t hesitate to reach out to us. We're here to help!Best regards,  
        The Sandbox 2.0 by IEEE ITB Student Branch
        `;
    }

    const mailOptions = {
      from: '"The Sandbox by IEEE" <sandboxieeewebsite@gmail.com>',
      to: updatedTicket.team?.chairmanEmail || '',
      subject: `${
        (status === 'verified' &&
          `Congratulations, ${updatedTicket.team?.teamName}! You’ve Cleared the PTC Verification Stage`) ||
        `${updatedTicket.team?.teamName} – PTC Competition Submission Status`
      }`,
      html: render(
        Email({
          heading,
          content,
          name: updatedTicket.team?.teamName || '',
        }),
        { pretty: true },
      ),
    };
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { ticket: updatedTicket, message: 'Ticket data updated successful' },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      if (isUpdated) {
        await prisma.ticketCompetition.update({
          where: {
            id: ticketId,
          },
          data: {
            stage: Number(stage),
          },
        });
      }
      // eslint-disable-next-line no-console
      console.log('ERROR_PATCH_TICKET: ', error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
