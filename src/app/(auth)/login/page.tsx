'use client';
// Importing necessary components and libraries from Next.js and React
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import * as z from 'zod';

import FormResetPassword from '@/app/(auth)/login/form-password-reset';
import FormResendEmail from '@/app/(auth)/login/form-resend-email';
// Importing custom components for UI elements and icons
import Button from '@/components/Button';
import Google from '@/components/icons/Register/google';
import Smalllogo from '@/components/icons/Register/Ieee';
import Logo from '@/components/icons/Register/sandbox';
import Stars1 from '@/components/icons/Register/stars1';
import Stars1mb from '@/components/icons/Register/stars1mb';
import Stars2 from '@/components/icons/Register/stars2';
import Stars2mb from '@/components/icons/Register/stars2mb';
import Stars3 from '@/components/icons/Register/stars3';
import Stars3mb from '@/components/icons/Register/stars3mb';
import {
  ModalContext,
  type ModalContextContextType,
} from '@/components/Modal/ModalContext';
import TextInput from '@/components/TextInput';
import { callLoading, callToast } from '@/components/Toast';

const formSchema = z.object({
  username: z.string().min(1, 'Username field is required'),
  password: z.string().min(1, 'Password field is required'),
});

// Defining the functional component Home
export default function Home({
  searchParams: { error, activationMsg },
}: {
  searchParams: { error: string; activationMsg: string };
}) {
  // Using useState hook to manage the state for email, username, and password inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams();

  const router = useRouter();
  const { openModal, setOpenModal } =
    useContext<ModalContextContextType>(ModalContext);
  const handleGoogle = async (e: any) => {
    e.preventDefault();
    await signIn('google', {
      callbackUrl: '/',
    });
  };

  const handleOnSubmit = async (e: any) => {
    e.preventDefault();
    const body = {
      username: username,
      password: password,
    };

    const valid = formSchema.safeParse(body);

    if (!valid.success) {
      valid.error.issues.map((err, index) => {
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
        username: username,
        password: password,
        redirect: false,
        callbackUrl: '/',
      });

      if (resLogin?.error) {
        callToast({
          status: 'error',
          description: resLogin?.error || 'Login Failed',
        });
        setUsername('');
        setPassword('');
        router.refresh();
      } else {
        callToast({ status: 'success', description: 'Login succesfull' });
        router.push('/');
      }
    } finally {
      toast.dismiss(loadingToastId); // Dismiss toast loading ketika login selesai
    }
  };

  useEffect(() => {
    if (error && mounted) {
      callToast({
        status: 'error',
        description:
          'This user register with credentials, please login with credentials/password',
      });
      router.push('/login');
    }

    if (activationMsg && mounted) {
      callToast({
        status: 'success',
        description: activationMsg,
      });
      router.push('/login');
    }
  }, [mounted, activationMsg, error, router]);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }
  }, [mounted]);

  if (!mounted) return null;
  // The component returns the UI structure for the registration page
  return (
    // Main container with a full height, a white background, and center-aligned items
    <main className='h-screen font-poppins text-sm sm:text-base flex bg-white flex-col items-center'>
      {/* A container with a screen-wide height of 3000px to display the registration form */}
      <div className='w-screen h-full flex'>
        {/* An empty div with a width of 0% on small screens and 50% on larger screens */}
        <div className='w-[0%] lg:w-[50%] justify-center z-10'>
          {' '}
          <Image
            src='/login.png'
            alt='Background login Page'
            width={1920}
            height={1080}
            className='w-full h-full object-cover'
          />
        </div>
        {/* A div with a background image, covering the full width on small screens and 50% on larger screens */}
        <div className='relative w-[100%] lg:w-[50%] bg-[url("/assets/RelogBackground.png")] bg-cover bg-no-repeat text-white bg-black items-center justify-center'>
          {/* A wrapper div to contain various elements */}
          <div className='flex w-full h-full'>
            {/* A logo at the top right corner */}
            <div className='absolute right-6 top-6 lg:right-10 lg:top-10'>
              <Smalllogo size={120} />
            </div>
            {/* Stars icons to add a decorative element, displayed differently on small and larger screens */}
            <div className='hidden lg:block absolute'>
              <Stars1 size={17} />
            </div>
            <div className='lg:hidden absolute top-2'>
              <Stars1mb size={22} />
            </div>
            <div className='hidden lg:block absolute bottom-0'>
              <Stars2 size={25} />
            </div>
            <div className='lg:hidden absolute bottom-0'>
              <Stars2mb size={25} />
            </div>
            <div className='hidden lg:block absolute bottom-0 right-0'>
              <Stars3 size={25} />
            </div>
            <div className='lg:hidden absolute bottom-0 right-0'>
              <Stars3mb size={25} />
            </div>
            {/* A container to hold the registration form, with different padding on small and larger screens */}
            <form
              className='w-full overflow-hidden z-10 transition-all duration-100 my-[60px] px-[18%] sm:px-[20%] flex flex-col items-center justify-center'
              onSubmit={(e) => {
                handleOnSubmit(e);
              }}
            >
              {/* A block to display the main logo */}
              <div className='block justify-center'>
                <Logo size={25} />
              </div>
              {/* A heading to indicate the purpose of the form */}
              <p className='my-4'>Create a new account</p>
              {/* A container for the Google sign-in button and custom inputs */}
              <div className='w-full'>
                {/* A button for Google sign-in */}
                <div className='h-[35px]'>
                  <Button
                    type='button'
                    color='white'
                    isFullWidth={true}
                    onClick={handleGoogle}
                  >
                    <span className='text-black flex gap-3 w-full items-center justify-center font-poppins font-semibold'>
                      <Google size={25} />
                      Continue with Google
                    </span>
                  </Button>
                </div>
                {/* Dividers with the text 'or' to separate Google sign-in from custom inputs */}
                <div className='relative flex py-[12px] items-center'>
                  <div className='ml-8 lg:ml-0 flex-grow border-t border-white-600'></div>
                  <span className='flex-shrink mx-4 text-white-400'>or</span>
                  <div className='mr-8 lg:mr-0 flex-grow border-t border-white-600'></div>
                </div>
              </div>
              {/* A container for the custom input fields */}
              <div className='flex flex-col gap-2 w-full px-0 sm:px-[15%]'>
                {/* Email input field */}
                <div>
                  <p>Username</p>
                  <TextInput
                    text={username}
                    setText={setUsername}
                    color='white'
                    fullwidth={true}
                    type='text'
                    placeholder='Your username'
                  />
                </div>
                {/* Password input field */}
                <div>
                  <p>Password</p>
                  <TextInput
                    text={password}
                    setText={setPassword}
                    color='white'
                    fullwidth={true}
                    type='password'
                    placeholder='Enter a password'
                  />
                </div>
                <div>
                  <button
                    color='gold'
                    className='text-base text-cream-secondary-normal'
                    type='button'
                    onClick={() => setOpenModal(true)}
                  >
                    <span className='text-sm font-[500] hover:underline underline-offset-4'>
                      Forgot the password?
                    </span>
                  </button>
                  {/* Ini ntar tambahin logika && !token */}
                  {openModal && !searchParams.get('resetToken') && (
                    <FormResendEmail />
                  )}
                  {/* Ini ntar tambahin logika && token */}
                  {searchParams.get('resetToken') && <FormResetPassword />}
                </div>
              </div>
              {/* Sign up button */}
              <div className='my-5 w-[100px] h-[40px]'>
                <Button type='submit' color='gold' isFullWidth={true}>
                  Sign In
                </Button>
              </div>
              <p className='text-center'>
                Don’t have an account yet?{' '}
                <Link
                  className='hover:underline text-[#DBB88B]'
                  href='/register'
                >
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
