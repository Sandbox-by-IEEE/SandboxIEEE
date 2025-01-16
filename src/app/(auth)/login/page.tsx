// src/app/(auth)/login/page.tsx
'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import * as z from 'zod';

import FormResetPassword from '@/app/(auth)/login/form-password-reset';
import FormResendEmail from '@/app/(auth)/login/form-resend-email';
import GradientBox from '@/components/GradientBox';
import Eye from '@/components/icons/Register/eye';
import Eyeslash from '@/components/icons/Register/eyeslash';
import Google from '@/components/icons/Register/googlePutih';
import SandboxByIEEEITBIcon from '@/components/icons/SandboxByIEEEITBIcon';
import { ModalContext } from '@/components/Modal/ModalContext';
import TitleSection from '@/components/TitleSection';
import { callLoading, callToast } from '@/components/Toast';

// Schema for form validation
const formSchema = z.object({
  username: z.string().min(1, 'Username field is required'),
  password: z.string().min(1, 'Password field is required'),
});

export default function LoginPage({
  searchParams: { error, activationMsg },
}: {
  searchParams: { error: string; activationMsg: string };
}) {
  // const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { openModal, setOpenModal } = useContext(ModalContext);
  const [showPassword, setShowPassword] = useState(false);
  // Handle Google sign in
  const handleGoogle = async (e: React.MouseEvent) => {
    e.preventDefault();
    await signIn('google', { callbackUrl: '/' });
  };

  // Handle form submission
  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const body = { username, password };
    const valid = formSchema.safeParse(body);

    if (!valid.success) {
      valid.error.issues.forEach((err, index) => {
        setTimeout(() => {
          callToast({ status: 'error', description: err.message });
        }, 500 * index);
      });
      setUsername('');
      setPassword('');
      router.refresh();
      return;
    }

    const loadingToastId = callLoading('Logging in...');

    try {
      const resLogin = await signIn('credentials', {
        username,
        password,
        redirect: false,
        callbackUrl: '/',
      });

      if (resLogin?.error) {
        callToast({
          status: 'error',
          description: resLogin.error || 'Login Failed',
        });
        setUsername('');
        setPassword('');
        router.refresh();
      } else {
        callToast({ status: 'success', description: 'Login successful' });
        router.push('/');
      }
    } finally {
      toast.dismiss(loadingToastId);
    }
  };

  // Handle mount effects
  useEffect(() => {
    if (!mounted) setMounted(true);
  }, [mounted]);

  if (!mounted) return null;
  if (searchParams.get('error')) {
    callToast({
      status: 'error',
      description: searchParams.get('error') || '',
    });
  }
  return (
    <div className='flex justify-center items-center min-h-screen text-white mt-12'>
      <div className='flex flex-col items-center justify-center w-fit'>
        <GradientBox type='login' animation={true}>
          <div className='w-[80vw] px-[8%] md:w-[50vw] md:px-[20%] py-8'>
            {/* Logo */}
            <div className='flex justify-center mb-4'>
              <SandboxByIEEEITBIcon />
            </div>

            {/* Welcome Text */}
            <TitleSection size='sm'>Welcome to Sandbox</TitleSection>

            <form onSubmit={handleOnSubmit} className='mt-2'>
              {/* Email Input */}
              <div className='flex flex-col gap-4'>
                <div>
                  <label className='block text-sm font-medium mb-2'>
                    Username
                  </label>
                  <input
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className='w-full px-4 py-2 bg-[#ffffff0b] h-[53px] border-none rounded-[16px] focus:outline-none focus:border-[#DBB88B]'
                    placeholder='Enter your username'
                  />
                </div>

                {/* Password Input */}
                <div>
                  <label className='block text-sm font-medium mb-2'>
                    Password
                  </label>
                  <div className='relative'>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className='w-full px-4 py-2 bg-[#ffffff0b] h-[53px] border-none rounded-[16px] focus:outline-none focus:border-[#DBB88B]'
                      placeholder='Enter your password'
                    />
                    <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      className='absolute inset-y-0 right-0 pr-3 flex items-center text-white'
                    >
                      {showPassword ? <Eye /> : <Eyeslash />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Forgot Password */}
              <div className='flex justify-center my-4'>
                <button
                  type='button'
                  onClick={() => setOpenModal(true)}
                  className='text-[#6A6A6A] hover:text-[#DBB88B] text-sm font-medium'
                >
                  Forgot Password?
                </button>
              </div>

              {/* Sign In Button */}
              <button
                type='submit'
                className='w-full py-2 bg-transparent border border-[#DBB88B] text-white rounded-full hover:bg-[#DBB88B] transition-colors text-sm font-medium'
              >
                Sign In
              </button>

              {/* Or Divider */}
              <div className='text-center my-2'>
                <span className='text-white font-medium'>Or</span>
              </div>

              {/* Google Sign In */}
              <button
                type='button'
                onClick={handleGoogle}
                className='w-full py-2 bg-transparent border border-[#DBB88B] rounded-full hover:bg-[#DBB88B] transition-colors flex items-center justify-center gap-2 text-sm font-medium'
              >
                <Google size={25} />
                <span className='text-sm'>Sign in with Google</span>
              </button>
            </form>

            {/* Register Link */}
            <p className='mt-4 text-center text-[#6A6A6A] font-medium'>
              Don&apos;t have an account?{' '}
              <Link href='/register' className='text-white hover:underline'>
                Register
              </Link>
            </p>
          </div>
        </GradientBox>
      </div>

      {/* Password Reset Forms */}
      {openModal && !searchParams.get('resetToken') && <FormResendEmail />}
      {searchParams.get('resetToken') && <FormResetPassword />}
    </div>
  );
}
