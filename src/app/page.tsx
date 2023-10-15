'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/payment');
  }, [router]);

  return (
    <main className='bg-gradient-to-t from-[#051F12] to-[#061906] text-white flex min-h-screen flex-col items-center justify-between overflow-x-clip'>
      <nav className='fixed top-0 left-0 h-20 w-full bg-slate-950 z-[100]'>
        replace with navbar{' '}
      </nav>
    </main>
  );
}
