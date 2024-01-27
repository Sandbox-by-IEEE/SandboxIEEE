import moment from 'moment-timezone';
import { NextRequest, NextResponse } from 'next/server';

// export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export function GET(req: NextRequest) {
  try {
    const now = moment();
    const time = now.tz('Asia/Jakarta');

    return NextResponse.json(
      {
        data: {
          unix: time.unix(),
          wib: {
            day: time.days(),
            date: time.date(),
            month: time.month(),
            year: time.year(),
            hour: time.hours(),
            minute: time.minutes(),
            second: time.seconds(),
            string: time.format(),
          },
          utc: {
            day: time.utc().days(),
            date: time.utc().date(),
            month: time.utc().month(),
            year: time.utc().year(),
            hour: time.utc().hours(),
            minute: time.utc().minutes(),
            second: time.utc().seconds(),
            string: time.utc().format(),
          },
        },
        message: 'get server time succesfull',
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log('ERROR_TIME: ', error);
      return NextResponse.json(
        { message: error.message },
        {
          status: 500,
        },
      );
    }
  }
}
