/**
 * ============================================================================
 * DATABASE UPDATE: Extend Competition Registration to March 16, 2026
 * ============================================================================
 *
 * Updates the LIVE database to:
 * 1. Extend registrationDeadline to 2026-03-16T23:59:59 WIB for all competitions
 * 2. Extend registration_batch_2 endDate to 2026-03-16T23:59:59 WIB
 * 3. Update registration_batch_2 label to "Extended Registration"
 * 4. Re-activate any competitions that were deactivated by the cron job
 *
 * Usage: npx tsx scripts/extend-registration-deadline.ts
 * ============================================================================
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const wib = (dateStr: string) => new Date(`${dateStr}+07:00`);

const NEW_DEADLINE = wib('2026-03-16T23:59:59');

async function main() {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('  📅 EXTEND REGISTRATION DEADLINE');
  console.log('═══════════════════════════════════════════════════════════');
  console.log(`  New deadline: ${NEW_DEADLINE.toISOString()}`);
  console.log('  Competitions: PTC, TPC, BCC');
  console.log('═══════════════════════════════════════════════════════════\n');

  // 1. Update registrationDeadline for all competitions
  console.log('📋 Step 1: Updating competition registrationDeadline...');

  const updatedComps = await prisma.competition.updateMany({
    where: {
      code: { in: ['PTC', 'TPC', 'BCC'] },
    },
    data: {
      registrationDeadline: NEW_DEADLINE,
      isActive: true, // Re-activate in case cron job deactivated them
    },
  });

  console.log(`  ✅ Updated ${updatedComps.count} competitions\n`);

  // 2. Update registration_batch_2 timeline events
  console.log('📅 Step 2: Updating registration_batch_2 timeline events...');

  // Get all competition IDs
  const competitions = await prisma.competition.findMany({
    where: { code: { in: ['PTC', 'TPC', 'BCC'] } },
    select: { id: true, code: true },
  });

  for (const comp of competitions) {
    const updated = await prisma.competitionTimeline.updateMany({
      where: {
        competitionId: comp.id,
        phase: 'registration_batch_2',
      },
      data: {
        endDate: NEW_DEADLINE,
        label: 'Extended Registration',
      },
    });
    console.log(
      `  ✅ ${comp.code}: Updated ${updated.count} timeline event(s)`,
    );
  }

  // 3. Verify the changes
  console.log('\n📊 Step 3: Verifying changes...\n');

  const verified = await prisma.competition.findMany({
    where: { code: { in: ['PTC', 'TPC', 'BCC'] } },
    select: {
      code: true,
      registrationDeadline: true,
      isActive: true,
      timelineEvents: {
        where: { phase: 'registration_batch_2' },
        select: { label: true, endDate: true },
      },
    },
    orderBy: { code: 'asc' },
  });

  for (const comp of verified) {
    const batch2 = comp.timelineEvents[0];
    console.log(`  ${comp.code}:`);
    console.log(
      `    registrationDeadline: ${comp.registrationDeadline.toISOString()}`,
    );
    console.log(`    isActive: ${comp.isActive}`);
    console.log(`    batch_2 label: ${batch2?.label}`);
    console.log(`    batch_2 endDate: ${batch2?.endDate.toISOString()}`);
    console.log();
  }

  console.log('✅ All changes applied and verified successfully!\n');

  await prisma.$disconnect();
}

main().catch(async (err) => {
  console.error('❌ Error:', err);
  await prisma.$disconnect();
  process.exit(1);
});
