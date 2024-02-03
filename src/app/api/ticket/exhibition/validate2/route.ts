import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/db';

export async function PATCH(req: NextRequest) {
  try {
    const { ticketId, value } = await req.json();

    if (!ticketId || !value) {
      return NextResponse.json(
        { message: 'Missing ticket id or user id' },
        { status: 400 },
      );
    }

    const existingTicket = await prisma.ticketExhibition.findUnique({
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
        { status: 400 },
      );
    }

    const updatedTicket = await prisma.ticketExhibition.update({
      where: {
        id: ticketId,
      },
      data: {
        active: value === 'true' ? true : false,
      },
    });

    return NextResponse.json(
      {
        ticket: updatedTicket,
        message: 'Validate ticket succesful',
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      // eslint-disable-next-line no-console
      console.log('VALIDATE_TICKET: ', error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
