/**
 * ============================================================================
 * ONE-TIME ADMIN SCRIPT: Open TPC Final Phase + Qualify Manual Semifinalists
 * ============================================================================
 *
 * 1. Sets TPC competition.finalStart = 2026-05-02 00:00 WIB
 *    and finalDeadline = 2026-05-02 23:59:59 WIB so finalists can submit today.
 *
 * 2. For 5 teams selected manually by panitia:
 *      Prime Sigma, Pilar Kehidupan, MeltingChips, BUTEN, Mahprez
 *    Ensures each has:
 *      - SemifinalSubmission { status: 'qualified' }
 *      - CompetitionRegistration { currentPhase: 'final', isSemifinalQualified: true }
 *    Idempotent: skips work already done.
 *
 * Usage: npx tsx scripts/open-tpc-final-and-qualify.ts
 * ============================================================================
 */

import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

const wib = (s: string) => new Date(`${s}+07:00`);

const TEAM_NAMES = [
  'Prime Sigma',
  'Pilar Kehidupan',
  'MeltingChips',
  'BUTEN',
  'Mahprez',
];

async function main() {
  console.log(
    '🔧 Opening TPC final phase and qualifying manual semifinalists\n',
  );

  // 1) Update TPC final dates + re-activate + push grandFinalDate past
  // the final deadline so nothing treats the comp as "completed".
  // Cron previously deactivated TPC because the old grandFinalDate
  // (2026-04-24) was already in the past.
  const tpc = await prisma.competition.update({
    where: { code: 'TPC' },
    data: {
      finalStart: wib('2026-05-02T00:00:00'),
      finalDeadline: wib('2026-05-02T23:59:59'),
      grandFinalDate: wib('2026-05-04T23:59:59'),
      isActive: true,
    },
  });
  console.log('  ✅ TPC dates updated');
  console.log(`     finalStart:     ${tpc.finalStart?.toISOString()}`);
  console.log(`     finalDeadline:  ${tpc.finalDeadline?.toISOString()}`);
  console.log(`     grandFinalDate: ${tpc.grandFinalDate?.toISOString()}`);
  console.log(`     isActive:       ${tpc.isActive}\n`);

  // 2) Qualify each team
  let qualified = 0;
  let alreadyOk = 0;
  let errored = 0;

  for (const teamName of TEAM_NAMES) {
    try {
      const team = await prisma.team.findFirst({
        where: { teamName },
        include: {
          registration: {
            include: {
              competition: true,
              semifinal: true,
            },
          },
        },
      });

      if (!team || !team.registration) {
        console.warn(`  ⚠️  [${teamName}] no registration — skipping`);
        errored++;
        continue;
      }
      if (team.registration.competition.code !== 'TPC') {
        console.warn(
          `  ⚠️  [${teamName}] not TPC (${team.registration.competition.code}) — skipping`,
        );
        errored++;
        continue;
      }

      const reg = team.registration;
      const alreadyFinal =
        reg.currentPhase === 'final' &&
        reg.isSemifinalQualified &&
        reg.semifinal?.status === 'qualified';

      if (alreadyFinal) {
        console.log(
          `  ⏭️  [${teamName}] already qualified to final — no change`,
        );
        alreadyOk++;
        continue;
      }

      await prisma.$transaction(async (tx) => {
        if (!reg.semifinal) {
          await tx.semifinalSubmission.create({
            data: {
              registrationId: reg.id,
              competitionType: 'TPC',
              status: 'qualified',
              reviewNotes:
                'Manual qualification by panitia — advanced to final round',
              reviewedAt: new Date(),
            },
          });
        } else if (reg.semifinal.status !== 'qualified') {
          await tx.semifinalSubmission.update({
            where: { id: reg.semifinal.id },
            data: {
              status: 'qualified',
              reviewNotes:
                reg.semifinal.reviewNotes ??
                'Manual qualification by panitia — advanced to final round',
              reviewedAt: new Date(),
            },
          });
        }

        await tx.competitionRegistration.update({
          where: { id: reg.id },
          data: {
            currentPhase: 'final',
            isSemifinalQualified: true,
          },
        });
      });

      console.log(`  ✅ [${teamName}] qualified to final`);
      qualified++;
    } catch (err) {
      console.error(`  ❌ [${teamName}] failed:`, err);
      errored++;
    }
  }

  console.log(
    `\nDone. qualified=${qualified} alreadyOk=${alreadyOk} errored=${errored}\n`,
  );
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
