import AboutUs from '@/components/AboutUs';
import ClientHome from '@/components/client-home';
import Countdown from '@/components/Countdown';
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
  const {
    homepage,
    allTimelineSandboxes,
    allOurEventsHomepages,
    allFaqHomePages,
  }: HomepageProps = await performRequest({
    query: CMS_QUERY,
    revalidate: 0,
  });

  return (
    <main className='flex min-h-screen w-full flex-col font-museo-muderno bg-[#040B15]'>
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

      {/* Timeline */}
      <section className='w-full flex flex-col py-8 lg:py-10 xl:py-14 2xl:py-20'>
        <div className='w-full flex items-center justify-center'>
          <TitleSection>{homepage.timelineSectionTitle}</TitleSection>
        </div>
        <Timeline items={allTimelineSandboxes} />
      </section>

      {/* FAQ + Sponsor and media partner */}

      {/* Sponsor */}
    </main>
  );
}
