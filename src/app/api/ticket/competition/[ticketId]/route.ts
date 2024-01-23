import { render } from '@react-email/render';
import { NextRequest, NextResponse } from 'next/server';

import Email from '@/components/emails/Emails';
// import { render } from '@react-email/render';
import { prisma } from '@/lib/db';
import { transporter } from '@/lib/mailTransporter';
// import Email from '@/components/emails/Emails';
// import { transporter } from '@/lib/mailTransporter';

interface Params {
  ticketId: string;
}

export async function PATCH(
  req: NextRequest,
  { params: { ticketId } }: { params: Params },
) {
  let isUpdated = false;
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

    // if (v === 'true') {
    if (existingTicket.verified === 'verified') {
      return NextResponse.json(
        { message: 'Ticket has been verified' },
        { status: 400 },
      );
    }

    const updatedTicket = await prisma.ticketCompetition.update({
      where: {
        id: ticketId,
      },
      data: {
        verified: 'verified',
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

    const headingVerified = ` Your Team Cleared the ${updatedTicket.competitionType} Verification Stage!`;

    const mailOptions = {
      from: '"The Sandbox by IEEE" <sandboxieeewebsite@gmail.com>',
      to: updatedTicket.team?.chairmanEmail || '',
      subject: `[SANDBOX] Announcement of Verification Results of Your ${updatedTicket.competitionType} Ticket`,
      html: render(
        Email({
          heading: headingVerified,
          content: `
            We are pleased to inform ${updatedTicket.team?.teamName} that your documents have been successfully verified, and your team has been selected to advance to the next stage of the competition. Congratulations on reaching this stage!
            We are excited to see what your team will achieve in the upcoming stages. Make sure to prepare well and give your best performance.
            If you have any questions or need further information regarding the next stages of the competition, please do not hesitate to reach out to us. We are here to assist you and ensure your successful participation in the event.
            Once again, congratulations and best of luck in the next stages of the competition!
           `,
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
            verified: 'pending',
          },
        });
      }
      // eslint-disable-next-line no-console
      console.log('ERROR_PATCH_TICKET: ', error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
