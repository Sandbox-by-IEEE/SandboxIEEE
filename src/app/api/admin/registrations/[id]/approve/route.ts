/**
 * ============================================================================
 * ADMIN API - APPROVE COMPETITION REGISTRATION
 * ============================================================================
 *
 * POST /api/admin/registrations/[id]/approve
 *
 * Purpose: Approve a pending competition registration and send email
 * Auth: Requires admin session (super_admin or moderator)
 *
 * Flow:
 * 1. Verify admin authentication
 * 2. Find registration by ID
 * 3. Update verificationStatus to 'approved'
 * 4. Send approval email to team leader
 * 5. Return success response
 *
 * ============================================================================
 */

import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { sendRegistrationApprovedEmail } from '@/lib/email';
import { logSubmissionToSheets } from '@/lib/google-sheets';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // ============================================================================
    // 1. AUTHENTICATION CHECK
    // ============================================================================
    const session = await auth();

    if (!session?.admin) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 },
      );
    }

    // Only super_admin and moderator can approve registrations
    if (!['super_admin', 'moderator'].includes(session.admin.role)) {
      return NextResponse.json(
        { error: 'Forbidden - Insufficient permissions' },
        { status: 403 },
      );
    }

    const { id: registrationId } = await params;

    if (!registrationId) {
      return NextResponse.json(
        { error: 'Registration ID is required' },
        { status: 400 },
      );
    }

    // ============================================================================
    // 2. FIND REGISTRATION WITH RELATIONS
    // ============================================================================
    const registration = await prisma.competitionRegistration.findUnique({
      where: { id: registrationId },
      include: {
        user: true,
        competition: true,
        team: {
          include: {
            members: {
              orderBy: { orderIndex: 'asc' },
            },
          },
        },
      },
    });

    if (!registration) {
      return NextResponse.json(
        { error: 'Registration not found' },
        { status: 404 },
      );
    }

    // Check if already approved
    if (registration.verificationStatus === 'approved') {
      return NextResponse.json(
        { error: 'Registration is already approved' },
        { status: 400 },
      );
    }

    // ============================================================================
    // 3. UPDATE VERIFICATION STATUS
    // ============================================================================
    const updatedRegistration = await prisma.competitionRegistration.update({
      where: { id: registrationId },
      data: {
        verificationStatus: 'approved',
        currentPhase: 'preliminary', // Move to preliminary phase
        updatedAt: new Date(),
      },
    });

    // ============================================================================
    // 4. SEND APPROVAL EMAIL
    // ============================================================================
    try {
      const leaderName =
        registration.team?.members?.[0]?.fullName ||
        registration.user.name ||
        registration.user.username;
      await sendRegistrationApprovedEmail(
        registration.user.email,
        leaderName,
        registration.team?.teamName || 'Your Team',
        registration.competition.name,
      );

      console.log(`✅ Approval email sent to ${registration.user.email}`);
    } catch (emailError) {
      console.error('⚠️ Failed to send approval email:', emailError);
      // Don't fail the request if email fails - approval still succeeded
    }

    // Log to Google Sheets (non-blocking)
    try {
      await logSubmissionToSheets({
        teamName: registration.team?.teamName || 'N/A',
        leaderEmail: registration.user.email,
        competitionCode: registration.competition.code,
        submissionPhase: 'preliminary',
        status: 'registration_approved',
        reviewedBy: session.admin.username || session.admin.email || 'admin',
        reviewNotes: 'Registration approved by admin',
      });
    } catch (sheetsError) {
      console.warn(
        '⚠️ Google Sheets sync failed for registration approval:',
        sheetsError,
      );
    }

    // ============================================================================
    // 5. RETURN SUCCESS RESPONSE
    // ============================================================================
    return NextResponse.json(
      {
        success: true,
        message: 'Registration approved successfully',
        data: {
          registrationId: updatedRegistration.id,
          verificationStatus: updatedRegistration.verificationStatus,
          currentPhase: updatedRegistration.currentPhase,
          teamName: registration.team?.teamName,
          userEmail: registration.user.email,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('❌ Error approving registration:', error);

    return NextResponse.json(
      { error: 'Failed to approve registration' },
      { status: 500 },
    );
  }
}
