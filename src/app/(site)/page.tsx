import Image from 'next/image';
import { StructuredText } from 'react-datocms/structured-text';

import BackgroundCarousel from '@/components/background-carousel';
import ButtonRegistration from '@/components/ButtonRegistration';
import ClientHome from '@/components/client-home';
import { FAQ } from '@/components/FAQ';
import GradientBox from '@/components/GradientBox';
import CustomLink from '@/components/Link';
import ReelsEmbed from '@/components/reels-embed';
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
    <main className='flex min-h-screen w-full flex-col font-museo-muderno'>
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
      <section className='h-auto px-8 sm:px-10 md:px-20 lg:px-40  py-8 lg:py-10 xl:py-14 2xl:py-20 bg-[#092a16] flex flex-col items-center space-y-12'>
        <TitleSection>{homepage.trailerSectionTitle}</TitleSection>
        <div
          className='relative custom-scrollbar h-[450px] sm:h-[500px] w-full max-w-[400px] lg:h-[40vw] lg:w-[30vw] lg:max-w-[600px] lg:max-h-[700px] rounded-xl overflow-hidden shadow-[0px_0px_20px_7px_#D8B88B]'
          data-aos='zoom-out'
        >
          <ReelsEmbed />
        </div>
        <div className='flex gap-4 lg:gap-8 flex-col sm:flex-row justify-center w-full items-stretch max-w-[200px] sm:max-w-[380px] lg:w-[28vw] lg:max-w-[580px]'>
          <div data-aos='zoom-in'>
            <CustomLink
              color='gold'
              url='https://www.instagram.com/thesandbox.itb/'
              isFullWidth
            >
              {homepage.buttonTextGetKnowUs}
            </CustomLink>
          </div>
          <div data-aos='zoom-in'>
            <CustomLink color='trans-orange' url='/contact-us' isFullWidth>
              {homepage.buttonTextPartnerUs}
            </CustomLink>
          </div>
        </div>
      </section>

      {/* About Sandbox */}
      <section
        id={homepage.textButtonSeeMore}
        className='h-auto px-8 sm:px-10 md:px-20 lg:px-40  py-8 lg:py-10 xl:py-14 2xl:py-20 bg-gradient-to-b from-[#0b2712] to-[#123b1a] flex justify-center items-center'
      >
        <GradientBox
          className='min-h-[660px] w-[1206px] max-w-full flex flex-col items-center justify-center gap-8 p-8'
          aos='fade-in'
          duration={400}
        >
          <TitleSection>{homepage.explanationTitle}</TitleSection>
          <div className='flex flex-col md:flex-row gap-10 lg:gap-20 justify-center items-center overflow-hidden'>
            <Image
              data-aos='fade-down-right'
              src={homepage.sandboxLogo.url}
              width={homepage.sandboxLogo.width}
              height={homepage.sandboxLogo.width}
              alt={homepage.sandboxLogo.title || 'Sandbox Logo'}
              className='w-[100px] lg:w-[200px] object-contain'
            />
            <Image
              data-aos='fade-down-left'
              src={homepage.ieeeLogo.url}
              width={homepage.ieeeLogo.width}
              height={homepage.ieeeLogo.width}
              alt={homepage.ieeeLogo.title || "IEEE ITB's Logo"}
              className='w-[150px] lg:w-[300px] object-contain'
            />
          </div>
          <h4 className='text-[#FFE1B9] sm:px-20' data-aos='zoom-in-up'>
            <StructuredText data={homepage.explanationDescription} />
          </h4>
          <div data-aos='zoom-in'>
            <CustomLink color='gold' url='#events'>
              {homepage.buttonTextPastEvents}
            </CustomLink>
          </div>
        </GradientBox>
      </section>

      {/* Our Events */}
      <section
        id='events'
        className='h-auto px-8 sm:px-10 md:px-20 lg:px-40 py-8 lg:py-10 xl:py-14 2xl:py-20 bg-gradient-to-b from-[#0b2712] to-[#123b1a] space-y-12 w-full'
      >
        {/* Title */}
        <TitleSection>{homepage.ourEventSectionTitle}</TitleSection>

        {/* Content */}
        {allOurEventsHomepages.map((event, index) => (
          <article
            key={index}
            className={`flex flex-col sm:flex-row w-full bg-[#071D10] shadow-md shadow-[#00000040] max-w-[1200px] mx-auto text-[#FFE1B9] ${
              index % 2 === 0 ? 'sm:flex-row-reverse' : ''
            } rounded-lg overflow-hidden`}
            data-aos={index % 2 === 0 ? 'fade-left' : 'fade-right'}
          >
            <div className='w-full sm:w-[30%] sm:h-auto h-48 sm:aspect-[9/8] bg-slate-200 flex-shrink-0'>
              <Image
                width={event.image.width}
                height={event.image.width}
                src={event.image.url}
                alt={event.image.title || "Event's Image"}
                className='object-cover w-full h-full'
                sizes='(max-width: 640px) 100%, 30%'
              />
            </div>
            <div className='flex justify-center items-center w-full p-6 lg:p-8'>
              <div className='flex flex-col items-center sm:items-start w-full h-full'>
                {/* Event Name */}
                <div className='relative shadow-lg py-3'>
                  <h4
                    data-aos={
                      index % 2 === 1 ? 'fade-down-right' : 'fade-down-left'
                    }
                    data-aos-duration='500'
                    className='text-transparent bg-clip-text bg-gradient-to-tr from-[#af8954] via-[#cfb57c] to-[#ede1a2] text-2xl lg:text-[32px] font-extrabold tracking-wider w-full text-center md:text-left shadow-lg font-poppins'
                    style={{
                      ['textShadow' as any]: '0px 0px 17.32px #BD9B65',
                    }}
                  >
                    {event.eventName}
                  </h4>
                </div>
                {/* Highlight */}
                {event.highlightEvent && (
                  <div className='relative shadow-lg pb-4'>
                    <p
                      data-aos={index % 2 === 1 ? 'fade-right' : 'fade-left'}
                      data-aos-duration='500'
                      className='text-transparent bg-clip-text bg-gradient-to-tr from-[#af8954] via-[#cfb57c] to-[#ede1a2] text-xl lg:text-[27px] font-extrabold tracking-wider w-full text-center md:text-left shadow-lg font-poppins'
                      style={{
                        ['textShadow' as any]: '0px 0px 17.32px #BD9B65',
                      }}
                    >
                      {event.highlightEvent}
                    </p>
                  </div>
                )}
                <div
                  className='text-base lg:text-lg'
                  data-aos={index % 2 === 1 ? 'fade-up-right' : 'fade-up-left'}
                  data-aos-duration='500'
                >
                  <StructuredText data={event.explanationEvent} />
                </div>
                {/* Button */}
                <div className='flex flex-wrap items-center justify-center gap-4 h-full py-5'>
                  {event.buttonRegister && (
                    <div data-aos='zoom-in'>
                      <ButtonRegistration
                        type={
                          event.eventName.toLowerCase().replace(/\s+/g, '-') ==
                            'technovate-paper-competition' ||
                          event.eventName.toLowerCase().replace(/\s+/g, '-') ==
                            'tpc'
                            ? 'TPC'
                            : 'PTC'
                        }
                        color='gold'
                      >
                        Register
                      </ButtonRegistration>
                    </div>
                  )}
                  {event.buttonSeeMore && (
                    <div data-aos='zoom-in'>
                      <CustomLink
                        color='trans-orange'
                        url={`/events/${event.eventName
                          .toLowerCase()
                          .replace(/\s+/g, '-')}`}
                      >
                        Event Details
                      </CustomLink>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Timeline */}
      <section className='w-full px-8 sm:px-10 md:px-28 lg:px-36 2xl:px-52 flex flex-col gap-12 lg:gap-20 py-8 lg:py-10 xl:py-14 2xl:py-20 bg-[#092a16]'>
        <div
          className='bg-gradient-brown border-2 border-solid border-[#AB814E] bg-transparent shadow-[0_0_0.9732px_#705229,0_0_1.9464px_#705229,0_0_6.8124px_#705229,0_0_13.6248px_#705229,0_0_23.3568px_#705229,0_0_40.8744px_#705229] p-1.5 rounded-2xl'
          data-aos='flip-up'
        >
          <div className='bg-gradient-green items-center justify-center p-4 lg:py-8 sm:px-10 md:px-12 lg:px-16 rounded-xl'>
            <TitleSection>{homepage.timelineSectionTitle}</TitleSection>
          </div>
        </div>
        <Timeline items={allTimelineSandboxes} />
      </section>

      {/* FAQ + Sponsor and media partner */}
      <section className='h-auto px-8 sm:px-10 md:px-20 lg:px-40 py-8 lg:py-10 xl:py-14 2xl:py-20 bg-gradient-to-b from-[#0b2712] to-[#123b1a] flex flex-col gap-8 lg:gap-12'>
        <TitleSection>{homepage.faqSectionTitle}</TitleSection>
        <div className='flex flex-col gap-5 items-center justify-center'>
          {allFaqHomePages.map((faq, index) => (
            <FAQ
              key={index}
              question={faq.question}
              answer={faq.answer}
              aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}
            ></FAQ>
          ))}
        </div>
      </section>
      {/* Sponsor */}
      <section className='h-auto px-8 sm:px-10 md:px-20 lg:px-40 py-8 lg:py-10 xl:py-14 2xl:py-20 bg-gradient-to-b from-[#0b2712] to-[#123b1a] flex flex-col gap-5 lg:gap-12'>
        <GradientBox
          className='min-h-[660px] w-[1206px] max-w-full flex flex-col items-center justify-center gap-8 p-8'
          aos='zoom-out'
          data-aos-duration={500}
        >
          <TitleSection>{homepage.ourSponsor}</TitleSection>
          <div className='flex p-3 lg:p-4 gap-3 lg:gap-6 flex-wrap justify-center'>
            {homepage.ourSponsorLogo.map((logo, index) => (
              <Image
                key={logo.id}
                src={logo.url}
                width={logo.width}
                height={logo.height}
                alt={logo.title}
                className='object-contain w-[200px] h-[100px] lg:w-[300px] lg:h-[200px]'
                sizes='(max-width: 1024px) 100px, 300px'
                data-aos='flip-up'
                data-aos-duration={700 + index * 50}
              />
            ))}
          </div>
          <div data-aos='zoom-in'>
            <CustomLink color='gold' url='/contact-us'>
              {homepage.buttonTextPartnerUs}
            </CustomLink>
          </div>
        </GradientBox>
      </section>
    </main>
  );
}
