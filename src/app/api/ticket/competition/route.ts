import { Prisma } from '@prisma/client';
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
    const { competitionType, teamName, chairmanName, chairmanEmail, members } =
      await req.json();

    if (
      !competitionType ||
      !teamName ||
      !chairmanName ||
      !chairmanEmail ||
      !members
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

    const existingUser = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      include: {
        ticketsCompetition: true,
      },
    });

    if (existingUser?.ticketsCompetition.length != 0) {
      if (competitionType === 'TPC') {
        const existingTicketTPC = existingUser?.ticketsCompetition.filter(
          (ticket) => ticket.competitionType === 'TPC',
        );
        if (existingTicketTPC && existingTicketTPC.length > 0) {
          return NextResponse.json(
            { message: 'You have purchased TPC tickets before' },
            { status: 400 },
          );
        }
      } else if (competitionType === 'PTC') {
        const existingTicketTPC = existingUser?.ticketsCompetition.filter(
          (ticket) => ticket.competitionType === 'PTC',
        );
        if (existingTicketTPC && existingTicketTPC.length > 0) {
          return NextResponse.json(
            { message: 'You have purchased PTC tickets before' },
            { status: 400 },
          );
        }
      }
    }

    const ticket = await prisma.ticketCompetition.create({
      data: {
        competitionType: competitionType,
        userId: session.user.id,
        team: {
          create: {
            chairmanName: chairmanName,
            chairmanEmail: chairmanEmail,
            teamName: teamName,
            members: {
              createMany: {
                data: members,
              },
            },
          },
        },
      },
      include: {
        team: {
          include: {
            members: true,
          },
        },
      },
    });

    ticketIdTemp = ticket.id;

    const dataTicketForSheet = {
      ticketId: ticket.id,
      teamName: ticket.team?.teamName,
      chairmanName: ticket.team?.chairmanName,
      members: members,
    };

    const sheetAPI = process.env.API_SHEET_TICKET_URL || '';

    const response = await fetch(`${sheetAPI}?type=${ticket.competitionType}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataTicketForSheet),
    });

    const resBody = await response.json();

    if (resBody.status > 299 || resBody.status < 200) {
      throw new Error(`Failed to create ticket, ${resBody.message}`);
    }

    const content = `
    We wanted to let you know that your team ${ticket.team?.teamName} registration is currently in the process of being reviewed and processed by our team. We understand that you may be eagerly awaiting the results, and we assure you that we are working diligently to ensure that your application is thoroughly evaluated.
    Once the review process is complete, we will be sending out the results of your registration via email to the team leader's email address that was provided during registration. We understand the importance of this information to you, and we are committed to providing you with timely and accurate updates.
    We appreciate your patience and understanding as we work through this process. If you have any questions or concerns in the meantime, please do not hesitate to reach out to us at website. Our team is here to assist you and we are committed to ensuring your satisfaction.
    Thank you for choosing to be a part of our event.
    `;

    for (let i = 0; i < members.length; i++) {
      const mailOptions = {
        from: '"The Sandbox by IEEE" <sandboxieeewebsite@gmail.com>',
        to: ticket.team?.members[i].email,
        subject: `[SANDBOX] Verification Process for Your ${ticket.competitionType} Ticket`,
        html: render(
          Email({
            content,
            heading: `${ticket.competitionType} Ticket Verification`,
            name: ticket.team?.members[i].name || '',
          }),
          { pretty: true },
        ),
      };

      await transporter.sendMail(mailOptions);
    }

    // eslint-disable-next-line no-console
    console.log('POST_TICKET: email was sent');

    return NextResponse.json(
      {
        ticket: ticket,
        message: 'Ticket purchase successful and please check your email',
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof Error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          // eslint-disable-next-line no-console
          console.log('ERROR_POST_TICKET', error);
          return NextResponse.json(
            { message: 'The team name is already in use' },
            { status: 500 },
          );
        }
      }
      if (ticketIdTemp) {
        await prisma.ticketCompetition.delete({
          where: {
            id: ticketIdTemp,
          },
        });
      }

      // eslint-disable-next-line no-console
      console.log('ERROR_POST_TICKET', error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
