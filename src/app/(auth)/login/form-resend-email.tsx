import Image from 'next/image';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';

import { ModalContext } from '@/components/Modal/ModalContext';
import { callLoading, callToast } from '@/components/Toast';

const FormResendEmail = () => {
  const [email, setEmail] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const { setOpenModal } = useContext(ModalContext);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    setShowWarning(true);
    if (validateEmail(email)) {
      const loadingToastId = callLoading('Sending email...');

      try {
        const res = await fetch('/api/changepass/sendemail', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
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
                src='/assets/sandbox-confuse.png'
                alt='Purple Character'
                className='w-full h-full'
                width={100} // Add the width and height props
                height={100}
                priority // Add the priority prop to ensure it's loaded immediately
              />
            </div>

            <h2 className='text-2xl font-bold text-white mb-1'>
              Forgot password?
            </h2>
            <p className='text-slate-400 text-sm'>We got you</p>
          </div>

          <div className='space-y-3'>
            <div className='space-y-2'>
              <label className='block text-sm font-medium text-white'>
                Email
              </label>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500'
                placeholder='Enter your email'
              />
              {showWarning && !validateEmail(email) && (
                <p className='text-red-500 text-sm'>
                  Please enter a valid email address
                </p>
              )}
            </div>

            <div className='flex gap-3'>
              <button
                onClick={() => setOpenModal(false)}
                className='flex-1 py-3 px-4 bg-transparent border border-purple-500 text-white rounded-lg font-medium hover:bg-purple-500/10 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200'
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!email}
                className='flex-1 py-3 px-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-medium hover:from-purple-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200'
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormResendEmail;
