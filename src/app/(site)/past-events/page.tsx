import {
  Record,
  type StructuredText as ST,
} from 'datocms-structured-text-utils';
import Image from 'next/image';
import React from 'react';
import { StructuredText } from 'react-datocms/structured-text';

import GlassCarousel from '@/components/past-events/GlassCarousel';
import { performRequest } from '@/lib/datocms';

const CMS_QUERY = `
query MyQuery {
  allPastEventsPages {
    mzpMainImage {
      alt
      url
    }
    mzpText {
      blocks
      links
      value
    }
  }

  allDokumentasiPastEvents {
    dokumentasiPastEvents {
      url
    }
  }
}
`;

type PastEventsPage = {
  allPastEventsPages: {
    mzpMainImage: {
      alt: null | string;
      url: string;
    };
    mzpText: ST<Record, Record> | null | undefined;
  }[];
};

type DokumPastEventsPage = {
  allDokumentasiPastEvents: {
    dokumentasiPastEvents: {
      url: string;
    }[];
  }[];
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

function DecoratedTitle({
  title,
  colorClass,
}: {
  title: string;
  colorClass?: string;
}) {
  return (
    <div className='relative text-4xl font-extrabold text-[#9a7037] px-4 py-2 inline-block'>
      <div className='aspect-square w-4 md:w-8 absolute z-10 top-[-5px] left-[-5px] md:top-[-20px] md:left-[-30px] rotate-[23deg]'>
        <Image src='/sparkle.svg' alt='' fill></Image>
      </div>
      <div className='aspect-square w-4 md:w-[25px] absolute z-10 bottom-[-5px] left-[-5px] md:bottom-[-10px] md:left-[-30px] rotate-[43deg]'>
        <Image src='/sparkle.svg' alt='' fill></Image>
      </div>
      <div className='aspect-square w-4 md:w-[25px] absolute z-10 top-[-5px] right-[-5px] md:top-[-20px] w-[32px] md:right-[-20px] rotate-[23deg]'>
        <Image src='/sparkle.svg' alt='' fill></Image>
      </div>
      <div className='aspect-square w-4 md:w-8 absolute z-10 bottom-[-5px] right-[-5px] md:bottom-[-10px] md:right-[-30px] rotate-[43deg]'>
        <Image src='/sparkle.svg' alt='' fill></Image>
      </div>
      <p className='absolute top-0 left-0 text-[30px] md:text-[36px] text-[#FFE1B9] backdrop-blur-sm bg-gradient-to-tr from-[#AB814E] to-[#FFFBB9] inline-block text-transparent bg-clip-text px-4 py-2'>
        {title}
      </p>
      <h2 className={`text-[#AB814E] text-[30px] md:text-[36px]`}>{title}</h2>
    </div>
  );
}

function Judule({ children }: { children: string | React.ReactNode }) {
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

export default async function PastEvent() {
  const {
    allPastEventsPages,
    allDokumentasiPastEvents,
  }: {
    allPastEventsPages: PastEventsPage;
    allDokumentasiPastEvents: DokumPastEventsPage;
  } = await performRequest({
    query: CMS_QUERY,
    revalidate: 0,
  });

  return (
    <>
      <main className='flex h-0 min-h-screen w-0 min-w-[100vw] bg-gradient-to-b from-[#0b2712] to-[#123b1a] flex-col overflow-y-scroll font-museo-muderno overflow-x-hidden'>
        {/*OUR PAST EVENTS TITLE*/}

        <section
          className='w-full bg-gradient-to-b from-[#0b2712] to-[#123b1a] px-8 sm:px-10 md:px-28 lg:px-36 2xl:px-52 py-8 lg:py-10 xl:py-14 2xl:py-20 flex flex-col gap-12 lg:gap-20 relative'
          style={{ background: 'rgba(7, 29, 16)' }}
        >
          <div className='bg-gradient-brown border-2 border-solid border-[#AB814E] bg-transparent shadow-[0_0_0.9732px_#705229,0_0_1.9464px_#705229,0_0_6.8124px_#705229,0_0_13.6248px_#705229,0_0_23.3568px_#705229,0_0_40.8744px_#705229] p-1.5 rounded-2xl'>
            <div className='bg-gradient-green items-center justify-center p-4 lg:py-8 sm:px-10 md:px-12 lg:px-16 rounded-xl'>
              <Judule>
                <div className='w-full flex flex-row items-center justify-center'>
                  <DecoratedTitle
                    title='Our past Events'
                    colorClass='bg-gradient-to-tr from-[#AB814E] to-[#FFFBB9]'
                  />
                </div>
              </Judule>
            </div>
          </div>
        </section>

        {/*Mile Zero Project Section */}
        <section className='h-auto p-10 bg-gradient-to-b from-[#0b2712] to-[#123b1a] flex flex-col gap-16 relative'>
          <div className='aspect-square h-72 absolute z-10 left-0 top-[100px]'>
            <Image src='/comet.svg' alt='commet' fill />
          </div>

          <div className='aspect-square h-72 absolute z-10 top-[500px] right-0 rotate-[180deg]'>
            <Image src='/comet.svg' alt='commet' fill />
          </div>

          <div className='aspect-square h-36 absolute z-10 top-[750px] left-[-10px] rotate-[180deg]'>
            <Image src='/StarDecoration2.svg' alt='commet' fill />
          </div>

          <Judule>Mile Zero Project</Judule>

          <div className=' flex flex-col lg:flex-row gap-12 justify-center items-center'>
            <div className='min-w-[300px] md:min-w-[450px] md:max-w-[450px] aspect-[4/3] rounded-xl overflow-hidden shadow-[0px_0px_20px_7px_#D8B88B] relative'>
              <Image
                src={allPastEventsPages[1].mzpMainImage.url}
                alt={allPastEventsPages[1].mzpMainImage.alt ?? ''}
                fill
                objectFit='cover'
              />
            </div>

            <article className='w-full lg:w-[40%] text-[#FFE1B9] md:text-xl text-sm self-start font-poppins'>
              <StructuredText data={allPastEventsPages[1].mzpText} />
            </article>
          </div>
          <GlassCarousel
            title='Dokumentasi MZP'
            photos={allDokumentasiPastEvents[1].dokumentasiPastEvents}
          />
        </section>

        <section className='h-auto p-10 bg-gradient-to-b from-[#0b2712] to-[#123b1a] flex flex-col gap-16 relative'>
          <div className='aspect-square h-16 absolute z-10 top-[200px] right-[-10px] rotate-[180deg]'>
            <Image src='/StarDecoration1.svg' alt='commet' fill />
          </div>
          <Judule>
            <div className='w-full flex flex-row items-center justify-center'>
              <DecoratedTitle
                title='IEEEngagement'
                colorClass='bg-gradient-to-tr from-[#AB814E] to-[#FFFBB9]'
              />
            </div>
          </Judule>

          <div className=' flex flex-col lg:flex-row gap-12 justify-center items-center'>
            <div className='min-w-[300px] md:min-w-[450px] md:max-w-[450px] aspect-[4/3] rounded-xl overflow-hidden shadow-[0px_0px_20px_7px_#D8B88B] relative'>
              <Image
                src={allPastEventsPages[0].mzpMainImage.url}
                alt={allPastEventsPages[0].mzpMainImage.alt ?? ''}
                fill
                objectFit='cover'
              />
            </div>

            <article className='w-full lg:w-[40%] text-[#FFE1B9] md:text-xl text-sm self-start font-poppins'>
              <StructuredText data={allPastEventsPages[0].mzpText} />
            </article>
          </div>
          <GlassCarousel
            title='Dokumentasi MZP'
            photos={allDokumentasiPastEvents[0].dokumentasiPastEvents}
          />
        </section>
      </main>
    </>
  );
}
