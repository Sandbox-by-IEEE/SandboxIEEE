/**
 * ============================================================================
 * TIMELINE UPDATE SCRIPT — March 2026
 * ============================================================================
 *
 * Updates competition dates and timeline events for all three competitions
 * to match the updated 2026 schedule. Safe to run on production.
 *
 * Changes:
 *   PTC: preliminaryDeadline → Mar 18, semifinal → Mar 23-30, final → Apr 4-24
 *   TPC: preliminaryDeadline → Mar 19, semifinal → Mar 24 – Apr 11
 *   BCC: preliminaryDeadline → Mar 19, semifinal → Mar 24 – Apr 4, final → Apr 16-22
 *
 * Usage:
 *   npx tsx scripts/update-timeline-2026-03.ts
 * ============================================================================
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// All dates in WIB (UTC+7) — Jakarta timezone
const wib = (dateStr: string) => new Date(`${dateStr}+07:00`);

async function main() {
  console.log('🔄 Starting timeline update...\n');

  // ============================================================================
  // 1. Update Competition Date Fields
  // ============================================================================
  console.log('📋 Step 1: Updating competition date fields...\n');

  // --- PTC ---
  const ptcUpdate = await prisma.competition.update({
    where: { code: 'PTC' },
    data: {
      preliminaryDeadline: wib('2026-03-18T23:59:59'),
      semifinalStart: wib('2026-03-23T00:00:00'),
      semifinalDeadline: wib('2026-03-30T23:59:59'),
      finalStart: wib('2026-04-04T00:00:00'),
      finalDeadline: wib('2026-04-24T23:59:59'),
    },
  });
  console.log(`  ✅ PTC updated: ${ptcUpdate.name}`);
  console.log(
    `     preliminaryDeadline: ${ptcUpdate.preliminaryDeadline.toISOString()}`,
  );
  console.log(`     semifinalStart: ${ptcUpdate.semifinalStart.toISOString()}`);
  console.log(
    `     semifinalDeadline: ${ptcUpdate.semifinalDeadline.toISOString()}`,
  );
  console.log(`     finalStart: ${ptcUpdate.finalStart?.toISOString()}`);
  console.log(`     finalDeadline: ${ptcUpdate.finalDeadline?.toISOString()}`);

  // --- TPC ---
  const tpcUpdate = await prisma.competition.update({
    where: { code: 'TPC' },
    data: {
      preliminaryDeadline: wib('2026-03-19T23:59:59'),
      semifinalStart: wib('2026-03-24T00:00:00'),
      semifinalDeadline: wib('2026-04-11T23:59:59'),
    },
  });
  console.log(`  ✅ TPC updated: ${tpcUpdate.name}`);
  console.log(
    `     preliminaryDeadline: ${tpcUpdate.preliminaryDeadline.toISOString()}`,
  );
  console.log(`     semifinalStart: ${tpcUpdate.semifinalStart.toISOString()}`);
  console.log(
    `     semifinalDeadline: ${tpcUpdate.semifinalDeadline.toISOString()}`,
  );

  // --- BCC ---
  const bccUpdate = await prisma.competition.update({
    where: { code: 'BCC' },
    data: {
      preliminaryDeadline: wib('2026-03-19T23:59:59'),
      semifinalStart: wib('2026-03-24T00:00:00'),
      semifinalDeadline: wib('2026-04-04T23:59:59'),
      finalStart: wib('2026-04-16T00:00:00'),
      finalDeadline: wib('2026-04-22T23:59:59'),
    },
  });
  console.log(`  ✅ BCC updated: ${bccUpdate.name}`);
  console.log(
    `     preliminaryDeadline: ${bccUpdate.preliminaryDeadline.toISOString()}`,
  );
  console.log(`     semifinalStart: ${bccUpdate.semifinalStart.toISOString()}`);
  console.log(
    `     semifinalDeadline: ${bccUpdate.semifinalDeadline.toISOString()}`,
  );
  console.log(`     finalStart: ${bccUpdate.finalStart?.toISOString()}`);
  console.log(`     finalDeadline: ${bccUpdate.finalDeadline?.toISOString()}`);

  // ============================================================================
  // 2. Update Timeline Events
  // ============================================================================
  console.log('\n📅 Step 2: Updating timeline events...\n');

  // Delete all existing timeline events and recreate
  const competitions = await prisma.competition.findMany({
    where: { code: { in: ['PTC', 'TPC', 'BCC'] } },
    select: { id: true, code: true },
  });

  const compMap: Record<string, string> = {};
  for (const c of competitions) {
    compMap[c.code] = c.id;
  }

  // Clear existing timeline events
  const deleted = await prisma.competitionTimeline.deleteMany({
    where: { competitionId: { in: Object.values(compMap) } },
  });
  console.log(`  🗑️  Deleted ${deleted.count} existing timeline events`);

  // --- PTC Timeline ---
  const ptcTimeline = [
    {
      phase: 'registration_batch_1',
      label: 'Open Registration Batch 1',
      startDate: '2026-02-22T00:00:00',
      endDate: '2026-02-28T23:59:59',
      sortOrder: 1,
      phaseType: 'registration',
    },
    {
      phase: 'registration_batch_2',
      label: 'Late Registration',
      startDate: '2026-03-10T00:00:00',
      endDate: '2026-03-16T23:59:59',
      sortOrder: 2,
      phaseType: 'registration',
    },
    {
      phase: 'preliminary',
      label: 'Abstract Submission',
      startDate: '2026-02-23T00:00:00',
      endDate: '2026-03-18T23:59:59',
      sortOrder: 3,
      phaseType: 'submission',
    },
    {
      phase: 'semifinalist_announcement',
      label: 'Semifinalist Announcement',
      startDate: '2026-03-22T00:00:00',
      endDate: '2026-03-22T23:59:59',
      sortOrder: 4,
      phaseType: 'announcement',
    },
    {
      phase: 'semifinal',
      label: 'Semifinal Phase',
      startDate: '2026-03-23T00:00:00',
      endDate: '2026-03-30T23:59:59',
      sortOrder: 5,
      phaseType: 'submission',
    },
    {
      phase: 'finalist_announcement',
      label: 'Finalist Announcement',
      startDate: '2026-04-03T00:00:00',
      endDate: '2026-04-03T23:59:59',
      sortOrder: 6,
      phaseType: 'announcement',
    },
    {
      phase: 'final',
      label: 'Final Phase',
      startDate: '2026-04-04T00:00:00',
      endDate: '2026-04-24T23:59:59',
      sortOrder: 7,
      phaseType: 'submission',
    },
    {
      phase: 'grand_final',
      label: 'Grand Final and Awarding',
      startDate: '2026-04-25T00:00:00',
      endDate: '2026-04-25T23:59:59',
      sortOrder: 8,
      phaseType: 'event',
    },
  ];

  for (const event of ptcTimeline) {
    await prisma.competitionTimeline.create({
      data: {
        competitionId: compMap['PTC'],
        phase: event.phase,
        label: event.label,
        startDate: wib(event.startDate),
        endDate: wib(event.endDate),
        sortOrder: event.sortOrder,
        phaseType: event.phaseType,
      },
    });
  }
  console.log(`  ✅ PTC: ${ptcTimeline.length} timeline events created`);

  // --- TPC Timeline ---
  const tpcTimeline = [
    {
      phase: 'registration_batch_1',
      label: 'Open Registration Batch 1',
      startDate: '2026-02-22T00:00:00',
      endDate: '2026-02-28T23:59:59',
      sortOrder: 1,
      phaseType: 'registration',
    },
    {
      phase: 'registration_batch_2',
      label: 'Late Registration',
      startDate: '2026-03-10T00:00:00',
      endDate: '2026-03-16T23:59:59',
      sortOrder: 2,
      phaseType: 'registration',
    },
    {
      phase: 'preliminary',
      label: 'Preliminary Abstract Submission',
      startDate: '2026-02-23T00:00:00',
      endDate: '2026-03-19T23:59:59',
      sortOrder: 3,
      phaseType: 'submission',
    },
    {
      phase: 'semifinalist_announcement',
      label: 'Semifinalist Announcement',
      startDate: '2026-03-23T00:00:00',
      endDate: '2026-03-23T23:59:59',
      sortOrder: 4,
      phaseType: 'announcement',
    },
    {
      phase: 'semifinal',
      label: 'Semifinal Phase',
      startDate: '2026-03-24T00:00:00',
      endDate: '2026-04-11T23:59:59',
      sortOrder: 5,
      phaseType: 'submission',
    },
    {
      phase: 'finalist_announcement',
      label: 'Finalist Announcement',
      startDate: '2026-04-16T00:00:00',
      endDate: '2026-04-16T23:59:59',
      sortOrder: 6,
      phaseType: 'announcement',
    },
    {
      phase: 'coaching',
      label: 'Coaching',
      startDate: '2026-04-18T00:00:00',
      endDate: '2026-04-18T23:59:59',
      sortOrder: 7,
      phaseType: 'event',
    },
    {
      phase: 'grand_final',
      label: 'Grand Final',
      startDate: '2026-04-25T00:00:00',
      endDate: '2026-04-25T23:59:59',
      sortOrder: 8,
      phaseType: 'event',
    },
  ];

  for (const event of tpcTimeline) {
    await prisma.competitionTimeline.create({
      data: {
        competitionId: compMap['TPC'],
        phase: event.phase,
        label: event.label,
        startDate: wib(event.startDate),
        endDate: wib(event.endDate),
        sortOrder: event.sortOrder,
        phaseType: event.phaseType,
      },
    });
  }
  console.log(`  ✅ TPC: ${tpcTimeline.length} timeline events created`);

  // --- BCC Timeline ---
  const bccTimeline = [
    {
      phase: 'registration_batch_1',
      label: 'Open Registration Batch 1',
      startDate: '2026-02-22T00:00:00',
      endDate: '2026-02-28T23:59:59',
      sortOrder: 1,
      phaseType: 'registration',
    },
    {
      phase: 'registration_batch_2',
      label: 'Late Registration',
      startDate: '2026-03-10T00:00:00',
      endDate: '2026-03-16T23:59:59',
      sortOrder: 2,
      phaseType: 'registration',
    },
    {
      phase: 'preliminary',
      label: 'Preliminary Abstract Submission',
      startDate: '2026-02-23T00:00:00',
      endDate: '2026-03-19T23:59:59',
      sortOrder: 3,
      phaseType: 'submission',
    },
    {
      phase: 'semifinalist_announcement',
      label: 'Semifinalist Announcement',
      startDate: '2026-03-23T00:00:00',
      endDate: '2026-03-23T23:59:59',
      sortOrder: 4,
      phaseType: 'announcement',
    },
    {
      phase: 'semifinal',
      label: 'Semifinal Phase',
      startDate: '2026-03-24T00:00:00',
      endDate: '2026-04-04T23:59:59',
      sortOrder: 5,
      phaseType: 'submission',
    },
    {
      phase: 'coaching',
      label: 'Coaching',
      startDate: '2026-03-27T00:00:00',
      endDate: '2026-03-27T23:59:59',
      sortOrder: 6,
      phaseType: 'event',
    },
    {
      phase: 'finalist_announcement',
      label: 'Finalist Announcement',
      startDate: '2026-04-15T00:00:00',
      endDate: '2026-04-15T23:59:59',
      sortOrder: 7,
      phaseType: 'announcement',
    },
    {
      phase: 'mentoring',
      label: 'Mentoring Session',
      startDate: '2026-04-16T00:00:00',
      endDate: '2026-04-19T23:59:59',
      sortOrder: 8,
      phaseType: 'event',
    },
    {
      phase: 'final',
      label: 'Final Phase',
      startDate: '2026-04-16T00:00:00',
      endDate: '2026-04-22T23:59:59',
      sortOrder: 9,
      phaseType: 'submission',
    },
    {
      phase: 'pitch_deck_submission',
      label: 'Pitch Deck Submission',
      startDate: '2026-04-22T00:00:00',
      endDate: '2026-04-22T23:59:59',
      sortOrder: 10,
      phaseType: 'submission',
    },
    {
      phase: 'technical_meeting',
      label: 'Technical Meeting',
      startDate: '2026-04-23T00:00:00',
      endDate: '2026-04-23T23:59:59',
      sortOrder: 11,
      phaseType: 'event',
    },
    {
      phase: 'grand_final',
      label: 'Grand Final and Awarding',
      startDate: '2026-04-25T00:00:00',
      endDate: '2026-04-25T23:59:59',
      sortOrder: 12,
      phaseType: 'event',
    },
  ];

  for (const event of bccTimeline) {
    await prisma.competitionTimeline.create({
      data: {
        competitionId: compMap['BCC'],
        phase: event.phase,
        label: event.label,
        startDate: wib(event.startDate),
        endDate: wib(event.endDate),
        sortOrder: event.sortOrder,
        phaseType: event.phaseType,
      },
    });
  }
  console.log(`  ✅ BCC: ${bccTimeline.length} timeline events created`);

  // ============================================================================
  // 3. Verification
  // ============================================================================
  console.log('\n📊 Step 3: Verifying changes...\n');

  const verified = await prisma.competition.findMany({
    where: { code: { in: ['PTC', 'TPC', 'BCC'] } },
    select: {
      code: true,
      preliminaryDeadline: true,
      semifinalStart: true,
      semifinalDeadline: true,
      finalStart: true,
      finalDeadline: true,
      grandFinalDate: true,
      timelineEvents: {
        orderBy: { sortOrder: 'asc' },
        select: {
          phase: true,
          label: true,
          startDate: true,
          endDate: true,
          sortOrder: true,
        },
      },
    },
    orderBy: { code: 'asc' },
  });

  for (const comp of verified) {
    console.log(`\n  ${comp.code}:`);
    console.log(
      `    preliminaryDeadline: ${comp.preliminaryDeadline.toISOString()}`,
    );
    console.log(`    semifinalStart: ${comp.semifinalStart.toISOString()}`);
    console.log(
      `    semifinalDeadline: ${comp.semifinalDeadline.toISOString()}`,
    );
    console.log(`    finalStart: ${comp.finalStart?.toISOString() || 'null'}`);
    console.log(
      `    finalDeadline: ${comp.finalDeadline?.toISOString() || 'null'}`,
    );
    console.log(
      `    grandFinalDate: ${comp.grandFinalDate?.toISOString() || 'null'}`,
    );
    console.log(`    Timeline events (${comp.timelineEvents.length}):`);
    for (const event of comp.timelineEvents) {
      console.log(
        `      ${event.sortOrder}. ${event.label}: ${event.startDate.toISOString()} → ${event.endDate.toISOString()}`,
      );
    }
  }

  console.log('\n✨ Timeline update completed successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Timeline update failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
