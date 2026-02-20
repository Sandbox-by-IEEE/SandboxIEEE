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

import { Prisma } from '@prisma/client';

import { prisma } from '@/lib/db';
import { uploadFile } from '@/lib/fileUpload';
import { appendToGoogleSheets } from '@/lib/google-sheets';
import { rateLimit, RATE_LIMITS } from '@/lib/rate-limit';
import { auth } from '@/lib/auth';

// Zod schema for team member validation
const memberSchema = z.object({
  fullName: z
    .string()
    .min(3, 'Full name must be at least 3 characters')
    .max(100, 'Full name must be at most 100 characters')
    .trim(),
  email: z.string().email('Invalid email address').trim().toLowerCase(),
  phoneNumber: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(20, 'Phone number must be at most 20 digits')
    .trim(),
  studentIdCard: z.string().optional(),
  proofOfRegistrationLink: z
    .string()
    .url('Invalid proof link URL')
    .optional()
    .or(z.literal('')),
});

const membersArraySchema = z.array(memberSchema);

export async function POST(request: NextRequest) {
  // Check if user is authenticated
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json(
      { error: 'Authentication required. Please login first.' },
      { status: 401 },
    );
  }

  // Apply rate limiting (3 registrations per hour per IP)
  const rateLimitResponse = await rateLimit(request, RATE_LIMITS.REGISTRATION);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  try {
    // Parse FormData (multipart) instead of JSON
    const formDataBody = await request.formData();

    const competitionCode = formDataBody.get('competitionCode') as string;
    const teamName = formDataBody.get('teamName') as string;
    const institution = formDataBody.get('institution') as string;
    const leaderName = formDataBody.get('leaderName') as string;
    const leaderPhone = formDataBody.get('leaderPhone') as string;
    const leaderProofLink = formDataBody.get('leaderProofLink') as string;
    const membersJson = formDataBody.get('members') as string;
    const paymentProofFile = formDataBody.get('paymentProof') as File | null;

    // Validate required fields
    if (!competitionCode || !['PTC', 'TPC', 'BCC'].includes(competitionCode)) {
      return NextResponse.json(
        { error: 'Invalid competition code' },
        { status: 400 },
      );
    }
    if (!teamName || teamName.length < 3 || teamName.length > 50) {
      return NextResponse.json(
        { error: 'Team name must be 3-50 characters' },
        { status: 400 },
      );
    }
    if (!institution || institution.length < 3) {
      return NextResponse.json(
        { error: 'Institution name is required' },
        { status: 400 },
      );
    }
    if (!leaderName || leaderName.length < 3) {
      return NextResponse.json(
        { error: 'Leader name must be at least 3 characters' },
        { status: 400 },
      );
    }
    if (!leaderPhone || leaderPhone.length < 10) {
      return NextResponse.json(
        { error: 'Phone number must be at least 10 digits' },
        { status: 400 },
      );
    }
    if (!leaderProofLink) {
      return NextResponse.json(
        { error: 'Proof of registration link is required' },
        { status: 400 },
      );
    }

    // Validate payment proof file
    if (
      !paymentProofFile ||
      !(paymentProofFile instanceof File) ||
      paymentProofFile.size === 0
    ) {
      return NextResponse.json(
        { error: 'Payment proof file is required' },
        { status: 400 },
      );
    }
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(paymentProofFile.type)) {
      return NextResponse.json(
        { error: 'Payment proof must be JPG or PNG image' },
        { status: 400 },
      );
    }
    if (paymentProofFile.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Payment proof must be less than 5MB' },
        { status: 400 },
      );
    }

    // Parse and validate members with Zod
    let members: z.infer<typeof membersArraySchema> = [];
    try {
      const parsed = JSON.parse(membersJson || '[]');
      const result = membersArraySchema.safeParse(parsed);
      if (!result.success) {
        const firstError = result.error.errors[0];
        return NextResponse.json(
          {
            error: `Invalid member data: ${firstError.path.join('.')} - ${firstError.message}`,
          },
          { status: 400 },
        );
      }
      members = result.data;
    } catch {
      return NextResponse.json(
        { error: 'Invalid members data format' },
        { status: 400 },
      );
    }

    // Use authenticated user's email as leader email
    const leaderEmail = session.user.email;

    // 1. Check if competition exists and is active
    const competition = await prisma.competition.findUnique({
      where: { code: competitionCode },
    });

    if (!competition) {
      return NextResponse.json(
        { error: `Competition ${competitionCode} not found` },
        { status: 404 },
      );
    }

    if (!competition.isActive) {
      return NextResponse.json(
        { error: 'Competition registration is closed' },
        { status: 400 },
      );
    }

    // Check registration window (date-based enforcement)
    const now = new Date();
    if (now < new Date(competition.registrationOpen)) {
      return NextResponse.json(
        {
          error:
            'Registration has not opened yet. Please check the competition timeline.',
        },
        { status: 400 },
      );
    }
    if (now > new Date(competition.registrationDeadline)) {
      return NextResponse.json(
        { error: 'Registration deadline has passed.' },
        { status: 400 },
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
        { status: 400 },
      );
    }

    // 3. Check for duplicate team name (scoped to same competition)
    const existingTeam = await prisma.team.findFirst({
      where: {
        teamName,
        registration: {
          competitionId: competition.id,
        },
      },
    });

    if (existingTeam) {
      return NextResponse.json(
        {
          error:
            'Team name already taken in this competition. Please choose another name.',
        },
        { status: 409 },
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
        { status: 409 },
      );
    }

    // 5. Check for duplicate emails (all members including leader)
    // Only check if emails are used in OTHER teams (not the current user's potential re-registration)
    const allEmails = [leaderEmail, ...members.map((m) => m.email)];

    const duplicateMembers = await prisma.teamMember.findMany({
      where: {
        email: {
          in: allEmails,
        },
        // Exclude the current user's own email from duplicate check
        // This allows users to retry registration if their previous attempt failed
        team: {
          registration: {
            userId: {
              not: existingUser?.id, // Exclude current user's registrations
            },
          },
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
        { status: 409 },
      );
    }

    // 6. Upload payment proof via Supabase Storage (or local fallback)
    const sanitizedTeamName = teamName.replace(/[^a-zA-Z0-9]/g, '_');
    const prefix = `payment_${sanitizedTeamName}`;
    const uploaded = await uploadFile(paymentProofFile, 'payments', prefix);
    const paymentProofUrl = uploaded.url;

    // 7. Create CompetitionRegistration + Team + TeamMembers + Payment (Transaction)
    const registration = await prisma.$transaction(async (tx) => {
      // User is already authenticated and exists in database
      if (!existingUser) {
        throw new Error('User account not found. Please login again.');
      }

      const user = existingUser;

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
                    proofOfRegistrationLink: leaderProofLink,
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

      // Create Payment record with the uploaded proof
      await tx.payment.create({
        data: {
          registrationId: reg.id,
          amount: competition.registrationFee,
          paymentProofUrl: paymentProofUrl,
          paymentMethod: 'Bank Transfer',
          billName: leaderName,
          status: 'pending',
        },
      });

      return reg;
    });

    // 8. Sync to Google Sheets (non-blocking)
    try {
      await appendToGoogleSheets({
        registrationId: registration.id,
        userId: registration.userId,
        competitionCode,
        teamName,
        institution,
        leaderName,
        leaderEmail,
        leaderPhone,
        members: registration.team!.members.slice(1), // Exclude leader
        verificationStatus: 'pending',
        currentPhase: 'registration',
      });
    } catch (sheetsError) {
      // TODO: Log to monitoring service (e.g., Sentry, DataDog)
      // Google Sheets sync is non-critical, continue registration
    }

    // 10. Return success response
    return NextResponse.json(
      {
        success: true,
        message:
          'Registration successful! Your team is now pending admin review.',
        registration: {
          id: registration.id,
          teamName: registration.team?.teamName,
          competition: registration.competition.name,
          memberCount: registration.team?.members.length || 0,
          status: registration.verificationStatus,
          currentPhase: registration.currentPhase,
          needsActivation: false, // User is already active
        },
      },
      { status: 201 },
    );
  } catch (error) {
    // Handle race condition: unique constraint violation from concurrent registration
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      const target = (error.meta?.target as string[]) || [];
      if (target.includes('userId')) {
        return NextResponse.json(
          { error: 'You are already registered for a competition.' },
          { status: 409 },
        );
      }
      if (target.includes('email')) {
        return NextResponse.json(
          { error: 'One or more email addresses are already registered.' },
          { status: 409 },
        );
      }
      return NextResponse.json(
        { error: 'Registration conflict. Please try again.' },
        { status: 409 },
      );
    }

    return NextResponse.json(
      {
        error: 'Internal server error',
      },
      { status: 500 },
    );
  }
}

// GET endpoint to check registration status (requires authentication)
export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 },
    );
  }

  // Users can only check their own registration status
  const email = session.user.email;

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
      { status: 500 },
    );
  }
}
