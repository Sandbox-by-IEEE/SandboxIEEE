/**
 * Read-only audit of PTC semifinal submissions.
 * Dumps every row with key URL fields to help diagnose admin-view render bugs.
 */
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  const rows = await prisma.semifinalSubmission.findMany({
    where: {
      OR: [
        { competitionType: 'PTC' },
        { registration: { competition: { code: 'PTC' } } },
      ],
    },
    include: {
      registration: {
        include: {
          team: true,
          competition: true,
          user: { select: { email: true, name: true } },
        },
      },
    },
    orderBy: { submittedAt: 'desc' },
  });

  console.log(`\nTotal PTC semifinal submissions: ${rows.length}\n`);
  rows.forEach((s, i) => {
    console.log(
      `#${i + 1} | team="${s.registration.team?.teamName ?? 'N/A'}" | email=${s.registration.user.email} | status=${s.status} | compType=${s.competitionType}`,
    );
    console.log(`    proposalUrl: ${JSON.stringify(s.proposalUrl)}`);
    console.log(
      `    prototypeVideoUrl: ${JSON.stringify(s.prototypeVideoUrl)}`,
    );
    console.log(`    paperUrl: ${JSON.stringify(s.paperUrl)}`);
    console.log(`    presentationUrl: ${JSON.stringify(s.presentationUrl)}`);
    console.log(`    businessPlanUrl: ${JSON.stringify(s.businessPlanUrl)}`);
    console.log(`    pitchDeckUrl: ${JSON.stringify(s.pitchDeckUrl)}`);
    console.log(`    reviewNotes: ${JSON.stringify(s.reviewNotes)}`);
  });

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
