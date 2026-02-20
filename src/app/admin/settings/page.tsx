import { Bell, Lock, User } from 'lucide-react';
import Link from 'next/link';

import { auth } from '@/lib/auth';

export default async function AdminSettingsPage() {
  const session = await auth();

  return (
    <div className='max-w-4xl mx-auto space-y-6'>
      <div>
        <h1 className='text-2xl font-bold text-gray-900'>Settings</h1>
        <p className='text-gray-600 mt-1'>Manage your admin account settings</p>
      </div>

      {/* Settings Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Change Password */}
        <Link
          href='/admin/settings/change-password'
          className='bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all'
        >
          <div className='flex items-start gap-4'>
            <div className='p-3 bg-blue-50 rounded-lg'>
              <Lock className='text-blue-600' size={24} />
            </div>
            <div className='flex-1'>
              <h3 className='font-semibold text-gray-900 mb-1'>
                Change Password
              </h3>
              <p className='text-sm text-gray-600'>
                Update your password to keep your account secure
              </p>
            </div>
          </div>
        </Link>

        {/* Account Information */}
        <div className='bg-white border border-gray-200 rounded-xl p-6'>
          <div className='flex items-start gap-4'>
            <div className='p-3 bg-gray-50 rounded-lg'>
              <User className='text-gray-600' size={24} />
            </div>
            <div className='flex-1'>
              <h3 className='font-semibold text-gray-900 mb-1'>
                Account Information
              </h3>
              <div className='text-sm text-gray-600 space-y-1 mt-3'>
                <p>
                  <span className='font-medium'>Username:</span>{' '}
                  {session?.admin?.username}
                </p>
                <p>
                  <span className='font-medium'>Email:</span>{' '}
                  {session?.admin?.email}
                </p>
                <p>
                  <span className='font-medium'>Role:</span>{' '}
                  <span className='capitalize'>{session?.admin?.role}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications (Coming Soon) */}
        <div className='bg-gray-50 border border-gray-200 rounded-xl p-6 opacity-60'>
          <div className='flex items-start gap-4'>
            <div className='p-3 bg-gray-200 rounded-lg'>
              <Bell className='text-gray-500' size={24} />
            </div>
            <div className='flex-1'>
              <h3 className='font-semibold text-gray-700 mb-1'>
                Notification Preferences
              </h3>
              <p className='text-sm text-gray-500'>
                Coming soon: Manage email and in-app notifications
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Warning for default password */}
      {session?.admin?.username === 'superadmin' && (
        <div className='bg-red-50 border border-red-200 rounded-lg p-6'>
          <h3 className='font-semibold text-red-900 mb-2'>
            ⚠️ Security Warning
          </h3>
          <p className='text-sm text-red-800 mb-4'>
            You are using the default Super Admin account. For security reasons,
            please change your password immediately if you haven&apos;t done so
            yet.
          </p>
          <Link
            href='/admin/settings/change-password'
            className='inline-block bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors text-sm'
          >
            Change Password Now
          </Link>
        </div>
      )}
    </div>
  );
}
