/**
 * ============================================================================
 * GET COMPETITION INFO API ENDPOINT
 * ============================================================================
 * 
 * GET /api/competitions/[code]
 * 
 * Purpose: Get competition details and registration requirements
 * ============================================================================
 */

import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;

    const competition = await prisma.competition.findUnique({
      where: { code: code.toUpperCase() },
      include: {
        _count: {
          select: {
            registrations: true,
          },
        },
      },
    });

    if (!competition) {
      return NextResponse.json(
        { error: 'Competition not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: competition.id,
      code: competition.code,
      name: competition.name,
      description: competition.description,
      isActive: competition.isActive,
      registrationDeadline: competition.registrationDeadline,
      preliminaryDeadline: competition.preliminaryDeadline,
      semifinalDeadline: competition.semifinalDeadline,
      finalDeadline: competition.finalDeadline,
      registrationFee: competition.registrationFee,
      teamSize: {
        min: competition.minTeamSize,
        max: competition.maxTeamSize,
      },
      registrationCount: competition._count.registrations,
    });
  } catch (error) {
    console.error('❌ Get competition error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
