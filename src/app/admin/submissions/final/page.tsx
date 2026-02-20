import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';

import SubmissionsTable from './SubmissionsTable';

export const metadata = {
  title: 'Final Submissions | Admin Panel',
  description: 'Manage final submissions from teams',
};

export default async function FinalSubmissionsPage() {
  const session = await auth();

  if (!session?.admin) {
    redirect('/admin-login');
  }

  // Only super_admin and moderator can access
  if (!['super_admin', 'moderator'].includes(session.admin.role)) {
    redirect('/admin/dashboard');
  }

  // Fetch all final submissions with team and competition data
  const submissions = await prisma.finalSubmission.findMany({
    include: {
      registration: {
        include: {
          team: {
            include: {
              members: {
                orderBy: { createdAt: 'asc' },
              },
            },
          },
          competition: true,
          user: true,
        },
      },
    },
    orderBy: {
      submittedAt: 'desc',
    },
  });

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900'>
            Final Submissions
          </h1>
          <p className='text-gray-500 mt-1'>
            Review and approve team submissions for the final phase
          </p>
        </div>
        <div className='flex items-center gap-3'>
          <div className='text-right'>
            <p className='text-sm text-gray-500'>Total Submissions</p>
            <p className='text-2xl font-bold text-gray-900'>
              {submissions.length}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        <div className='bg-white rounded-lg border border-gray-200 p-4'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-500'>Pending</p>
              <p className='text-2xl font-bold text-yellow-600'>
                {submissions.filter((s) => s.status === 'pending').length}
              </p>
            </div>
            <div className='w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center'>
              <span className='text-2xl'>⏳</span>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-lg border border-gray-200 p-4'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-500'>Approved</p>
              <p className='text-2xl font-bold text-green-600'>
                {submissions.filter((s) => s.status === 'qualified').length}
              </p>
            </div>
            <div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center'>
              <span className='text-2xl'>✅</span>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-lg border border-gray-200 p-4'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-500'>Rejected</p>
              <p className='text-2xl font-bold text-red-600'>
                {submissions.filter((s) => s.status === 'rejected').length}
              </p>
            </div>
            <div className='w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center'>
              <span className='text-2xl'>❌</span>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-lg border border-gray-200 p-4'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-500'>Needs Review</p>
              <p className='text-2xl font-bold text-blue-600'>
                {
                  submissions.filter(
                    (s) => s.status === 'pending' && !s.reviewedAt,
                  ).length
                }
              </p>
            </div>
            <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center'>
              <span className='text-2xl'>🔍</span>
            </div>
          </div>
        </div>
      </div>

      {/* Submissions Table */}
      <SubmissionsTable submissions={submissions} adminId={session.admin.id} />
    </div>
  );
}
