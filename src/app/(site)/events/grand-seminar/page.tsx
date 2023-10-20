import dynamic from 'next/dynamic';
import React from 'react';

const Countdown = dynamic(() => import('@/components/Countdown'), {
  ssr: false,
});

import { Metadata } from 'next';
import Image from 'next/image';
import { StructuredText } from 'react-datocms/structured-text';

import { FAQ } from '@/components/FAQ';
import CustomLink from '@/components/Link';
import SpeakersCarousel from '@/components/SpeakersCarousel';
import { performRequest } from '@/lib/datocms';
import { GrandSeminarPageProps } from '@/types/grand-seminar';

const ExhibitionPage = async () => {
  const data = [
    {
      id: '1',
      image: {
        url: '/assets/R-dummy.jpeg',
        title: 'Judul Gambar 1',
        width: 400,
        height: 300,
      },
      name: 'Nama Pembicara 1',
      position: 'Posisi Pembicara 1',
      explanation: 'Penjelasan tentang Pembicara 1',
      instagramURL: 'instagram.com/pembicara1',
    },
    {
      id: '2',
      image: {
        url: '/assets/R-dummy.jpeg',
        title: 'Judul Gambar 2',
        width: 1000,
        height: 300,
      },
      name: 'Nama Pembicara 2',
      position: 'Posisi Pembicara 2',
      explanation: 'Penjelasan tentang Pembicara 2',
      instagramURL: 'instagram.com/pembicara2',
    },
    // tambahkan data lainnya sesuai dengan format di atas
  ];

  // Fetch data from CMS
  const CMS_QUERY = `
  {
      grandSeminar {
        titleSeminarPage
        timelineSectionTitle
        targetDate
        ourSpeakerTitleSection
        imageMascot {
          url
          title
          width
          height
        }
        faqSectionTitle
        explanationTitle
        explanationDescription {
          value
        }
        countdownTitle
        buttonTextSeeMoreCountdown
        buttonTextSeeMore
        buttonTextRegister
        backgroundImage {
          width
          url
          title
          height
        }
    }
    allFaqGrandSeminars {
      id
      question
      answer {
        value
      }
    }
    allOurSpeakers {
      id
      name
      instagramUsername
      imageSpeaker {
        url
        width
        title
        height
      }
      explanationSpeaker {
        value
      }
      company {
        url
        width
        title
        height
      }
      positionSpeaker
    }
  }`;

  const {
    grandSeminar,
    allFaqGrandSeminars: faqData,
    allOurSpeakers,
  }: GrandSeminarPageProps = await performRequest({
    query: CMS_QUERY,
    revalidate: 0,
  });

  return (
    <main className='w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#152d1b] via-[90%] to-[#0f2f15] gap-16 lg:gap-20 xl:gap-24 2xl:gap-28'>
      {/* Background Section */}
      <section className='relative w-full h-fit'>
        <Image
          src={grandSeminar.backgroundImage.url}
          width={grandSeminar.backgroundImage.width}
          height={grandSeminar.backgroundImage.height}
          alt={grandSeminar.backgroundImage.title}
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
            {grandSeminar.titleSeminarPage}
          </h1>
          <CustomLink color='green' url='/exhibition'>
            {grandSeminar.buttonTextSeeMore}
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
              {grandSeminar.explanationTitle}
            </h2>
            {/* Split Mascot & Description */}
            <div className='flex flex-col lg:flex-row w-full gap-4 lg:gap-10 xl:gap-20 items-center justify-center'>
              {/* Image Mascot */}
              <Image
                alt={grandSeminar.imageMascot.title}
                src={grandSeminar.imageMascot.url}
                width={grandSeminar.imageMascot.width}
                height={grandSeminar.imageMascot.height}
                className='w-[130px] h-[200px] lg:w-[226px] lg:h-[301px] object-contain object-center'
              />
              {/* Description */}
              <span className='text-cream-secondary-light font-poppins text-base lg:text-lg font-medium w-full lg:w-[1000px]'>
                <StructuredText data={grandSeminar.explanationDescription} />
              </span>
            </div>
          </div>
        </div>
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
              {grandSeminar.countdownTitle}
            </h2>
            {/* Countdown */}
            <Countdown targetDate={new Date(2023, 9, 20)} />
            {/* Button */}
            <div className='flex gap-3 sm:gap-4 md:gap-6 lg:gap-10'>
              <CustomLink color='gold' url='/exhibition'>
                {grandSeminar.buttonTextRegister}
              </CustomLink>
              <CustomLink color='trans-orange' url='/exhibition'>
                {grandSeminar.buttonTextSeeMore}
              </CustomLink>
            </div>
          </div>
        </div>
      </section>

      {/* Shadow
      <section className='w-full px-8 sm:px-10 md:px-28 lg:px-36 2xl:px-52 flex flex-col gap-12 lg:gap-20'>
        <div className='bg-gradient-brown border-2 border-solid border-[#AB814E] bg-transparent shadow-[0_0_0.9732px_#705229,0_0_1.9464px_#705229,0_0_6.8124px_#705229,0_0_13.6248px_#705229,0_0_23.3568px_#705229,0_0_40.8744px_#705229] p-1.5 rounded-2xl'>
          <div className='bg-gradient-green items-center justify-center p-4 lg:py-8 sm:px-10 md:px-12 lg:px-16 rounded-xl'>
            <h2
              style={{
                ['textShadow' as any]: '0px 0px 17.32px #BD9B65',
              }}
              className='bg-gradient-brown text-center text-transparent drop-shadow-[2px_3px_10px_10px_#bbcc9e] bg-clip-text text-3xl lg:text-[40px] font-museo-muderno p-1 font-bold'
            >
              {grandSeminar.timelineSectionTitle}
            </h2>
          </div>
        </div>
        <Timeline items={timelineData} />
      </section> */}

      <section className='w-full flex flex-col items-center justify-center gap-2  px-8 sm:px-10 md:px-20 lg:px-40'>
        <div className='w-fit text-center bg-gradient-brown border-2 border-solid border-[#AB814E] bg-transparent shadow-[0_0_0.9732px_#705229,0_0_1.9464px_#705229,0_0_6.8124px_#705229,0_0_13.6248px_#705229,0_0_23.3568px_#705229,0_0_40.8744px_#705229] p-1.5 rounded-3xl'>
          <div className='bg-gradient-green items-center justify-center p-3 lg:py-6 sm:px-6 md:px-10 lg:px-12 rounded-2xl'>
            <h2
              style={{
                ['textShadow' as any]: '0px 0px 17.32px #BD9B65',
              }}
              className='bg-gradient-brown text-center text-transparent drop-shadow-[2px_3px_10px_10px_#bbcc9e] bg-clip-text text-3xl lg:text-[40px] font-museo-muderno p-1 font-bold'
            >
              {grandSeminar.timelineSectionTitle}
            </h2>
          </div>
        </div>
        <div className='CardsContainer xl:h-fit w-full flex justify-center items-center overflow-hidden h-[440px] md:h-[500px] lg:h-[700px]'>
          <div className='SpeakerWrapper xl:scale-100 lg:scale-75 md:scale-[60%] sm:scale-[50%] scale-[45%]'>
            <SpeakersCarousel data={allOurSpeakers} />
          </div>
        </div>
      </section>
      {/* FAQ */}
      <section className='w-full flex flex-col px-8 sm:px-10 md:px-20 lg:px-40 items-center justify-center gap-10 pb-20'>
        <h2
          style={{
            ['textShadow' as any]: '0px 0px 17.32px #BD9B65',
          }}
          className='bg-gradient-brown text-transparent drop-shadow-[2px_3px_10px_10px_#bbcc9e] text-center bg-clip-text text-3xl lg:text-[40px] font-museo-muderno p-1 font-bold'
        >
          {grandSeminar.faqSectionTitle}
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
  title: 'Grand-Seminar | Sandbox IEEE ITB',
  description:
    'The Sandbox by IEEE is a series of events providing opportunities to all young-minds through 3 key milestones consisting of a Grand Seminar, 2 competitions namely ProtoTech Contest (a practical electrical engineering contest) and Technovate Paper (a research and technical documents) Competition, and grandSeminar. This event invites experts from various fields of work as trainers, judges and webinar speakers. Finalists from both ProtoTech Contest and TechNovate Paper Competition will be given time to pitch and showcase their products in front of the judging panels on the Exhibition day. All the final winners from both competitions will be bestowed during this time. The objective of this event is to establish innovative and practical solutions for a developing country like Indonesia. Additionally, this event also aims to educate the local society by unveiling and enhancing tools that foster tranquility and ease.',
  generator: 'Next.js',
  applicationName: 'Sandbox IEEE ITB',
  colorScheme: 'dark',
  openGraph: {
    title: 'Sandbox IEEE ITB',
    description:
      'The Sandbox by IEEE is a series of events providing opportunities to all young-minds through 3 key milestones consisting of a Grand Seminar, 2 competitions namely ProtoTech Contest (a practical electrical engineering contest) and Technovate Paper (a research and technical documents) Competition, and grandSeminar. This event invites experts from various fields of work as trainers, judges and webinar speakers. Finalists from both ProtoTech Contest and TechNovate Paper Competition will be given time to pitch and showcase their products in front of the judging panels on the Exhibition day. All the final winners from both competitions will be bestowed during this time. The objective of this event is to establish innovative and practical solutions for a developing country like Indonesia. Additionally, this event also aims to educate the local society by unveiling and enhancing tools that foster tranquility and ease.',
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
      'The Sandbox by IEEE is a series of events providing opportunities to all young-minds through 3 key milestones consisting of a Grand Seminar, 2 competitions namely ProtoTech Contest (a practical electrical engineering contest) and Technovate Paper (a research and technical documents) Competition, and grandSeminar. This event invites experts from various fields of work as trainers, judges and webinar speakers. Finalists from both ProtoTech Contest and TechNovate Paper Competition will be given time to pitch and showcase their products in front of the judging panels on the Exhibition day. All the final winners from both competitions will be bestowed during this time. The objective of this event is to establish innovative and practical solutions for a developing country like Indonesia. Additionally, this event also aims to educate the local society by unveiling and enhancing tools that foster tranquility and ease.',
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
