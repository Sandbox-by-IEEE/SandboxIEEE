/**
 * Extends final-phase deadlines for BCC, PTC, TPC so all current
 * finalists can submit today. Re-activates the comps and pushes
 * grandFinalDate past the new deadline so the hourly phase-transition
 * cron (which deactivates comps past grand-final) doesn't undo us.
 *
 * Usage: npx tsx scripts/extend-final-deadline-all.ts
 */
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

const wib = (s: string) => new Date(`${s}+07:00`);

// Today (WIB): 2026-05-02. Open final phase through end of today.
const NEW_FINAL_DEADLINE = wib('2026-05-02T23:59:59');
const NEW_GRAND_FINAL = wib('2026-05-04T23:59:59');

async function main() {
  console.log(`\n🔧 Extending final deadlines\n`);
  console.log(`  finalDeadline → ${NEW_FINAL_DEADLINE.toISOString()}`);
  console.log(`  grandFinalDate → ${NEW_GRAND_FINAL.toISOString()}\n`);

  for (const code of ['BCC', 'PTC', 'TPC']) {
    const before = await prisma.competition.findUnique({
      where: { code },
      select: {
        finalStart: true,
        finalDeadline: true,
        grandFinalDate: true,
        isActive: true,
      },
    });
    if (!before) {
      console.warn(`  ⚠️  ${code} not found`);
      continue;
    }

    // Preserve existing finalStart if already in the past; otherwise set it
    // to today 00:00 WIB so the window is open.
    const finalStart =
      before.finalStart && before.finalStart < new Date()
        ? before.finalStart
        : wib('2026-05-02T00:00:00');

    const updated = await prisma.competition.update({
      where: { code },
      data: {
        finalStart,
        finalDeadline: NEW_FINAL_DEADLINE,
        grandFinalDate: NEW_GRAND_FINAL,
        isActive: true,
      },
    });
    console.log(`  ✅ ${code}`);
    console.log(`     finalStart:     ${updated.finalStart?.toISOString()}`);
    console.log(`     finalDeadline:  ${updated.finalDeadline?.toISOString()}`);
    console.log(
      `     grandFinalDate: ${updated.grandFinalDate?.toISOString()}`,
    );
    console.log(`     isActive:       ${updated.isActive}`);
  }

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
