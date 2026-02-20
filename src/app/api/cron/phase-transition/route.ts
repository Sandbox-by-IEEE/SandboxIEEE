/**
 * ============================================================================
 * CRON JOB: PHASE TRANSITION CHECK
 * ============================================================================
 *
 * GET /api/cron/phase-transition
 *
 * Runs on a schedule (every hour) via Vercel Cron to:
 * 1. Check if any competition's phase window has ended
 * 2. Deactivate competitions past their grand final date
 * 3. Log phase transition events
 *
 * Security: Vercel Cron sends CRON_SECRET in Authorization header.
 * ============================================================================
 */

import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  // Verify cron secret (Vercel sets this automatically for cron jobs)
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const now = new Date();
    const results: string[] = [];

    // Fetch all active competitions
    const competitions = await prisma.competition.findMany({
      where: { isActive: true },
    });

    for (const comp of competitions) {
      // Check if competition is past grand final — deactivate
      if (comp.grandFinalDate && now > new Date(comp.grandFinalDate)) {
        await prisma.competition.update({
          where: { id: comp.id },
          data: { isActive: false },
        });
        results.push(`${comp.code}: Deactivated (past grand final)`);
        continue;
      }

      // Check if registration period has ended — mark registrations as closed
      // (The isRegistrationOpen check in phase-utils handles this in real-time,
      //  but we log it here for audit purposes)
      const regClosed = now > new Date(comp.registrationDeadline);
      if (regClosed) {
        results.push(`${comp.code}: Registration closed`);
      }

      // Log current phase window
      const prelimOpen =
        now >= new Date(comp.preliminaryStart) &&
        now <= new Date(comp.preliminaryDeadline);
      const semiOpen =
        now >= new Date(comp.semifinalStart) &&
        now <= new Date(comp.semifinalDeadline);
      const finalOpen =
        comp.finalStart &&
        comp.finalDeadline &&
        now >= new Date(comp.finalStart) &&
        now <= new Date(comp.finalDeadline);

      if (finalOpen) {
        results.push(`${comp.code}: Final phase active`);
      } else if (semiOpen) {
        results.push(`${comp.code}: Semifinal phase active`);
      } else if (prelimOpen) {
        results.push(`${comp.code}: Preliminary phase active`);
      } else if (!regClosed) {
        results.push(`${comp.code}: Registration open`);
      } else {
        results.push(`${comp.code}: Between phases`);
      }
    }

    return NextResponse.json({
      success: true,
      timestamp: now.toISOString(),
      competitionsChecked: competitions.length,
      results,
    });
  } catch (error) {
    console.error('Cron job failed:', error);
    return NextResponse.json(
      { error: 'Cron job failed', details: String(error) },
      { status: 500 },
    );
  }
}
