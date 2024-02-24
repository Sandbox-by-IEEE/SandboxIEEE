import { type Metadata } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { StructuredText } from 'react-datocms/structured-text';

import CustomLink from '@/components/Link';
import MentorCards from '@/components/mentorCards';
import MentorCarousel from '@/components/mentorsCarousel';
import TitleSection from '@/components/TitleSection';
import { performRequest } from '@/lib/datocms';
import { GrandSeminarPageProps } from '@/types/grand-seminar';

const Countdown = dynamic(() => import('@/components/Countdown'), {
  ssr: false,
});

// import CommingSoonPage from '@/app/(site)/coming-soon/page';

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
      name
      post
      linkedin
      image {
        width
        title
        url
        height
      }
      desc {
        value
      }
      company {
        width
        title
        url
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

  const WIBtargetDate = new Date(grandSeminar.targetDate);
  WIBtargetDate.setHours(WIBtargetDate.getHours() + 17);

  // return <CommingSoonPage />;
  return (
    <main className='w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#152d1b] via-[90%] to-[#0f2f15] gap-16 lg:gap-20 xl:gap-24 2xl:gap-28'>
      {/* Background Section */}
      <section className='relative w-full h-fit'>
        <Image
          src={grandSeminar.backgroundImage.url}
          width={grandSeminar.backgroundImage.width}
          height={grandSeminar.backgroundImage.height}
          alt={grandSeminar.backgroundImage.title}
          priority
          className='w-full object-cover h-[771px] max-h-screen object-center'
          sizes='100vw'
        />
        {/* Text Content on background */}
        <div
          className='absolute top-1/2 p-24 -translate-y-1/2 left-1/2 -translate-x-1/2 z-20 w-fit h-fit flex flex-col gap-8 items-center justify-center'
          style={{
            background:
              'radial-gradient(50% 50% at 50% 50%, rgba(8, 30, 17, 0.90) 18.33%, rgba(0, 0, 0, 0.00) 99.48%)',
          }}
        >
          <h2
            style={{
              ['textShadow' as any]:
                '0px 0px 97.32px #BD9B65, 0px 0px 1.9464px #BD9B65',
            }}
            data-aos='flip-up'
            className='text-4xl lg:text-5xl 2xl:text-[56px] font-bold font-museo-muderno p-1 bg-gradient-brown text-transparent drop-shadow-[2px_3px_10px_10px_#bbcc9e] bg-clip-text'
          >
            {grandSeminar.titleSeminarPage}
          </h2>
          <div className='animate-blink duration-500 transition-all'>
            <CustomLink
              color='green'
              url={'#' + grandSeminar.buttonTextSeeMore}
            >
              {grandSeminar.buttonTextSeeMore}
            </CustomLink>
          </div>
        </div>
      </section>

      {/* Explanation */}
      <section
        id={grandSeminar.buttonTextSeeMore}
        className='w-full flex flex-col px-8 sm:px-10 md:px-20 lg:px-40'
      >
        <div
          data-aos='fade-in'
          className='bg-gradient-brown border-2 border-solid border-[#AB814E] bg-transparent shadow-[0_0_0.9732px_#705229,0_0_1.9464px_#705229,0_0_6.8124px_#705229,0_0_13.6248px_#705229,0_0_23.3568px_#705229,0_0_40.8744px_#705229] p-1.5 rounded-2xl'
        >
          <div className=' gap-4 bg-gradient-green lg:gap-10 flex flex-col items-center justify-center py-10 px-4 sm:px-10 md:px-12 lg:px-16 rounded-xl'>
            {/* Title */}
            <TitleSection>{grandSeminar.explanationTitle}</TitleSection>
            {/* Split Mascot & Description */}
            <div
              data-aos='zoom-in'
              className='flex flex-col lg:flex-row w-full gap-4 lg:gap-10 xl:gap-20 items-center justify-center'
            >
              {/* Image Mascot */}
              <Image
                data-aos='fade-right'
                alt={grandSeminar.imageMascot.title}
                src={grandSeminar.imageMascot.url}
                width={grandSeminar.imageMascot.width}
                height={grandSeminar.imageMascot.height}
                className='w-[130px] h-[200px] lg:w-[226px] lg:h-[301px] object-contain object-center'
                sizes='(max-width: 1024px) 130px, 226px'
              />
              {/* Description */}
              <h4
                data-aos='fade-left'
                className='text-cream-secondary-light font-poppins text-base lg:text-lg font-medium w-full lg:w-[1000px]'
              >
                <StructuredText data={grandSeminar.explanationDescription} />
              </h4>
            </div>
          </div>
        </div>
      </section>

      {/* CountDown */}
      {grandSeminar.countdownTitle && grandSeminar.targetDate && (
        <Countdown
          sectionTitle={grandSeminar.countdownTitle}
          // targetDate={new Date(grandSeminar.targetDate)}
          targetDate={new Date(WIBtargetDate)}
          type='exhibition'
        >
          <div className='flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-10'>
            <div data-aos='zoom-in'>
              {/* <Button onClick={()=> {RegisterHandle()}} color='gold'>{grandSeminar.buttonTextRegister}</Button> */}
              <CustomLink color='gold' url='/events/exhibition/registration'>
                {grandSeminar.buttonTextRegister}
              </CustomLink>
            </div>
            <div data-aos='zoom-in'>
              <CustomLink color='trans-orange' url='#seemore'>
                {grandSeminar.buttonTextSeeMoreCountdown}
              </CustomLink>
            </div>
          </div>
        </Countdown>
      )}

      {grandSeminar.detailSpeakerSectionTitle && (
        <div className='w-full flex flex-col justify-center py-[80px] lg:py-[120px] items-center h-fit bg-gradient-to-b from-[rgba(7,29,16,0.45)] to-[#0F3015]'>
          {/* h1 Title Page */}
          <section className='flex flex-col gap-5 lg:gap-10 w-full items-center justify-center px-8 sm:px-10 md:px-20 xl:px-32 2xl:px-40'>
            <div
              data-aos='fade-in'
              className='bg-gradient-brown border-2 border-solid border-[#AB814E] bg-transparent shadow-[0_0_0.9732px_#705229,0_0_1.9464px_#705229,0_0_6.8124px_#705229,0_0_13.6248px_#705229,0_0_23.3568px_#705229,0_0_40.8744px_#705229] p-1.5 rounded-2xl'
            >
              <div className='relative bg-gradient-green items-center justify-center p-4 lg:py-6 sm:px-10 md:px-12 lg:px-16 rounded-xl'>
                <TitleSection>{grandSeminar.titleSeminarPage}</TitleSection>
              </div>
            </div>
            {/* Carousels */}
            <div className='h-fit w-full flex flex-col items-center justify-center py-8 lg:py-16 '>
              <MentorCarousel options={allSpeakerDetails} />
            </div>
          </section>

          <section
            id='seemore'
            className={`flex flex-col gap-20 w-full items-center justify-center px-8 sm:px-10 md:px-20 lg:px-40 ${
              allSpeakerDetails.length <= 2 && 'py-8 lg:py-16'
            }`}
          >
            {/* Our Mentors subtitle */}
            {grandSeminar.detailSpeakerSectionTitle &&
              allSpeakerDetails.length > 2 && (
                <div className='max-w-[1300px] bg-transparent shadow-[0_0_0.9732px_#705229,0_0_1.9464px_#705229,0_0_6.8124px_#705229,0_0_13.6248px_#705229,0_0_23.3568px_#705229,0_0_40.8744px_#705229] p-0.5 rounded-2xl'>
                  <div className='bg-gradient-green items-center justify-center p-4 lg:py-6 sm:px-10 md:px-12 lg:px-16 rounded-xl'>
                    <TitleSection>
                      {grandSeminar.detailSpeakerSectionTitle}
                    </TitleSection>
                  </div>
                </div>
              )}

            <MentorCards options={allSpeakerDetails} />
          </section>
        </div>
      )}
      {/* FAQ */}
      {/* <section className='w-full flex flex-col px-8 sm:px-10 md:px-20 lg:px-40 items-center justify-center gap-10 pb-20'>
        <TitleSection>{grandSeminar.faqSectionTitle}</TitleSection>
        <div className='w-full h-full flex flex-col gap-3'>
          {faqData.map((faq, index) => (
            <FAQ key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </section> */}
    </main>
  );
};

