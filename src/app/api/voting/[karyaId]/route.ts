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
    if (!karyaId) {
      return NextResponse.json(
        { message: 'Missing karya id!!!' },
        { status: 400 },
      );
    }

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
        mesaage: 'voting succesful',
      },
      { status: 200 },
    );
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
      console.log('PATCH_VOTING: ', error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
