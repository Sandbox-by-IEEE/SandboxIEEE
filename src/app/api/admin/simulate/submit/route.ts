import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { getFileUrl } from '@/lib/fileUpload';

const SIM_MARKER = '__SIM__';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.admin || session.admin.role !== 'super_admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await req.json();
    const { registrationId, competitionCode, files, urls } = body;

    if (!registrationId || !competitionCode) {
      return NextResponse.json(
        { error: 'registrationId and competitionCode are required' },
        { status: 400 },
      );
    }

    // Verify registration is a simulation record
    const registration = await prisma.competitionRegistration.findUnique({
      where: { id: registrationId },
      include: { team: true, competition: true },
    });

    if (!registration) {
      return NextResponse.json(
        { error: 'Registration not found' },
        { status: 404 },
      );
    }

    if (!registration.team?.teamName.startsWith(SIM_MARKER)) {
      return NextResponse.json(
        { error: 'This endpoint is only for simulation records' },
        { status: 403 },
      );
    }

    // Delete any existing simulation submission (allow re-submit)
    const existing = await prisma.semifinalSubmission.findUnique({
      where: { registrationId },
    });
    if (existing) {
      await prisma.semifinalSubmission.delete({ where: { registrationId } });
    }

    // Resolve storage paths → signed read URLs (no deadline/phase checks)
    const submissionData: any = {
      registrationId,
      competitionType: competitionCode as 'PTC' | 'TPC' | 'BCC',
    };

    if (files) {
      for (const [key, storagePath] of Object.entries(files)) {
        if (storagePath && typeof storagePath === 'string') {
          submissionData[key] = await getFileUrl('semifinal', storagePath);
        }
      }
    }
    if (urls) {
      for (const [key, url] of Object.entries(urls)) {
        if (url && typeof url === 'string') {
          submissionData[key] = url;
        }
      }
    }

    const submission = await prisma.semifinalSubmission.create({
      data: submissionData,
    });

    return NextResponse.json({
      success: true,
      submission,
      message: 'Simulation submission created',
    });
  } catch (error) {
    console.error('[Simulate/submit] error:', error);
    return NextResponse.json(
      { error: 'Failed to submit simulation' },
      { status: 500 },
    );
  }
}
