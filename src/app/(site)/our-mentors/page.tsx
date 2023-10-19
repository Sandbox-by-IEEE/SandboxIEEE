'use client';
import React from 'react';

import MentorCarousel from '@/components/mentorsCarousel';

export default function Home() {
  return (
    <main className='w-screen bg-[#0b341a] text-white flex min-h-screen flex-col items-center justify-between'>
      <section className='w-screen bg-gradient-to-b from-[rgba(7,29,16,0.45)] to-[#0F3015]'>
        <div className='h-full w-screen flex flex-col items-center justify-center my-20'>
          <MentorCarousel />
        </div>
      </section>
      {/* You can map through the filteredData to display the results */}
    </main>
  );
}
