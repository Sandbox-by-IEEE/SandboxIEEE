import Image from 'next/image';
import React from 'react';

import CustomLink from '@/components/Link';

export default function CommingSoonPage() {
  return (
    <main className='relative flex h-screen overflow-hidden w-full bg-[#0F3015] flex-col items-center justify-center px-10'>
      <Image
        src='/coming-soon/Bintang_jatuh.svg'
        className='absolute right-2 w-[20%] -translate-y-20 translate-x-1 object-contain transition-all duration-300'
        alt='tes'
        width={744}
        height={642}
      />
      <Image
        src='/coming-soon/ring.svg'
        className='absolute right-0 -top-14 w-[25%] sm:w-[10%] -translate-x-10 object-contain transition-all duration-300'
        alt='tes'
        width={199}
        height={199}
      />
      {/*Background*/}
      <Image
        src={'/coming-soon/Background_Sandbox_Logo.png'}
        alt='Sandbox Logo'
        className='absolute animate-pulse top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[408px] sm:w-[550px] md:w-[70%] 2xl:w-[50%] aspect-video object-contain transition-all duration-300'
        width={1315}
        height={887}
      />

      {/*Content*/}
      <div className='relative bg-scroll justify-items-center w-fit h-fit flex flex-col items-center'>
        <Image
          src={'/coming-soon/Happy.png'}
          alt='Bucket Image'
          className='z-50 object-contain animate-bounce w-[124px] h-[251px] sm:w-[150px] lg:w-[182px] lg:h-[280px] transition-all duration-300'
          width={165}
          height={220}
        />
        <div className='flex flex-col items-center gap-2 lg:gap-4'>
          <h1 className='font-poppins animate-marquee italic lg:text-4xl text-3xl tracking-wide text-center font-extrabold text-white transition-all duration-300'>
            Coming Soon!
          </h1>
          <h2 className='font-poppins text-lg italic lg:text-2xl text-center text-white transition-all duration-300'>
            Stay tuned! Something exciting is on the way.
          </h2>
          <div className='mt-2 lg:mt-4'>
            <CustomLink
              url='https://www.instagram.com/thesandbox.itb/'
              color='gold'
            >
              Our Instagram
            </CustomLink>
          </div>
        </div>
      </div>
      <Image
        src='/coming-soon/Bintang_jatuh.svg'
        className='absolute rotate-[165deg] bottom-0 left-0 object-contain w-[20%] sm:-translate-x-10 -translate-x-20 -translate-y-10 transition-all duration-300'
        alt='tes'
        width={744}
        height={642}
      />
      <Image
        src='/coming-soon/Vector_155.svg'
        className='absolute bottom-0 left-1 object-contain w-[25%] sm:w-[13%] sm:translate-x-10  translate-x-15 -translate-y-5 transition-all duration-300'
        alt='tes'
        width={236}
        height={206}
      />
    </main>
  );
}
