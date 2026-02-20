/**
 * ============================================================================
 * FINAL SUBMISSION API
 * ============================================================================
 *
 * POST - Submit final pitch deck / presentation
 * ============================================================================
 */

import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { validateFileServer } from '@/lib/fileConfig';
import { uploadFile } from '@/lib/fileUpload';
import { logSubmissionToSheets } from '@/lib/google-sheets';
import { rateLimit, RATE_LIMITS } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  try {
    const rateLimitResponse = await rateLimit(req, RATE_LIMITS.API);
    if (rateLimitResponse) return rateLimitResponse;

    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const registrationId = formData.get('registrationId') as string;
    const competitionCode = formData.get('competitionCode') as string;

    if (!registrationId) {
      return NextResponse.json(
        { error: 'Registration ID is required' },
        { status: 400 },
      );
    }

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: 'A file is required for final submission' },
        { status: 400 },
      );
    }

    // Server-side file validation
    const validation = validateFileServer(file, 'final');
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // Verify registration belongs to user and is in final phase
    const registration = await prisma.competitionRegistration.findUnique({
      where: { id: registrationId },
      include: {
        user: true,
        competition: true,
        team: { include: { members: true } },
      },
    });

    if (!registration || registration.user.email !== session.user.email) {
      return NextResponse.json(
        { error: 'Registration not found' },
        { status: 404 },
      );
    }

    if (registration.currentPhase !== 'final') {
      return NextResponse.json(
        { error: 'You are not in the final phase' },
        { status: 400 },
      );
    }

    if (!registration.isSemifinalQualified) {
      return NextResponse.json(
        { error: 'You must pass the semifinal phase first' },
        { status: 400 },
      );
    }

    // Check deadline
    if (
      registration.competition.finalDeadline &&
      new Date() > new Date(registration.competition.finalDeadline)
    ) {
      return NextResponse.json(
        { error: 'Final deadline has passed' },
        { status: 400 },
      );
    }

    // Check if final phase has started
    if (
      registration.competition.finalStart &&
      new Date() < new Date(registration.competition.finalStart)
    ) {
      return NextResponse.json(
        { error: 'Final submission period has not started yet' },
        { status: 400 },
      );
    }

    // Check if already submitted
    const existing = await prisma.finalSubmission.findUnique({
      where: { registrationId },
    });
    if (existing) {
      return NextResponse.json(
        { error: 'Final submission already exists' },
        { status: 409 },
      );
    }

    // Upload file
    const teamName = registration.team?.teamName || 'team';
    const prefix = `${competitionCode}-final-${teamName}`.replace(
      /[^a-zA-Z0-9-]/g,
      '_',
    );
    const uploaded = await uploadFile(file, 'final', prefix);

    // Create final submission
    const submission = await prisma.finalSubmission.create({
      data: {
        registrationId,
        pitchDeckUrl: uploaded.url,
        fileName: uploaded.fileName,
        fileSize: uploaded.fileSize,
      },
    });

    // Log to Google Sheets (non-blocking)
    try {
      await logSubmissionToSheets({
        teamName: registration.team?.teamName || 'N/A',
        leaderEmail: registration.user.email,
        competitionCode,
        submissionPhase: 'final',
        fileUrl: uploaded.url,
        fileName: uploaded.fileName,
        status: 'submitted',
        reviewNotes: 'Final submission received',
      });
    } catch (sheetsError) {
      console.warn('⚠️ Google Sheets sync failed for final:', sheetsError);
    }

    return NextResponse.json({
      success: true,
      submission,
      message: 'Final submission uploaded successfully',
    });
  } catch (error: any) {
    console.error('Final submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit final' },
      { status: 500 },
    );
  }
}
