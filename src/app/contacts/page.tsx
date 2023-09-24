'use client';
import React from 'react';

import Breadcrumbs from '@/components/breadcrumps';

export default function Home() {
  return (
    <main className='bg-black flex min-h-screen flex-col items-center justify-between p-24'>
      <div>
        <Breadcrumbs />
        <a
          className='mt-4'
          href={'/contacts/managers'}
          target=''
          rel='noopener noreferrer'
        >
          <p className='text-white hover:underline mb-1'>new page</p>
        </a>
      </div>
    </main>
  );
}
