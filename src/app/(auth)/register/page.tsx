'use client';
// Importing necessary components and libraries from Next.js and React
import Link from 'next/link';
import React, { useState } from 'react';

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
import TextInput from '@/components/TextInput';

// Defining the functional component Home
export default function Home() {
  // Using useState hook to manage the state for email, username, and password inputs
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // The component returns the UI structure for the registration page
  return (
    // Main container with a full height, a white background, and center-aligned items
    <main className='h-screen font-poppins text-sm sm:text-base flex bg-white flex-col items-center'>
      {/* A container with a screen-wide height of 3000px to display the registration form */}
      <div className='w-screen h-[3000px] flex'>
        {/* An empty div with a width of 0% on small screens and 50% on larger screens */}
        <div className='w-[0%] lg:w-[50%] justify-center z-10'></div>
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
            <div className='w-full overflow-hidden z-10 transition-all duration-100 my-[60px] px-[18%] sm:px-[20%] flex flex-col items-center justify-center'>
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
                  <Button color='white' isFullWidth={true}>
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
                  <p>Email</p>
                  <TextInput
                    text={email}
                    setText={setEmail}
                    color='white'
                    fullwidth={true}
                    type='email'
                    placeholder='Your email address'
                  />
                </div>
                {/* Username input field */}
                <div>
                  <p>Username</p>
                  <TextInput
                    text={username}
                    setText={setUsername}
                    color='white'
                    fullwidth={true}
                    type='text'
                    placeholder='Enter a username'
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
              </div>
              {/* Sign up button */}
              <div className='my-5 w-[100px] h-[40px]'>
                <Button color='gold' isFullWidth={true}>
                  Sign Up
                </Button>
              </div>
              {/* Link to the login page */}
              <p className=''>
                Already have an account?{' '}
                <Link href='/login'>
                  <span className='hover:underline text-[#DBB88B]'>Login</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
