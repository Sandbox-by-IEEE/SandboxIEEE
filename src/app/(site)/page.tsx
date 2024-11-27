import AboutUs from '@/components/AboutUs';
import ClientHome from '@/components/client-home';
import Countdown from '@/components/Countdown';
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
  const { homepage, allTimelineSandboxes, allFaqHomePages }: HomepageProps =
    await performRequest({
      query: CMS_QUERY,
      revalidate: 0,
    });

  return (
    <main className='flex min-h-screen w-full flex-col font-museo-muderno bg-[#040B15] justify-center items-center'>
      <ClientHome />
      {/* Countdown Section */}
      <div className='mt-[244px]'>
        <Countdown />
      </div>

      {/* Trailer Section */}

      {/* About Sandbox */}
      <div className='my-[240px]'>
        <AboutUs />
      </div>
      {/* Our Events */}
      <section className='w-[80%] flex flex-col gap-6 lg:gap-20 py-8 lg:py-10 xl:py-14 2xl:py-20 bg-[#040B15]'>
        <OurEvents />
      </section>

      {/* Timeline */}
      <section className='w-full flex flex-col py-8 lg:py-10 xl:py-14 2xl:py-20'>
          <div className='w-full flex items-center justify-center'>
              <TitleSection>{homepage.timelineSectionTitle}</TitleSection>
          </div>
      </section>
      
      {/* FAQ + Sponsor and media partner */}
      {/* FAQ Section */}
      <section className='w-full flex flex-col gap-12 lg:gap-20 py-8 lg:py-10 xl:py-14 2xl:py-20 bg-[#040B15]'>
        {/* Title for FAQ Section */}
        <div
          className='p-1.5 rounded-2xl mx-8 sm:mx-10 md:mx-28 lg:mx-36 2xl:mx-52'
          data-aos='flip-up'
        >
          <div className=' items-center justify-center p-4 lg:py-8 sm:px-10 md:px-12 lg:px-16 rounded-xl'>
            <h2 className='text-center text-4xl lg:text-5xl font-bold text-white'>
              {homepage.faqSectionTitle}
            </h2>
            <p className='text-center text-xl lg:text-xl font-normal text-white mt-4'>
              Lorem ipsum dolor sit amet consectetur.
            </p>
          </div>

        {/* FAQ Content */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 px-8 sm:px-10 md:px-28 lg:px-36 2xl:px-52'>
          {allFaqHomePages.map((faq) => (
            <FAQ
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
              aos='fade-up'
            />
          ))}
        </div>
      </section>
      {/* Sponsor */}
    </main>
  );
}
