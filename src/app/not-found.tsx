'use client';

import { Metadata } from 'next';
import Image from 'next/image';

import Footer from '@/components/footer';
import NavBar from '@/components/Navbar';

export default function Home() {
  return (
    <div className='flex flex-col min-h-screen bg-[#040B15]'>
      <NavBar />
      <main className="className='relative w-full z-5 flex flex-col min-h-screen justify-center items-center py-28 pt-14 lg:py-28 lg:pt-20 gap-10 lg:gap-16 px-8 sm:px-14 md:px-24 lg:px-44 relative font-poppins flex-grow text-white">
        <div className='text-center'>
          <h1 className='font-bold md:text-[96px] leading-normal text-[48px]'>
            404
          </h1>
          <h2 className='md:font-bold md:text-[32px] leading-[48px] text-[16px] font-normal'>
            Fixing there and there
          </h2>
        </div>
        {/* Shadow */}
        <div
          className='absolute md:w-[50%] md:h-[50%] md:rounded-[50%] w-[15%] h-[15%] opacity-50'
          style={{
            background:
              'radial-gradient(50% 50% at 50% 50%, rgba(159, 42, 57, 0.45) 0%, rgba(11, 53, 15, 0) 100%)',
            mixBlendMode: 'screen',
            transform: 'rotate(135deg)',
          }}
        />
        {/* Images */}
        <Image
          src='/404assets/left.png'
          alt='Left Decorative Image'
          className='absolute md:top-[10%] md:left-[15.5%] md:w-[35%] w-[60%] top-[12%] left-[-5%]'
          width={0}
          height={0}
          sizes='100vw'
          priority
        />
        <Image
          src='/404assets/right.png'
          alt='Right Decorative Image'
          className='absolute md:top-[10%] md:right-[8%] md:w-[39%] w-[58%] top-[25%] right-[-10%]'
          width={0}
          height={0}
          sizes='100vw'
          priority
        />
      </main>
      <Footer />
    </div>
  );
}

export const metadata: Metadata = {
  title: '404 | Sandbox IEEE ITB',
  description:
    "We couldn't find the page you're looking for. The page might have been removed or the URL may be incorrect. While we're fixing things, why not explore more of what we have to offer? You can head back to our homepage or check out our other exciting events and opportunities.",
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
  openGraph: {
    title: 'Sandbox IEEE ITB',
    description:
      "We couldn't find the page you're looking for. The page might have been removed or the URL may be incorrect. While we're fixing things, why not explore more of what we have to offer? You can head back to our homepage or check out our other exciting events and opportunities.",
    url: 'https://sandbox.ieeeitb.com/',
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
      "We couldn't find the page you're looking for. The page might have been removed or the URL may be incorrect. While we're fixing things, why not explore more of what we have to offer? You can head back to our homepage or check out our other exciting events and opportunities.",
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
