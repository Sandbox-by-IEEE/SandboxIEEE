import { NextRequest, NextResponse } from 'next/server';

export const fetchCache = 'force-no-store';

export function GET(req: NextRequest) {
  try {
    const now = Date.now();
    const time = new Date(now);
    const time2 = new Date(now);
    time.setHours(time.getUTCHours() + 7);

    return NextResponse.json(
      {
        data: {
          unix: now,
          wib: {
            day: time.getDay(),
            date: time.getDate(),
            month: time.getMonth(),
            year: time.getFullYear(),
            hour: time.getHours(),
            minute: time.getMinutes(),
            second: time.getSeconds(),
          },
          utc: {
            day: time2.getDay(),
            date: time2.getDate(),
            month: time2.getMonth(),
            year: time2.getFullYear(),
            hour: time2.getHours(),
            minute: time2.getMinutes(),
            second: time2.getSeconds(),
          },
        },
        message: 'get server time succesfull',
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log('ERROR_TIME: ', error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
