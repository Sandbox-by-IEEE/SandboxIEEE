import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    await prisma.karya.update({
      where: {
        id: 'bdfa103a-b0eb-4b92-918f-7f27bc0fad21',
      },
      data: {
        usersVoteNew: {
          disconnect: {
            id: 'cls79p4ut0000botcaognv5hr',
          },
        },
      },
    });
    return NextResponse.json({ message: 'ff' }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
