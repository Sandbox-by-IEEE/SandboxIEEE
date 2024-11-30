import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';

import Eye from '@/components/icons/Register/eye';
import Eyeslash from '@/components/icons/Register/eyeslash';
import { ModalContext } from '@/components/Modal/ModalContext';
// import { X } from 'lucide-react';
import { callLoading, callToast } from '@/components/Toast';

const FormResetPassword = () => {
  const [pass2, setPass2] = useState('');
  const [pass1, setPass1] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const { setOpenModal } = useContext(ModalContext);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async () => {
    if (pass2.length >= 8 && pass1.length >= 8 && pass1 === pass2) {
      const loadingToastId = callLoading('Changing password...');

      try {
        const res = await fetch('/api/changepass', {
          method: 'PATCH',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: searchParams.get('resetToken'),
            newPassword: pass2,
          }),
        });

        const bodyRes = await res.json();

        if (!res.ok) {
          callToast({ status: 'error', description: bodyRes.message });
        } else {
          callToast({ status: 'success', description: bodyRes.message });
        }
      } catch (error) {
        if (error instanceof Error) {
          callToast({
            status: 'error',
            description: error.message,
          });
        }
      } finally {
        toast.dismiss(loadingToastId);
      }

      setOpenModal(false);
      setShowWarning(false);
      router.push('/login');
    } else {
      setShowWarning(true);
    }
  };

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50'>
      <div className='w-full max-w-md relative bg-gradient-to-b from-slate-900 to-slate-800 rounded-3xl shadow-xl'>
        <div className='p-6'>
          <div className='flex flex-col items-center mb-8'>
            {/* Purple Character Icon */}
            <div className='w-24 h-24 mb-1'>
              <Image
                src='/assets/sandbox-smile.png'
                alt='Purple Character'
                className='w-full h-full'
                width={100} // Add the width and height props
                height={100}
                priority // Add the priority prop to ensure it's loaded immediately
              />
            </div>

            <h2 className='text-2xl font-bold text-white mb-1'>
              Reset Password
            </h2>
            <p className='text-slate-400 text-sm'>And don’t forget it</p>
          </div>

          <div className='space-y-3'>
            <div className='space-y-2'>
              <div className='relative'>
                <label className='block text-sm font-medium text-white'>
                  New Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={pass2}
                  onChange={(e) => setPass2(e.target.value)}
                  className='w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500'
                  placeholder='Enter your new password'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-[34px] transform text-gray-400 hover:text-gray-300 transition-colors'
                >
                  {showPassword ? <Eye /> : <Eyeslash />}
                </button>
              </div>
              {showWarning && pass2.length < 8 && (
                <p className='text-red-500 text-sm'>
                  Password must be at least 8 characters long
                </p>
              )}
              <div className='relative'>
                <label className='block text-sm font-medium text-white'>
                  Confirm New Password
                </label>
                <input
                  type={showPassword1 ? 'text' : 'password'}
                  value={pass1}
                  onChange={(e) => setPass1(e.target.value)}
                  className='w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 pr-12'
                  placeholder='Confirm your new password'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword1(!showPassword1)}
                  className='absolute right-3 top-[34px] transform text-gray-400 hover:text-gray-300 transition-colors'
                >
                  {showPassword1 ? <Eye /> : <Eyeslash />}
                </button>
              </div>
              {showWarning && pass1.length < 8 && (
                <p className='text-red-500 text-sm'>
                  Password must be at least 8 characters long
                </p>
              )}
              {showWarning && pass1 !== pass2 && (
                <p className='text-red-500 text-sm'>Passwords do not match</p> // Add this line
              )}
            </div>

            <div className='flex gap-3'>
              <button
                onClick={handleSubmit}
                disabled={!pass2}
                className='flex-1 py-3 px-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-medium hover:from-purple-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200'
              >
                Reset Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormResetPassword;
