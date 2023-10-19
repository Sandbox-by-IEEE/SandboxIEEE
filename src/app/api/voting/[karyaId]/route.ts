import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/authOptions';
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
  const session = await getServerSession(authOptions);
  try {
    if (!session?.user) {
      return NextResponse.json({ message: 'Unautorized' }, { status: 401 });
    }

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

    const currentUser = await prisma.user.findUnique({
      where: {
        id: session?.user.id,
      },
    });

    if (!currentUser) {
      return NextResponse.json({ message: 'user id invalid' }, { status: 404 });
    }

    if (session.user.vote?.status) {
      return NextResponse.json(
        { message: 'User cannot voted 2 times or more!!' },
        { status: 400 },
      );
    }

    const updatedKarya = await prisma.karya.update({
      where: {
        id: karyaId,
      },
      data: {
        countVote: ++existingKarya.countVote,
        usersVote: {
          connect: {
            id: session?.user.id,
          },
        },
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
        karya: {
          id: updatedKarya.id,
          teamName: updatedKarya.teamName,
          anggota: updatedKarya.anggota,
          countVote: parseInt(updatedKarya.countVote.toString()),
        },
        message: 'voting succesful',
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
            usersVote: {
              disconnect: {
                id: session?.user.id,
              },
            },
          },
        });
      }
      console.log('PATCH_VOTING: ', error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
