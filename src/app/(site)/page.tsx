import BackgroundCarousel from '@/components/background-carousel';
import ClientHome from '@/components/client-home';
import CustomLink from '@/components/Link';
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
      <section className='relative w-full h-fit bg-green-dark-green'>
        <BackgroundCarousel images={homepage.background} />
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
            className='text-4xl text-center lg:text-5xl 2xl:text-[56px] font-bold font-museo-muderno p-1 bg-gradient-brown text-transparent drop-shadow-[2px_3px_10px_10px_#bbcc9e] bg-clip-text'
          >
            {homepage.titleHomepage}
          </h2>
          {homepage.tagline && <TitleSection>{homepage.tagline}</TitleSection>}
          <div className='animate-blink duration-500 transition-all'>
            <CustomLink color='green' url={'#' + homepage.textButtonSeeMore}>
              {homepage.textButtonSeeMore}
            </CustomLink>
          </div>
        </div>
      </section>

      {/* Countdown Section */}

      {/* Trailer Section */}

      {/* About Sandbox */}

      {/* Our Events */}
      <section className='w-full flex flex-col gap-6 lg:gap-20 py-8 lg:py-10 xl:py-14 2xl:py-20 bg-[#040B15]'>
        <OurEvents />
      </section>

      {/* Timeline */}
      <section className='w-full flex flex-col gap-12 lg:gap-20 py-8 lg:py-10 xl:py-14 2xl:py-20 bg-[#092a16]'>
        <div
          className='bg-gradient-brown border-2 border-solid border-[#AB814E] bg-transparent shadow-[0_0_0.9732px_#705229,0_0_1.9464px_#705229,0_0_6.8124px_#705229,0_0_13.6248px_#705229,0_0_23.3568px_#705229,0_0_40.8744px_#705229] p-1.5 rounded-2xl mx-8 sm:mx-10 md:mx-28 lg:mx-36 2xl:mx-52'
          data-aos='flip-up'
        >
          <div className='bg-gradient-green items-center justify-center p-4 lg:py-8 sm:px-10 md:px-12 lg:px-16 rounded-xl'>
            <TitleSection>{homepage.timelineSectionTitle}</TitleSection>
          </div>
        </div>
        <Timeline items={allTimelineSandboxes} />
      </section>

      {/* FAQ + Sponsor and media partner */}

      {/* Sponsor */}
    </main>
  );
}
