import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';

import GradientBox from '@/components/GradientBox';
import { ModalContext } from '@/components/Modal/ModalContext';
import TitleSection from '@/components/TitleSection';
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
      <div className='w-[80%] md:w-[40%] relative rounded-3xl shadow-xl'>
        <GradientBox>
          <div className='py-[4vw]'>
            <div className='flex flex-col items-center mb-8'>
              {/* Purple Character Icon */}
              {/* <div className='w-24 h-24 mb-1'>
              <Image
                src='/assets/sandbox-confuse.png'
                alt='Purple Character'
                className='w-full h-full'
                width={100} // Add the width and height props
                height={100}
                priority // Add the priority prop to ensure it's loaded immediately
              />
            </div> */}

              <TitleSection size='sm'>Forgot password?</TitleSection>
              <p className='text-slate-400 text-sm'>We got you</p>
            </div>

            <div className='space-y-8 mx-[3vw]'>
              <div className='space-y-2'>
                <label className='block text-sm font-medium text-white'>
                  Email
                </label>
                <input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='w-full px-4 py-2 bg-[#ffffff0b] h-[53px] border-none rounded-[16px] focus:outline-none focus:border-[#DBB88B]'
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
                  className='w-full py-3 bg-transparent border border-[#DBB88B] rounded-full hover:bg-[#DBB88B] transition-colors flex items-center justify-center gap-2 text-sm font-medium'
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!email}
                  className='w-full py-3 bg-transparent border border-[#DBB88B] rounded-full hover:bg-[#DBB88B] transition-colors flex items-center justify-center gap-2 text-sm font-medium'
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </GradientBox>
      </div>
    </div>
  );
};

export default FormResendEmail;
