'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const TitleSection = dynamic(() => import('@/components/TitleSection'), {
  ssr: false,
});

export default function FinalProjectVote() {
  const items = [
    { id: 1, label: 'Item 1' },
    { id: 2, label: 'Item 2' },
    { id: 3, label: 'Item 3' },
  ];

  return (
    <main className='relative flex h-screen overflow-hidden w-full bg-[#0F3015] flex-col items-center justify-start py-16 px-10'>
      <div className='scale-125'>
        <TitleSection>Vote For Final Project&apos; s Team</TitleSection>
      </div>
      <p className='text-white font-poppins max-w-[70em] py-16 tracking-widest font-extralight'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a ipsum
        at sapien dignissim interdum sit amet sit amet nisl. Vestibulum quis
        volutpat ipsum, consequat blandit mi. Vivamus id porta dolor, vel
        tristique libero. Cras scelerisque purus in quam posuere blandit. Lorem
        ipsum dolor sit amet, consectetur adipiscing
      </p>
      <section className='w-full flex flex-row pt-2 items-center justify-evenly'>
        {items.map((item, idx) => (
          <div
            key={item.id}
            className={`carousel-item bg-gradient-to-b from-[#FFE1B9] to-[#AB814EDB] w-[28%] min-h-[10em] rounded-lg flex flex-col justify-center items-center font-bold text-3xl py-8 gap-8 cursor-pointer transform transition-transform ${
              idx === 1 && 'scale-110'
            }`}
          >
            <p>{item.label}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
