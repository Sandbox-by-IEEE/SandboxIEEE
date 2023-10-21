import dynamic from 'next/dynamic';
import Image from 'next/image';
import { StructuredText } from 'react-datocms/structured-text';

import { FAQ } from '@/components/FAQ';
import GradientBox from '@/components/GradientBox';
import CustomLink from '@/components/Link';
import Timeline from '@/components/Timeline';
import TitleSection from '@/components/TitleSection';
import { performRequest } from '@/lib/datocms';
import { HomepageProps } from '@/types/homepage';

const Countdown = dynamic(() => import('@/components/Countdown'), {
  ssr: false,
});
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
    buttonTextGetKnowUs
    background {
      url
      width
      id
      title
      height
    }
  }
  allTimelineSandboxes {
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
  allFaqHomePages {
    id
    answer {
      value
    }
    question
  }
} `;
export default async function Home() {
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
      <section className='relative w-full h-fit'>
        <Image
          src={homepage.background[2].url}
          width={homepage.background[2].width}
          height={homepage.background[2].height}
          alt={homepage.background[2].title}
          className='w-full object-cover h-[671px] object-center'
        />
        {/* Text Content on background */}
        <div
          className='absolute top-1/2 p-24 -translate-y-1/2 left-1/2 -translate-x-1/2 z-20 w-fit h-fit flex flex-col gap-8 items-center justify-center'
          style={{
            background:
              'radial-gradient(50% 50% at 50% 50%, rgba(8, 30, 17, 0.90) 18.33%, rgba(0, 0, 0, 0.00) 99.48%)',
          }}
        >
          <h1
            style={{
              ['textShadow' as any]:
                '0px 0px 97.32px #BD9B65, 0px 0px 1.9464px #BD9B65',
            }}
            className='text-4xl lg:text-5xl 2xl:text-[56px] font-bold font-museo-muderno p-1 bg-gradient-brown text-transparent drop-shadow-[2px_3px_10px_10px_#bbcc9e] bg-clip-text'
          >
            {homepage.titleHomepage}
          </h1>
          <TitleSection>{homepage.tagline}</TitleSection>
          <CustomLink color='green' url='/homepage'>
            {homepage.textButtonSeeMore}
          </CustomLink>
        </div>
      </section>

      {/* Countdown Section */}
      <section className='h-auto px-8 sm:px-10 md:px-20 lg:px-40  py-8 lg:py-10 xl:py-14 2xl:py-20 bg-gradient-to-b from-[#0b2712] to-[#123b1a] w-full'>
        <div className='gradient-border-bg border-2 max-w-[1100px] mx-auto rounded-md flex flex-col items-center sm:space-y-8 w-full'>
          <div className='text-[30px] sm:text-[32px]'>
            <TitleSection>{homepage.titleCountdownNearestEvent}</TitleSection>
          </div>
          <div className='scale-75 sm:scale-100'>
            <Countdown targetDate={new Date(homepage.targetDate)} />
          </div>
          <div className='flex gap-4 py-8'>
            <CustomLink color='gold' url='/'>
              {homepage.buttonTextOne}
            </CustomLink>
            <CustomLink color='trans-orange' url='/'>
              {homepage.buttonTextTwo}
            </CustomLink>
          </div>
        </div>
      </section>

      {/* Trailer Section */}
      <section className='h-auto px-8 sm:px-10 md:px-20 lg:px-40  py-8 lg:py-10 xl:py-14 2xl:py-20 bg-[#092a16] flex flex-col items-center space-y-8'>
        <TitleSection>{homepage.trailerSectionTitle}</TitleSection>
        <div className='h-fit w-fit rounded-xl overflow-hidden shadow-[0px_0px_20px_7px_#D8B88B]'>
          <iframe
            width={`${500}`}
            height={`${500}`}
            src={`https://www.youtube.com/embed/${homepage.embedYoutubeId}`}
            className='h-[300px] w-full max-w-[400px] lg:h-[20vw] lg:w-[30vw] lg:max-w-[600px] lg:max-h-[500px]'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscrope; picture-in-picture'
            allowFullScreen
            title='TEST'
          />
        </div>
        <div className='flex gap-8'>
          <CustomLink color='gold' url='/'>
            {homepage.buttonTextGetKnowUs}
          </CustomLink>
          <CustomLink color='trans-orange' url='/'>
            {homepage.buttonTextPartnerUs}
          </CustomLink>
        </div>
      </section>

      {/* About Sandbox */}
      <section className='h-auto px-8 sm:px-10 md:px-20 lg:px-40  py-8 lg:py-10 xl:py-14 2xl:py-20 bg-gradient-to-b from-[#0b2712] to-[#123b1a] flex justify-center items-center'>
        <GradientBox className='min-h-[660px] w-[1206px] max-w-full flex flex-col items-center justify-center gap-8 p-4'>
          <TitleSection>{homepage.explanationTitle}</TitleSection>
          <div className='flex flex-col md:flex-row gap-10 lg:gap-20 justify-center items-center overflow-hidden'>
            <Image
              src={homepage.sandboxLogo.url}
              width={homepage.sandboxLogo.width}
              height={homepage.sandboxLogo.width}
              alt={homepage.sandboxLogo.title}
              className='w-[130px] lg:w-[200px] object-contain'
            />
            <Image
              src={homepage.ieeeLogo.url}
              width={homepage.ieeeLogo.width}
              height={homepage.ieeeLogo.width}
              alt={homepage.ieeeLogo.title}
              className='w-[200px] lg:w-[300px] object-contain'
            />
          </div>
          <div className='text-[#FFE1B9] sm:px-20'>
            <StructuredText data={homepage.explanationDescription} />
          </div>

          <CustomLink color='gold' url='/'>
            {homepage.buttonTextPastEvents}
          </CustomLink>
        </GradientBox>
      </section>

      {/* Our Events */}
      <section className='h-auto px-8 sm:px-10 md:px-20 lg:px-40  py-8 lg:py-10 xl:py-14 2xl:py-20 bg-gradient-to-b from-[#0b2712] to-[#123b1a] space-y-8 w-full'>
        {/* Title */}
        <TitleSection>{homepage.ourEventSectionTitle}</TitleSection>

        {/* Content */}
        {allOurEventsHomepages.map((event, index) => (
          <div
            key={index}
            className={`flex flex-col sm:flex-row w-full bg-[#071D10] shadow-md shadow-[#00000040] max-w-[1200px] mx-auto text-[#FFE1B9] ${
              index % 2 === 0 ? 'sm:flex-row-reverse' : ''
            } rounded-lg overflow-hidden`}
          >
            <div className='w-full sm:w-[30%] sm:h-auto h-40 sm:aspect-[9/8] bg-slate-200 flex-shrink-0'>
              <Image
                width={event.image.width}
                height={event.image.width}
                src={event.image.url}
                alt={event.image.title}
                className='object-contain w-full h-full'
              />
            </div>
            <div className='flex justify-center items-center w-full p-8'>
              <div className='flex flex-col items-center w-full h-full'>
                <div className='relative shadow-lg'>
                  <p className='py-2 text-transparent bg-clip-text bg-gradient-to-tr from-[#af8954] via-[#cfb57c] to-[#ede1a2] text-[32px] font-extrabold tracking-wider w-full text-center md:text-left shadow-lg font-poppins'>
                    {event.eventName}
                  </p>
                  <p className='py-2 text-transparent bg-clip-text bg-gradient-to-tr from-[#745737] to-[#c1aa8d] text-[32px] font-extrabold tracking-wider blur-[10px] absolute top-0 w-full text-center md:text-left select-none z-[50] font-poppins'>
                    {event.eventName}
                  </p>
                </div>
                {event.highlightEvent && (
                  <div className='relative shadow-lg'>
                    <p className='text-transparent bg-clip-text bg-gradient-to-tr from-[#af8954] via-[#cfb57c] to-[#ede1a2] text-[27px] font-extrabold tracking-wider w-full text-center md:text-left shadow-lg font-poppins'>
                      {event.highlightEvent}
                    </p>

                    <p className='text-transparent bg-clip-text bg-gradient-to-tr from-[#745737] to-[#c1aa8d] text-[27px] font-extrabold tracking-wider blur-[10px] absolute top-0 w-full text-center md:text-left select-none z-[50] font-poppins'>
                      {event.highlightEvent}
                    </p>
                  </div>
                )}
                <StructuredText data={event.explanationEvent} />
                <div className='flex flex-col sm:flex-row gap-2 items-end h-full py-4'>
                  {event.buttonRegister && (
                    <CustomLink color='gold' url='/'>
                      Register
                    </CustomLink>
                  )}
                  {event.buttonSeeMore && (
                    <CustomLink color='trans-orange' url='/'>
                      See More
                    </CustomLink>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Timeline */}
      <section className='h-auto p-10 bg-[#092a16] px-8 sm:px-10 md:px-20 lg:px-40  py-8 lg:py-10 xl:py-14 2xl:py-20'>
        <TitleSection>{homepage.timelineSectionTitle}</TitleSection>
        <Timeline items={allTimelineSandboxes} />
      </section>

      {/* FAQ + Sponsor and media partner */}
      <section className='h-auto px-8 sm:px-10 md:px-20 lg:px-40  py-8 lg:py-10 xl:py-14 2xl:py-20 bg-gradient-to-b from-[#0b2712] to-[#123b1a] flex flex-col gap-5'>
        <TitleSection>{homepage.faqSectionTitle}</TitleSection>

        {allFaqHomePages.map((faq, index) => (
          <FAQ key={index} question={faq.question} answer={faq.answer}></FAQ>
        ))}

        <GradientBox className='min-h-[660px] w-[1206px] max-w-full flex flex-col items-center justify-center gap-8 p-4 '>
          <TitleSection>{homepage.ourSponsor}</TitleSection>
          <div className='flex p-3 lg:p-4 gap-3 lg:gap-6 flex-wrap justify-center'>
            {homepage.ourSponsorLogo.map((logo) => (
              <Image
                key={logo.id}
                src={logo.url}
                width={logo.width}
                height={logo.height}
                alt={logo.title}
                className='object-contain w-[150px] h-[100px] lg:w-[300px] lg:h-[200px]'
              />
            ))}
          </div>
          <CustomLink color='gold' url='/'>
            {homepage.buttonTextPartnerUs}
          </CustomLink>
        </GradientBox>
      </section>
    </main>
  );
}
