import moment from 'moment-timezone';
import { NextRequest, NextResponse } from 'next/server';

export function GET(req: NextRequest) {
  try {
    const now = moment();
    const time = now.tz("Asia/Jakarta")
  

    return NextResponse.json(
      {
        data: {
          unix: now.unix(),
          wib: {
            day: time.days(),
            date: time.date(),
            month: time.month(),
            year: time.year(),
            hour: time.hours(),
            minute: time.minutes(),
            second: time.seconds(),
          },
          utc: {
            day: time.utc().days(),
            date: time.utc().date(),
            month: time.utc().month(),
            year: time.utc().year(),
            hour: time.utc().hours(),
            minute: time.utc().minutes(),
            second: time.utc().seconds(),
          },
        },
        message: 'get server time succesfull',
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'max-age=1',
          'CDN-Cache-Control': 'max-age=1',
          'Vercel-CDN-Cache-Control': 'max-age=1',
        },
      },
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log('ERROR_TIME: ', error);
      return NextResponse.json(
        { message: error.message },
        {
          status: 500,
          headers: {
            'Cache-Control': 'max-age=1',
            'CDN-Cache-Control': 'max-age=1',
            'Vercel-CDN-Cache-Control': 'max-age=1',
          },
        },
      );
    }
  }
}
