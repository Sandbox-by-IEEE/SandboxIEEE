import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/db';

export async function PATCH(req: NextRequest) {
  let ticketIdTemp;
  try {
    const { ticketId, email } = await req.json();

    if (!ticketId || !email) {
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
        { status: 400 },
      );
    }

    const data = {
      ticketId,
      value: true,
    };

    const response = await fetch(
      `${process.env.API_SHEET_EXHIBITION_URL}?type=attendance` || '',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    );

    // console.log(response)
    const resBody = await response.json();

    // console.log(resBody)

    if (resBody.status > 299 || resBody.status < 200) {
      throw new Error(`Failed to create data, ${resBody.message}`);
    }

    const updatedTicket = await prisma.ticketGS.update({
      where: {
        id: ticketId,
      },
      data: {
        active: true,
      },
    });

    ticketIdTemp = updatedTicket.id;
    // const data = {
    //   ticketId,
    // };

    // if (!existingTicket.active) {
    //   const sheetAPI = process.env.API_SHEET_EXHIBITION_URL || '';

    //   const response = await fetch(`${sheetAPI}?type=attendance`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(data),
    //   });

    //   const resBody = await response.json();

    //   if (resBody.status > 299 || response.status < 200) {
    //     throw new Error(`Failed to create ticket, ${resBody.message}`);
    //   }
    // }

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
