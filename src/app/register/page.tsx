'use client';
import Link from 'next/link';
import React, { useState } from 'react';

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

export default function Home() {
  const [text, setText] = useState('');

  const InputColumn = ({ label, inputs }) => (
    <div>
      <p>{label}</p>
      {inputs.map((input, index) => (
        <TextInput
          key={index}
          text={text}
          setText={setText}
          color='white'
          fullwidth={true}
          type={input.type}
          placeholder={input.placeholder}
        />
      ))}
    </div>
  );

  const inputsData = [
    [
      {
        label: 'Email',
        inputs: [{ type: 'email', placeholder: 'Your email address' }],
      },
      {
        label: 'Username',
        inputs: [{ type: 'text', placeholder: 'Enter a username' }],
      },
      {
        label: 'Password',
        inputs: [{ type: 'password', placeholder: 'Enter a password' }],
      },
    ],
  ];

  return (
    <main className='h-screen font-poppins text-sm sm:text-base flex bg-white flex-col items-center'>
      <div className='w-screen h-[3000px] flex'>
        <div className='w-[0%] lg:w-[50%] justify-center z-10'></div>
        <div className='relative w-[100%] lg:w-[50%] bg-[url("/assets/RelogBackground.png")] bg-cover bg-no-repeat text-white bg-black items-center justify-center'>
          <div className='flex w-full h-full'>
            <div className='absolute right-6 top-6 lg:right-10 lg:top-10'>
              <Smalllogo size={120} />
            </div>
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
            <div className='w-full overflow-hidden z-10 transition-all duration-100 my-[60px] px-[18%] sm:px-[20%] flex flex-col items-center justify-center'>
              <div className='block justify-center'>
                <Logo size={25} />
              </div>
              <p className='my-4'>Create a new account</p>
              <div className='w-full'>
                <div className='h-[35px]'>
                  <Button color='white' isFullWidth={true}>
                    <a className='text-black flex gap-3 w-full items-center justify-center font-poppins font-semibold'>
                      <Google size={25} />
                      Continue with Google
                    </a>
                  </Button>
                </div>
                <div className='relative flex py-[12px] items-center'>
                  <div className='ml-8 md:ml-0 flex-grow border-t border-white-600'></div>
                  <span className='flex-shrink mx-4 text-white-400'>or</span>
                  <div className='mr-8 md:mr-0 flex-grow border-t border-white-600'></div>
                </div>
              </div>
              {inputsData.map((pair, index) => (
                <div
                  className='flex flex-col gap-2 w-full px-0 sm:px-[15%]'
                  key={index}
                >
                  {pair.map((columnData, columnIndex) => (
                    <InputColumn
                      key={columnIndex}
                      label={columnData.label}
                      inputs={columnData.inputs}
                    />
                  ))}
                </div>
              ))}
              <div className='my-5 w-[100px] h-[40px]'>
                <Button color='gold' isFullWidth={true}>
                  Sign Up
                </Button>
              </div>
              <p className=''>
                Already have an account?{' '}
                <Link className='hover:underline text-[#DBB88B]' href=''>
                  Login
                </Link>
              </p>
            </div>
          </div>
          <div className='absolute right-0 h-[25px] bg-no-repeat bg-[url("/assets/Ieee.png")] bg-contain'></div>
        </div>
      </div>
      {/* You can map through the filteredData to display the results */}
    </main>
  );
}
