import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/authOptions';
import { prisma } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();

    const { teamName, linkVideo } = body;

    if (!teamName || !linkVideo) {
      return NextResponse.json(
        { message: 'Missing some data' },
        { status: 400 },
      );
    }

    let existingTeam = await prisma.team.findUnique({
      where: {
        teamName: teamName,
      },
      include: {
        ticketCompetition: true,
        regist3Data: true,
        members: true,
      },
    });

    // Add validation freak team user
    if (!existingTeam) {
      const sanitizedTeamName = teamName.replace(/['`’]/g, '');

      const allTeams = await prisma.team.findMany({
        include: {
          ticketCompetition: true,
          regist3Data: true,
          members: true,
        },
      });

      const filterTeam = allTeams.find(
        (team) => team.teamName.replace(/['`’]/g, '') === sanitizedTeamName,
      );

      if (filterTeam) {
        existingTeam = filterTeam;
      }
    }

    if (!existingTeam) {
      return NextResponse.json({ message: 'Team not found' }, { status: 404 });
    }

    if (existingTeam.ticketCompetition.competitionType !== 'TPC') {
      return NextResponse.json(
        { message: 'Your team is not TPC team' },
        { status: 400 },
      );
    }

    if (existingTeam.regist3Data?.statusPayment !== 'verified') {
      return NextResponse.json(
        { message: 'Your payment for stage 3 has not been verified' },
        { status: 400 },
      );
    }

    const index = existingTeam.members.findIndex(
      (member) => member.email === session.user.email,
    );

    if (index === -1) {
      return NextResponse.json(
        { message: 'You are not a member of this team' },
        { status: 400 },
      );
    }

    const updatedKarya = await prisma.karya.update({
      where: {
        teamId: existingTeam.id,
      },
      data: {
        linkVideo2: linkVideo,
      },
      include: {
        team: true,
      },
    });

    return NextResponse.json(
      { data: updatedKarya, message: 'Upload video success' },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log('UPLOAD_VIDEO_TPC: ', error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
