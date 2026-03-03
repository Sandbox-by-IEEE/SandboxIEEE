/**
 * POST /api/admin/events/[id]/reject
 * Reject an event registration
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';

const rejectSchema = z.object({
  reason: z
    .string()
    .min(3, 'Reason must be at least 3 characters')
    .max(500, 'Reason must be at most 500 characters'),
});

export async function POST(
  request: NextRequest,
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
    const body = await request.json();
    const result = rejectSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 },
      );
    }

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

    if (registration.verificationStatus !== 'pending') {
      return NextResponse.json(
        { error: 'Registration has already been processed' },
        { status: 400 },
      );
    }

    // Update registration status
    await prisma.$transaction(async (tx) => {
      await tx.eventRegistration.update({
        where: { id },
        data: {
          verificationStatus: 'rejected',
          rejectionReason: result.data.reason,
        },
      });

      if (registration.payment) {
        await tx.eventPayment.update({
          where: { id: registration.payment.id },
          data: {
            status: 'rejected',
            verifiedAt: new Date(),
            verifiedBy: session.admin!.username,
            verificationNotes: result.data.reason,
          },
        });
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Event registration rejected',
    });
  } catch (err) {
    console.error('❌ Event reject error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal server error' },
      { status: 500 },
    );
  }
}
