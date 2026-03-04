/**
 * ============================================================================
 * CHECK DISCOUNT ELIGIBILITY API
 * ============================================================================
 *
 * GET /api/competitions/check-discount
 *
 * Returns whether the authenticated user is eligible for an event-based
 * discount on competition registration. Eligibility requires an approved
 * EventRegistration for a qualifying event code.
 * ============================================================================
 */

import { NextResponse } from 'next/server';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { EVENT_DISCOUNT } from '@/lib/discount-config';

export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json(
      { eligible: false, reason: 'Not authenticated' },
      { status: 200 },
    );
  }

  try {
    // Check if user has an approved event registration for any qualifying event
    const approvedEventReg = await prisma.eventRegistration.findFirst({
      where: {
        email: session.user.email,
        eventCode: { in: EVENT_DISCOUNT.qualifyingEventCodes },
        verificationStatus: 'approved',
      },
      select: {
        id: true,
        eventCode: true,
        fullName: true,
      },
    });

    if (!approvedEventReg) {
      return NextResponse.json({
        eligible: false,
        reason: 'No approved event registration found',
      });
    }

    return NextResponse.json({
      eligible: true,
      discount: {
        label: EVENT_DISCOUNT.label,
        description: EVENT_DISCOUNT.description,
        type: 'early_price_parity',
      },
      eventCode: approvedEventReg.eventCode,
    });
  } catch (err) {
    console.error('❌ Check discount error:', err);
    return NextResponse.json(
      { eligible: false, reason: 'Internal error' },
      { status: 200 },
    );
  }
}
