/**
 * POST /api/admin/events/[id]/approve
 * Approve an event registration
 */

import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';

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
      include: { payment: true },
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

    // Update registration status + payment status
    await prisma.$transaction(async (tx) => {
      await tx.eventRegistration.update({
        where: { id },
        data: {
          verificationStatus: 'approved',
        },
      });

      if (registration.payment) {
        await tx.eventPayment.update({
          where: { id: registration.payment.id },
          data: {
            status: 'verified',
            verifiedAt: new Date(),
            verifiedBy: session.admin!.username,
          },
        });
      }
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
