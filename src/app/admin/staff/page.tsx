import { Shield, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';

export default async function AdminStaffPage() {
  const session = await auth();

  // Only super admin can access
  if (session?.admin?.role !== 'super_admin') {
    redirect('/admin/dashboard');
  }

  // Get all admins (exclude password hash)
  const admins = await prisma.admin.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      username: true,
      email: true,
      adminRole: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
      lastLoginAt: true,
    },
  });

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'super_admin':
        return 'bg-purple-100 text-purple-800';
      case 'moderator':
        return 'bg-blue-100 text-blue-800';
      case 'finance':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'super_admin':
        return 'Super Admin';
      case 'moderator':
        return 'Moderator';
      case 'finance':
        return 'Finance';
      default:
        return role;
    }
  };

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>Staff Management</h1>
          <p className='text-gray-600 mt-1'>
            Manage admin accounts and permissions
          </p>
        </div>

        <Link
          href='/admin/staff/create'
          className='flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg'
        >
          <UserPlus size={20} />
          Create Admin Account
        </Link>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        <div className='bg-white rounded-xl p-6 border border-gray-200'>
          <p className='text-sm text-gray-600 mb-1'>Total Admins</p>
          <p className='text-3xl font-bold text-gray-900'>{admins.length}</p>
        </div>
        <div className='bg-purple-50 rounded-xl p-6 border border-purple-200'>
          <p className='text-sm text-purple-700 mb-1'>Super Admins</p>
          <p className='text-3xl font-bold text-purple-900'>
            {admins.filter((a) => a.adminRole === 'super_admin').length}
          </p>
        </div>
        <div className='bg-blue-50 rounded-xl p-6 border border-blue-200'>
          <p className='text-sm text-blue-700 mb-1'>Moderators</p>
          <p className='text-3xl font-bold text-blue-900'>
            {admins.filter((a) => a.adminRole === 'moderator').length}
          </p>
        </div>
        <div className='bg-green-50 rounded-xl p-6 border border-green-200'>
          <p className='text-sm text-green-700 mb-1'>Finance Admins</p>
          <p className='text-3xl font-bold text-green-900'>
            {admins.filter((a) => a.adminRole === 'finance').length}
          </p>
        </div>
      </div>

      {/* Admin List */}
      <div className='bg-white rounded-xl border border-gray-200 overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-50 border-b border-gray-200'>
              <tr>
                <th className='text-left px-6 py-4 text-sm font-semibold text-gray-900'>
                  Admin
                </th>
                <th className='text-left px-6 py-4 text-sm font-semibold text-gray-900'>
                  Role
                </th>
                <th className='text-left px-6 py-4 text-sm font-semibold text-gray-900'>
                  Status
                </th>
                <th className='text-left px-6 py-4 text-sm font-semibold text-gray-900'>
                  Created
                </th>
                <th className='text-right px-6 py-4 text-sm font-semibold text-gray-900'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {admins.map((admin) => (
                <tr
                  key={admin.id}
                  className='hover:bg-gray-50 transition-colors'
                >
                  <td className='px-6 py-4'>
                    <div className='flex items-center gap-3'>
                      <div className='w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center'>
                        <span className='text-white font-semibold text-sm'>
                          {admin.username.substring(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className='font-medium text-gray-900'>
                          {admin.username}
                        </p>
                        <p className='text-sm text-gray-600'>{admin.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4'>
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${getRoleBadge(
                        admin.adminRole,
                      )}`}
                    >
                      {admin.adminRole === 'super_admin' && (
                        <Shield size={12} />
                      )}
                      {getRoleLabel(admin.adminRole)}
                    </span>
                  </td>
                  <td className='px-6 py-4'>
                    {admin.isActive ? (
                      <span className='inline-flex px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium'>
                        Active
                      </span>
                    ) : (
                      <span className='inline-flex px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium'>
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-600'>
                    {new Date(admin.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                  <td className='px-6 py-4 text-right'>
                    {admin.id !== session.admin?.id && (
                      <button
                        type='button'
                        className='text-sm text-gray-600 hover:text-gray-900 font-medium'
                      >
                        Manage
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
