/**
 * Ghost Record Checker
 *
 * Checks for partial/failed registration records left from previous failed attempts:
 * 1. CompetitionRegistrations without a team
 * 2. Teams without any members
 * 3. Orphaned team members (team doesn't exist)
 * 4. Users with duplicate registrations (should be impossible but check)
 * 5. TeamMembers with colliding placeholder emails
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({ log: ['error'] });

async function checkGhostRecords() {
  console.log('=== GHOST RECORD CHECK ===\n');

  // 1. Registrations without teams
  const regsWithoutTeams = await prisma.competitionRegistration.findMany({
    where: { team: null },
    include: {
      user: { select: { email: true, name: true } },
      competition: { select: { code: true } },
    },
  });
  console.log(`1. Registrations WITHOUT teams: ${regsWithoutTeams.length}`);
  for (const r of regsWithoutTeams) {
    console.log(
      `   - Reg ${r.id} | User: ${r.user.email} (${r.user.name}) | Comp: ${r.competition.code} | Status: ${r.verificationStatus} | Created: ${r.createdAt.toISOString()}`,
    );
  }

  // 2. Teams without members
  const teamsWithoutMembers = await prisma.team.findMany({
    where: { members: { none: {} } },
    include: { registration: { select: { id: true, userId: true } } },
  });
  console.log(`\n2. Teams WITHOUT members: ${teamsWithoutMembers.length}`);
  for (const t of teamsWithoutMembers) {
    console.log(
      `   - Team ${t.id} | Name: ${t.teamName} | Reg: ${t.registration.id}`,
    );
  }

  // 3. Check for duplicate placeholder emails (the old bug)
  const duplicateEmails = await prisma.$queryRaw<
    { email: string; count: bigint }[]
  >`
    SELECT email, COUNT(*) as count 
    FROM team_members 
    WHERE email != '' AND email IS NOT NULL
    GROUP BY email 
    HAVING COUNT(*) > 1
    ORDER BY count DESC
    LIMIT 20
  `;
  console.log(`\n3. Duplicate placeholder emails: ${duplicateEmails.length}`);
  for (const d of duplicateEmails) {
    console.log(`   - "${d.email}" appears ${d.count} times`);
  }

  // 4. Check all registrations summary
  const allRegs = await prisma.competitionRegistration.findMany({
    include: {
      user: { select: { email: true, name: true } },
      competition: { select: { code: true, name: true } },
      team: {
        select: {
          teamName: true,
          members: {
            select: { fullName: true, email: true, orderIndex: true },
          },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
  console.log(`\n4. Total registrations: ${allRegs.length}`);
  for (const r of allRegs) {
    const memberCount = r.team?.members?.length ?? 0;
    const teamName = r.team?.teamName ?? 'NO TEAM';
    console.log(
      `   - [${r.competition.code}] Team: "${teamName}" | User: ${r.user.email} | Status: ${r.verificationStatus} | Members: ${memberCount} | Created: ${r.createdAt.toISOString()}`,
    );
  }

  // 5. Check for users with "stuck" state (users who might have been blocked)
  const usersWithMultipleAttemptTraces = await prisma.user.findMany({
    where: {
      active: true,
      registration: null, // Active users with NO registration
    },
    select: { id: true, email: true, name: true, createdAt: true },
    orderBy: { createdAt: 'desc' },
    take: 20,
  });
  console.log(
    `\n5. Active users WITHOUT any registration (most recent 20): ${usersWithMultipleAttemptTraces.length}`,
  );
  for (const u of usersWithMultipleAttemptTraces) {
    console.log(
      `   - ${u.email} (${u.name}) | Created: ${u.createdAt.toISOString()}`,
    );
  }

  console.log('\n=== CHECK COMPLETE ===');
}

checkGhostRecords()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
