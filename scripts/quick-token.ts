import { prisma } from '../src/lib/db';

async function main() {
  const user = await prisma.user.findFirst({
    where: {
      active: false,
      activateTokens: { some: {} },
    },
    include: { activateTokens: { take: 1, orderBy: { createdAt: 'desc' } } },
    orderBy: { createdAt: 'desc' },
  });

  console.log('Email:', user?.email);
  console.log('Active:', user?.active);
  console.log('Token:', user?.activateTokens[0]?.token);

  if (user?.activateTokens[0]?.token) {
    console.log('\n🔗 Activation Link:');
    console.log(
      'http://localhost:3000/activate?token=' + user.activateTokens[0].token,
    );
  }

  await prisma.$disconnect();
}

main();
