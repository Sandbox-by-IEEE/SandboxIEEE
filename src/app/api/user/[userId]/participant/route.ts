import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/db';

interface Params {
  userId: string;
}

export async function GET(
  req: NextRequest,
  { params: { userId } }: { params: Params },
) {
  try {
    const type = req.nextUrl.searchParams.get('type');
    if (!userId || !type) {
      return NextResponse.json(
        { message: 'some data is missing' },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!existingUser) {
      return NextResponse.json({ message: 'user not found' }, { status: 404 });
    }

    const existingParticipant = await prisma.participantCompetition.findFirst({
      where: {
        email: existingUser.email || '',
        team: { ticketCompetition: { competitionType: type } },
      },
      include: {
        team: true,
      },
    });

    if (!existingParticipant) {
      return NextResponse.json(
        { message: 'user not registered in this competition' },
        { status: 404 },
      );
    }

    const result = {
      id: existingUser.id,
      name: existingParticipant.name,
      email: existingUser.email,
      image: existingUser.image,
      phoneNumber: existingParticipant.phoneNumber,
      institution: existingParticipant.institution,
      teamId: existingParticipant.teamId,
      age: existingParticipant.age,
      position:
        existingParticipant.team.chairmanEmail === existingUser.email
          ? 'Ketua'
          : 'Anggota',
    };

    return NextResponse.json(
      { data: result, message: 'get data succesfull' },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      // eslint-disable-next-line no-console
      console.log('ERROR_GET_USER: ', error.message);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
