import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/authOptions';
import { prisma } from '@/lib/db';

const sheetAPI = process.env.API_SHEET_PTC_2024 || '';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const ptcSubmission = await prisma.pTCSubmissions.findUnique({
      where: { id: session.user.id },
    });

    if (
      ptcSubmission?.pptFileUrl === null ||
      ptcSubmission?.pptFileUrl === ''
    ) {
      return NextResponse.json({ submitted: false }, { status: 200 });
    }

    return NextResponse.json(
      {
        submitted: true,
        pptFileUrl: ptcSubmission?.pptFileUrl || ''
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { pptFileUrl, competitionType } = await req.json();

    if (!competitionType) {
      return NextResponse.json(
        { message: 'Competition type is required' },
        { status: 400 },
      );
    }

    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const teamId = session.user.ticket?.PTC.teamId;

    if (!teamId) {
      return NextResponse.json(
        { message: 'Team ID is missing' },
        { status: 400 },
      );
    }

    const team = await prisma.team.findUnique({
      where: { id: teamId },
      include: { members: true },
    });

    if (!team) {
      return NextResponse.json({ message: 'Team not found' }, { status: 404 });
    }

    let submission;
    if (competitionType === 'PTC') {
      submission = await prisma.pTCSubmissions.update({
        where: { id: session.user.id },
        data: {
          pptFileUrl,
        },
      });
    }

    const dataForSheet = {
      submissionId: submission.id,
      ticketId: team.ticketId,
      teamName: team.teamName,
      chairmanName: team.chairmanName,
      pptFileUrl,
    };

    const response = await fetch(`${sheetAPI}?type=PTC_STAGE3&method=PUT`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataForSheet),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log('Failed to send data to sheet:', errorText);
      throw new Error('Failed to send data to sheet');
    }

    return NextResponse.json(
      { message: 'File sent successfully' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error in PUT:', error);
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 },
    );
  }
}
