import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/authOptions';
import { prisma } from '@/lib/db';

interface Params {
  teamName: string;
}

export async function PATCH(
  req: NextRequest,
  { params: { teamName } }: { params: Params },
) {
  let isUpdated = false;
  let countTemp = 0;
  let idTemp = '';
  const session = await getServerSession(authOptions);
  try {
    if (!session?.user) {
      return NextResponse.json({ message: 'Unautorized' }, { status: 401 });
    }

    if (!teamName) {
      return NextResponse.json(
        { message: 'Missing team name!!!' },
        { status: 400 },
      );
    }

    const existingTeam = await prisma.team.findUnique({
      where: {
        teamName: teamName,
      },
      select: {
        karya: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!existingTeam || !existingTeam.karya) {
      return NextResponse.json(
        { message: 'Team name invalid' },
        { status: 404 },
      );
    }

    const existingKarya = await prisma.karya.findUnique({
      where: {
        id: existingTeam.karya.id,
      },
      include: {
        team: {
          include: {
            ticketCompetition: {
              select: {
                competitionType: true,
              },
            },
          },
        },
      },
    });

    if (!existingKarya) {
      return NextResponse.json(
        { message: 'Team name invalid' },
        { status: 404 },
      );
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if (!currentUser) {
      return NextResponse.json({ message: 'user id invalid' }, { status: 404 });
    }

    if (existingKarya.team.ticketCompetition.competitionType === 'TPC') {
      if (session.user.vote?.TPC?.status) {
        return NextResponse.json(
          { message: 'User cannot voted 2 times or more!!' },
          { status: 400 },
        );
      }
    }

    if (existingKarya.team.ticketCompetition.competitionType === 'PTC') {
      if (session.user.vote?.PTC?.status) {
        return NextResponse.json(
          { message: 'User cannot voted 2 times or more!!' },
          { status: 400 },
        );
      }
    }

    const updatedKarya = await prisma.karya.update({
      where: {
        id: existingKarya.id,
      },
      data: {
        countVote: ++existingKarya.countVote,
        usersVoteNew: {
          connect: {
            id: session.user.id,
          },
        },
      },
      include: {
        team: {
          include: {
            members: true,
          },
        },
      },
    });

    isUpdated = true;
    countTemp = parseInt(updatedKarya.countVote.toString());
    idTemp = updatedKarya.id;

    const updatedKaryaNormalize = {
      ...updatedKarya,
      countVote: updatedKarya.countVote.toString(),
    };

    const dataForSheet = {
      teamName: updatedKaryaNormalize.team.teamName,
      count: updatedKaryaNormalize.countVote,
      members: updatedKaryaNormalize.team.members.map((m) => m.name),
    };

    const res = await fetch(
      `${process.env.API_SHEET_VOTING_URL}?t=voting${existingKarya.team.ticketCompetition.competitionType}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataForSheet),
      },
    );

    const resBody = await res.json();

    if (resBody.status > 299 || resBody.status < 200) {
      throw new Error(`Failed to updated karya, ${resBody.message}`);
    }

    return NextResponse.json(
      {
        karya: updatedKaryaNormalize,
        message: 'voting succesful',
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      if (isUpdated) {
        await prisma.karya.update({
          where: {
            id: idTemp,
          },
          data: {
            countVote: BigInt(--countTemp),
            usersVoteNew: {
              disconnect: {
                id: session?.user.id,
              },
            },
          },
        });
      }
      // eslint-disable-next-line no-console
      console.log('PATCH_VOTING: ', error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
