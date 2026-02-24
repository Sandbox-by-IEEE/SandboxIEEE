/**
 * Check affected user kennypramanik2
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({ log: ['error'] });

async function checkUser() {
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { username: 'kennypramanik2' },
        { email: 'kennypramanik2@gmail.com' },
      ],
    },
    include: {
      activateTokens: {
        orderBy: { createdAt: 'desc' },
        take: 3,
      },
      registration: {
        include: {
          competition: { select: { code: true, name: true } },
          team: { select: { teamName: true } },
        },
      },
    },
  });

  if (!user) {
    console.log('❌ User not found');
    return;
  }

  console.log('=== USER STATUS ===');
  console.log(`ID:        ${user.id}`);
  console.log(`Username:  ${user.username}`);
  console.log(`Email:     ${user.email}`);
  console.log(`Name:      ${user.name}`);
  console.log(`Active:    ${user.active}`);
  console.log(`Created:   ${user.createdAt.toISOString()}`);
  console.log(
    `Verified:  ${user.emailVerified?.toISOString() ?? 'NOT VERIFIED'}`,
  );
  console.log('');

  console.log('=== ACTIVATION TOKENS ===');
  for (const t of user.activateTokens) {
    const expired = t.activatedAt
      ? 'USED'
      : new Date(t.createdAt.getTime() + 24 * 60 * 60 * 1000) < new Date()
        ? 'EXPIRED'
        : 'VALID';
    console.log(`  Token: ${t.token}`);
    console.log(`  Created: ${t.createdAt.toISOString()}`);
    console.log(`  Status: ${expired}`);
    console.log(`  Activated At: ${t.activatedAt?.toISOString() ?? 'N/A'}`);
    console.log('');
  }

  console.log('=== REGISTRATION ===');
  if (user.registration) {
    console.log(
      `  Competition: ${user.registration.competition.name} (${user.registration.competition.code})`,
    );
    console.log(`  Team: ${user.registration.team?.teamName ?? 'N/A'}`);
    console.log(`  Status: ${user.registration.verificationStatus}`);
  } else {
    console.log('  No registration found');
  }
}

checkUser()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
