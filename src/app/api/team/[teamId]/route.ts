import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/db';

interface Params {
  teamId: string;
}

export async function GET(
  req: NextRequest,
  { params: { teamId } }: { params: Params },
) {
  try {
    if (!teamId) {
      return NextResponse.json(
        { message: 'some data is missing' },
        { status: 400 },
      );
    }

    const existingTeam = await prisma.team.findUnique({
      where: {
        id: teamId,
      },
      include: {
        ticketCompetition: true,
        members: true,
        abstract: true,
        regist3Data: true,
        karya: true,
      },
    });

    if (!existingTeam) {
      return NextResponse.json({ message: 'team not found' }, { status: 404 });
    }

    const result = {
      id: existingTeam.id,
      teamName: existingTeam.teamName,
      chairmanName: existingTeam.chairmanName,
      chairmanEmail: existingTeam.chairmanEmail,
      members: existingTeam.members,
      teamStatus: '',
      abstract: existingTeam.abstract,
      karya: {
        ...existingTeam.karya,
        countVote: parseInt(existingTeam.karya?.countVote.toString() || '0'),
      },
    };

    if (!existingTeam.ticketCompetition.verified) {
      result.teamStatus = 'Stage 1';
    } else {
      if (existingTeam.abstract?.status !== 'qualified') {
        result.teamStatus = 'Stage 2';
      } else if (existingTeam.abstract.status === 'qualified') {
        if (existingTeam.regist3Data?.statusPayment !== 'verified') {
          result.teamStatus = 'Stage 3 (payment not approved)';
        } else if (existingTeam.regist3Data?.statusPayment === 'verified') {
          result.teamStatus = 'Stage 3 (payment approved)';
        }
      }
    }

    return NextResponse.json(
      { data: result, message: 'get data successfull' },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      // eslint-disable-next-line no-console
      console.log('ERROR_GET_TEAM: ', error.message);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
