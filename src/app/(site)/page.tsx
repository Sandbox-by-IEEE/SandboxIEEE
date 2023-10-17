'use client';
import { useSession } from 'next-auth/react';
import React from 'react';

export default function Home() {
  const { data: session, status } = useSession();
  console.log(session);
  return (
    <main className='bg-black text-white flex min-h-screen flex-col items-center justify-between p-24'>
      <div>
        <a href={'../register'} target='' rel='noopener noreferrer'>
          <p className='text-white hover:underline mb-1'>Register</p>
        </a>
      </div>
      {/* You can map through the filteredData to display the results */}
    </main>
  );
}
