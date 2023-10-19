import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/db';

interface Params {
  karyaId: string;
}

export async function PATCH(
  req: NextRequest,
  { params: { karyaId } }: { params: Params },
) {
  let isUpdated = false;
  let countTemp = 0;
  try {
    // Validate karya id
    if (!karyaId) {
      return NextResponse.json(
        { message: 'Missing karya id!!!' },
        { status: 400 },
      );
    }

    // Check if karya exist
    const existingKarya = await prisma.karya.findUnique({
      where: {
        id: karyaId,
      },
    });

    if (!existingKarya) {
      return NextResponse.json(
        { message: 'karya id invalid' },
        { status: 404 },
      );
    }

    // Update karya count vote
    const updatedKarya = await prisma.karya.update({
      where: {
        id: karyaId,
      },
      data: {
        countVote: ++existingKarya.countVote,
      },
    });
    isUpdated = true;
    countTemp = parseInt(updatedKarya.countVote.toString());

    // Update to google sheet
    const res = await fetch(
      `${process.env.API_SHEET_VOTING_URL}?name=${updatedKarya.teamName}&count=${updatedKarya.countVote}`,
      {
        method: 'POST',
      },
    );

    const data = await res.json();

    if (data.status !== 200) {
      throw new Error(data.message);
    }

    return NextResponse.json(
      {
        countVote: parseInt(updatedKarya.countVote.toString()),
        message: 'voting succesful',
      },
      { status: 200 },
    );
    // Error handling
  } catch (error) {
    if (error instanceof Error) {
      if (isUpdated) {
        await prisma.karya.update({
          where: {
            id: karyaId,
          },
          data: {
            countVote: BigInt(--countTemp),
          },
        });
      }
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
