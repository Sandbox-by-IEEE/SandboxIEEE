import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/authOptions';
import { prisma } from '@/lib/db';

export async function POST(req: NextRequest) {
  let karyaId;
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const body = await req.json();

    const { teamName, karya } = body;

    if (!teamName || !karya) {
      return NextResponse.json(
        { message: 'Missing some data!!' },
        { status: 400 },
      );
    }

    const existingTeam = await prisma.team.findUnique({
      where: {
        teamName: teamName,
      },
      include: {
        ticketCompetition: true,
      },
    });

    if (!existingTeam) {
      return NextResponse.json({ message: 'Team not found' }, { status: 404 });
    }

    if (!existingTeam.ticketCompetition.verified) {
      return NextResponse.json(
        { message: 'Registration 1 is not verified' },
        { status: 400 },
      );
    }

    const newKarya = await prisma.karya.create({
      data: {
        linkFullPaper: karya,
        teamId: existingTeam.id,
      },
      include: {
        team: {
          include: {
            members: true,
            ticketCompetition: true,
          },
        },
      },
    });

    karyaId = newKarya.id;

    const newKaryaNormalize = {
      ...newKarya,
      countVote: newKarya.countVote.toString(),
    };

    const dataForSheet = {
      teamName,
      members: newKaryaNormalize.team.members.map((member) => member.name),
      countVote: newKaryaNormalize.countVote,
    };

    const resSheet = await fetch(
      `${process.env.API_SHEET_VOTING_URL}?t=create`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataForSheet),
      },
    );

    const resBody = await resSheet.json();

    if (resBody.status > 299 || resBody.status < 200) {
      throw new Error(`Failed to create karya, ${resBody.message}`);
    }

    return NextResponse.json(
      {
        karya: newKaryaNormalize,
        message: 'registration 2 succesfull',
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof Error) {
      if (karyaId) {
        await prisma.karya.delete({
          where: {
            id: karyaId,
          },
        });
      }
      // eslint-disable-next-line no-console
      console.log('ERROR_POST_KARYA', error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
