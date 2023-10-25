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
import MentorCards from '@/components/mentorCards';
import MentorCarousel from '@/components/mentorsCarousel';
import { performRequest } from '@/lib/datocms';
import { GrandSeminarPageProps } from '@/types/grand-seminar';

const ExhibitionPage = async () => {
  // Fetch data from CMS
  const CMS_QUERY = `
  query MyQuery {
    grandSeminar {
      titleSeminarPage
      targetDate
      ourSpeakerTitleSection
      imageMascot {
        width
        url
        title
        height
      }
      faqSectionTitle
      explanationTitle
      explanationDescription {
        value
      }
      detailSpeakerSectionTitle
      countdownTitle
      buttonTextSeeMoreCountdown
      buttonTextSeeMore
      buttonTextRegister
      backgroundImage {
        width
        url
        height
        title
      }
    }
    allSpeakerDetails(orderBy: name_ASC) {
      id
      linkedin
      name
      post
      company {
        url
        width
        title
        height
      }
      desc {
        value
      }
      image {
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
  }`;

  const {
    grandSeminar,
    allFaqGrandSeminars: faqData,
    allSpeakerDetails,
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

      <div className='w-full flex flex-col justify-center py-[80px] lg:py-[120px] items-center h-fit bg-gradient-to-b from-[rgba(7,29,16,0.45)] to-[#0F3015]'>
        {/* h1 Title Page */}
        <section className='flex flex-col gap-5 lg:gap-10 w-full items-center justify-center px-8 sm:px-10 md:px-20 xl:px-32 2xl:px-40'>
          <div className='w-fit text-center bg-gradient-brown border-2 border-solid border-[#AB814E] bg-transparent shadow-[0_0_0.9732px_#705229,0_0_1.9464px_#705229,0_0_6.8124px_#705229,0_0_13.6248px_#705229,0_0_23.3568px_#705229,0_0_40.8744px_#705229] p-1.5 rounded-3xl'>
            <div className='bg-gradient-green items-center justify-center p-3 lg:py-6 sm:px-6 md:px-10 lg:px-12 rounded-2xl'>
              <h2
                style={{
                  ['textShadow' as any]: '0px 0px 17.32px #BD9B65',
                }}
                className='bg-gradient-brown text-center text-transparent drop-shadow-[2px_3px_10px_10px_#bbcc9e] bg-clip-text text-3xl lg:text-[40px] font-museo-muderno p-1 font-bold'
              >
                {grandSeminar.detailSpeakerSectionTitle}
              </h2>
            </div>
          </div>
          {/* Carousels */}
          <div className='h-fit w-full flex flex-col items-center justify-center py-8 lg:py-16 '>
            <MentorCarousel options={allSpeakerDetails} />
          </div>
        </section>

        <section className='flex flex-col gap-20 w-full items-center justify-center px-8 sm:px-10 md:px-20 lg:px-40'>
          {/* Our Mentors subtitle */}
          {grandSeminar.detailSpeakerSectionTitle && (
            <div className='max-w-[1300px] bg-transparent shadow-[0_0_0.9732px_#705229,0_0_1.9464px_#705229,0_0_6.8124px_#705229,0_0_13.6248px_#705229,0_0_23.3568px_#705229,0_0_40.8744px_#705229] p-0.5 rounded-2xl'>
              <div
                id='seemore'
                className='bg-gradient-green items-center justify-center p-4 lg:py-6 sm:px-10 md:px-12 lg:px-16 rounded-xl'
              >
                <h2
                  style={{
                    ['textShadow' as any]: '0px 0px 17.32px #BD9B65',
                  }}
                  className='bg-gradient-brown text-center text-transparent drop-shadow-[2px_3px_10px_10px_#bbcc9e] bg-clip-text text-3xl lg:text-[40px] font-museo-muderno p-1 font-bold'
                >
                  {grandSeminar.detailSpeakerSectionTitle}
                </h2>
              </div>
            </div>
          )}

          <MentorCards options={allSpeakerDetails} />
        </section>
      </div>
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
  title: 'Grand Seminar | Sandbox IEEE ITB',
  description:
    "Reach out to us on our contact page! Whether you have a question, need assistance, or simply want to give us feedback, we're here to help. Our dedicated team is committed to providing you with the best support and ensuring your experience with us is exceptional. You can contact us through various channels, including email, phone, or by filling out our online form. We value your input and look forward to hearing from you. Get in touch now, and let's connect!",
  generator: 'Next.js',
  category: 'Technology',
  applicationName: 'Sandbox IEEE ITB',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'Sandbox',
    'Sandbox IEEE ITB',
    'Sandbox ITB',
    'IEEE ITB',
    'ITB',
    'TPC',
    'PTC',
  ],
  colorScheme: 'dark',
  metadataBase: new URL('https://sandbox.ieeeitb.com/'),
  alternates: {
    canonical: '/grandseminar',
    languages: {
      'en-US': '/en-US/grandseminar',
      'id-ID': '/id-ID/grandseminar',
    },
  },
  verification: {
    google: 'GNYbAgsMCZ49BqBiEJz5TQE0X3H0XZGtURIryEvrNU8',
  },
  openGraph: {
    title: 'Sandbox IEEE ITB',
    description:
      "Reach out to us on our contact page! Whether you have a question, need assistance, or simply want to give us feedback, we're here to help. Our dedicated team is committed to providing you with the best support and ensuring your experience with us is exceptional. You can contact us through various channels, including email, phone, or by filling out our online form. We value your input and look forward to hearing from you. Get in touch now, and let's connect!",
    url: 'https://sandbox.ieeeitb.com/grandseminar',
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
      "Reach out to us on our contact page! Whether you have a question, need assistance, or simply want to give us feedback, we're here to help. Our dedicated team is committed to providing you with the best support and ensuring your experience with us is exceptional. You can contact us through various channels, including email, phone, or by filling out our online form. We value your input and look forward to hearing from you. Get in touch now, and let's connect!",
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
