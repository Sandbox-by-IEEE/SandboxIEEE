/**
 * POST /api/admin/events/[id]/approve
 * Approve an event registration
 * NOTE: With free registration, new registrations are auto-approved.
 * This endpoint remains for backward compatibility with legacy pending registrations.
 */

import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { EVENT_DISCOUNT } from '@/lib/discount-config';
import { sendEventApprovalEmail } from '@/lib/email';

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();

  if (!session?.admin) {
    return NextResponse.json(
      { error: 'Admin authentication required' },
      { status: 401 },
    );
  }

  if (!['super_admin', 'event_admin'].includes(session.admin.role)) {
    return NextResponse.json(
      { error: 'Insufficient permissions' },
      { status: 403 },
    );
  }

  const { id } = await params;

  try {
    const registration = await prisma.eventRegistration.findUnique({
      where: { id },
    });

    if (!registration) {
      return NextResponse.json(
        { error: 'Registration not found' },
        { status: 404 },
      );
    }

    if (registration.verificationStatus === 'approved') {
      return NextResponse.json(
        { error: 'Registration is already approved' },
        { status: 400 },
      );
    }

    // Update registration status
    await prisma.eventRegistration.update({
      where: { id },
      data: {
        verificationStatus: 'approved',
      },
    });

    // Send approval email with discount info (non-blocking)
    const eventName =
      registration.eventCode === 'yif-x-grand-seminar'
        ? 'YIF x Grand Seminar'
        : registration.eventCode;

    sendEventApprovalEmail(
      registration.email,
      registration.fullName,
      eventName,
      EVENT_DISCOUNT.label,
      EVENT_DISCOUNT.description,
    ).catch((emailErr) => {
      console.error('⚠️ Event approval email failed (non-blocking):', emailErr);
    });

    return NextResponse.json({
      success: true,
      message: 'Event registration approved',
    });
  } catch (err) {
    console.error('❌ Event approve error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal server error' },
      { status: 500 },
    );
  }
}
