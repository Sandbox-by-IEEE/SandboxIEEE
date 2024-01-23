'use client';
import React, { useContext } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';

import Modal from '@/components/Modal/Modal';
import {
  ModalContext,
  type ModalContextContextType,
} from '@/components/Modal/ModalContext';
import TextInput from '@/components/TextInput';
import { callLoading, callToast } from '@/components/Toast';

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
export default function FormResendEmail() {
  const [email, setEmail] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const { setOpenModal } = useContext<ModalContextContextType>(ModalContext);
  const bodyModals = () => {
    return (
      <div className='lg:min-w-[400px] text-lg font-poppins text-white font-semibold flex flex-col gap-3'>
        <p>Email</p>
        <TextInput
          isWarned={showWarning && !validateEmail(email)}
          text={email}
          setText={setEmail}
          color='white'
          fullwidth={true}
          type='email'
          placeholder='Your email verification'
        />
        {showWarning && !validateEmail(email) && (
          <p className='text-red-500 -mt-1 text-sm'>Email not valid!!</p>
        )}
      </div>
    );
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
          body: JSON.stringify({
            email: email,
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
        toast.dismiss(loadingToastId); // Dismiss toast loading ketika proses pengiriman email selesai
      }

      setOpenModal(false);
    } else {
      // callToast({
      //   status: 'error',
      //   description: 'Email is not valid',
      // });
    }
  };

  //Ga bisa pake form karena ketumpuk sama form register
  return (
    <Modal
      title='Forgot Password?'
      disabledButtonTwo={!email}
      description={bodyModals()}
      buttonText2='Send Reset Instructions'
      buttonText1='Cancel'
      onClickButtonTwo={handleSubmit}
    />
  );
}
