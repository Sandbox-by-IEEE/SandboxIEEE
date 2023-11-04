import { useRouter } from 'next/navigation';
import React, { useContext } from 'react';
import { useState } from 'react';

import Modal from '@/components/Modal/Modal';
import {
  ModalContext,
  ModalContextContextType,
} from '@/components/Modal/ModalContext';
import TextInput from '@/components/TextInput';

export default function FormResetPassword() {
  const [pass, setPass] = useState('');
  const [pass2, setPass2] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const { setOpenModal } = useContext<ModalContextContextType>(ModalContext);
  const router = useRouter();

  const bodyModals = () => {
    return (
      <div className='lg:min-w-[400px] text-lg font-poppins text-white font-semibold flex flex-col gap-3'>
        <p>New Password</p>
        <TextInput
          text={pass}
          setText={setPass}
          color='white'
          fullwidth={true}
          type='password'
          placeholder='Enter your new password'
        />
        {showWarning && pass.length < 8 && (
          <p className='text-red-500 -mt-1 text-sm'>
            Password length under 8 characters!
          </p>
        )}
        <p>Confirm Password </p>
        <TextInput
          text={pass2}
          setText={setPass2}
          color='white'
          fullwidth={true}
          type='password'
          placeholder='Re-enter your new password'
        />
        {showWarning && pass2.length < 8 && (
          <p className='text-red-500 -mt-1 text-sm'>
            Password confirmation length under 8 characters!
          </p>
        )}
        {showWarning && pass !== pass2 && (
          <p className='text-red-500 mt-2 text-sm'>
            Password and password confirmation are different
          </p>
        )}
      </div>
    );
  };

  const handleSubmit = () => {
    if (pass === pass2 && pass.length >= 8 && pass2.length >= 8) {
      console.log('Password is valid');
      setOpenModal(false);
      setShowWarning(false); // Nonaktifkan showWarning setelah validasi sukses
    } else {
      setShowWarning(true);
      console.log('Password is not valid');
    }
  };

  return (
    <Modal
      title='Reset Password'
      disabledButtonTwo={!pass || !pass2}
      description={bodyModals()}
      buttonText2='Reset Password'
      buttonText1='Cancel'
      onClickButtonTwo={handleSubmit}
      onClickButtonOne={() => router.push('/login')}
      isColButton
    />
  );
}
