import { type Metadata } from 'next';
import Image from 'next/image';
import React from 'react';


export default function ComingSoonPage() {
  return (
    <main
      className='relative flex h-screen w-full flex-col items-center justify-center px-10'
      style={{
        backgroundImage: `url('/coming-soon-assets/background.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden',
      }}
    >
      <div className='flex flex-col lg:flex-row items-center justify-center space-x-4 relative'>
        {/* Left Image */}
        <div
          className='absolute left-[-40px] top-[10%] transform -translate-y-1/2 z-0
          sm:left-[-30px] sm:top-[10%]
          md:left-[-70px] md:top-[30%]
          lg:left-[-80px] lg:top-[65%]'
        >
          <Image
            src={'/coming-soon-assets/IMG_6798.png'}
            alt='Bucket Image'
            width={182}
            height={280}
            className='w-[116.48px] h-[179.2px] md:w-[145.6px] md:h-[224px] lg:w-[182px] lg:h-[280px] object-contain transition-all duration-300'
            priority
          />
        </div>

        {/* Center */}
        <div className='relative flex flex-col items-center gap-2 lg:gap-4 z-10 px-4 w-full -mt-6'>
          {/* Text */}
          <div className='text-white text-center relative'>
            <h1 className='font-poppins text-5xl lg:text-6xl tracking-wide font-bold'>
              Coming Soon
            </h1>
            <h2 className='font-poppins text-sm lg:text-xl mt-5 font-semibold'>
              Getting things ready.
            </h2>
          </div>
        </div>

        {/* Right Image */}
        <div
          className='absolute right-[-40px] top-1/3 transform -translate-y-1/3 z-20
          sm:right-[-40px]
          md:right-[-100px] md:top-[35%]
          lg:right-[-70px] lg:top-1/2'
        >
          <Image
            src='/coming-soon-assets/IMG_6800.png'
            alt='Bucket Image'
            width={262.08}
            height={403.2}
            className='w-[130px] h-[200px] md:w-[209.664px] md:h-[322.56px] lg:w-[262.08px] lg:h-[403.2px] object-contain transition-all duration-300'
            priority
          />
        </div>
      </div>
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
