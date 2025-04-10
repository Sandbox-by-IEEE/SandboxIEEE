import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { ticketId, email } = body;

    if (!ticketId || !email) {
      return NextResponse.json(
        { message: 'Missing ticketId or email' },
        { status: 400 },
      );
    }

    // Find the ticket in the database
    const ticket = await prisma.grandSeminar.findFirst({
      where: {
        ticketId: ticketId,
        email: email,
      },
    });

    // If ticket doesn't exist
    if (!ticket) {
      return NextResponse.json(
        { message: 'Ticket not found' },
        { status: 404 },
      );
    }

    // If ticket already validated
    if (ticket.validated) {
      return NextResponse.json(
        {
          message: 'Ticket already used',
          alreadyValidated: true,
          ticket: ticket,
        },
        { status: 400 },
      );
    }

    // Update ticket to validated
    const updatedTicket = await prisma.grandSeminar.update({
      where: { id: ticket.id },
      data: { validated: true },
    });

    // Return success response with ticket data
    return NextResponse.json(
      {
        message: 'Ticket successfully validated',
        ticket: updatedTicket,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Validation error:', error);
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : 'An error occurred while validating ticket',
      },
      { status: 500 },
    );
  }
}
