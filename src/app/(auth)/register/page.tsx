'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import * as z from 'zod';

import Eye from '@/components/icons/Register/eye';
import Eyeslash from '@/components/icons/Register/eyeslash';
import Google from '@/components/icons/Register/googlePutih';
import Logo from '@/components/icons/Register/sandbox';
import { callLoading, callToast } from '@/components/Toast';

// Schema for form validation
const formSchema = z.object({
  email: z.string().email('Email is invalid').min(1, 'Email field is required'),
  username: z.string().min(1, 'Username field is required'),
  password: z.string().min(8, 'Password must contain at least 8 characters'),
});

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const router = useRouter();

  // Handle Google sign up
  const handleGoogle = async (e: React.MouseEvent) => {
    e.preventDefault();
    await signIn('google', { callbackUrl: '/' });
  };

  // Handle form submission
  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const body = { email, username, password };
    const valid = formSchema.safeParse(body);

    if (!valid.success) {
      valid.error.issues.forEach((err, index) => {
        setTimeout(() => {
          callToast({ status: 'error', description: err.message });
        }, 500 * index);
      });
      setEmail('');
      setUsername('');
      setPassword('');
      setPassword2('');
      router.refresh();
      return;
    }

    if (password !== password2) {
      callToast({
        status: 'error',
        description: 'Password and password confirmation do not match',
      });
      return;
    }

    const loadingToastId = callLoading('Processing your registration...');

    try {
      const res = await fetch('/api/user', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const resBody = await res.json();

      if (!res.ok) {
        callToast({ status: 'error', description: resBody.message });
        setEmail('');
        setUsername('');
        setPassword('');
        setPassword2('');
        router.refresh();
        return;
      }

      callToast({
        status: 'success',
        description:
          'Registration successful! Please check your email to activate your account.',
      });
      router.push('/login');
    } finally {
      toast.dismiss(loadingToastId);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-[#02070A] via-[#041014] to-[#061820] text-white'>
      <div className='flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b'>
        <div className='w-full max-w-md bg-[#02070A] rounded-3xl p-8'>
          {/* Logo */}
          <div className='flex justify-center mb-4'>
            <Logo size={25} />
          </div>

          {/* Welcome Text */}
          <h1 className='text-xl font-bold text-center mb-3'>
            Lets Patch You Up!
          </h1>

          <form onSubmit={handleOnSubmit} className='space-y-6'>
            {/* Email Input */}
            <div>
              <label className='block text-sm font-medium mb-2'>Email</label>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full px-4 py-2 bg-transparent border border-gray-600 rounded-lg focus:outline-none focus:border-[#DBB88B]'
                placeholder='Enter your email'
              />
            </div>

            {/* Username Input */}
            <div>
              <label className='block text-sm font-medium mb-2'>Username</label>
              <input
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='w-full px-4 py-2 bg-transparent border border-gray-600 rounded-lg focus:outline-none focus:border-[#DBB88B]'
                placeholder='Choose a username'
              />
            </div>

            {/* Password Input */}
            <div>
              <label className='block text-sm font-medium mb-2'>Password</label>
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='w-full px-4 py-2 bg-transparent border border-gray-600 rounded-lg focus:outline-none focus:border-[#DBB88B]'
                  placeholder='Create a password'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400'
                >
                  {showPassword ? <Eye /> : <Eyeslash />}
                </button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className='block text-sm font-medium mb-2'>
                Confirm Password
              </label>
              <div className='relative'>
                <input
                  type={showPassword2 ? 'text' : 'password'}
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  className='w-full px-4 py-2 bg-transparent border border-gray-600 rounded-lg focus:outline-none focus:border-[#DBB88B]'
                  placeholder='Confirm your password'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword2(!showPassword2)}
                  className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400'
                >
                  {showPassword2 ? <Eye /> : <Eyeslash />}
                </button>
              </div>
            </div>

            {/* Sign Up Button */}
            <button
              type='submit'
              className='w-full py-2 bg-transparent border border-[#DBB88B] text-white rounded-full hover:bg-[#DBB88B] transition-colors text-sm mb-1 font-medium'
            >
              Sign Up
            </button>

            {/* Or Divider */}
            <div className='text-center py-0.5'>
              <span className='text-white font-medium'>Or</span>
            </div>

            {/* Google Sign Up */}
            <button
              type='button'
              onClick={handleGoogle}
              className='w-full py-2 bg-transparent border border-[#DBB88B] rounded-full hover:bg-[#DBB88B] transition-colors flex items-center justify-center gap-2 text-sm font-medium'
            >
              <Google size={25} />
              <span className='text-sm'>Sign up with Google</span>
            </button>
          </form>

          {/* Login Link */}
          <p className='mt-6 text-center text-[#6A6A6A] font-medium'>
            Already have an account?{' '}
            <Link href='/login' className='text-white hover:underline'>
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
