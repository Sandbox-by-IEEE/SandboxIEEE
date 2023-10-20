import { Metadata } from 'next';
import Image from 'next/image';

import CustomLink from '@/components/Link';

export default function Home() {
  return (
    <main className='relative flex h-screen overflow-hidden w-full bg-[#0F3015] flex-col items-center justify-center px-10'>
      <Image
        src='404assets/Bintang_jatuh.svg'
        className='absolute right-2 w-[20%] -translate-y-20 translate-x-1 object-contain transition-all duration-300'
        alt='Meteoroit'
        width={744}
        height={642}
      />
      <Image
        src='404assets/ring.svg'
        className='absolute right-0 -top-14 w-[25%] sm:w-[10%] aspect-square object-contain -translate-x-10 opacity-70 transition-all duration-300'
        alt='Ring'
        width={199}
        height={199}
      />
      {/*Background*/}
      <Image
        src={'/404assets/Background_Sandbox_Logo.png'}
        alt='Sandbox Logo'
        className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[408px] sm:w-[550px] md:w-[70%] 2xl:w-[50%] aspect-video object-contain transition-all duration-300'
        width={1315}
        height={887}
      />

      {/*Content*/}
      <div className='relative bg-scroll justify-items-center w-fit h-fit flex flex-col items-center'>
        <Image
          src={'/404assets/sand.png'}
          alt='Bucket Image'
          className='z-50 object-contain w-[124px] h-[251px] sm:w-[150px] lg:w-[182px] lg:h-[280px] transition-all duration-300'
          width={165}
          height={220}
        />
        <div className='flex flex-col items-center gap-2 lg:gap-4'>
          <h1 className='font-poppins lg:text-4xl text-3xl tracking-wide text-center font-extrabold text-white transition-all duration-300'>
            Oops!
          </h1>
          <h2 className='font-poppins font-light text-lg lg:text-2xl text-center text-white transition-all duration-300'>
            Looks like you&apos;ve taken a wrong turn. Let&apos;s get you back
            on track
          </h2>
          <div className='mt-2 lg:mt-4'>
            <CustomLink url='/' color='gold'>
              Home Page
            </CustomLink>
          </div>
        </div>
      </div>
      <Image
        src='404assets/Bintang_jatuh.svg'
        className='absolute rotate-[165deg] bottom-0 left-0 object-contain w-[20%] sm:-translate-x-10 -translate-x-20 -translate-y-10 transition-all duration-300'
        alt='Meteorit'
        width={744}
        height={642}
      />
      <Image
        src='404assets/Vector_155.svg'
        className='absolute bottom-0 left-1 object-contain w-[25%] sm:w-[13%] sm:translate-x-10  translate-x-15 -translate-y-5 transition-all duration-300'
        alt='Comet'
        width={236}
        height={206}
      />
    </main>
  );
}

export const metadata: Metadata = {
  title: '404 | Sandbox IEEE ITB',
  description:
    'The Sandbox by IEEE is a series of events providing opportunities to all young-minds through 3 key milestones consisting of a Grand Seminar, 2 competitions namely ProtoTech Contest (a practical electrical engineering contest) and Technovate Paper (a research and technical documents) Competition, and Exhibition. This event invites experts from various fields of work as trainers, judges and webinar speakers. Finalists from both ProtoTech Contest and TechNovate Paper Competition will be given time to pitch and showcase their products in front of the judging panels on the Exhibition day. All the final winners from both competitions will be bestowed during this time. The objective of this event is to establish innovative and practical solutions for a developing country like Indonesia. Additionally, this event also aims to educate the local society by unveiling and enhancing tools that foster tranquility and ease.',
  generator: 'Next.js',
  applicationName: 'Sandbox IEEE ITB',
  colorScheme: 'dark',
  openGraph: {
    title: 'Sandbox IEEE ITB',
    description:
      'The Sandbox by IEEE is a series of events providing opportunities to all young-minds through 3 key milestones consisting of a Grand Seminar, 2 competitions namely ProtoTech Contest (a practical electrical engineering contest) and Technovate Paper (a research and technical documents) Competition, and Exhibition. This event invites experts from various fields of work as trainers, judges and webinar speakers. Finalists from both ProtoTech Contest and TechNovate Paper Competition will be given time to pitch and showcase their products in front of the judging panels on the Exhibition day. All the final winners from both competitions will be bestowed during this time. The objective of this event is to establish innovative and practical solutions for a developing country like Indonesia. Additionally, this event also aims to educate the local society by unveiling and enhancing tools that foster tranquility and ease.',
    url: 'https://sandbox.ieeeitb.com/',
    siteName: 'Sandbox IEEE ITB',
    images: [
      {
        url: 'https://sandbox.ieeeitb.com/link-preview.png',
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
      'The Sandbox by IEEE is a series of events providing opportunities to all young-minds through 3 key milestones consisting of a Grand Seminar, 2 competitions namely ProtoTech Contest (a practical electrical engineering contest) and Technovate Paper (a research and technical documents) Competition, and Exhibition. This event invites experts from various fields of work as trainers, judges and webinar speakers. Finalists from both ProtoTech Contest and TechNovate Paper Competition will be given time to pitch and showcase their products in front of the judging panels on the Exhibition day. All the final winners from both competitions will be bestowed during this time. The objective of this event is to establish innovative and practical solutions for a developing country like Indonesia. Additionally, this event also aims to educate the local society by unveiling and enhancing tools that foster tranquility and ease.',
    images: [
      {
        url: 'https://sandbox.ieeeitb.com/link-preview.png',
        width: 1200,
        height: 630,
        alt: 'Sandbox IEEE ITB Logo',
      },
    ],
  },
};
