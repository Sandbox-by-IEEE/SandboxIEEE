/**
 * ============================================================================
 * ONE-TIME ADMIN SCRIPT: Manual BCC Semifinal Submission Insertion
 * ============================================================================
 *
 * Purpose: Create placeholder SemifinalSubmission records for BCC teams that
 * submitted semifinal work manually to panitia (website submission failed).
 *
 * This makes them appear on the admin semifinal dashboard so admins can
 * approve/reject them into the final phase.
 *
 * Idempotent: skips teams that already have a semifinal submission.
 *
 * Usage: npx tsx scripts/insert-bcc-manual-semifinals.ts
 * ============================================================================
 */

import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

const TEAM_EMAILS = [
  'zahraffaiza@gmail.com',
  'jocelynz.adelina24@gmail.com',
  'msulthandaryk@gmail.com',
  'mssyarif600@gmail.com',
  'mohammadedi512@gmail.com',
];

async function main() {
  console.log('🔎 Inserting manual BCC semifinal submissions...\n');

  let created = 0;
  let skipped = 0;
  let errored = 0;

  for (const email of TEAM_EMAILS) {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
        include: {
          registration: {
            include: {
              team: true,
              competition: true,
              semifinal: true,
            },
          },
        },
      });

      if (!user) {
        console.warn(`  ⚠️  [${email}] user not found — skipping`);
        errored++;
        continue;
      }
      if (!user.registration) {
        console.warn(`  ⚠️  [${email}] no registration — skipping`);
        errored++;
        continue;
      }
      if (user.registration.competition.code !== 'BCC') {
        console.warn(
          `  ⚠️  [${email}] not BCC (${user.registration.competition.code}) — skipping`,
        );
        errored++;
        continue;
      }

      const teamName = user.registration.team?.teamName ?? '(no team)';

      if (user.registration.semifinal) {
        console.log(
          `  ⏭️  [${email}] team "${teamName}" already has semifinal (${user.registration.semifinal.status}) — skipped`,
        );
        skipped++;
        continue;
      }

      await prisma.semifinalSubmission.create({
        data: {
          registrationId: user.registration.id,
          competitionType: 'BCC',
          businessPlanUrl: null,
          pitchDeckUrl: null,
          status: 'pending',
          reviewNotes:
            'Submitted manually to panitia (website submission failed)',
        },
      });

      console.log(
        `  ✅ [${email}] team "${teamName}" — pending semifinal submission created`,
      );
      created++;
    } catch (err) {
      console.error(`  ❌ [${email}] failed:`, err);
      errored++;
    }
  }

  console.log(
    `\nDone. created=${created} skipped=${skipped} errored=${errored}\n`,
  );
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
