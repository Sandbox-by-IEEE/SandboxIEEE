/**
 * ============================================================================
 * SEMIFINAL SUBMISSION API
 * ============================================================================
 *
 * POST - Submit semifinal materials (competition-specific fields)
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
    const registrationId = formData.get('registrationId') as string;
    const competitionCode = formData.get('competitionCode') as string;

    if (!registrationId) {
      return NextResponse.json(
        { error: 'Registration ID is required' },
        { status: 400 },
      );
    }

    // Verify registration belongs to user and is in semifinal phase
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

    if (registration.currentPhase !== 'semifinal') {
      return NextResponse.json(
        { error: 'You are not in the semifinal phase' },
        { status: 400 },
      );
    }

    if (!registration.isPreliminaryQualified) {
      return NextResponse.json(
        { error: 'You must pass the preliminary phase first' },
        { status: 400 },
      );
    }

    // Check deadline
    if (new Date() > new Date(registration.competition.semifinalDeadline)) {
      return NextResponse.json(
        { error: 'Semifinal deadline has passed' },
        { status: 400 },
      );
    }

    // Check if semifinal phase has started
    if (new Date() < new Date(registration.competition.semifinalStart)) {
      return NextResponse.json(
        { error: 'Semifinal submission period has not started yet' },
        { status: 400 },
      );
    }

    // Check if already submitted
    const existing = await prisma.semifinalSubmission.findUnique({
      where: { registrationId },
    });
    if (existing) {
      return NextResponse.json(
        { error: 'Semifinal submission already exists' },
        { status: 409 },
      );
    }

    const teamName = registration.team?.teamName || 'team';
    const prefix = `${competitionCode}-semifinal-${teamName}`.replace(
      /[^a-zA-Z0-9-]/g,
      '_',
    );

    // Build submission data based on competition type
    const submissionData: any = {
      registrationId,
      competitionType: competitionCode as 'PTC' | 'TPC' | 'BCC',
    };

    // Handle file uploads for each competition type
    if (competitionCode === 'PTC') {
      const proposalFile = formData.get('proposalUrl') as File | null;
      const prototypeVideoUrl = formData.get('prototypeVideoUrl') as
        | string
        | null;

      if (!proposalFile && !prototypeVideoUrl) {
        return NextResponse.json(
          { error: 'Proposal document and prototype video URL are required' },
          { status: 400 },
        );
      }

      if (proposalFile instanceof File) {
        const validation = validateFileServer(proposalFile, 'semifinal');
        if (!validation.valid) {
          return NextResponse.json(
            { error: validation.error },
            { status: 400 },
          );
        }
        const uploaded = await uploadFile(
          proposalFile,
          'semifinal',
          `${prefix}-proposal`,
        );
        submissionData.proposalUrl = uploaded.url;
      }

      if (prototypeVideoUrl) {
        submissionData.prototypeVideoUrl = prototypeVideoUrl;
      }
    } else if (competitionCode === 'TPC') {
      const paperFile = formData.get('paperUrl') as File | null;
      const presentationFile = formData.get('presentationUrl') as File | null;

      if (paperFile instanceof File) {
        const validation = validateFileServer(paperFile, 'semifinal');
        if (!validation.valid) {
          return NextResponse.json(
            { error: validation.error },
            { status: 400 },
          );
        }
        const uploaded = await uploadFile(
          paperFile,
          'semifinal',
          `${prefix}-paper`,
        );
        submissionData.paperUrl = uploaded.url;
      }

      if (presentationFile instanceof File) {
        const validation = validateFileServer(presentationFile, 'semifinal');
        if (!validation.valid) {
          return NextResponse.json(
            { error: validation.error },
            { status: 400 },
          );
        }
        const uploaded = await uploadFile(
          presentationFile,
          'semifinal',
          `${prefix}-presentation`,
        );
        submissionData.presentationUrl = uploaded.url;
      }
    } else if (competitionCode === 'BCC') {
      const businessPlanFile = formData.get('businessPlanUrl') as File | null;
      const pitchDeckFile = formData.get('pitchDeckUrl') as File | null;

      if (businessPlanFile instanceof File) {
        const validation = validateFileServer(businessPlanFile, 'semifinal');
        if (!validation.valid) {
          return NextResponse.json(
            { error: validation.error },
            { status: 400 },
          );
        }
        const uploaded = await uploadFile(
          businessPlanFile,
          'semifinal',
          `${prefix}-businessplan`,
        );
        submissionData.businessPlanUrl = uploaded.url;
      }

      if (pitchDeckFile instanceof File) {
        const validation = validateFileServer(pitchDeckFile, 'semifinal');
        if (!validation.valid) {
          return NextResponse.json(
            { error: validation.error },
            { status: 400 },
          );
        }
        const uploaded = await uploadFile(
          pitchDeckFile,
          'semifinal',
          `${prefix}-pitchdeck`,
        );
        submissionData.pitchDeckUrl = uploaded.url;
      }
    }

    // Create semifinal submission
    const submission = await prisma.semifinalSubmission.create({
      data: submissionData,
    });

    // Log to Google Sheets (non-blocking)
    try {
      // Collect all uploaded file URLs for logging
      const fileUrls = [
        submissionData.proposalUrl,
        submissionData.prototypeVideoUrl,
        submissionData.paperUrl,
        submissionData.presentationUrl,
        submissionData.businessPlanUrl,
        submissionData.pitchDeckUrl,
      ]
        .filter(Boolean)
        .join(', ');

      await logSubmissionToSheets({
        teamName: registration.team?.teamName || 'N/A',
        leaderEmail: registration.user.email,
        competitionCode,
        submissionPhase: 'semifinal',
        fileUrl: fileUrls || undefined,
        status: 'submitted',
        reviewNotes: `Semifinal submission received (${competitionCode})`,
      });
    } catch (sheetsError) {
      console.warn('⚠️ Google Sheets sync failed for semifinal:', sheetsError);
    }

    return NextResponse.json({
      success: true,
      submission,
      message: 'Semifinal submission uploaded successfully',
    });
  } catch (error: any) {
    console.error('Semifinal submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit semifinal' },
      { status: 500 },
    );
  }
}
