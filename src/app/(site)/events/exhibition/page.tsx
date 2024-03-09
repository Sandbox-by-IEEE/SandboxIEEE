import { type Metadata } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { StructuredText } from 'react-datocms/structured-text';
const Countdown = dynamic(() => import('@/components/Countdown'), {
  ssr: false,
});

// import CommingSoonPage from '@/app/(site)/coming-soon/page';
import { FAQ } from '@/components/FAQ';
import LazyLoadMap from '@/components/lazy-load-map';
import CustomLink from '@/components/Link';
import Timeline from '@/components/Timeline';
import TitleSection from '@/components/TitleSection';
import VoteCardExhPage from '@/components/Vote/VoteCardExhPage';
import { performRequest } from '@/lib/datocms';
import { type ExhibitionDataProps } from '@/types/exhibition-type';

const ExhibitionPage = async () => {
  // return <CommingSoonPage />;

  // Fetch data from CMS
  const CMS_QUERY = `
  {
    exhibition {
      backgroundImage {
        url
        title
        width
        height
      }
      buttonShowFinal
      buttonTextRegister
      buttonTextSeeMore
      buttonTextSeeMote
      countdownTitle
      embedLocationUrl
      urlLocationMaps
      buttonTextBackgroundOne
      explanationDescription {
        value
      }
      explanationTitle
      faqSectionTitle
      finalProjectTitle
      guideDescription {
        value
      }
      guideTitle
      imageMascot {
        height
        url
        title
        width
      }
      targetDate
      timelineSectionTitle
      titleExhibitionPage
      titleLocation
      ptcSubtitle
      tpcSubtitle
    }
    allFinalProjectsPtcExhibitions(orderBy: teamsName_ASC) {
      topic
      teamsName
      projectsUrl
      image {
        url
        width
        height
        title
      }
      id
    }
    allFinalProjectsTpcExhibitions(orderBy: teamsName_ASC) {
      image {
        url
        title
        width
        height
      }
      projectsUrl
      teamsName
      topic
      id
    }
    allFaqExhibitions(orderBy: question_ASC) {
      id
      answer {
        value
      }
      question
    }
    allTimelineExhibitions(orderBy: date_ASC) {
      text
      date
    }
  }`;

  const {
    exhibition,
    allFinalProjectsTpcExhibitions: TPCData,
    allFinalProjectsPtcExhibitions: PTCData,
    allFaqExhibitions: faqData,
    allTimelineExhibitions: timelineData,
  }: ExhibitionDataProps = await performRequest({
    query: CMS_QUERY,
    revalidate: 0,
  });

  const WIBtargetDate = new Date(exhibition.targetDate);
  WIBtargetDate.setHours(WIBtargetDate.getHours() + 17);

  return (
    <main className='w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#152d1b] via-[90%] to-[#0f2f15] gap-16 lg:gap-20 xl:gap-24 2xl:gap-28'>
      {/* Background Section */}
      <section className='relative w-full h-fit'>
        <Image
          src={exhibition.backgroundImage.url}
          width={exhibition.backgroundImage.width}
          height={exhibition.backgroundImage.height}
          alt={exhibition.backgroundImage.title}
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
            {exhibition.titleExhibitionPage}
          </h2>
          <div data-aos='zoom-in'>
            <CustomLink
              color='green'
              url={'#Exhibition' + exhibition.buttonTextBackgroundOne}
            >
              {exhibition.buttonTextBackgroundOne}
            </CustomLink>
          </div>
        </div>
      </section>

      {/* Explanation */}
      <section
        id={'Exhibition' + exhibition.buttonTextBackgroundOne}
        className='w-full flex flex-col px-8 sm:px-10 md:px-20 lg:px-40'
      >
        <div
          data-aos='fade-in'
          className='bg-gradient-brown border-2 border-solid border-[#AB814E] bg-transparent shadow-[0_0_0.9732px_#705229,0_0_1.9464px_#705229,0_0_6.8124px_#705229,0_0_13.6248px_#705229,0_0_23.3568px_#705229,0_0_40.8744px_#705229] p-1.5 rounded-2xl'
        >
          <div className=' gap-4 bg-gradient-green lg:gap-10 flex flex-col items-center justify-center py-10 px-4 sm:px-10 md:px-12 lg:px-16 rounded-xl'>
            {/* Title */}
            <TitleSection>{exhibition.explanationTitle}</TitleSection>
            {/* Split Mascot & Description */}
            <div className='flex flex-col lg:flex-row w-full gap-4 lg:gap-10 xl:gap-20 items-center justify-center'>
              {/* Image Mascot */}
              <Image
                alt={exhibition.imageMascot.title}
                src={exhibition.imageMascot.url}
                width={exhibition.imageMascot.width}
                height={exhibition.imageMascot.height}
                className='w-[130px] h-[200px] lg:w-[226px] lg:h-[301px] object-contain object-center'
                data-aos='fade-right'
                sizes='(max-width: 1024px) 130px, 226px'
              />
              {/* Description */}
              <h4
                className='text-cream-secondary-light font-poppins text-base lg:text-lg font-medium w-full lg:w-[1000px]'
                data-aos='fade-left'
              >
                {exhibition && (
                  <StructuredText data={exhibition.explanationDescription} />
                )}
              </h4>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      {exhibition.titleLocation && exhibition.embedLocationUrl && (
        <section className='w-full flex flex-col gap-10  px-8 sm:px-10 md:px-20 lg:px-40 items-center justify-center'>
          <TitleSection>{exhibition.titleLocation}</TitleSection>
          {/* GMaps */}
          {exhibition.embedLocationUrl && (
            <div
              id='gmap-canvas'
              className='w-full h-[500px] lg:h-[560px] xl:w-[1100px] rounded-lg overflow-hidden'
            >
              <LazyLoadMap src={exhibition.embedLocationUrl} />
            </div>
          )}
          {exhibition.urlLocationMaps && (
            // {/* Text Click Here */}
            <Link
              href={exhibition.urlLocationMaps}
              target='blank'
              rel='noopener noreferrer'
              className='text-white font-poppins text-lg -mt-5'
              data-aos='zoom-in'
            >
              Click here to open in Google Maps
            </Link>
          )}
        </section>
      )}

      {/* CountDown */}
      {exhibition.countdownTitle && exhibition.targetDate && (
        <Countdown
          sectionTitle={exhibition.countdownTitle}
          targetDate={new Date(WIBtargetDate)}
          type='exhibition'
        >
          <div className='flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-10'>
            <div data-aos='zoom-in'>
              <CustomLink color='gold' url='/events/exhibition/registration'>
                {exhibition.buttonTextRegister}
              </CustomLink>
              {/* <Button color='gold'>{exhibition.buttonTextRegister}</Button> */}
            </div>
            <div data-aos='zoom-in'>
              <CustomLink color='trans-orange' url='#seemore'>
                {exhibition.buttonTextSeeMore}
              </CustomLink>
            </div>
          </div>
        </Countdown>
      )}

      {/* Voting Regulations */}
      {exhibition.guideTitle && (
        <section className='w-full flex flex-col gap-2 my-5 lg:my-8 px-8 sm:px-14 md:px-24 lg:px-48'>
          <div
            data-aos='zoom-in'
            className='bg-[#0F3015] rounded-2xl flex flex-col items-center justify-center py-10 lg:py-14 px-8 lg:px-16 gap-10 shadow-[0_4px_50px_#705229,0_4px_7px_rgba(112,82,41,0.25),0_4px_4px_rgba(0,0,0,0.25)]'
          >
            {/* Title */}
            <TitleSection>{exhibition.guideTitle}</TitleSection>
            {/* Description */}
            <span
              className='text-white text-sm lg:text-lg font-poppins font-medium'
              data-aos='zoom-in-up'
              data-aos-duration='750'
            >
              <StructuredText data={exhibition.guideDescription} />
            </span>
          </div>
        </section>
      )}

      {/* Final Project Spill */}
      {exhibition.buttonShowFinal && (
        <section className='w-full flex flex-col items-center justify-center gap-12 lg:gap-14 px-8 sm:px-10 md:px-20 lg:px-40'>
          <TitleSection>{exhibition.finalProjectTitle}</TitleSection>
          {/* TPC */}
          <h4
            data-aos='fade-up'
            style={{
              ['textShadow' as any]: '0px 0px 17.32px #BD9B65',
            }}
            className='bg-gradient-brown text-center text-transparent bg-clip-text text-2xl lg:text-3xl -m-4 font-museo-muderno p-1 font-bold'
          >
            {exhibition.tpcSubtitle}
          </h4>
          <div className='flex items-stretch justify-center flex-wrap gap-10 lg:gap-14 2xl:gap-16'>
            {TPCData.map((card, index) => (
              <VoteCardExhPage
                aos='flip-down'
                aosDuration={600 + index * 200}
                key={index}
                teamsName={card.teamsName}
                topic={card.topic}
                imageUrl={card.image.url}
                imageAlt={card.image.title}
                imageHeight={card.image.height}
                imageWidth={card.image.width}
                isVoted={false}
                urlCreation={card.projectsUrl}
              />
            ))}
          </div>
          {/* PTC */}
          <h4
            style={{
              ['textShadow' as any]: '0px 0px 17.32px #BD9B65',
            }}
            data-aos='fade-up'
            className='bg-gradient-brown text-center text-transparent bg-clip-text text-2xl lg:text-3xl -m-4 font-museo-muderno p-1 font-bold'
          >
            {exhibition.ptcSubtitle}
          </h4>
          <div className='flex items-stretch justify-center flex-wrap gap-10 lg:gap-14 2xl:gap-16'>
            {PTCData.map((card, index) => (
              <VoteCardExhPage
                aos='flip-down'
                aosDuration={600 + index * 200}
                key={index}
                teamsName={card.teamsName}
                topic={card.topic}
                imageUrl={card.image.url}
                imageAlt={card.image.title}
                imageHeight={card.image.height}
                imageWidth={card.image.width}
                isVoted={false}
                urlCreation={card.projectsUrl}
              />
            ))}
          </div>
          <div data-aos='zoom-in'>
            <CustomLink color='gold' url='/events/exhibition/vote'>
              {/* {exhibition.buttonTextSeeMore} */}
              Vote Your Favorite
            </CustomLink>
          </div>
        </section>
      )}

      {/* Timeline */}
      {exhibition.timelineSectionTitle && (
        <section
          id={'Timeline ' + exhibition.buttonTextSeeMote}
          className='w-full px-8 sm:px-10 md:px-28 lg:px-36 2xl:px-52 flex flex-col gap-12 lg:gap-20'
        >
          <div
            data-aos='fade-in'
            className='bg-gradient-brown border-2 border-solid border-[#AB814E] bg-transparent shadow-[0_0_0.9732px_#705229,0_0_1.9464px_#705229,0_0_6.8124px_#705229,0_0_13.6248px_#705229,0_0_23.3568px_#705229,0_0_40.8744px_#705229] p-1.5 rounded-2xl'
          >
            <div className='bg-gradient-green items-center justify-center p-4 lg:py-8 sm:px-10 md:px-12 lg:px-16 rounded-xl'>
              <TitleSection>{exhibition.timelineSectionTitle}</TitleSection>
            </div>
          </div>
          <Timeline items={timelineData} />
        </section>
      )}

      {/* FAQ */}
      <section className='w-full flex flex-col px-8 sm:px-10 md:px-20 lg:px-40 items-center justify-center gap-10 pb-20'>
        <TitleSection>{exhibition.faqSectionTitle}</TitleSection>
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
  title: 'Exhibition | Sandbox IEEE ITB',
  description:
    'The peak day of TheSandbox by IEEE event, where finalists of ProtoTech Contest will showcase their prototype as well do some pitching for further assessment. On the other hand, prior videos submitted by the finalists of Technovate Paper Competition will be displayed before their final pitching regarding their paper. Final judgment along with the awarding ceremony will be taking place during this time as well, hosted in collaboration with leaders of IEEE ITB Student Branch and judges from exterior institutions.',
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
    canonical: '/events/exhibition',
    languages: {
      'en-US': '/en-US/events/exhibition',
      'id-ID': '/id-ID/events/exhibition',
    },
  },
  openGraph: {
    title: 'Sandbox IEEE ITB',
    description:
      'The peak day of TheSandbox by IEEE event, where finalists of ProtoTech Contest will showcase their prototype as well do some pitching for further assessment. On the other hand, prior videos submitted by the finalists of Technovate Paper Competition will be displayed before their final pitching regarding their paper. Final judgment along with the awarding ceremony will be taking place during this time as well, hosted in collaboration with leaders of IEEE ITB Student Branch and judges from exterior institutions.',
    url: 'https://sandbox.ieeeitb.com/events/exhibit ion',
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
      'The peak day of TheSandbox by IEEE event, where finalists of ProtoTech Contest will showcase their prototype as well do some pitching for further assessment. On the other hand, prior videos submitted by the finalists of Technovate Paper Competition will be displayed before their final pitching regarding their paper. Final judgment along with the awarding ceremony will be taking place during this time as well, hosted in collaboration with leaders of IEEE ITB Student Branch and judges from exterior institutions.',
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
