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
  { params }: { params: Promise<{ code: string }> },
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
        timelineEvents: {
          orderBy: { sortOrder: 'asc' },
        },
      },
    });

    if (!competition) {
      return NextResponse.json(
        { error: 'Competition not found' },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        competition: {
          id: competition.id,
          code: competition.code,
          name: competition.name,
          description: competition.description,
          isActive: competition.isActive,
          registrationOpen: competition.registrationOpen,
          registrationDeadline: competition.registrationDeadline,
          preliminaryStart: competition.preliminaryStart,
          preliminaryDeadline: competition.preliminaryDeadline,
          semifinalStart: competition.semifinalStart,
          semifinalDeadline: competition.semifinalDeadline,
          finalStart: competition.finalStart,
          finalDeadline: competition.finalDeadline,
          grandFinalDate: competition.grandFinalDate,
          registrationFee: competition.registrationFee,
          minTeamSize: competition.minTeamSize,
          maxTeamSize: competition.maxTeamSize,
          teamSize: {
            min: competition.minTeamSize,
            max: competition.maxTeamSize,
          },
          registrationCount: competition._count.registrations,
          timelineEvents: competition.timelineEvents,
        },
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      },
    );
  } catch (error) {
    console.error('❌ Get competition error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
