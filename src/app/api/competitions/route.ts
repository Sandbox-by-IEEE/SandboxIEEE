/**
 * ============================================================================
 * LIST COMPETITIONS API ENDPOINT
 * ============================================================================
 *
 * GET /api/competitions
 *
 * Purpose: Get all competitions with basic info
 * ============================================================================
 */

import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/db';

export async function GET(_request: NextRequest) {
  try {
    const competitions = await prisma.competition.findMany({
      orderBy: {
        code: 'asc',
      },
      include: {
        _count: {
          select: {
            registrations: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        competitions: competitions.map((comp) => ({
          id: comp.id,
          code: comp.code,
          name: comp.name,
          description: comp.description,
          isActive: comp.isActive,
          registrationDeadline: comp.registrationDeadline,
          registrationFee: comp.registrationFee,
          teamSize: {
            min: comp.minTeamSize,
            max: comp.maxTeamSize,
          },
          registrationCount: comp._count.registrations,
        })),
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      },
    );
  } catch (error) {
    console.error('❌ List competitions error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