export default ExhibitionPage;

export const metadata: Metadata = {
  title: 'Grand Seminar | Sandbox IEEE ITB',
  description:
    "Join us for the Grand Seminar by Sandbox IEEE ITB, an exciting event featuring in-depth discussions, expert speakers, and valuable insights on a wide range of technology topics. Learn about the event's agenda, registration process, exhibitors, and explore the profiles of our distinguished speakers. Get answers to frequently asked questions (FAQ) to make the most of your Grand Seminar experience. Don't miss this opportunity to expand your knowledge and connection in technology.",
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
    canonical: '/events/grand-seminar',
    languages: {
      'en-US': '/en-US/events/grand-seminar',
      'id-ID': '/id-ID/events/grand-seminar',
    },
  },
  openGraph: {
    title: 'Sandbox IEEE ITB',
    description:
      "Join us for the Grand Seminar by Sandbox IEEE ITB, an exciting event featuring in-depth discussions, expert speakers, and valuable insights on a wide range of technology topics. Learn about the event's agenda, registration process, exhibitors, and explore the profiles of our distinguished speakers. Get answers to frequently asked questions (FAQ) to make the most of your Grand Seminar experience. Don't miss this opportunity to expand your knowledge and connection in technology.",
    url: 'https://sandbox.ieeeitb.com/events/grand-seminar',
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
      "Join us for the Grand Seminar by Sandbox IEEE ITB, an exciting event featuring in-depth discussions, expert speakers, and valuable insights on a wide range of technology topics. Learn about the event's agenda, registration process, exhibitors, and explore the profiles of our distinguished speakers. Get answers to frequently asked questions (FAQ) to make the most of your Grand Seminar experience. Don't miss this opportunity to expand your knowledge and connection in technology.",
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
