import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';

import AdminHeader from './components/AdminHeader';
import AdminSidebar from './components/AdminSidebar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Redirect to admin login if not authenticated as admin
  if (!session?.admin) {
    redirect('/admin-login');
  }

  return (
    <div className='flex h-screen bg-gray-50'>
      {/* Sidebar - hidden on mobile */}
      <div className='hidden lg:block'>
        <AdminSidebar admin={session.admin} />
      </div>

      {/* Main Content Area */}
      <div className='flex flex-col flex-1 overflow-hidden min-w-0'>
        {/* Header */}
        <AdminHeader admin={session.admin} />

        {/* Page Content */}
        <main className='flex-1 overflow-y-auto p-4 sm:p-6'>{children}</main>
      </div>
    </div>
  );
}
