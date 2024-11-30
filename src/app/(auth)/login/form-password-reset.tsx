import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';

import GradientBox from '@/components/GradientBox';
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
      <div className='w-[80%] md:w-[40%] relative rounded-3xl shadow-xl'>
        <GradientBox>
          <div className='w-full px-[4vw] py-12'>
            <div className='relative flex flex-col items-center mb-8'>
              {/* Purple Character Icon */}
              <div className='absolute w-[300px] h-[200px] -top-[180px]'>
                <Image
                  src='/assets/sandbox-smile.png'
                  alt='Purple Character'
                  className=''
                  layout='fill'
                  objectFit='contain'
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
                <label className='block text-sm font-medium text-white mb-2'>
                  New Password
                </label>
                <div className='relative'>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={pass2}
                    onChange={(e) => setPass2(e.target.value)}
                    className='w-full px-4 py-2 bg-[#ffffff0b] h-[53px] border-none rounded-[16px] focus:outline-none focus:border-[#DBB88B]'
                    placeholder='Enter your new password'
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 inset-y-0 transform text-gray-400 hover:text-gray-300 transition-colors'
                  >
                    {showPassword ? <Eye /> : <Eyeslash />}
                  </button>
                </div>
                {showWarning && pass2.length < 8 && (
                  <p className='text-red-500 text-sm'>
                    Password must be at least 8 characters long
                  </p>
                )}
                <label className='block text-sm font-medium text-white mb-2'>
                  Confirm New Password
                </label>
                <div className='relative'>
                  <input
                    type={showPassword1 ? 'text' : 'password'}
                    value={pass1}
                    onChange={(e) => setPass1(e.target.value)}
                    className='w-full px-4 py-2 bg-[#ffffff0b] h-[53px] border-none rounded-[16px] focus:outline-none focus:border-[#DBB88B]'
                    placeholder='Confirm your new password'
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword1(!showPassword1)}
                    className='absolute right-3 inset-y-0 transform text-gray-400 hover:text-gray-300 transition-colors'
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
                  className='w-full py-3 bg-transparent border border-[#DBB88B] rounded-full hover:bg-[#DBB88B] transition-colors flex items-center justify-center gap-2 text-sm font-medium'
                >
                  Reset Password
                </button>
              </div>
            </div>
          </div>
        </GradientBox>
      </div>
    </div>
  );
};

export default FormResetPassword;
