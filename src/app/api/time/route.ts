import { NextRequest, NextResponse } from 'next/server';

export function GET(req: NextRequest) {
  try {
    const time = new Date();
    time.setHours(time.getUTCHours() + 7);

    return NextResponse.json(
      {
        data: {
          unix: time.getTime(),
          wib: {
            day: time.getDay(),
            time: time.getDate(),
            month: time.getMonth(),
            year: time.getFullYear(),
            hour: time.getHours(),
            minute: time.getMinutes(),
            second: time.getSeconds(),
            string: time.toString(),
          },
          utc: {
            day: time.getUTCDay(),
            time: time.getUTCDate(),
            month: time.getUTCMonth(),
            year: time.getUTCFullYear(),
            hour: time.getUTCHours(),
            minute: time.getUTCMinutes(),
            second: time.getUTCSeconds(),
            string: time.toUTCString(),
          }
        },
        message: 'get time time succesfull',
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
