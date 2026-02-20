'use client';

import { AdminRole } from '@prisma/client';
import { Bell, LogOut, Settings } from 'lucide-react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

interface AdminHeaderProps {
  admin: {
    id: string;
    username: string;
    email: string;
    role: AdminRole;
    isActive: boolean;
  };
}

export default function AdminHeader({ admin }: AdminHeaderProps) {
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/admin-login' });
  };

  return (
    <header className='bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4'>
      <div className='flex items-center justify-between gap-4'>
        {/* Page Title - will be dynamic later */}
        <div className='min-w-0'>
          <h2 className='text-lg sm:text-2xl font-bold text-gray-900 truncate'>
            Admin Dashboard
          </h2>
          <p className='text-xs sm:text-sm text-gray-500 hidden sm:block'>
            Manage competitions and submissions
          </p>
        </div>

        {/* Actions */}
        <div className='flex items-center gap-4'>
          {/* Notifications */}
          <button
            type='button'
            className='relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors'
            title='Notifications'
          >
            <Bell size={20} />
            {/* Notification badge */}
            <span className='absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full'></span>
          </button>

          {/* Settings */}
          <Link
            href='/admin/settings'
            className='p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors'
            title='Settings'
          >
            <Settings size={20} />
          </Link>

          {/* Logout */}
          <button
            type='button'
            onClick={handleLogout}
            className='flex items-center gap-2 px-3 sm:px-4 py-2 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg transition-colors font-medium text-sm'
            title='Logout'
          >
            <LogOut size={18} />
            <span className='hidden sm:inline'>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
