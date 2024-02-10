import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/db';

export async function PATCH(req: NextRequest) {
  let ticketIdTemp;
  try {
    const { ticketId } = await req.json();

    if (!ticketId) {
      return NextResponse.json(
        { message: 'Missing ticket id or user id' },
        { status: 400 },
      );
    }

    const existingTicket = await prisma.ticketGS.findUnique({
      where: {
        id: ticketId,
      },
    });

    if (!existingTicket) {
      return NextResponse.json(
        { message: 'Ticket id is invalid!!!' },
        { status: 404 },
      );
    }

    // const existingUser = await prisma.user.findUnique({
    //   where: {
    //     email: email,
    //   },
    // });

    // if (!existingUser) {
    //   return NextResponse.json(
    //     { message: 'User id is invalid!!!' },
    //     { status: 404 },
    //   );
    // }

    if (existingTicket.active) {
      return NextResponse.json(
        { message: 'Ticket has been used!!' },
        { status: 200 },
      );
    }

    const updatedTicket = await prisma.ticketGS.update({
      where: {
        id: ticketId,
      },
      data: {
        active: true,
      },
    });

    return NextResponse.json(
      {
        ticket: updatedTicket,
        // user: existingUser,
        message: 'Validate ticket succesful',
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      if (ticketIdTemp) {
        await prisma.ticketGS.update({
          where: {
            id: ticketIdTemp,
          },
          data: {
            active: false,
          },
        });
      }
      // eslint-disable-next-line no-console
      console.log('VALIDATE_TICKET: ', error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
