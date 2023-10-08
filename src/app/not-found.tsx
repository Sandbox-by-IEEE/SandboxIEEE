'use client';
import React from 'react';

import Button from '@/components/Button';

export default function Home() {
  return (
    <main className='relative flex min-h-screen min-w-screen bg-[#0F3015] flex-col items-center p-24'>
      <img
        src='404assets/Bintang_jatuh.svg'
        className='absolute right-2 w-[20%] -translate-y-20 translate-x-1 object-contain'
      />
      <img
        src='404assets/ring.svg'
        className='absolute right-0 top-0 w-[10%] -translate-x-10 object-contain'
      />
      {/*Background*/}
      <div className='absolute top-0 left-0 z-0 w-screen h-screen object-contain flex items-center justify-center'>
        <img
          src='404assets/Background_Sandbox_Logo.png'
          alt=''
          className='w-[80%] h-[80%] object-contain'
        />
      </div>

      {/*Content*/}
      <div className='relative bg-scroll justify-items-center w-fit h-fit flex flex-col items-center'>
        <img
          src='404assets/sand.png'
          alt=''
          className='z-50 object-contain w-[182px] h-[280px]'
        />
        <div className='flex flex-col items-center'>
          <h1 className='font-poppins text-[56px] font-semibold text-white'>
            Ups!
          </h1>
          <p className='font-poppins font-light text-[28px] text-white'>
            Halaman yang anda cari tidak ada.
          </p>
          <div className='translate-y-6'>
            <a href='./'>
              <Button color='gold'>Kembali</Button>
            </a>
          </div>
        </div>
      </div>
      <img
        src='404assets/Bintang_jatuh.svg'
        className='absolute rotate-[165deg] bottom-0 left-0 object-contain w-[20%] -translate-x-10 -translate-y-10'
      />
      <img
        src='404assets/Vector_155.svg'
        className='absolute bottom-0 left-1 object-contain w-[13%] translate-x-10 -translate-y-5 '
      />
    </main>
  );
}
