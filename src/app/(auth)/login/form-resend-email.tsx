'use client';
import React, { useContext } from 'react';
import { useState } from 'react';

import Modal from '@/components/Modal/Modal';
import {
  ModalContext,
  ModalContextContextType,
} from '@/components/Modal/ModalContext';
import TextInput from '@/components/TextInput';

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
  const handleSubmit = () => {
    setShowWarning(true);
    if (validateEmail(email)) {
      console.log('Email is valid');
      setOpenModal(false);
    } else {
      console.log('Email is not valid');
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
