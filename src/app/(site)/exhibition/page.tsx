import dynamic from 'next/dynamic';
import Link from 'next/link';
import React from 'react';

const Countdown = dynamic(() => import('@/components/Countdown'), {
  ssr: false,
});

import { Metadata } from 'next';
import Image from 'next/image';
import { StructuredText } from 'react-datocms/structured-text';

import { FAQ } from '@/components/FAQ';
import CustomLink from '@/components/Link';
import Timeline from '@/components/Timeline';
import VoteCard from '@/components/Vote/VoteCard';
import { performRequest } from '@/lib/datocms';
import { type ExhibitionDataProps } from '@/types/exhibition-type';

const ExhibitionPage = async () => {
  // Fetch data from CMS
  const CMS_QUERY = `
  {
    exhibition {
      backgroundImage {
        url
        title
        width
        height
      }
      buttonShowFinal
      buttonTextRegister
      buttonTextSeeMore
      buttonTextSeeMote
      countdownTitle
      embedLocationUrl
      explanationDescription {
        value
      }
      explanationTitle
      faqSectionTitle
      finalProjectTitle
      guideDescription {
        value
      }
      guideTitle
      imageMascot {
        height
        url
        title
        width
      }
      targetDate
      timelineSectionTitle
      titleExhibitionPage
      titleLocation
      ptcSubtitle
      tpcSubtitle
    }
    allFinalProjectsPtcExhibitions(orderBy: teamsName_ASC) {
      topic
      teamsName
      projectsUrl
      image {
        url
        width
        height
        title
      }
      id
    }
    allFinalProjectsTpcExhibitions(orderBy: teamsName_ASC) {
      image {
        url
        title
        width
        height
      }
      projectsUrl
      teamsName
      topic
      id
    }
    allFaqExhibitions(orderBy: question_ASC) {
      id
      answer {
        value
      }
      question
    }
    allTimelineExhibitions(orderBy: date_ASC) {
      text
      date
    }
  }`;

  const {
    exhibition,
    allFinalProjectsTpcExhibitions: TPCData,
    allFinalProjectsPtcExhibitions: PTCData,
    allFaqExhibitions: faqData,
    allTimelineExhibitions: timelineData,
  }: ExhibitionDataProps = await performRequest({
    query: CMS_QUERY,
    revalidate: 0,
  });

  return (
    <main className='w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#152d1b] via-[90%] to-[#0f2f15] gap-16 lg:gap-20 xl:gap-24 2xl:gap-28'>
      {/* Background Section */}
      <section className='relative w-full h-fit'>
        <Image
          src={exhibition.backgroundImage.url}
          width={exhibition.backgroundImage.width}
          height={exhibition.backgroundImage.height}
          alt={exhibition.backgroundImage.title}
          className='w-full object-cover h-[671px] object-center'
        />
        {/* Text Content on background */}
        <div className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-20 w-fit h-fit flex flex-col gap-8 items-center justify-center'>
          <h1
            style={{
              ['textShadow' as any]:
                '0px 0px 97.32px #BD9B65, 0px 0px 1.9464px #BD9B65',
            }}
            className='text-4xl lg:text-5xl 2xl:text-[56px] font-bold font-museo-muderno p-1 bg-gradient-brown text-transparent drop-shadow-[2px_3px_10px_10px_#bbcc9e] bg-clip-text'
          >
            {exhibition.titleExhibitionPage}
          </h1>
          <CustomLink color='green' url='/exhibition'>
            {exhibition.buttonTextSeeMore}
          </CustomLink>
        </div>
      </section>

      {/* Explanation */}
      <section className='w-full flex flex-col px-8 sm:px-10 md:px-20 lg:px-40'>
        <div className='bg-gradient-brown border-2 border-solid border-[#AB814E] bg-transparent shadow-[0_0_0.9732px_#705229,0_0_1.9464px_#705229,0_0_6.8124px_#705229,0_0_13.6248px_#705229,0_0_23.3568px_#705229,0_0_40.8744px_#705229] p-1.5 rounded-2xl'>
          <div className=' gap-4 bg-gradient-green lg:gap-10 flex flex-col items-center justify-center py-10 px-4 sm:px-10 md:px-12 lg:px-16 rounded-xl'>
            {/* Title */}
            <h2
              style={{
                ['textShadow' as any]: '0px 0px 17.32px #BD9B65',
              }}
              className='bg-gradient-brown text-center lg:text-left text-transparent drop-shadow-[2px_3px_10px_10px_#bbcc9e] bg-clip-text text-3xl lg:text-[40px] font-museo-muderno p-1 font-bold'
            >
              {exhibition.explanationTitle}
            </h2>
            {/* Split Mascot & Description */}
            <div className='flex flex-col lg:flex-row w-full gap-4 lg:gap-10 xl:gap-20 items-center justify-center'>
              {/* Image Mascot */}
              <Image
                alt={exhibition.imageMascot.title}
                src={exhibition.imageMascot.url}
                width={exhibition.imageMascot.width}
                height={exhibition.imageMascot.height}
                className='w-[130px] h-[200px] lg:w-[226px] lg:h-[301px] object-contain object-center'
              />
              {/* Description */}
              <span className='text-cream-secondary-light font-poppins text-base lg:text-lg font-medium w-full lg:w-[1000px]'>
                {exhibition && (
                  <StructuredText data={exhibition.explanationDescription} />
                )}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className='w-full flex flex-col gap-10  px-8 sm:px-10 md:px-20 lg:px-40 items-center justify-center'>
        <h2
          style={{
            ['textShadow' as any]: '0px 0px 17.32px #BD9B65',
          }}
          className='bg-gradient-brown text-transparent drop-shadow-[2px_3px_10px_10px_#bbcc9e] bg-clip-text text-3xl lg:text-[40px] font-museo-muderno p-1 font-bold'
        >
          {exhibition.titleLocation}
        </h2>
        {/* GMaps */}
        {exhibition.embedLocationUrl && (
          <div
            id='gmap-canvas'
            className='w-full h-[500px] lg:h-[560px] xl:w-[1100px] rounded-lg overflow-hidden'
          >
            <iframe
              className='h-full w-full border-0'
              src={exhibition.embedLocationUrl}
            ></iframe>
          </div>
        )}
        {/* Text Click Here */}
        <Link href={'/'} className='text-white font-poppins text-lg -mt-5'>
          Click here to open in Google Maps
        </Link>
      </section>

      {/* CountDown */}
      <section className='w-full flex flex-col gap-2  px-8 sm:px-10 md:px-20 lg:px-40'>
        <div className='rounded-xl bg-gradient-brown border-2 border-solid border-[#AB814E] bg-transparent shadow-[0_0_0.9732px_#705229,0_0_1.9464px_#705229,0_0_6.8124px_#705229,0_0_13.6248px_#705229,0_0_23.3568px_#705229,0_0_40.8744px_#705229] p-1.5'>
          <div className='bg-gradient-green flex flex-col items-center justify-center rounded-xl py-10 px-8 lg:px-16 gap-10'>
            {/* Title */}
            <h2
              style={{
                ['textShadow' as any]: '0px 0px 17.32px #BD9B65',
              }}
              className='bg-gradient-brown text-center lg:text-left text-transparent drop-shadow-[2px_3px_10px_10px_#bbcc9e] bg-clip-text text-3xl lg:text-[40px] font-museo-muderno p-1 font-bold'
            >
              {exhibition.countdownTitle}
            </h2>
            {/* Countdown */}
            <Countdown targetDate={new Date(2023, 9, 20)} />
            {/* Button */}
            <div className='flex gap-3 sm:gap-4 md:gap-6 lg:gap-10'>
              <CustomLink color='gold' url='/exhibition'>
                {exhibition.buttonTextRegister}
              </CustomLink>
              <CustomLink color='trans-orange' url='/exhibition'>
                {exhibition.buttonTextSeeMore}
              </CustomLink>
            </div>
          </div>
        </div>
      </section>

      {/* Voting Regulations */}
      <section className='w-full flex flex-col gap-2 my-5 lg:my-8 px-8 sm:px-14 md:px-24 lg:px-48'>
        <div className='bg-[#0F3015] rounded-2xl flex flex-col items-center justify-center py-10 lg:py-14 px-8 lg:px-16 gap-10 shadow-[0_4px_50px_#705229,0_4px_7px_rgba(112,82,41,0.25),0_4px_4px_rgba(0,0,0,0.25)]'>
          {/* Title */}
          <h2
            style={{
              ['textShadow' as any]: '0px 0px 17.32px #BD9B65',
            }}
            className='bg-gradient-brown text-center lg:text-left text-transparent bg-clip-text text-3xl lg:text-[40px] font-museo-muderno p-1 font-bold'
          >
            {exhibition.guideTitle}
          </h2>
          {/* Description */}
          <span className='text-white text-sm lg:text-lg font-poppins font-medium'>
            <StructuredText data={exhibition.guideDescription} />
          </span>
        </div>
      </section>

      {/* Final Project Spill */}
      {exhibition.buttonShowFinal && (
        <section className='w-full flex flex-col items-center justify-center gap-12 lg:gap-14 px-8 sm:px-10 md:px-20 lg:px-40'>
          <h2
            style={{
              ['textShadow' as any]: '0px 0px 17.32px #BD9B65',
            }}
            className='bg-gradient-brown text-center text-transparent bg-clip-text text-3xl lg:text-[40px] font-museo-muderno p-1 font-bold'
          >
            {exhibition.finalProjectTitle}
          </h2>
          {/* TPC */}
          <h3
            style={{
              ['textShadow' as any]: '0px 0px 17.32px #BD9B65',
            }}
            className='bg-gradient-brown text-center text-transparent bg-clip-text text-2xl lg:text-3xl -m-4 font-museo-muderno p-1 font-bold'
          >
            {exhibition.tpcSubtitle}
          </h3>
          <div className='flex items-stretch justify-center flex-wrap gap-10 lg:gap-14 2xl:gap-16'>
            {TPCData.map((card, index) => (
              <VoteCard
                key={index}
                teamsName={card.teamsName}
                topic={card.topic}
                imageUrl={card.image.url}
                imageAlt={card.image.title}
                imageHeight={card.image.height}
                imageWidth={card.image.width}
                isVoted={false}
              />
            ))}
          </div>
          {/* PTC */}
          <h3
            style={{
              ['textShadow' as any]: '0px 0px 17.32px #BD9B65',
            }}
            className='bg-gradient-brown text-center text-transparent bg-clip-text text-2xl lg:text-3xl -m-4 font-museo-muderno p-1 font-bold'
          >
            {exhibition.ptcSubtitle}
          </h3>
          <div className='flex items-stretch justify-center flex-wrap gap-10 lg:gap-14 2xl:gap-16'>
            {PTCData.map((card, index) => (
              <VoteCard
                key={index}
                teamsName={card.teamsName}
                topic={card.topic}
                imageUrl={card.image.url}
                imageAlt={card.image.title}
                imageHeight={card.image.height}
                imageWidth={card.image.width}
                isVoted={false}
              />
            ))}
          </div>

          <CustomLink color='gold' url='/exhibition/vote'>
            {exhibition.buttonTextSeeMore}
          </CustomLink>
        </section>
      )}

      {/* Timeline */}
      <section className='w-full px-8 sm:px-10 md:px-28 lg:px-36 2xl:px-52 flex flex-col gap-12 lg:gap-20'>
        <div className='bg-gradient-brown border-2 border-solid border-[#AB814E] bg-transparent shadow-[0_0_0.9732px_#705229,0_0_1.9464px_#705229,0_0_6.8124px_#705229,0_0_13.6248px_#705229,0_0_23.3568px_#705229,0_0_40.8744px_#705229] p-1.5 rounded-2xl'>
          <div className='bg-gradient-green items-center justify-center p-4 lg:py-8 sm:px-10 md:px-12 lg:px-16 rounded-xl'>
            <h2
              style={{
                ['textShadow' as any]: '0px 0px 17.32px #BD9B65',
              }}
              className='bg-gradient-brown text-center text-transparent drop-shadow-[2px_3px_10px_10px_#bbcc9e] bg-clip-text text-3xl lg:text-[40px] font-museo-muderno p-1 font-bold'
            >
              {exhibition.timelineSectionTitle}
            </h2>
          </div>
        </div>
        <Timeline items={timelineData} />
      </section>

      {/* FAQ */}
      <section className='w-full flex flex-col px-8 sm:px-10 md:px-20 lg:px-40 items-center justify-center gap-10 pb-20'>
        <h2
          style={{
            ['textShadow' as any]: '0px 0px 17.32px #BD9B65',
          }}
          className='bg-gradient-brown text-transparent drop-shadow-[2px_3px_10px_10px_#bbcc9e] text-center bg-clip-text text-3xl lg:text-[40px] font-museo-muderno p-1 font-bold'
        >
          {exhibition.faqSectionTitle}
        </h2>
        <div className='w-full h-full flex flex-col gap-3'>
          {faqData.map((faq, index) => (
            <FAQ key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default ExhibitionPage;

export const metadata: Metadata = {
  title: 'Exhibition | Sandbox IEEE ITB',
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
