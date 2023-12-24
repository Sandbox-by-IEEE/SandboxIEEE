import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { data } = await req.json();

    if (!data) {
      return NextResponse.json(
        { message: 'Missing some data!!' },
        { status: 400 },
      );
    }

    const sheetAPI = process.env.API_SHEET_TICKET_URL || '';

    const response = await fetch(`${sheetAPI}?type=RSVP}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const resBody = await response.json();

    if (resBody.status > 299 || resBody.status < 200) {
      throw new Error(`Failed to create ticket, ${resBody.message}`);
    }

    return NextResponse.json(
      {
        message: 'Your RSVP data has been sent successfully!',
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log('ERROR_RSVP', error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
