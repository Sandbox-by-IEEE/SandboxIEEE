'use client';

import PrototechContest from '@/app/tpc/components/PrototechContest';
import Image from 'next/image';
import React, { useState } from 'react';

type GlassCarousel = {
  title: string;
  photos?: string[];
};

function CarouselButtons({ numActive, setNumActive, capacity }) {
  return (
    <div className='w-[60%] lg:w-[9%] relative flex flex-row justify-between items-center'>
      {Array.from(Array(capacity), (_, i) => (
        <div key={i} className='relative rounded-full'>
          <button
            className='rounded-full aspect-square w-4  absolute'
            onClick={() => setNumActive(i + 1)}
          >
            <Image
              src={`${
                i + 1 != numActive ? '/lightcircle.svg' : '/darkcircle.svg'
              }`}
              alt=''
              fill
            />
          </button>
        </div>
      ))}
    </div>
  );
}

function GoldenBorderBox({ children }) {
  return (
    <div className='h-full px-0.5 py-0.5 bg-gradient-to-tr from-[#AB814E] to-[#FFFBB9] rounded shadow-lg shadow-[0px_0px_5px_1px_rgba(171,129,78,0.8)] m-4 w-full h-full'>
      {' '}
      <div className='w-full h-full bg-green-primary rounded shadow-lg shadow-[0px_0px_5px_1px_rgba(171,129,78,0.8)_inset] p-4 flex flex-row justify-center items-center relative'>
        {children}
      </div>
    </div>
  );
}

function GlassCarousel({ title, photos }: GlassCarousel) {
  const [numActive, setNumActive] = useState<number>(1);
  const photoss = ['/checked.svg', '/google-logo.png'];
  return (
    <>
      <div className='h-[340px] lg:h-[510px] w-full rounded-xl border-2 bg-gradient-to-br from-[#84694875] via-white/5 to-[#84694875] flex flex-col items-center gap-8 justify-center p-4'>
        <div className='relative  text-lg lg:text-4xl font-extrabold text-[#9a7037] '>
          <p className='absolute top-0 left-0 text-[#FFE1B9] backdrop-blur-sm'>
            {title}
          </p>
          <h2 className='z-10'>{title}</h2>
        </div>

        <div className='aspect-video w-4/5 lg:w-1/2 relative'>
          <div className='absolute w-full h-full duration-500'>
            <Image fill alt='' src={photoss[numActive - 1]} objectFit='cover' />
          </div>
        </div>

        <CarouselButtons
          numActive={numActive}
          setNumActive={setNumActive}
          capacity={5}
        />
      </div>
    </>
  );
}

function DecoratedTitle({
  title,
  colorClass,
}: {
  title: string;
  colorClass?: string;
}) {
  return (
    <div className='relative text-4xl font-extrabold text-[#9a7037] px-4 py-2 inline-block'>
      <div className='aspect-square w-8 absolute z-10 top-[-20px] left-[-30px] rotate-[23deg]'>
        <Image src='/sparkle.svg' alt='' fill></Image>
      </div>
      <div className='aspect-square w-[25px] absolute z-10 bottom-[-10px] left-[-30px] rotate-[43deg]'>
        <Image src='/sparkle.svg' alt='' fill></Image>
      </div>
      <div className='aspect-square w-[25px] absolute z-10 top-[-20px] w-[32px] right-[-20px] rotate-[23deg]'>
        <Image src='/sparkle.svg' alt='' fill></Image>
      </div>
      <div className='aspect-square w-8 absolute z-10 bottom-[-10px] right-[-30px] rotate-[43deg]'>
        <Image src='/sparkle.svg' alt='' fill></Image>
      </div>
      <p className='absolute top-0 left-0 text-[#FFE1B9] backdrop-blur-sm bg-gradient-to-tr from-[#AB814E] to-[#FFFBB9] inline-block text-transparent bg-clip-text px-4 py-2'>
        {title}
      </p>
      <h2 className={`text-[#AB814E] text-[36px]`}>{title}</h2>
    </div>
  );
}

const ApaItu = () => {
  <section className='h-auto p-10 bg-gradient-to-b from-[#0b2712] to-[#123b1a] flex flex-col gap-16 '>
    <div className='w-full flex flex-row items-center justify-center'>
      <DecoratedTitle
        title='Mile Zero Project'
        colorClass='bg-gradient-to-tr from-[#AB814E] to-[#FFFBB9]'
      />
    </div>
    <div className='w-full flex flex-col lg:flex-row gap-8 justify-center items-center'>
      <div className='aspect-video w-full lg:w-[40%] relative'>
        <div className='absolute w-full aspect-video duration-500'>
          <Image fill alt='' src={'/google-logo.png'} objectFit='cover' />
        </div>
      </div>
      <article className='w-full lg:w-[40%]'>
        <p className='text-[#FFE1B9] text-sm'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </article>
    </div>
    <GlassCarousel title='Dokumentasi MZP'></GlassCarousel>
  </section>;
};

export default ApaItu;
