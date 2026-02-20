/**
 * Quick Activation Test - Get latest activation token
 */
import 'dotenv/config';
import { prisma } from '../src/lib/db';

async function getLatestToken() {
  const users = await prisma.user.findMany({
    where: {
      email: {
        contains: '-test',
      },
    },
    include: {
      activateTokens: {
        orderBy: { createdAt: 'desc' },
        take: 1,
      },
    },
    orderBy: { createdAt: 'desc' },
    take: 1,
  });

  if (users.length === 0) {
    console.log('❌ No test users found');
    return;
  }

  const user = users[0];
  console.log('\n📧 Latest Test User:');
  console.log(`   Email: ${user.email}`);
  console.log(`   Active: ${user.active}`);
  console.log(`   Email Verified: ${user.emailVerified ? 'Yes' : 'No'}`);

  if (user.activateTokens.length > 0) {
    const token = user.activateTokens[0].token;
    console.log(`\n🔗 Activation Link:`);
    console.log(`   http://localhost:3000/activate?token=${token}`);
    console.log(`\n💡 Or test via API:`);
    console.log(
      `   curl "http://localhost:3000/api/auth/activate?token=${token}"`,
    );
  } else {
    console.log('\n⚠️  No activation tokens found');
  }

  await prisma.$disconnect();
}

getLatestToken();
