/**
 * Lookup helper — verify state of 5 BCC teams that need manual semifinal insertion.
 * Inert: read-only.
 */
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

const emails = [
  'zahraffaiza@gmail.com',
  'jocelynz.adelina24@gmail.com',
  'msulthandaryk@gmail.com',
  'mssyarif600@gmail.com',
  'mohammadedi512@gmail.com',
];

async function main() {
  for (const email of emails) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        registration: {
          include: {
            team: { include: { members: { orderBy: { orderIndex: 'asc' } } } },
            competition: true,
            semifinal: true,
            payment: true,
            preliminary: true,
          },
        },
      },
    });
    if (!user) {
      console.log(`[NOT FOUND] ${email}`);
      continue;
    }
    if (!user.registration) {
      console.log(`[NO REG] ${email} userId=${user.id}`);
      continue;
    }
    const r = user.registration;
    console.log(
      `[OK] ${email} | team=${r.team?.teamName ?? 'N/A'} | comp=${r.competition.code} | phase=${r.currentPhase} | prelim=${r.preliminary?.status ?? 'none'} | payment=${r.payment?.status ?? 'none'} | semifinal=${r.semifinal?.status ?? 'none'}`,
    );
  }
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
