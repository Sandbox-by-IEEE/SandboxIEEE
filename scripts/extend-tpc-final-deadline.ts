/**
 * Extends TPC final deadline to 2026-05-05 23:59:59 WIB.
 * Pushes grandFinalDate past the new deadline so the cron doesn't
 * deactivate the comp before then.
 *
 * Usage: npx tsx scripts/extend-tpc-final-deadline.ts
 */
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

const wib = (s: string) => new Date(`${s}+07:00`);

async function main() {
  const finalDeadline = wib('2026-05-05T23:59:59');
  const grandFinalDate = wib('2026-05-07T23:59:59');

  const updated = await prisma.competition.update({
    where: { code: 'TPC' },
    data: {
      finalDeadline,
      grandFinalDate,
      isActive: true,
    },
  });

  console.log('✅ TPC updated');
  console.log(`   finalStart:     ${updated.finalStart?.toISOString()}`);
  console.log(`   finalDeadline:  ${updated.finalDeadline?.toISOString()}`);
  console.log(`   grandFinalDate: ${updated.grandFinalDate?.toISOString()}`);
  console.log(`   isActive:       ${updated.isActive}`);

  // Sanity check the gate now and at the deadline.
  const now = new Date();
  const inWindowNow =
    updated.finalStart! <= now && now <= updated.finalDeadline!;
  const inWindowAtDeadline =
    updated.finalStart! <= updated.finalDeadline! &&
    updated.finalDeadline! <= updated.finalDeadline!;
  console.log(`\n   gate now:           open=${inWindowNow}`);
  console.log(`   gate at deadline:   open=${inWindowAtDeadline}`);

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
