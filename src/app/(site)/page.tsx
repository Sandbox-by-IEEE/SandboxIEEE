import dynamic from 'next/dynamic';
import Image from 'next/image';
import { StructuredText } from 'react-datocms/structured-text';

import { FAQ } from '@/components/FAQ';
import GradientBox from '@/components/GradientBox';
import IEEEITBStudentBranchIcon from '@/components/icons/IEEEITBStudentBranchIcon';
import SandboxByIEEEITBIcon from '@/components/icons/SandboxByIEEEITBIcon';
import CustomLink from '@/components/Link';
import ShadowGradientText from '@/components/ShadowGradientText';
import Timeline from '@/components/Timeline';
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
    ourSponsor
    ourEventSectionTitle
    ieeeLogo {
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
          src={homepage.background[1].url}
          width={homepage.background[1].width}
          height={homepage.background[1].height}
          alt={homepage.background[1].title}
          className='w-full object-cover h-[671px] object-center'
        />
        {/* Text Content on background */}
        <div className='absolute bg-gradient-green bg-opacity-20 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-20 w-fit h-fit flex flex-col gap-8 items-center justify-center'>
          <h1
            style={{
              ['textShadow' as any]:
                '0px 0px 97.32px #BD9B65, 0px 0px 1.9464px #BD9B65',
            }}
            className='text-4xl lg:text-5xl 2xl:text-[56px] font-bold font-museo-muderno p-1 bg-gradient-brown text-transparent drop-shadow-[2px_3px_10px_10px_#bbcc9e] bg-clip-text'
          >
            {homepage.titleHomepage}
          </h1>
          <CustomLink color='green' url='/homepage'>
            {homepage.textButtonSeeMore}
          </CustomLink>
        </div>
      </section>

      {/* Countdown Section */}
      <section className='h-auto p-4 bg-gradient-to-b from-[#0b2712] to-[#123b1a] w-full'>
        <div className='gradient-border-bg border-2 max-w-[1100px] mx-auto rounded-md flex flex-col items-center sm:space-y-8 w-full'>
          <div className='text-[30px] sm:text-[32px]'>
            <ShadowGradientText text={homepage.titleCountdownNearestEvent} />
          </div>
          {/* <div className='scale-75 sm:scale-100'>
            <Countdown targetDate={homepage.targetDate} />
          </div> */}
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
      <section className='h-auto p-10 bg-[#092a16] flex flex-col items-center space-y-8'>
        <ShadowGradientText text='Trailer Sandbox 2023' />
        <div className='h-[400px] w-[500px] max-w-full rounded-lg bg-slate-200'>
          <iframe
            width={`${500}`}
            height={`${400}`}
            src={`https://www.youtube.com/embed/${homepage.embedYoutubeId}`}
            className='h-[200px] w-[calc(100%-10px)] sm:h-[300px] md:h-[400px] lg:h-[20vw] lg:w-[30vw] lg:max-w-[500px] lg:max-h-[500px]'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscrope; picture-in-picture'
            allowFullScreen
            title='TEST'
            data-aos='zoom-in'
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
      <section className='h-auto p-10 bg-gradient-to-b from-[#0b2712] to-[#123b1a] flex justify-center items-center'>
        <GradientBox className='min-h-[660px] w-[1206px] max-w-full flex flex-col items-center justify-center gap-8 p-4'>
          <div className='relative text-4xl font-extrabold text-[#9a7037] '>
            <p className='absolute top-0 left-0 text-[#FFE1B9] backdrop-blur-sm text-center'>
              {homepage.explanationTitle}
            </p>
            <h2 className='z-10 text-center'>{homepage.explanationTitle}</h2>
          </div>
          <div className='flex gap-20 justify-center'>
            <Image
              src={homepage.sandboxLogo.url}
              width={homepage.sandboxLogo.width}
              height={homepage.sandboxLogo.width}
              alt={homepage.sandboxLogo.title}
              className='w-[200px] object-contain'
            />
            <Image
              src={homepage.ieeeLogo.url}
              width={homepage.ieeeLogo.width}
              height={homepage.ieeeLogo.width}
              alt={homepage.ieeeLogo.title}
              className='flex-auto  object-contain'
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
      <section className='h-auto p-10 bg-gradient-to-b from-[#0b2712] to-[#123b1a] space-y-4 w-full'>
        {/* Title */}
        <div className='relative w-fit mx-auto'>
          <div className='rounded-[4px] overflow-hidden transition-all duration-300'>
            <div className='gradient-border-bg relative shadow-lg shadow-cream-secondary-light px-3 py-2'>
              <p className='py-4 text-transparent bg-clip-text bg-gradient-to-tr from-[#af8954] via-[#cfb57c] to-[#ede1a2] text-[32px] font-extrabold tracking-wider w-full text-center md:text-left shadow-lg'>
                {homepage.ourEventSectionTitle}
              </p>
            </div>
          </div>
          <div className='absolute top-0 blur-[4px] rounded-[4px] overflow-hidden transition-all duration-300'>
            <div className='gradient-border-bg relative shadow-lg shadow-cream-secondary-light px-3 py-2'>
              <p className='py-4 text-transparent bg-clip-text bg-gradient-to-tr from-[#af8954] via-[#cfb57c] to-[#ede1a2] text-[32px] font-extrabold tracking-wider w-full text-center md:text-left shadow-lg'>
                {homepage.ourEventSectionTitle}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        {allOurEventsHomepages.map((event, index) => (
          <div
            key={index}
            className={`flex flex-col sm:flex-row w-full bg-[#071D10] shadow-md shadow-[#00000040] max-w-[1200px] mx-auto text-[#FFE1B9] ${
              index % 2 === 0 ? 'sm:flex-row-reverse' : ''
            }`}
          >
            <div className='w-full sm:w-[30%] sm:h-auto h-40 sm:aspect-[9/8] bg-slate-200 flex-shrink-0'>
              <Image
                width={event.image.width}
                height={event.image.width}
                src={event.image.url}
                alt={event.image.title}
              />
            </div>
            <div className='flex justify-center w-full p-8'>
              <div className='flex flex-col items-start w-full h-full'>
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
                <div className='flex gap-2 items-end h-full py-4'>
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
      <section className='h-auto p-10 bg-[#092a16]'>
        <div className='relative w-full text-center pb-4'>
          <div className='rounded-[4px] overflow-hidden transition-all duration-300 w-full'>
            <div className='gradient-border-bg relative shadow-lg shadow-cream-secondary-light px-3 py-2 w-full'>
              <p className='py-4 text-transparent bg-clip-text bg-gradient-to-tr from-[#af8954] via-[#cfb57c] to-[#ede1a2] text-[32px] font-extrabold tracking-wider w-full text-center shadow-lg'>
                {homepage.timelineSectionTitle}
              </p>
            </div>
          </div>
          <div className='absolute top-0 blur-[4px] rounded-[4px] overflow-hidden transition-all duration-300 w-full'>
            <div className='gradient-border-bg relative shadow-lg shadow-cream-secondary-light px-3 py-2 w-full'>
              <p className='py-4 text-transparent bg-clip-text bg-gradient-to-tr from-[#af8954] via-[#cfb57c] to-[#ede1a2] text-[32px] font-extrabold tracking-wider w-full text-center shadow-lg'>
                {homepage.timelineSectionTitle}
              </p>
            </div>
          </div>
        </div>
        <Timeline items={allTimelineSandboxes} />
      </section>

      {/* FAQ + Sponsor and media partner */}
      <section className='h-auto p-10 bg-gradient-to-b from-[#0b2712] to-[#123b1a] space-y-4'>
        <p className='py-4 text-transparent bg-clip-text bg-gradient-brown text-[32px] font-extrabold tracking-wider w-full text-center shadow-lg'>
          {homepage.faqSectionTitle}
        </p>

        {allFaqHomePages.map((faq, index) => (
          <FAQ key={index} question={faq.question} answer={faq.answer}></FAQ>
        ))}

        <GradientBox className='min-h-[660px] w-[1206px] max-w-full flex flex-col items-center justify-center gap-8 p-4 '>
          <div className=' relative text-4xl font-extrabold text-[#9a7037] '>
            <p className='absolute top-0 left-0 text-[#FFE1B9] backdrop-blur-sm text-center'>
              Our Sponsor & Media Partner
            </p>
            <h2 className='z-10 text-center'>Our Sponsor & Media Partner</h2>
          </div>
          <div className='flex gap-6 flex-wrap justify-center'>
            <SandboxByIEEEITBIcon />
            <SandboxByIEEEITBIcon />
            <SandboxByIEEEITBIcon />
            <IEEEITBStudentBranchIcon />
            <SandboxByIEEEITBIcon />
            <SandboxByIEEEITBIcon />
            <SandboxByIEEEITBIcon />
            <IEEEITBStudentBranchIcon />
          </div>
          <CustomLink color='gold' url='/'>
            {homepage.buttonTextPartnerUs}
          </CustomLink>
        </GradientBox>
      </section>
    </main>
  );
}
