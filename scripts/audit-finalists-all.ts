/**
 * Read-only audit: lists all registrations currently in `final` phase,
 * grouped by competition, with submission state. Helps identify finalists
 * who can't submit because of expired competition.finalDeadline.
 *
 * Usage: npx tsx scripts/audit-finalists-all.ts
 */
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  const now = new Date();
  console.log(`\n🔎 Audit at ${now.toISOString()}\n`);

  const comps = await prisma.competition.findMany({
    select: {
      id: true,
      code: true,
      name: true,
      isActive: true,
      finalStart: true,
      finalDeadline: true,
      grandFinalDate: true,
    },
    orderBy: { code: 'asc' },
  });

  for (const c of comps) {
    console.log(`=== ${c.code} ===`);
    console.log(`  isActive:       ${c.isActive}`);
    console.log(`  finalStart:     ${c.finalStart?.toISOString() ?? 'null'}`);
    console.log(
      `  finalDeadline:  ${c.finalDeadline?.toISOString() ?? 'null'}`,
    );
    console.log(
      `  grandFinalDate: ${c.grandFinalDate?.toISOString() ?? 'null'}`,
    );
    const inFinalWindow =
      c.finalStart &&
      c.finalDeadline &&
      now >= c.finalStart &&
      now <= c.finalDeadline;
    console.log(`  IN FINAL WINDOW NOW: ${inFinalWindow ? 'YES' : 'NO'}`);

    const finalists = await prisma.competitionRegistration.findMany({
      where: {
        competitionId: c.id,
        currentPhase: 'final',
        isSemifinalQualified: true,
      },
      include: {
        team: true,
        user: { select: { email: true, name: true } },
        final: true,
      },
      orderBy: { updatedAt: 'asc' },
    });

    const submitted = finalists.filter((r) => r.final);
    const pending = finalists.filter((r) => !r.final);
    console.log(
      `  Finalists: ${finalists.length} total, ${submitted.length} submitted, ${pending.length} pending`,
    );
    if (pending.length > 0) {
      console.log(`  Pending submissions:`);
      for (const r of pending) {
        const team = r.team?.teamName ?? '(no team)';
        console.log(`    - "${team}" | ${r.user.email}`);
      }
    }
    console.log();
  }

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
