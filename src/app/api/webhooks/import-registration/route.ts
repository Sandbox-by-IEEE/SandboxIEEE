/**
 * ============================================================================
 * WEBHOOK: IMPORT REGISTRATION FROM GOOGLE FORM
 * ============================================================================
 * 
 * Purpose: Receive registrations submitted via standalone Google Form
 * Scenario: Website down, users register via backup Google Form
 * 
 * Flow:
 * 1. User submits Google Form
 * 2. Apps Script triggers onFormSubmit
 * 3. Apps Script sends webhook to this endpoint
 * 4. We save to database
 * 
 * Setup Required:
 * 1. Deploy Apps Script with onFormSubmit trigger
 * 2. Configure webhook URL in Apps Script
 * 3. Add WEBHOOK_SECRET to .env for security
 * ============================================================================
 */

import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    // Verify webhook secret for security
    const authHeader = request.headers.get('authorization');
    const expectedSecret = process.env.WEBHOOK_SECRET;

    if (!expectedSecret || authHeader !== `Bearer ${expectedSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // Validate required fields
    const {
      competitionCode,
      teamName,
      institution,
      leaderName,
      leaderEmail,
      leaderPhone,
      members,
    } = body;

    if (
      !competitionCode ||
      !teamName ||
      !institution ||
      !leaderName ||
      !leaderEmail ||
      !leaderPhone
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if competition exists
    const competition = await prisma.competition.findUnique({
      where: { code: competitionCode },
    });

    if (!competition) {
      return NextResponse.json(
        { error: `Competition ${competitionCode} not found` },
        { status: 404 }
      );
    }

    // Check for duplicate - leader email must be unique globally
    const existingMember = await prisma.teamMember.findUnique({
      where: { email: leaderEmail },
      include: {
        team: {
          include: {
            registration: {
              include: {
                competition: true,
              },
            },
          },
        },
      },
    });

    if (existingMember) {
      return NextResponse.json(
        {
          error: 'Email already registered',
          competition: existingMember.team.registration.competition.name,
        },
        { status: 409 }
      );
    }

    // Create user account for team leader
    const user = await prisma.user.create({
      data: {
        username: leaderEmail.split('@')[0] + '_gform_' + Date.now(),
        name: leaderName,
        email: leaderEmail,
        password: null, // Will be set during activation
        active: false, // Need email verification
      },
    });

    // Create competition registration with team and members
    const registration = await prisma.competitionRegistration.create({
    data: {
      userId: user.id,
      competitionId: competition.id,
      verificationStatus: 'pending',
      currentPhase: 'registration',
      team: {
        create: {
          teamName,
          institution,
          leaderUserId: user.id,
          members: {
            create: [
              // Leader as first member
              {
                fullName: leaderName,
                email: leaderEmail,
                phoneNumber: leaderPhone,
              },
              // Additional members from form
              ...(members || []).map(
                (member: {
                  name: string;
                  email: string;
                  phone: string;
                }) => ({
                  fullName: member.name,
                  email: member.email,
                  phoneNumber: member.phone || '',
                })
              ),
            ],
          },
        },
      },
    },
    include: {
      competition: true,
      team: {
        include: {
          members: true,
        },
      },
    },
  });

    console.log(
      `✅ Imported registration from Google Form: ${registration.team?.teamName} (${competitionCode})`
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Registration imported successfully',
        registration: {
          id: registration.id,
          teamName: registration.team?.teamName,
          competition: registration.competition.name,
          memberCount: registration.team?.members.length || 0,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('❌ Webhook import failed:', error);

    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to check webhook status
export async function GET() {
  return NextResponse.json({
    status: 'active',
    endpoint: '/api/webhooks/import-registration',
    message: 'Webhook endpoint for Google Form registration import',
  });
}
