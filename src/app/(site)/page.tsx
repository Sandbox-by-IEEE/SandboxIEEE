import Image from 'next/image';
import { StructuredText } from 'react-datocms/structured-text';

import AboutUs from '@/components/AboutUs';
import ClientHome from '@/components/client-home';
import Countdown from '@/components/Countdown';
import { FAQ } from '@/components/FAQ';
import OurEvents from '@/components/OurEvents';
import Timeline from '@/components/Timeline';
import TitleSection from '@/components/TitleSection';
import { performRequest } from '@/lib/datocms';
import { type HomepageProps } from '@/types/homepage';

const CMS_QUERY = `{
  homepage {
    trailerSectionTitle
    titleHomepage
    titleCountdownNearestEvent
    timelineSectionTitle
    textButtonSeeMore
    targetDate
    tagline
    sandboxLogo {
      url
      width
      title
      height
    }
    ourSponsorLogo {
      url
      width
      title
      id
      height
    }
    ieeeLogo {
      width
      url
      title
      height
    }
    ourEventSectionTitle
    ourSponsor
    faqSectionTitle
    explanationTitle
    explanationDescription {
      value
    }
    embedYoutubeId
    buttonTextTwo
    buttonTextPastEvents
    buttonTextPartnerUs
    buttonTextOne
    linkButtonTwo
    linkButtonOne
    buttonTextGetKnowUs
    background {
      url
      width
      id
      title
      height
    }
  }
  allTimelineSandboxes(orderBy: date_ASC) {
    id
    text
    date
    endDate
  }
  allOurEventsHomepages {
    id
    image {
      width
      url
      title
      height
    }
    highlightEvent
    explanationEvent {
      value
    }
    eventName
    buttonSeeMore
    buttonRegister
  }
  allFaqHomePages(orderBy: question_ASC) {
    id
    answer {
      value
    }
    question
  }
} `;

export default async function Home({
  // eslint-disable-next-line unused-imports/no-unused-vars
  searchParams: { token },
}: {
  searchParams: { token: string };
}) {
  const {
    homepage,
    allOurEventsHomepages,
    allTimelineSandboxes,
    allFaqHomePages,
  }: HomepageProps = await performRequest({
    query: CMS_QUERY,
    revalidate: 0,
  });

  return (
    <main className='flex min-h-screen w-full flex-col font-poppins justify-center items-center'>
      <ClientHome />
      {/* Countdown Section */}
      <div className='w-[80%] mt-[120px] mb-[60px] lg:my-[180px]'>
        <Countdown link1='#events' targetDate={new Date(homepage.targetDate)} />
      </div>

      {/* Trailer Section */}

      {/* About Sandbox */}
      <div id='about' className='w-[80%] mb-[60px] lg:mb-[180px]'>
        <AboutUs title={homepage.explanationTitle}>
          <StructuredText data={homepage.explanationDescription} />
        </AboutUs>
      </div>

      {/* Timeline */}
      <section className='w-[105vw] flex flex-col mb-[120px] md:mb-[180px]'>
        <div className='mb-16 md:mb-24 w-full flex items-center justify-center'>
          <TitleSection>{homepage.timelineSectionTitle}</TitleSection>
        </div>
        <Timeline items={allTimelineSandboxes} />
      </section>

      {/* Our Events */}
      <section
        id='events'
        className='w-[80%] mb-[60px] lg:mb-[180px] flex flex-col gap-6 lg:gap-20'
      >
        <OurEvents events={allOurEventsHomepages} />
      </section>

      {/* FAQ + Sponsor and media partner */}
      {/* FAQ Section */}
      <section className='w-[80%] flex flex-col gap-12 lg:gap-20 mb-[80px] md:mb-[120px]'>
        {/* Title for FAQ Section */}
        <div
          className='flex items-center flex-col p-1.5 rounded-2xl'
          data-aos='flip-up'
        >
          <div
            className='flex lg:block lg:absolute inset-0 left-[-32px] lg:left-[150px] items-center justify-center w-full'
            data-aos='fade-up'
            data-aos-duration='1500'
          >
            <Image
              src='/faq1.svg'
              alt='faq'
              width={200}
              height={200}
              className='lg:w-[200px] lg:h-[200px] object-contain'
            />
          </div>
          <div
            className='absolute right-[-32px] lg:right-[150px] items-center'
            data-aos='fade-up'
            data-aos-duration='1500'
          >
            <Image
              src='/faq2.svg'
              alt='faq'
              width={0}
              height={0}
              sizes='100vw'
              className='lg:w-[200px] lg:h-[200px] object-contain md:block hidden'
            />
          </div>
          <div className=' items-center justify-center p-4 lg:py-8 sm:px-10 md:px-12 lg:px-16 rounded-xl'>
            <TitleSection size='lg'>{homepage.faqSectionTitle}</TitleSection>
            <p className='text-center text-xl lg:text-xl font-normal text-white mt-4'>
              Check the FAQs
            </p>
          </div>

          {/* FAQ Content */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            {allFaqHomePages.map((faq) => (
              <FAQ
                key={faq.id}
                question={faq.question}
                answer={faq.answer}
                aos='fade-up'
              />
            ))}
          </div>
        </div>
      </section>
      {/* Sponsor */}
    </main>
  );
}
