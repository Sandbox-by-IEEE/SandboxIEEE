/**
 * Read-only e2e check: simulates the final-submission POST gate for each
 * of the 5 manually-qualified TPC teams without writing to DB.
 * Mirrors the validation in src/app/api/dashboard/submissions/final/route.ts.
 *
 * Usage: npx tsx scripts/test-tpc-final-e2e.ts
 */
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

const TEAM_NAMES = [
  'Prime Sigma',
  'Pilar Kehidupan',
  'MeltingChips',
  'BUTEN',
  'Mahprez',
];

async function main() {
  const now = new Date();
  console.log(`\n🧪 Simulating final POST gate at ${now.toISOString()}\n`);

  let pass = 0;
  let fail = 0;

  for (const teamName of TEAM_NAMES) {
    const team = await prisma.team.findFirst({
      where: { teamName },
      include: {
        registration: {
          include: {
            competition: true,
            semifinal: true,
            final: true,
            user: { select: { email: true } },
          },
        },
      },
    });

    if (!team || !team.registration) {
      console.log(`❌ [${teamName}] no registration`);
      fail++;
      continue;
    }

    const reg = team.registration;
    const errors: string[] = [];

    if (reg.currentPhase !== 'final') {
      errors.push(`currentPhase=${reg.currentPhase} (expected 'final')`);
    }
    if (!reg.isSemifinalQualified) {
      errors.push('isSemifinalQualified=false');
    }
    if (
      reg.competition.finalDeadline &&
      now > new Date(reg.competition.finalDeadline)
    ) {
      errors.push(
        `deadline passed (${reg.competition.finalDeadline.toISOString()})`,
      );
    }
    if (
      reg.competition.finalStart &&
      now < new Date(reg.competition.finalStart)
    ) {
      errors.push(
        `not started yet (${reg.competition.finalStart.toISOString()})`,
      );
    }
    if (reg.final) {
      errors.push(`final submission already exists (id=${reg.final.id})`);
    }

    if (errors.length === 0) {
      console.log(`✅ [${teamName}] CAN SUBMIT (${reg.user.email})`);
      pass++;
    } else {
      console.log(`❌ [${teamName}] BLOCKED: ${errors.join('; ')}`);
      fail++;
    }
  }

  console.log(
    `\nResult: ${pass}/${TEAM_NAMES.length} can submit, ${fail} blocked\n`,
  );
  await prisma.$disconnect();
  if (fail > 0) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
