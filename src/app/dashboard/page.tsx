import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';

import DashboardClient from './DashboardClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login?callbackUrl=/dashboard');
  }

  // Fetch fresh user data with registration details
  const user = await prisma.user.findUnique({
    where: session.user.id
      ? { id: session.user.id }
      : { email: session.user.email },
    include: {
      registration: {
        include: {
          competition: true,
          team: {
            include: {
              members: {
                orderBy: {
                  createdAt: 'asc',
                },
              },
            },
          },
          preliminary: true,
          payment: true,
          semifinal: true,
          final: true,
        },
      },
    },
  });

  if (!user) {
    redirect('/login');
  }

  // Pass user data — DashboardClient handles empty state
  return <DashboardClient user={user} />;
}
