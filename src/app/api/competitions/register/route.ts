/**
 * ============================================================================
 * COMPETITION REGISTRATION API ENDPOINT
 * ============================================================================
 * 
 * POST /api/competitions/register
 * 
 * Purpose: Register team for competition (PTC/TPC/BCC)
 * 
 * Flow:
 * 1. Validate request data
 * 2. Check competition exists and active
 * 3. Validate team size for competition
 * 4. Check for duplicate emails (global uniqueness)
 * 5. Create User → CompetitionRegistration → Team → TeamMembers
 * 6. Sync to Google Sheets (non-blocking)
 * 7. Send email verification to leader
 * 8. Return success response
 * 
 * ============================================================================
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

import { prisma } from '@/lib/db';
import { appendToGoogleSheets } from '@/lib/google-sheets';
import { sendActivationEmail } from '@/lib/email';

// Validation schema
const memberSchema = z.object({
  fullName: z.string().min(3, 'Full name must be at least 3 characters'),
  email: z.string().email('Invalid email format'),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
  studentIdCard: z.string().optional(),
  proofOfRegistrationLink: z.string().url().optional(),
});

const registrationSchema = z.object({
  // Competition info
  competitionCode: z.enum(['PTC', 'TPC', 'BCC'], {
    errorMap: () => ({ message: 'Invalid competition code' }),
  }),

  // Team info
  teamName: z
    .string()
    .min(3, 'Team name must be at least 3 characters')
    .max(50, 'Team name must be less than 50 characters'),
  institution: z.string().min(3, 'Institution name is required'),

  // Leader info (will become User account)
  leaderName: z.string().min(3, 'Leader name must be at least 3 characters'),
  leaderEmail: z.string().email('Invalid email format'),
  leaderPhone: z.string().min(10, 'Phone number must be at least 10 digits'),
  leaderPassword: z.string().min(8, 'Password must be at least 8 characters'),

  // Team members (excluding leader)
  members: z.array(memberSchema).min(0).max(4),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = registrationSchema.parse(body);

    const {
      competitionCode,
      teamName,
      institution,
      leaderName,
      leaderEmail,
      leaderPhone,
      leaderPassword,
      members,
    } = validatedData;

    // 1. Check if competition exists and is active
    const competition = await prisma.competition.findUnique({
      where: { code: competitionCode },
    });

    if (!competition) {
      return NextResponse.json(
        { error: `Competition ${competitionCode} not found` },
        { status: 404 }
      );
    }

    if (!competition.isActive) {
      return NextResponse.json(
        { error: 'Competition registration is closed' },
        { status: 400 }
      );
    }

    // 2. Validate team size
    const totalMembers = members.length + 1; // +1 for leader

    if (
      totalMembers < competition.minTeamSize ||
      totalMembers > competition.maxTeamSize
    ) {
      return NextResponse.json(
        {
          error: `Team size must be between ${competition.minTeamSize} and ${competition.maxTeamSize} members`,
          current: totalMembers,
          min: competition.minTeamSize,
          max: competition.maxTeamSize,
        },
        { status: 400 }
      );
    }

    // 3. Check for duplicate team name
    const existingTeam = await prisma.team.findUnique({
      where: { teamName },
    });

    if (existingTeam) {
      return NextResponse.json(
        { error: 'Team name already taken. Please choose another name.' },
        { status: 409 }
      );
    }

    // 4. Check for duplicate emails (leader)
    const existingUser = await prisma.user.findUnique({
      where: { email: leaderEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered. Please use another email or login.' },
        { status: 409 }
      );
    }

    // 5. Check for duplicate emails (all members including leader)
    const allEmails = [
      leaderEmail,
      ...members.map((m) => m.email),
    ];

    const duplicateMembers = await prisma.teamMember.findMany({
      where: {
        email: {
          in: allEmails,
        },
      },
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

    if (duplicateMembers.length > 0) {
      return NextResponse.json(
        {
          error: 'One or more emails already registered',
          duplicates: duplicateMembers.map((m) => ({
            email: m.email,
            competition: m.team.registration.competition.name,
          })),
        },
        { status: 409 }
      );
    }

    // 6. Hash password
    const hashedPassword = await bcrypt.hash(leaderPassword, 10);

    // 7. Create User + CompetitionRegistration + Team + TeamMembers (Transaction)
    const registration = await prisma.$transaction(async (tx) => {
      // Create user account for team leader
      const user = await tx.user.create({
        data: {
          username: leaderEmail.split('@')[0] + '_' + Date.now(),
          name: leaderName,
          email: leaderEmail,
          password: hashedPassword,
          active: false, // Need email verification
        },
      });

      // Create activation token for email verification
      const activateToken = await tx.activateToken.create({
        data: {
          userId: user.id,
          token: crypto.randomUUID(),
        },
      });

      // Create competition registration with team and members
      const reg = await tx.competitionRegistration.create({
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
                  // Additional team members
                  ...members.map((member) => ({
                    fullName: member.fullName,
                    email: member.email,
                    phoneNumber: member.phoneNumber,
                    studentIdCard: member.studentIdCard,
                    proofOfRegistrationLink: member.proofOfRegistrationLink,
                  })),
                ],
              },
            },
          },
        },
        include: {
          competition: true,
          user: true,
          team: {
            include: {
              members: true,
            },
          },
        },
      });

      return { registration: reg, activateToken };
    });

    // 8. Sync to Google Sheets (non-blocking)
    try {
      await appendToGoogleSheets({
        registrationId: registration.registration.id,
        userId: registration.registration.userId,
        competitionCode,
        teamName,
        institution,
        leaderName,
        leaderEmail,
        leaderPhone,
        members: registration.registration.team!.members.slice(1), // Exclude leader
        verificationStatus: 'pending',
        currentPhase: 'registration',
      });
    } catch (sheetsError) {
      console.error('⚠️ Google Sheets sync failed (non-critical):', sheetsError);
      // Don't fail registration if sheets sync fails
    }

    // 9. Send email verification
    try {
      await sendActivationEmail(
        leaderEmail,
        leaderName,
        registration.activateToken.token
      );
    } catch (emailError) {
      console.error('⚠️ Failed to send activation email (non-critical):', emailError);
      // Don't fail registration if email fails - user can request new token
    }

    console.log(
      `✅ Registration successful: ${teamName} (${competitionCode}) - Leader: ${leaderEmail}`
    );

    // 10. Return success response
    return NextResponse.json(
      {
        success: true,
        message:
          'Registration successful! Please check your email to activate your account.',
        registration: {
          id: registration.registration.id,
          teamName: registration.registration.team?.teamName,
          competition: registration.registration.competition.name,
          memberCount: registration.registration.team?.members.length || 0,
          status: registration.registration.verificationStatus,
          currentPhase: registration.registration.currentPhase,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('❌ Registration error:', error);

    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: error.errors.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    // Handle Prisma errors
    if (error instanceof Error) {
      if (error.message.includes('Unique constraint')) {
        return NextResponse.json(
          { error: 'Data already exists. Please check your input.' },
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// GET endpoint to check registration status
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ error: 'Email parameter required' }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        registration: {
          include: {
            competition: true,
            team: {
              include: {
                members: true,
              },
            },
          },
        },
      },
    });

    if (!user || !user.registration) {
      return NextResponse.json({ registered: false }, { status: 200 });
    }

    return NextResponse.json({
      registered: true,
      registration: {
        id: user.registration.id,
        teamName: user.registration.team?.teamName,
        competition: user.registration.competition.name,
        competitionCode: user.registration.competition.code,
        status: user.registration.verificationStatus,
        currentPhase: user.registration.currentPhase,
        memberCount: user.registration.team?.members.length || 0,
        isActive: user.active,
      },
    });
  } catch (error) {
    console.error('❌ Check registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
