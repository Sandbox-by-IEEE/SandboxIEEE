'use client';

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
      <div className='aspect-square w-8 absolute z-10 top-[2000px] lg:top-[-20px] md:left-[-30px] rotate-[23deg]'>
        <Image src='/sparkle.svg' alt='' fill></Image>
      </div>
      <div className='aspect-square w-[25px] absolute z-10 md:bottom-[-10px] md:left-[-30px] rotate-[43deg]'>
        <Image src='/sparkle.svg' alt='' fill></Image>
      </div>
      <div className='aspect-square w-[25px] absolute z-10 md:top-[-20px] w-[32px] md:right-[-20px] rotate-[23deg]'>
        <Image src='/sparkle.svg' alt='' fill></Image>
      </div>
      <div className='aspect-square w-8 absolute z-10 md:bottom-[-10px] md:right-[-30px] rotate-[43deg]'>
        <Image src='/sparkle.svg' alt='' fill></Image>
      </div>
      <p className='absolute top-0 left-0 text-[#FFE1B9] backdrop-blur-sm bg-gradient-to-tr from-[#AB814E] to-[#FFFBB9] inline-block text-transparent bg-clip-text px-4 py-2'>
        {title}
      </p>
      <h2 className={`text-[#AB814E] text-[36px]`}>{title}</h2>
    </div>
  );
}

function Judule({ children }: { children: string }) {
  return (
    <h2
      style={{
        ['textShadow' as any]: '0px 0px 17.32px #BD9B65',
      }}
      className='bg-gradient-brown text-center text-transparent drop-shadow-[2px_3px_10px_10px_#bbcc9e] bg-clip-text text-3xl lg:text-[40px] font-museo-muderno p-1 font-bold'
    >
      {children}
    </h2>
  );
}

export default function PastEvent() {
  return (
    <>
      <main className='flex h-0 min-h-screen w-0 min-w-[100vw] bg-gradient-to-b from-[#0b2712] to-[#123b1a] flex-col overflow-y-scroll font-museo-muderno'>
        {/*OUR PAST EVENTS TITLE*/}
        <section
          className='w-full bg-gradient-to-b from-[#0b2712] to-[#123b1a] px-8 sm:px-10 md:px-28 lg:px-36 2xl:px-52 py-8 lg:py-10 xl:py-14 2xl:py-20 flex flex-col gap-12 lg:gap-20'
          style={{ background: 'rgba(7, 29, 16)' }}
        >
          <div className='absolute hidden left-[480px] top-[3625px] lg:block'></div>
          <div className='bg-gradient-brown border-2 border-solid border-[#AB814E] bg-transparent shadow-[0_0_0.9732px_#705229,0_0_1.9464px_#705229,0_0_6.8124px_#705229,0_0_13.6248px_#705229,0_0_23.3568px_#705229,0_0_40.8744px_#705229] p-1.5 rounded-2xl'>
            <div className='bg-gradient-green items-center justify-center p-4 lg:py-8 sm:px-10 md:px-12 lg:px-16 rounded-xl'>
              <Judule>Our Past Events </Judule>
            </div>
          </div>
        </section>

        {/*Mile Zero Project Section */}
        <section className='h-auto p-10 bg-gradient-to-b from-[#0b2712] to-[#123b1a] flex flex-col gap-16 '>
          <div className='w-full flex flex-row items-center justify-center'>
            <DecoratedTitle
              title='Mile Zero Project'
              colorClass='bg-gradient-to-tr from-[#AB814E] to-[#FFFBB9]'
            />
          </div>
          <div className=' flex flex-col lg:flex-row gap-12 justify-center items-center'>
            <div className='min-w-[300px] md:min-w-[450px] md:max-w-[450px] aspect-[4/3] rounded-xl overflow-hidden shadow-[0px_0px_20px_7px_#D8B88B] relative'>
              <Image src='/google-logo.png' alt='' fill objectFit='cover' />
            </div>

            <article className='w-full lg:w-[40%]'>
              <p className='text-[#FFE1B9] md:text-xl text-sm'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </article>
          </div>
          <GlassCarousel title='Dokumentasi MZP'></GlassCarousel>
        </section>

        {/*IEEEngagement Section */}
        <section className='h-auto p-10 bg-gradient-to-b from-[#0b2712] to-[#123b1a] flex flex-col gap-16 '>
          <div className='w-full flex flex-row items-center justify-center'>
            <DecoratedTitle
              title='IEEEngagement'
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
              <p className='text-[#FFE1B9] md:text-xl text-sm'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </article>
          </div>
          <GlassCarousel title='Dokumentasi IEEEngagement'></GlassCarousel>
        </section>
      </main>
    </>
  );
}
