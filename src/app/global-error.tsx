'use client';

import { Metadata } from 'next';
import Image from 'next/image';

import Button from '@/components/Button';
import CustomLink from '@/components/Link';

export default function GlobalError({
  // eslint-disable-next-line unused-imports/no-unused-vars
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <main className='relative flex h-screen overflow-hidden w-full bg-[#0F3015] flex-col items-center justify-center px-10'>
          <Image
            src='/404assets/Bintang_jatuh.svg'
            className='absolute -right-20 lg:right-2 w-[50%] sm:w-[20%] -translate-y-20 translate-x-1 object-contain transition-all duration-300'
            alt='Meteoroit'
            width={744}
            height={642}
          />
          <Image
            src='/404assets/Ring.svg'
            className='absolute right-0 -top-14 w-[25%] sm:w-[10%] aspect-square object-contain -translate-x-10 opacity-70 transition-all duration-300'
            alt='Ring'
            width={199}
            height={199}
          />
          {/*Background*/}
          <Image
            src={'/500.png'}
            alt='Sandbox Logo'
            className='absolute top-1/3 inset-0 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse origin-center w-[308px] sm:w-[550px] md:w-[70%] 2xl:w-[50%] aspect-video object-contain transition-all duration-300'
            sizes='(max-width: 640px) 408px, (max-width: 768px) 550px, (max-width: 1024px) 70%, 50%'
            priority
            width={1315}
            height={887}
          />

          {/*Content*/}
          <div className='relative bg-scroll justify-items-center w-fit h-fit flex flex-col items-center'>
            <Image
              src={'/404assets/sand.png'}
              alt='Bucket Image'
              className='z-50 object-contain animate-shake w-[124px] h-[251px] sm:w-[150px] lg:w-[182px] lg:h-[280px] transition-all duration-300'
              width={165}
              height={220}
            />
            <div className='flex flex-col items-center gap-3 lg:gap-6'>
              <h1 className='font-poppins italic animate-ghost-left lg:text-5xl text-4xl tracking-wide text-center font-extrabold text-white transition-all duration-300'>
                Oops!
              </h1>
              <h2 className='font-poppins italic text-lg lg:text-2xl text-center text-white transition-all duration-300'>
                Something went wrong. Let&apos;s get you back
              </h2>
              <div className='font-poppins items-center justify-center text-white text-base mt-2 lg:mt-4 flex flex-col gap-4'>
                <Button color='gold' onClick={() => reset()}>
                  Try Again
                </Button>
                <p className='flex flex-col items-center justify-center gap-2'>
                  If errors still occurs, contact us on
                  <span>
                    <CustomLink color='gold' url='/contact-us'>
                      Contact-us
                    </CustomLink>
                  </span>
                </p>
              </div>
            </div>
          </div>
          <Image
            src='/404assets/Bintang_jatuh.svg'
            className='absolute rotate-[165deg] bottom-0 left-0 object-contain w-[20%] sm:-translate-x-10 -translate-x-20 -translate-y-10 transition-all duration-300'
            alt='Meteorit'
            width={744}
            height={642}
          />
          <Image
            src='/404assets/Vector_155.svg'
            className='absolute bottom-0 left-1 object-contain w-[25%] sm:w-[13%] sm:translate-x-10  translate-x-15 -translate-y-5 transition-all duration-300'
            alt='Comet'
            width={236}
            height={206}
          />
        </main>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: '500 | Sandbox IEEE ITB',
  description:
    "We're sorry, but it looks like we've encountered an internal server error (Error 500) and we're unable to process your request at the moment. Our team has been notified and we're working hard to resolve the issue as quickly as possible.",
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
      "We're sorry, but it looks like we've encountered an internal server error (Error 500) and we're unable to process your request at the moment. Our team has been notified and we're working hard to resolve the issue as quickly as possible.",
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
      "We're sorry, but it looks like we've encountered an internal server error (Error 500) and we're unable to process your request at the moment. Our team has been notified and we're working hard to resolve the issue as quickly as possible.",
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
