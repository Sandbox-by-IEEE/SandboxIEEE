import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import React from 'react';
import { StructuredText } from 'react-datocms/structured-text';

import { FAQ } from '@/components/FAQ';
import Footer from '@/components/footer';
import Explosion from '@/components/icons/explosion';
import Star4 from '@/components/icons/star4';
import Star5 from '@/components/icons/star5';
import Star6 from '@/components/icons/star6';
import Star7 from '@/components/icons/star7';
import Star8 from '@/components/icons/star8';
import Star9 from '@/components/icons/Star9';
import Star10 from '@/components/icons/star10';
import Star11 from '@/components/icons/star11';
import Starburst from '@/components/icons/starburst';
import CustomLink from '@/components/Link';
import Timeline from '@/components/Timeline';
import { performRequest } from '@/lib/datocms';
import { TPCProps } from '@/types/tpc-type';

const Countdown = dynamic(() => import('@/components/Countdown'), {
  ssr: false,
});

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

const TPC = async () => {
  // Fetch data from CMS
  const CMS_QUERY = `{
    tpcPage {
      tpcSectionTitles 
      titleTpcPages
      timelineSectionTitle
      date1
      date2
      date3
      date4
      date5
      kegiatanz1
      kegiatanz2
      kegiatanz3
      kegiatanz4
      targetDate
      regisFeesSectionTitle
      regisFeesDescription {
        value
      }
      imageMascot {
        title
        width
        url
        height
      }
      hadiahDescription {
        value
      }
      hadiahSectionTitle
      guideSectionTitle
      guideDescription {
        value
      }
      faqSectionTitle
      explanationDescription {
        value
      }
      countdownSectionTitle
      buttonTextSeeMore
      buttonTextRegister
      backgroundImage {
        width
        url
        title
        height
      }
    }
    allFaqTpcs {
      id
      question
      answer {
        value
      }
    }
    allTimelineTpcs(orderBy: date_ASC) {
      id
      text
      date
    }
  }`;

  const { tpcPage, allFaqTpcs, allTimelineTpcs }: TPCProps =
    await performRequest({
      query: CMS_QUERY,
    });

  return (
    <main className='w-full min-h-screen flex flex-col items-center justify-center'>
      {/*PROTOTECH CONTEST*/}
      <section className='relative w-full h-fit'>
        <Image
          src={tpcPage.backgroundImage.url}
          width={tpcPage.backgroundImage.width}
          height={tpcPage.backgroundImage.height}
          alt={tpcPage.backgroundImage.title}
          className='w-full object-cover h-[671px] object-center'
        />
        {/* Text Content on background */}
        <div className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-20 w-fit h-fit flex flex-col gap-8 items-center justify-center'>
          <h1
            style={{
              ['textShadow' as any]:
                '0px 0px 97.32px #BD9B65, 0px 0px 1.9464px #BD9B65',
            }}
            className='text-4xl lg:text-5xl 2xl:text-[56px] font-bold font-museo-muderno p-1 bg-gradient-brown text-transparent drop-shadow-[2px_3px_10px_10px_#bbcc9e] bg-clip-text text-center'
          >
            {tpcPage.titleTpcPages}
          </h1>
          <CustomLink color='green' url='/exhibition'>
            {tpcPage.buttonTextRegister}
          </CustomLink>
        </div>
      </section>
      {/* END PROTOTECH CONTEST */}

      {/*APA ITU TPC*/}
      <section className='w-full bg-gradient-section flex flex-col px-8 sm:px-10 md:px-20 lg:px-40 py-8 lg:py-10 xl:py-14 2xl:py-20'>
        <div className='bg-gradient-brown border-2 border-solid border-[#AB814E] bg-transparent shadow-[0_0_0.9732px_#705229,0_0_1.9464px_#705229,0_0_6.8124px_#705229,0_0_13.6248px_#705229,0_0_23.3568px_#705229,0_0_40.8744px_#705229] p-1.5 rounded-2xl'>
          <div className=' gap-4 bg-gradient-green lg:gap-10 flex flex-col items-center justify-center py-10 px-4 sm:px-10 md:px-12 lg:px-16 rounded-xl'>
            {/* Title */}
            <Judule>{tpcPage.titleTpcPages}</Judule>
            {/* Split Mascot & Description */}
            <div className='flex flex-col lg:flex-row w-full gap-4 lg:gap-10 xl:gap-20 items-center justify-center'>
              {/* Image Mascot */}
              <Image
                alt={tpcPage.imageMascot.title}
                src={tpcPage.imageMascot.url}
                width={tpcPage.imageMascot.width}
                height={tpcPage.imageMascot.height}
                className='w-[130px] h-[200px] lg:w-[226px] lg:h-[301px] object-contain object-center'
              />
              {/* Description */}
              <span className='text-cream-secondary-light font-poppins text-base lg:text-lg font-medium w-full lg:w-[1000px] text-justify'>
                {tpcPage && (
                  <StructuredText data={tpcPage.explanationDescription} />
                )}
              </span>
            </div>
          </div>
        </div>
        <div className='absolute lg:right-11 lg:top-[-225px] lg:block md:right-0 md:top-[100px] right-0 top-[350px] lg:scale-100 scale-[62%] z-0'>
          <Star4 size={40} />
          {/* <Star5 size={40} /> */}
        </div>
        <div className='absolute lg:right-52 lg:top-[830px] lg:block md:right-28 md:top-[900px] right-28 top-[1150px] lg:scale-100 scale-[62%] z-0'>
          <Star5 size={40} />
        </div>
        <div className='absolute lg:right-52 lg:top-[830px] lg:block md:right-[7rem] md:top-[895px] right-28 top-[1150px] lg:scale-100 scale-[62%] z-0'>
          <Star6 size={30} />
        </div>
      </section>
      {/* END APA ITU TPC */}

      {/* HADIAH */}
      <section className='w-full px-8 sm:px-10 md:px-28 lg:px-36 2xl:px-52 py-8 lg:py-10 xl:py-14 2xl:py-20 bg-gradient-section flex flex-col gap-16 '>
        <div className='flex flex-col items-center gap-8 '>
          <div className='w-full flex flex-row items-center justify-center'>
            <Judule>{tpcPage.hadiahSectionTitle}</Judule>
          </div>
          <div className='w-full flex flex-col lg:flex-row gap-8 justify-left items-center'>
            <div className='aspect-video w-full lg:w-[20%] relative h-32 -mt-8'>
              <div className='aspect-square lg:w-[40%] w-[20%] absolute z-10 lg:top-[-40px] lg:left-[202px] rotate-[-23.7deg]'>
                <Image
                  fill
                  alt=''
                  src={'/Group_1244.svg'}
                  objectFit='contain'
                />
              </div>
            </div>
            <article className='w-full lg:w-[60%] font-poppins text-center justify-center -mt-8'>
              <div className='text-[#FFE1B9] text-xl font-semibold'>
                <StructuredText data={tpcPage.hadiahDescription} />
              </div>
            </article>
            <div className='aspect-video w-full lg:w-[20%] relative h-44 -mt-8'>
              <div className='aspect-square lg:w-[190px] w-[150px] absolute z-10 lg:bottom-[-52px] lg:right-[62px] top-[20px] right-0 rotate-[]'>
                <Image
                  fill
                  alt=''
                  src={'/Group_1243.svg'}
                  objectFit='contain'
                />
              </div>
            </div>
          </div>
        </div>
        <div className='absolute lg:left-0 lg:top-[805px] lg:block md:left-0 md:top-[930px] left-0 top-[1260px] lg:scale-100 scale-[62%] z-0'>
          <Star7 size={40} />
        </div>
        <div className='absolute lg:left-32 lg:top-[1135px] lg:block md:left-28 md:top-[1380px] left-24 top-[1710px] lg:scale-100 scale-[62%] z-0'>
          <Star5 size={40} />
        </div>
        <div className='absolute lg:left-36 lg:top-[1025px] lg:block md:left-[7rem] md:top-[1315px] left-24 top-[1645px] lg:scale-100 scale-[62%] z-0'>
          <Star6 size={40} />
        </div>
      </section>
      {/* END HADIAH */}

      {/* REGULASI */}
      <section
        className='w-full px-8 sm:px-10 md:px-28 lg:px-36 2xl:px-52 bg-gradient-section flex flex-col gap-16'
        style={{
          backgroundImage:
            'linear-gradient(180deg, rgba(5, 31, 18, 0.99) 0%, rgba(6, 25, 12, 0.99) 100%)',
        }}
      >
        <div
          className='p-2 rounded-xl flex flex-col items-center gap-8 lg:mx-12 my-12'
          style={{
            backgroundColor: '#0F3015',
            boxShadow: '0px 0px 5px 3px rgba(171,129,78,0.8)',
          }}
        >
          <div className='h-full w-full rounded-xl px-2'>
            <div className='my-8 w-full flex flex-row items-center justify-center text-center'>
              <Judule>{tpcPage.guideSectionTitle}</Judule>
            </div>
            <div className='w-full flex flex-col lg:flex-row gap-8 justify-left items-center lg:px-20 pb-12'>
              <article className='w-full lg:w-[100%] font-poppins text-justify justify-center'>
                <div className='text-white text-base font-semibold px-4'>
                  <StructuredText data={tpcPage.guideDescription} />
                </div>
              </article>
            </div>
          </div>
        </div>
        <div className='absolute lg:left-0 lg:top-[780px] lg:block md:-left-8- md:top-[1020px] -left-12 top-[1410px] lg:scale-100 scale-[52%] z-0'>
          <Explosion size={25} />
        </div>
        <div className='absolute lg:right-0 lg:top-[780px] lg:block md:-right-4 md:top-[1060px] -right-4 top-[1260px] lg:scale-100 scale-[52%] z-0'>
          <Starburst size={25} />
        </div>
        <div className='absolute hidden left-52 top-[1615px] lg:block'>
          <Star8 size={32} />
        </div>
        <div className='absolute hidden left-64 top-[1595px] lg:block'>
          <Star9 size={32} />
        </div>
        <div className='absolute lg:right-4 lg:top-[1595px] lg:block lg:block lg:block md:-right-6 md:top-[1960px] -right-[1rem] top-[2060px] lg:scale-100 scale-[52%] z-0'>
          <Star10 size={30} />
        </div>
      </section>
      {/* END REGULASI */}

      {/* REGISTRATION */}
      <section className='w-full px-8 sm:px-10 md:px-28 lg:px-36 2xl:px-52 py-8 lg:py-10 xl:py-14 2xl:py-20 bg-gradient-section flex flex-col gap-16 '>
        <div className='flex flex-col items-center gap-8'>
          <Judule>{tpcPage.regisFeesSectionTitle}</Judule>
          <div className='w-full flex flex-col lg:flex-row gap-8 justify-left items-center'>
            <div className='aspect-video w-full lg:w-[20%] relative h-32 -mt-8'>
              <div className='aspect-square lg:w-[40%] w-[20%] absolute z-10 lg:top-[-40px] lg:left-[202px] rotate-[-23.7deg]'>
                <Image
                  fill
                  alt=''
                  src={'/Group_1244.svg'}
                  objectFit='contain'
                />
              </div>
            </div>
            <article className='w-full lg:w-[60%] font-poppins text-center justify-center -mt-8'>
              <div className='text-[#FFE1B9] text-xl font-semibold'>
                <StructuredText data={tpcPage.hadiahDescription} />
              </div>
            </article>
            <div className='aspect-video w-full lg:w-[20%] relative h-44 -mt-8'>
              <div className='aspect-square lg:w-[190px] w-[150px] absolute z-10 lg:bottom-[-52px] lg:right-[62px] top-[20px] right-0 rotate-[]'>
                <Image
                  fill
                  alt=''
                  src={'/Group_1243.svg'}
                  objectFit='contain'
                />
              </div>
            </div>
          </div>
        </div>
        <div className='absolute lg:right-11 lg:top-[1550px] lg:block md:right-0 md:top-[2090px] right-0px right-0 top-[3350px] lg:scale-100 scale-[62%] z-0'>
          <Star4 size={40} />
          {/* <Star5 size={40} /> */}
        </div>
        <div className='absolute lg:right-52 lg:top-[2600px] lg:block md:right-28 md:top-[2890px] right-28 top-[4150px] lg:scale-100 scale-[62%] z-0'>
          <Star5 size={40} />
        </div>
        <div className='absolute lg:right-52 lg:top-[2600px] lg:block md:right-[7rem] md:top-[2890px] right-28 top-[4150px] lg:scale-100 scale-[62%] z-0'>
          <Star6 size={30} />
        </div>
      </section>
      {/* END REGISTRATION */}

      {/* COUNTDOWN */}
      <section className='w-full flex flex-col gap-2 bg-gradient-section px-8 sm:px-10 md:px-20 lg:px-40 py-8 lg:py-10 xl:py-14 2xl:py-20'>
        <div className='rounded-xl bg-gradient-brown border-2 border-solid border-[#AB814E] bg-transparent shadow-[0_0_0.9732px_#705229,0_0_1.9464px_#705229,0_0_6.8124px_#705229,0_0_13.6248px_#705229,0_0_23.3568px_#705229,0_0_40.8744px_#705229] p-1.5'>
          <div className='bg-gradient-green flex flex-col items-center justify-center rounded-xl py-10 px-8 lg:px-16 gap-10'>
            {/* Title */}
            <Judule>{tpcPage.countdownSectionTitle}</Judule>
            {/* Countdown */}
            <Countdown targetDate={new Date(2023, 9, 20)} />
            {/* Button */}
            <div className='flex gap-3 sm:gap-4 md:gap-6 lg:gap-10'>
              <CustomLink color='gold' url='/exhibition'>
                {tpcPage.buttonTextRegister}
              </CustomLink>
              <CustomLink color='trans-orange' url='/exhibition'>
                {tpcPage.buttonTextSeeMore}
              </CustomLink>
            </div>
          </div>
        </div>
        <div className='absolute hidden left-0 top-[3045px] lg:block'>
          <Star7 size={55} />
        </div>
        <div className='absolute hidden left-48 top-[3110px] lg:block'>
          <Star5 size={40} />
        </div>
        <div className='absolute hidden left-48 top-[3025px] lg:block'>
          <Star6 size={40} />
        </div>
      </section>
      {/* END COUNTDOWN */}

      {/* TIMELINE */}
      <section
        className='w-full bg-gradient-section px-8 sm:px-10 md:px-28 lg:px-36 2xl:px-52 py-8 lg:py-10 xl:py-14 2xl:py-20 flex flex-col gap-12 lg:gap-20'
        style={{ background: 'rgba(7, 29, 16)' }}
      >
        <div className='absolute hidden left-[480px] top-[3625px] lg:block'>
          <Star11 size={55} />
        </div>
        <div className='bg-gradient-brown border-2 border-solid border-[#AB814E] bg-transparent shadow-[0_0_0.9732px_#705229,0_0_1.9464px_#705229,0_0_6.8124px_#705229,0_0_13.6248px_#705229,0_0_23.3568px_#705229,0_0_40.8744px_#705229] p-1.5 rounded-2xl'>
          <div className='bg-gradient-green items-center justify-center p-4 lg:py-8 sm:px-10 md:px-12 lg:px-16 rounded-xl'>
            <Judule>{tpcPage.timelineSectionTitle}</Judule>
            <div className='absolute hidden right-[520px] lg:top-[2890px] lg:block'>
              <Star8 size={25} />
            </div>
            <div className='absolute hidden right-[500px] lg:top-[2880px] lg:block'>
              <Star9 size={25} />
            </div>
          </div>
        </div>
        <Timeline items={allTimelineTpcs} />
      </section>
      {/* END TIMELINE */}

      {/* FAQ */}
      <section className='w-full bg-gradient-section flex flex-col px-8 sm:px-10 md:px-20 lg:px-40 py-8 lg:py-10 xl:py-14 2xl:py-20 items-center justify-center gap-10 pb-20'>
        <Judule>{tpcPage.faqSectionTitle}</Judule>
        <div className='w-full h-full flex flex-col gap-3'>
          {allFaqTpcs.map((faq, index) => (
            <FAQ key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
        <div className='absolute lg:left-0 lg:top-[4020px] lg:block md:-left-8- md:top-[4380px] -left-12 top-[5700px] lg:scale-100 scale-[52%] z-0'>
          <Explosion size={25} />
        </div>
        <div className='absolute hidden right-[80px] lg:top-[4400px] lg:block'>
          <Star8 size={25} />
        </div>
        <div className='absolute hidden right-[65px] lg:top-[4380px] lg:block'>
          <Star9 size={25} />
        </div>
      </section>
      {/* END FAQ */}
      <Footer />
    </main>
  );
};

export default TPC;

export const metadata: Metadata = {
  title: 'TPC | Sandbox IEEE ITB',
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
