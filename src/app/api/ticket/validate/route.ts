import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/db';

export async function PATCH(req: NextRequest) {
  let ticketIdTemp;
  try {
    const { ticketId, userId } = await req.json();

    ticketIdTemp = ticketId;

    if (!ticketId || !userId) {
      return NextResponse.json(
        { message: 'Missing ticket id or user id' },
        { status: 400 },
      );
    }

    const existingTicket = await prisma.ticket.findUnique({
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

    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!existingUser) {
      return NextResponse.json(
        { message: 'User id is invalid!!!' },
        { status: 404 },
      );
    }

    if (existingTicket.active) {
      return NextResponse.json(
        { message: 'Ticket has been used!!' },
        { status: 400 },
      );
    }

    const updatedTicket = await prisma.ticket.update({
      where: {
        id: ticketId,
      },
      data: {
        active: true,
      },
    });

    return NextResponse.json(
      {
        data: { ...updatedTicket, user: existingUser },
        message: 'Validate ticket succesful',
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log('VALIDATE_TICKET: ', error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
