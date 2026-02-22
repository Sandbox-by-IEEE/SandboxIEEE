import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { validateFileServer } from '@/lib/fileConfig';
import { uploadFile, deleteFile } from '@/lib/fileUpload';
import { logSubmissionToSheets } from '@/lib/google-sheets';
import { rateLimit, RATE_LIMITS } from '@/lib/rate-limit';

/**
 * ============================================================================
 * PRELIMINARY SUBMISSION API
 * ============================================================================
 *
 * POST - Submit preliminary work via file upload (FormData)
 * DELETE - Delete preliminary submission (before deadline)
 * ============================================================================
 */

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
        { error: 'A PDF file is required' },
        { status: 400 },
      );
    }

    // Server-side file validation
    const validation = validateFileServer(file, 'preliminary');
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // Verify registration belongs to user
    const registration = await prisma.competitionRegistration.findUnique({
      where: { id: registrationId },
      include: {
        user: true,
        competition: true,
        team: {
          include: {
            members: { orderBy: { orderIndex: 'asc' } },
          },
        },
      },
    });

    if (!registration || registration.user.email !== session.user.email) {
      return NextResponse.json(
        { error: 'Registration not found' },
        { status: 404 },
      );
    }

    // Check if deadline passed
    if (new Date() > new Date(registration.competition.preliminaryDeadline)) {
      return NextResponse.json(
        { error: 'Deadline has passed' },
        { status: 400 },
      );
    }

    // Check if preliminary phase has started
    if (new Date() < new Date(registration.competition.preliminaryStart)) {
      return NextResponse.json(
        { error: 'Preliminary submission period has not started yet' },
        { status: 400 },
      );
    }

    // Check if registration is approved
    if (registration.verificationStatus !== 'approved') {
      return NextResponse.json(
        { error: 'Registration must be approved first' },
        { status: 400 },
      );
    }

    // Delete old file if re-submitting
    const existing = await prisma.preliminarySubmission.findUnique({
      where: { registrationId },
    });
    if (existing?.fileUrl) {
      await deleteFile(existing.fileUrl);
    }

    // Upload file to Supabase Storage
    const teamName = registration.team?.teamName || 'team';
    const prefix = `${competitionCode}-${teamName}`.replace(
      /[^a-zA-Z0-9-]/g,
      '_',
    );
    const uploaded = await uploadFile(file, 'preliminary', prefix);

    // Create or update preliminary submission
    const submission = await prisma.preliminarySubmission.upsert({
      where: { registrationId },
      create: {
        registrationId,
        fileUrl: uploaded.url,
        fileName: uploaded.fileName,
        fileSize: uploaded.fileSize,
        status: 'pending',
      },
      update: {
        fileUrl: uploaded.url,
        fileName: uploaded.fileName,
        fileSize: uploaded.fileSize,
        status: 'pending',
        submittedAt: new Date(),
      },
    });

    // Log to Google Sheets (non-blocking)
    try {
      await logSubmissionToSheets({
        teamName: registration.team?.teamName || 'N/A',
        leaderEmail: registration.user.email,
        competitionCode: registration.competition.code,
        submissionPhase: 'preliminary',
        fileUrl: uploaded.url,
        fileName: uploaded.fileName,
        status: 'submitted',
        reviewNotes: 'Preliminary submission received',
      });
    } catch (sheetsError) {
      console.warn(
        '⚠️ Google Sheets sync failed for preliminary:',
        sheetsError,
      );
    }

    return NextResponse.json({
      success: true,
      submission,
      message: 'Preliminary submission uploaded successfully',
    });
  } catch (error: any) {
    console.error('Preliminary submission error:', error);
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const submissionId = searchParams.get('id');

    if (!submissionId) {
      return NextResponse.json(
        { error: 'Submission ID is required' },
        { status: 400 },
      );
    }

    // Verify submission belongs to user
    const submission = await prisma.preliminarySubmission.findUnique({
      where: { id: submissionId },
      include: {
        registration: {
          include: {
            user: true,
            competition: true,
          },
        },
      },
    });

    if (
      !submission ||
      submission.registration.user.email !== session.user.email
    ) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 },
      );
    }

    // Check if deadline passed
    if (
      new Date() >
      new Date(submission.registration.competition.preliminaryDeadline)
    ) {
      return NextResponse.json(
        { error: 'Cannot delete after deadline' },
        { status: 400 },
      );
    }

    // Only allow deletion of pending submissions
    if (submission.status !== 'pending') {
      return NextResponse.json(
        { error: 'Can only delete pending submissions' },
        { status: 400 },
      );
    }

    // Delete the uploaded file
    if (submission.fileUrl) {
      await deleteFile(submission.fileUrl);
    }

    await prisma.preliminarySubmission.delete({
      where: { id: submissionId },
    });

    return NextResponse.json({
      success: true,
      message: 'Submission deleted successfully',
    });
  } catch (error: any) {
    console.error('Delete submission error:', error);
    return NextResponse.json(
      { error: 'Failed to delete submission' },
      { status: 500 },
    );
  }
}
