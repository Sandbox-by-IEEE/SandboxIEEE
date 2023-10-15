import React from 'react';

import Footer from '@/components/footer';

export default function Home() {
  return (
    <main className='bg-gradient-to-t from-[#051F12] to-[#061906] text-white flex min-h-screen flex-col items-center justify-between overflow-x-clip'>
      <nav className='h-20 w-full bg-slate-950'> replace with navbar </nav>
      <div className='min-h-screen max-w-[100vw]'>
        <div className='relative text-4xl font-extrabold text-[#9a7037] '>
          <p className='absolute top-0 left-0 text-[#FFE1B9] backdrop-blur-sm text-center'>
            Apasih Sandbox Itu?
          </p>
          <h2 className='z-10 text-center'>Apasih Sandbox Itu?</h2>
        </div>
      </div>
      <Footer />
    </main>
  );
}
