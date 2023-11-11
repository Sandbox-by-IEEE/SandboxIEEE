import { type Metadata } from 'next';
import Image from 'next/image';
import React from 'react';

import CustomLink from '@/components/Link';

export default function CommingSoonPage() {
  return (
    <main className='relative flex h-screen overflow-hidden w-full bg-[#0F3015] flex-col items-center justify-center px-10'>
      <Image
        src='/coming-soon-assets/Bintang_jatuh.svg'
        className='absolute -right-20 lg:right-2 w-[50%] sm:w-[20%] -translate-y-20 translate-x-1 object-contain transition-all duration-300'
        alt='Meteoroit'
        width={744}
        height={642}
      />
      <Image
        src='/coming-soon-assets/Ring.svg'
        className='absolute right-0 -top-14 w-[25%] sm:w-[10%] -translate-x-10 object-contain transition-all duration-300'
        alt='Ring'
        width={199}
        height={199}
      />
      {/*Background*/}
      <Image
        src={'/coming-soon-assets/Background_Sandbox_Logo.png'}
        alt='Sandbox Logo'
        className='absolute animate-pulse top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[408px] sm:w-[550px] md:w-[70%] 2xl:w-[50%] aspect-video object-contain transition-all duration-300'
        sizes='(max-width: 640px) 408px, (max-width: 768px) 550px, (max-width: 1024px) 70%, 50%'
        priority
        width={1315}
        height={887}
      />

      {/*Content*/}
      <div className='relative bg-scroll justify-items-center w-fit h-fit flex flex-col items-center'>
        <Image
          src={'/coming-soon-assets/Happy.png'}
          alt='Bucket Image'
          className='z-[20] object-contain animate-bounce w-[124px] h-[251px] sm:w-[150px] lg:w-[182px] lg:h-[280px] transition-all duration-300'
          width={165}
          height={220}
        />
        <div className='flex flex-col items-center gap-2 lg:gap-4'>
          <h1 className='font-poppins animate-walk italic lg:text-4xl text-3xl tracking-wide text-center font-extrabold text-white transition-all duration-300'>
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
        src='/coming-soon-assets/Bintang_jatuh.svg'
        className='absolute rotate-[165deg] bottom-0 left-0 object-contain w-[20%] sm:-translate-x-10 -translate-x-20 -translate-y-10 transition-all duration-300'
        alt='Meteorit'
        width={744}
        height={642}
      />
      <Image
        src='/coming-soon-assets/Vector_155.svg'
        className='absolute bottom-0 left-1 object-contain w-[25%] sm:w-[13%] sm:translate-x-10  translate-x-15 -translate-y-5 transition-all duration-300'
        alt='GLowing Comet'
        width={236}
        height={206}
      />
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Coming Soon | Sandbox IEEE ITB',
  description:
    "Something exciting is on the way! Our team is working hard behind the scenes to bring you a new and improved experience. While we fine-tune the final details, we wanted to give you a sneak peek of what's coming. Get ready for a world of innovation, opportunities, and engaging content that will inspire and empower you. Make sure to sign up for updates so you can be the first to know when we launch. The wait will be worth it - stay tuned!",
  generator: 'Next.js',
  category: 'Events',
  applicationName: 'Sandbox IEEE ITB',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'Sandbox',
    'Sandbox IEEE ITB',
    'Sandbox ITB',
    'Sandbox IEEE',
    'IEEE ITB',
    'ITB',
    'Lomba',
    'TPC',
    'PTC',
  ],
  colorScheme: 'normal',
  metadataBase: new URL('https://sandbox.ieeeitb.com/'),
  alternates: {
    canonical: '/coming-soon',
    languages: {
      'en-US': '/en-US/coming-soon',
      'id-ID': '/id-ID/coming-soon',
    },
  },
  openGraph: {
    title: 'Sandbox IEEE ITB',
    description:
      "Something exciting is on the way! Our team is working hard behind the scenes to bring you a new and improved experience. While we fine-tune the final details, we wanted to give you a sneak peek of what's coming. Get ready for a world of innovation, opportunities, and engaging content that will inspire and empower you. Make sure to sign up for updates so you can be the first to know when we launch. The wait will be worth it - stay tuned!",
    url: 'https://sandbox.ieeeitb.com/coming-soon',
    siteName: 'Sandbox IEEE ITB',
    images: [
      {
        url: 'https://www.datocms-assets.com/104656/1697807711-sandbox.png',
        width: 1200,
        height: 630,
        alt: 'Sandbox IEEE ITB Logo',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sandbox IEEE ITB',
    description:
      "Something exciting is on the way! Our team is working hard behind the scenes to bring you a new and improved experience. While we fine-tune the final details, we wanted to give you a sneak peek of what's coming. Get ready for a world of innovation, opportunities, and engaging content that will inspire and empower you. Make sure to sign up for updates so you can be the first to know when we launch. The wait will be worth it - stay tuned!",
    images: [
      {
        url: 'https://www.datocms-assets.com/104656/1697807711-sandbox.png',
        width: 1200,
        height: 630,
        alt: 'Sandbox IEEE ITB Logo',
      },
    ],
  },
};
