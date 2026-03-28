import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';

import SimulatePage from './SimulatePage';

export default async function SimulatePageWrapper() {
  const session = await auth();

  if (!session?.admin) redirect('/admin-login');
  if (session.admin.role !== 'super_admin') redirect('/admin/dashboard');

  return <SimulatePage adminUsername={session.admin.username} />;
}
