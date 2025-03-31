import { NextRequest, NextResponse } from 'next/server';

// import { render } from '@react-email/render';
import { prisma } from '@/lib/db';
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

    await prisma.ticketCompetition.update({
      where: {
        id: ticketId,
      },
      data: {
        stage: Number(existingTicket.stage) + 1,
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
