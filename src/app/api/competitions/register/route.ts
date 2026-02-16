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
import { rateLimit, RATE_LIMITS } from '@/lib/rate-limit';

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
  // Apply rate limiting (3 registrations per hour per IP)
  const rateLimitResponse = await rateLimit(request, RATE_LIMITS.REGISTRATION);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

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

    // 4. Check if leader already registered (ONE user = ONE competition ONLY)
    const existingUser = await prisma.user.findUnique({
      where: { email: leaderEmail },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        active: true,
        registration: {
          select: {
            id: true,
            competitionId: true,
            competition: {
              select: {
                name: true,
                code: true,
              },
            },
          },
        },
      },
    });

    if (existingUser?.registration) {
      // User already registered for a competition (ONE-TO-ONE constraint)
      return NextResponse.json(
        {
          error: `You are already registered for ${existingUser.registration.competition.name}. Each user can only register for one competition.`,
          existingCompetition: existingUser.registration.competition.code,
        },
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
      select: {
        email: true,
        team: {
          select: {
            registration: {
              select: {
                competition: {
                  select: {
                    name: true,
                  },
                },
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

    // 6. Hash password (only if creating new user)
    const hashedPassword = await bcrypt.hash(leaderPassword, 10);

    // 7. Create User + CompetitionRegistration + Team + TeamMembers (Transaction)
    const registration = await prisma.$transaction(async (tx) => {
      // Create or use existing user account for team leader
      let user: typeof existingUser | null = existingUser;
      let activateToken = null;

      if (!existingUser) {
        // Create new user account
        const newUser = await tx.user.create({
          data: {
            username: leaderEmail.split('@')[0] + '_' + Date.now(),
            name: leaderName,
            email: leaderEmail,
            password: hashedPassword,
            active: false, // Need email verification
          },
        });

        // Create activation token for email verification (only for new users)
        activateToken = await tx.activateToken.create({
          data: {
            userId: newUser.id,
            token: crypto.randomUUID(),
          },
        });

        // Update user reference
        user = { ...newUser, registration: null };
      } else {
        // For existing users, verify password matches
        if (!existingUser.password) {
          throw new Error('This account was created with OAuth (Google/GitHub). Please use social login or reset your password.');
        }
        const passwordMatch = await bcrypt.compare(leaderPassword, existingUser.password);
        if (!passwordMatch) {
          throw new Error('Invalid password. Please use your existing account password or reset it.');
        }
      }

      // Ensure user exists before creating registration
      if (!user) {
        throw new Error('Failed to create or retrieve user account');
      }

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
      // TODO: Log to monitoring service (e.g., Sentry, DataDog)
      // Google Sheets sync is non-critical, continue registration
    }

    // 9. Send email verification (only for new users)
    if (registration.activateToken) {
      try {
        await sendActivationEmail(
          leaderEmail,
          leaderName,
          registration.activateToken.token
        );
      } catch (emailError) {
        // TODO: Log to monitoring service
        // Email delivery is non-critical, user can request resend
      }
    }

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
    // TODO: Log to monitoring service with stack trace

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
    // TODO: Log to monitoring service
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
