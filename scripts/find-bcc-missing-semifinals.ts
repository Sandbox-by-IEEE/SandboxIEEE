/**
 * Lists BCC registrations that do NOT yet have a SemifinalSubmission.
 * Read-only — only prints to stdout.
 *
 * Usage: npx tsx scripts/find-bcc-missing-semifinals.ts
 */
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  const bcc = await prisma.competition.findUnique({ where: { code: 'BCC' } });
  if (!bcc) throw new Error('BCC not found');

  const regs = await prisma.competitionRegistration.findMany({
    where: {
      competitionId: bcc.id,
      semifinal: null,
    },
    include: {
      team: { include: { members: { orderBy: { orderIndex: 'asc' } } } },
      user: true,
      preliminary: true,
      payment: true,
    },
    orderBy: { createdAt: 'asc' },
  });

  console.log(
    `\nBCC registrations WITHOUT a semifinal submission: ${regs.length}\n`,
  );
  console.log(
    'No. | Team Name | Leader | Email | verification | phase | prelim | payment',
  );
  console.log(
    '----|-----------|--------|-------|--------------|-------|--------|--------',
  );
  regs.forEach((r, i) => {
    const leader = r.team?.members?.[0]?.fullName ?? r.user.name;
    const team = r.team?.teamName ?? '(no team)';
    console.log(
      `${i + 1}. | ${team} | ${leader} | ${r.user.email} | ${r.verificationStatus} | ${r.currentPhase} | ${r.preliminary?.status ?? 'none'} | ${r.payment?.status ?? 'none'}`,
    );
  });

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
