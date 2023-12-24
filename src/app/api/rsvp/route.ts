import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  function generateId() {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const segmentLength = 4;
    const segments = 3;

    for (let i = 0; i < segments; i++) {
      for (let j = 0; j < segmentLength; j++) {
        result += characters.charAt(
          Math.floor(Math.random() * characters.length),
        );
      }
      if (i < segments - 1) result += '-';
    }

    return result;
  }
  try {
    const data = await req.json();

    if (!data) {
      return NextResponse.json(
        { message: 'Missing some data!!' },
        { status: 400 },
      );
    }

    const sheetAPI = process.env.API_SHEET_TICKET_URL || '';
    const bodyReq = JSON.stringify({
      id: generateId(),
      mainGuest: data[0],
      otherGuests: data.slice(1),
    });

    console.log('BODY_REQ', bodyReq);
    const response = await fetch(`${sheetAPI}?type=RSVP}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: bodyReq,
    });

    const resBody = await response.json();

    if (resBody.status > 299 || resBody.status < 200) {
      throw new Error(`Failed to create form RSVP, ${resBody.message}`);
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
