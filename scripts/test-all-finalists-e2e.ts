/**
 * Read-only e2e: simulates the final-submission POST gate for every
 * registration currently in `final` phase across all 3 competitions.
 * Mirrors src/app/api/dashboard/submissions/final/route.ts validation.
 *
 * Usage: npx tsx scripts/test-all-finalists-e2e.ts
 */
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  const now = new Date();
  console.log(`\n🧪 Final-gate sim at ${now.toISOString()}\n`);

  const finalists = await prisma.competitionRegistration.findMany({
    where: { currentPhase: 'final' },
    include: {
      competition: true,
      team: true,
      user: { select: { email: true } },
      semifinal: true,
      final: true,
    },
    orderBy: [{ competitionId: 'asc' }, { updatedAt: 'asc' }],
  });

  let pass = 0;
  let fail = 0;
  let alreadySubmitted = 0;
  const blockers: string[] = [];

  for (const r of finalists) {
    const team = r.team?.teamName ?? '(no team)';
    const code = r.competition.code;
    const errors: string[] = [];

    if (!r.isSemifinalQualified) errors.push('not isSemifinalQualified');
    if (
      r.competition.finalDeadline &&
      now > new Date(r.competition.finalDeadline)
    ) {
      errors.push('past finalDeadline');
    }
    if (r.competition.finalStart && now < new Date(r.competition.finalStart)) {
      errors.push('before finalStart');
    }

    if (r.final) {
      console.log(`📦 [${code}] ${team} — already submitted`);
      alreadySubmitted++;
      continue;
    }

    if (errors.length === 0) {
      console.log(`✅ [${code}] ${team} (${r.user.email})`);
      pass++;
    } else {
      console.log(`❌ [${code}] ${team}: ${errors.join('; ')}`);
      blockers.push(`${code} ${team}: ${errors.join('; ')}`);
      fail++;
    }
  }

  console.log(
    `\nResult: ${pass} can submit, ${alreadySubmitted} already submitted, ${fail} blocked\n`,
  );
  if (blockers.length) {
    console.log('Blockers:');
    blockers.forEach((b) => console.log(`  - ${b}`));
  }

  await prisma.$disconnect();
  if (fail > 0) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
