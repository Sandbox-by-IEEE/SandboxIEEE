import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Redirect to admin login if not authenticated as admin
  if (!session?.admin) {
    redirect('/admin/login');
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar admin={session.admin} />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <AdminHeader admin={session.admin} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
