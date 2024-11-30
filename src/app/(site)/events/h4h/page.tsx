import { type Metadata } from 'next';
import Image from 'next/image';
import React from 'react';
import { StructuredText } from 'react-datocms/structured-text';

import AboutCompe from '@/components/AboutCompe';
import Countdown from '@/components/Countdown';
import { FAQ } from '@/components/FAQ';
import Prize from '@/components/Prize';
import Regulations from '@/components/Regulations';
import Timeline from '@/components/Timeline';
import { performRequest } from '@/lib/datocms';
import { type H4HProps } from '@/types/h4h-type';

// const Countdown = dynamic(() => import('@/components/Countdown'), {
//   ssr: false,
// });

const H4H = async () => {
  // Fetch data from CMS
  const CMS_QUERY = `{
    h4hPage {
      h4hSectionTitles
      titleH4hPages
      timelineSectionTitle
      targetDate
      regisFeesSectionTitle
      subtitle
      description
      guidebook
      regisFeesDescription {
        value
      }
      imageMascot {
        title
        width
        url
        height
      }
      hadiahDescription {
        value
      }
      hadiahSectionTitle
      guideSectionTitle
      guideDescription {
        value
      }
      faqSectionTitle
      explanationDescription {
        value
      }
      countdownSectionTitle
      buttonTextSeeMore
      buttonTextRegister
      backgroundImage {
        width
        url
        title
        height
      }
    }
    allFaqH4hs {
      id
      question
      answer {
        value
      }
    }
    allTimelineH4hs(orderBy: date_ASC) {
      id
      text
      date
    }
  }`;

  const { h4hPage, allFaqH4hs, allTimelineH4hs }: H4HProps =
    await performRequest({
      query: CMS_QUERY,
      revalidate: 0,
    });

  return (
    <div className='flex flex-col w-full m-auto justify-center items-center'>
      <div className='mt-10 lg:mt-40 font-poppins text-[24px] lg:text-[80px] flex justify-center font-bold text-white'>
        <h1>{h4hPage.titleH4hPages}</h1>
      </div>
      <div className='w-[80vw] mt-5 lg:mt-20'>
        <Countdown
          page='h4h'
          targetDate={new Date(h4hPage.targetDate)}
          link1='/events/h4h/registration'
          link2={h4hPage.guidebook}
        />
      </div>
      <div className='mt-5 lg:mt-20'>
        <Prize />
      </div>

      {/* <Judges /> */}
      <div className='mt-5 lg:mt-20'>
        <AboutCompe
          title={h4hPage.h4hSectionTitles}
          subtitle={h4hPage.subtitle}
          description={h4hPage.description}
        />
      </div>
      <div className='mt-20 lg:mt-30'>
        <Regulations>
          <StructuredText data={h4hPage.guideDescription} />
        </Regulations>
      </div>
      <section className='w-full flex flex-col mb-[120px] md:mb-[180px]'>
        <div className='font-poppins text-[24px] lg:text-[48px] flex justify-center font-bold text-white mt-20'>
          <h1>Timeline</h1>
        </div>
        <Timeline items={allTimelineH4hs} />
      </section>
      {/* FAQ Section */}
      <section className='w-full flex flex-col gap-12 lg:gap-20 py-8 lg:py-10 xl:py-14 2xl:py-20'>
        {/* Title for FAQ Section */}
        <div
          className='p-1.5 rounded-2xl mx-8 sm:mx-10 md:mx-28 lg:mx-36 2xl:mx-52'
          data-aos='flip-up'
        >
          <div
            className='absolute inset-0 left-[-32px] lg:left-[150px] items-center'
            data-aos='fade-up'
            data-aos-duration='1500'
          >
            <Image
              src='faq1.svg'
              alt='faq'
              width={158}
              height={158}
              className='lg:w-[200px] lg:h-[200px]'
            />
          </div>
          <div
            className='absolute right-[-32px] lg:right-[150px] items-center'
            data-aos='fade-up'
            data-aos-duration='1500'
          >
            <Image
              src='faq2.svg'
              alt='faq'
              width={158}
              height={158}
              className='lg:w-[200px] lg:h-[200px]'
            />
          </div>
          <div className=' items-center justify-center p-4 lg:py-8 sm:px-10 md:px-12 lg:px-16 rounded-xl'>
            <h2 className='text-center text-4xl lg:text-5xl font-bold text-white'>
              Any Questions?
            </h2>
            <p className='text-center text-xl lg:text-xl font-normal text-white mt-4'>
              Lorem ipsum dolor sit amet consectetur.
            </p>
          </div>
        </div>
        {/* FAQ Content */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 px-8 sm:px-10 md:px-28 lg:px-36 2xl:px-52'>
          {allFaqH4hs.map((faq) => (
            <FAQ
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
              aos='fade-up'
            />
          ))}
        </div>
      </section>
    </div>
    // <main className='w-full min-h-screen relative flex flex-col items-center justify-center'>
    //   {/*PROTOTECH CONTEST*/}
    //   <section className='relative w-full h-fit'>
    //     <Image
    //       src={tpcPage.backgroundImage.url}
    //       width={tpcPage.backgroundImage.width}
    //       height={tpcPage.backgroundImage.height}
    //       alt={tpcPage.backgroundImage.title}
    //       priority
    //       className='w-full object-cover h-[771px] max-h-screen object-center animate-blink'
    //       sizes='100vw'
    //     />
    //     {/* Text Content on background */}
    //     <div
    //       style={{
    //         background:
    //           'radial-gradient(50% 50% at 50% 50%, rgba(8, 30, 17, 0.90) 18.33%, rgba(0, 0, 0, 0.00) 99.48%)',
    //       }}
    //       className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-20 w-fit h-fit flex flex-col gap-8 items-center justify-center'
    //     >
    //       <h2
    //         style={{
    //           ['textShadow' as any]:
    //             '0px 0px 97.32px #BD9B65, 0px 0px 1.9464px #BD9B65',
    //         }}
    //         className='text-4xl lg:text-5xl 2xl:text-[56px] font-bold font-museo-muderno p-1 bg-gradient-brown text-transparent drop-shadow-[2px_3px_10px_10px_#bbcc9e] bg-clip-text text-center'
    //         data-aos='flip-up'
    //       >
    //         {tpcPage.titleTpcPages}
    //       </h2>
    //       <div className='animate-blink duration-500 transition-all'>
    //         <ButtonRegistration isDisabled type='TPC' color='gold'>
    //           Abstract Submission Closed
    //         </ButtonRegistration>
    //       </div>
    //       <div className='animate-blink duration-500 transition-all'>
    //         <TPCnavigation />
    //       </div>
    //       <div className='animate-blink duration-500 transition-all'>
    //         <LinkTPCClient />
    //       </div>
    //     </div>
    //   </section>
    //   {/* END PROTOTECH CONTEST */}

    //   {/*APA ITU TPC*/}
    //   <section className='w-full bg-gradient-section flex flex-col px-8 sm:px-10 md:px-20 lg:px-40 py-8 lg:py-10 xl:py-14 2xl:py-20'>
    //     <div
    //       data-aos='flip-up'
    //       className='bg-gradient-brown border-1 lg:border-2 border-solid border-[#AB814E] bg-transparent shadow-[0_0_0.9732px_#705229,0_0_1.9464px_#705229,0_0_6.8124px_#705229,0_0_13.6248px_#705229,0_0_23.3568px_#705229,0_0_40.8744px_#705229]  p-1 lg:p-1.5 rounded-2xl'
    //     >
    //       <div className=' gap-4 bg-gradient-green lg:gap-10 flex flex-col items-center justify-center py-10 px-4 sm:px-10 md:px-12 lg:px-16 rounded-xl'>
    //         {/* Title */}
    //         <TitleSection>{tpcPage.tpcSectionTitles}</TitleSection>
    //         {/* Split Mascot & Description */}
    //         <div className='flex flex-col lg:flex-row w-full gap-4 lg:gap-10 xl:gap-20 items-center justify-center'>
    //           {/* Image Mascot */}
    //           <Image
    //             alt={tpcPage.imageMascot.title}
    //             src={tpcPage.imageMascot.url}
    //             width={tpcPage.imageMascot.width}
    //             height={tpcPage.imageMascot.height}
    //             className='w-[130px] h-[200px] lg:w-[226px] lg:h-[301px] object-contain object-center'
    //             sizes='(max-width: 1024px) 130px, 226px'
    //             data-aos='fade-right'
    //           />
    //           {/* Description */}
    //           <h4
    //             data-aos='fade-left'
    //             className='text-cream-secondary-light font-poppins text-base lg:text-lg font-medium w-full lg:w-[1000px]'
    //           >
    //             {tpcPage && (
    //               <StructuredText data={tpcPage.explanationDescription} />
    //             )}
    //           </h4>
    //         </div>
    //       </div>
    //     </div>
    //     <div
    //       data-aos='fade-in'
    //       className='absolute hidden opacity-80 lg:right-0 lg:top-[-225px] lg:block md:right-0 md:top-[100px] right-0 top-[350px] lg:scale-100 scale-[62%] z-0'
    //     >
    //       <Star4 size={40} />
    //       {/* <Star5 size={40} /> */}
    //     </div>
    //     <div
    //       data-aos='fade-in'
    //       className='absolute hidden opacity-80 lg:right-[148px] lg:top-[830px] lg:block md:right-28 md:top-[900px] right-28 top-[1150px] lg:scale-100 scale-[62%] z-0'
    //     >
    //       <Star5 size={40} />
    //     </div>
    //     <div
    //       data-aos='fade-in'
    //       className='absolute hidden opacity-80 lg:right-[148px] lg:top-[830px] lg:block md:right-[7rem] md:top-[895px] right-28 top-[1150px] lg:scale-100 scale-[62%] z-0'
    //     >
    //       <Star6 size={30} />
    //     </div>
    //   </section>
    //   {/* END APA ITU PTC*/}

    //   {/* HADIAH */}
    //   <section className='w-full px-8 sm:px-10 md:px-28 lg:px-36 2xl:px-52 py-20 lg:py-24 xl:py-28  bg-gradient-section flex flex-col gap-16 '>
    //     <div className='flex flex-col relative z-10 items-center justify-center gap-8 lg:gap-14'>
    //       {/* Title */}
    //       <TitleSection>{tpcPage.hadiahSectionTitle}</TitleSection>
    //       <div className='w-full flex flex-col lg:flex-row gap-8 justify-center text-ce items-center'>
    //         {/* Image Mascot left */}
    //         <div className='absolute w-fit top-44 sm:-top-10 xl:top-[-20px] -z-[8] -left-3 xl:left-[22px] rotate-[-23.7deg]'>
    //           <Image
    //             width={200}
    //             height={200}
    //             alt='Mascot image'
    //             src={'/Group_1244.svg'}
    //             className='w-[130px] xl:w-[200px] aspect-square object-contain object-center'
    //             sizes='(max-width: 1280px) 130px, 200px'
    //             data-aos='fade-right'
    //           />
    //         </div>
    //         {/* Content Text Prize */}
    //         <h4
    //           className='text-[#FFE1B9] text-base lg:text-xl font-semibold w-full xl:w-[60%] font-poppins text-center'
    //           data-aos='fade-up'
    //         >
    //           <StructuredText data={tpcPage.hadiahDescription} />
    //         </h4>
    //         <div className='aspect-square absolute -z-[8] xl:bottom-[-52px] -right-3 xl:right-[12px] -top-[30px] lg:top-[20px]'>
    //           <Image
    //             width={200}
    //             height={200}
    //             alt='Mascot image'
    //             src={'/Group_1243.svg'}
    //             className='w-[130px] xl:w-[200px] aspect-square object-contain object-center'
    //             sizes='(max-width: 1280px) 130px, 200px'
    //             data-aos='fade-left'
    //           />
    //         </div>
    //       </div>
    //     </div>
    //     <div
    //       data-aos='fade-in'
    //       className='absolute hidden opacity-80 lg:-left-10 lg:top-[805px] lg:block md:-left-10 md:top-[930px] left-0 top-[960px] lg:scale-100 scale-[62%] z-0'
    //     >
    //       <Star7 size={40} />
    //     </div>
    //     <div
    //       data-aos='fade-in'
    //       className='absolute hidden opacity-80 lg:left-[88] lg:top-[1135px] lg:block md:left-[72px] md:top-[1380px] left-24 top-[1410px] lg:scale-100 scale-[62%] z-0'
    //     >
    //       <Star5 size={40} />
    //     </div>
    //     <div
    //       data-aos='fade-in'
    //       className='absolute hidden opacity-80 lg:left-[104px] lg:top-[1025px] lg:block md:left-[82px] md:top-[1315px] left-24 top-[1345px] lg:scale-100 scale-[62%] z-0'
    //     >
    //       <Star6 size={40} />
    //     </div>
    //   </section>
    //   {/* END HADIAH */}

    //   {/* REGULASI */}
    //   <section
    //     className='w-full px-8 sm:px-10 md:px-28 lg:px-36 2xl:px-52 bg-gradient-section flex flex-col gap-16'
    //     style={{
    //       backgroundImage:
    //         'linear-gradient(180deg, rgba(5, 31, 18, 0.99) 0%, rgba(6, 25, 12, 0.99) 100%)',
    //     }}
    //   >
    //     <div
    //       className='p-2 rounded-xl flex flex-col items-center gap-8 lg:mx-12 my-12'
    //       style={{
    //         backgroundColor: '#0F3015',
    //         boxShadow: '0px 0px 5px 3px rgba(171,129,78,0.8)',
    //       }}
    //       data-aos='fade-in'
    //     >
    //       <div className='h-full w-full rounded-xl px-2'>
    //         <div className='my-8 w-full flex flex-row items-center justify-center text-center'>
    //           <TitleSection>{tpcPage.guideSectionTitle}</TitleSection>
    //         </div>
    //         <div className='w-full flex flex-col lg:flex-row gap-8 justify-left items-center lg:px-20 pb-12'>
    //           <div className='w-full lg:w-[100%] font-poppins justify-center'>
    //             <h4
    //               className='text-white text-base font-semibold px-4'
    //               data-aos='fade-up'
    //             >
    //               <StructuredText data={tpcPage.guideDescription} />
    //             </h4>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className='absolute lg:-left-4 lg:top-[980px] lg:block md:-left-8- md:top-[1220px] -left-12 top-[1210px] lg:scale-[90%] scale-[52%] z-0'>
    //       <Explosion size={25} />
    //     </div>
    //     <div className='absolute lg:right-0 lg:top-[780px] lg:block md:-right-4 md:top-[1060px] -right-4 top-[1460px] lg:scale-100 scale-[52%] z-0'>
    //       <Starburst size={25} />
    //     </div>
    //     <div
    //       data-aos='fade-in'
    //       className='absolute hidden opacity-80 left-52 top-[1615px] lg:block'
    //     >
    //       <Star8 size={32} />
    //     </div>
    //     <div
    //       data-aos='fade-in'
    //       className='absolute hidden opacity-80 left-64 top-[1595px] lg:block'
    //     >
    //       <Star9 size={32} />
    //     </div>
    //     <div className='absolute lg:right-4 lg:top-[1595px] lg:block md:-right-6 md:top-[1960px] -right-[1rem] top-[2060px] lg:scale-100 scale-[52%] -z-10'>
    //       <Star10 size={30} />
    //     </div>
    //   </section>
    //   {/* END REGULASI */}

    //   {/* REGISTRATION */}
    //   <section className='w-full px-8 sm:px-10 md:px-28 lg:px-36 2xl:px-52 py-20 lg:py-24 xl:py-28  bg-gradient-section flex flex-col gap-16 '>
    //     <div className='flex flex-col relative z-10 items-center justify-center gap-8 lg:gap-14'>
    //       {/* Title */}
    //       <div className='w-full flex flex-row items-center justify-center'>
    //         <TitleSection>{tpcPage.regisFeesSectionTitle}</TitleSection>
    //       </div>
    //       <div className='w-full flex flex-col lg:flex-row gap-8 justify-center text-ce items-center'>
    //         {/* Image Mascot left */}
    //         <div className='absolute w-fit top-24 sm:-top-10 xl:top-[-20px] -z-[8] -left-3 xl:left-[22px] rotate-[-23.7deg]'>
    //           <Image
    //             width={200}
    //             height={200}
    //             alt='Mascot image'
    //             src={'/Group_1244.svg'}
    //             className='w-[130px] xl:w-[200px] aspect-square object-contain object-center'
    //             sizes='(max-width: 1280px) 130px, 200px'
    //             data-aos='fade-right'
    //           />
    //         </div>
    //         {/* Content Text Prize */}
    //         <h4
    //           data-aos='fade-up'
    //           className='text-[#FFE1B9] text-base lg:text-xl font-semibold w-full xl:w-[60%] font-poppins text-center'
    //         >
    //           <StructuredText data={tpcPage.regisFeesDescription} />
    //         </h4>
    //         <div className='aspect-square absolute -z-[8] xl:bottom-[-52px] -right-3 xl:right-[12px] top-[20px]'>
    //           <Image
    //             width={200}
    //             height={200}
    //             alt='Mascot image'
    //             src={'/Group_1243.svg'}
    //             className='w-[130px] xl:w-[200px] aspect-square object-contain object-center'
    //             sizes='(max-width: 1280px) 130px, 200px'
    //             data-aos='fade-left'
    //           />
    //         </div>
    //       </div>
    //     </div>
    //     <div
    //       data-aos='fade-in'
    //       className='absolute hidden opacity-80 lg:-left-10 lg:top-[805px] lg:block md:-left-10 md:top-[930px] left-0 top-[960px] lg:scale-100 scale-[62%] z-0'
    //     >
    //       <Star7 size={40} />
    //     </div>
    //     <div
    //       data-aos='fade-in'
    //       className='absolute hidden opacity-80 lg:left-[88] lg:top-[1135px] lg:block md:left-[72px] md:top-[1380px] left-24 top-[1410px] lg:scale-100 scale-[62%] z-0'
    //     >
    //       <Star5 size={40} />
    //     </div>
    //     <div
    //       data-aos='fade-in'
    //       className='absolute hidden opacity-80 lg:left-[104px] lg:top-[1025px] lg:block md:left-[82px] md:top-[1315px] left-24 top-[1345px] lg:scale-100 scale-[62%] z-0'
    //     >
    //       <Star6 size={40} />
    //     </div>
    //   </section>
    //   {/* END REGISTRATION */}

    //   {/* COUNTDOWN */}
    //   <div
    //     data-aos='fade-in'
    //     className='absolute hidden opacity-80 left-0 top-[3145px] lg:block'
    //   >
    //     <Star7 size={55} />
    //   </div>
    //   <div
    //     data-aos='fade-in'
    //     className='absolute hidden opacity-80 left-48 top-[3210px] lg:block'
    //   >
    //     <Star5 size={40} />
    //   </div>
    //   <div
    //     data-aos='fade-in'
    //     className='absolute hidden opacity-80 left-48 top-[3125px] lg:block'
    //   >
    //     <Star6 size={40} />
    //   </div>

    //   {/* END COUNTDOWN */}

    //   {/* TIMELINE */}
    //   {tpcPage.timelineSectionTitle && (
    //     <section
    //       id='timeline'
    //       className='w-full bg-gradient-section px-8 sm:px-10 md:px-28 lg:px-36 2xl:px-52 py-8 lg:py-10 xl:py-14 2xl:py-20 flex flex-col gap-12 lg:gap-20'
    //       style={{ background: 'rgba(7, 29, 16)' }}
    //     >
    //       <div
    //         data-aos='fade-in'
    //         className='absolute hidden opacity-80 left-[480px] top-[3625px] lg:block'
    //       >
    //         <Star11 size={40} />
    //       </div>
    //       <div
    //         data-aos='fade-in'
    //         className='bg-gradient-brown border-2 border-solid border-[#AB814E] bg-transparent shadow-[0_0_0.9732px_#705229,0_0_1.9464px_#705229,0_0_6.8124px_#705229,0_0_13.6248px_#705229,0_0_23.3568px_#705229,0_0_40.8744px_#705229] p-1.5 rounded-2xl'
    //       >
    //         <div className='bg-gradient-green items-center justify-center p-4 lg:py-8 sm:px-10 md:px-12 lg:px-16 rounded-xl'>
    //           <TitleSection>{tpcPage.timelineSectionTitle}</TitleSection>
    //           <div
    //             data-aos='fade-in'
    //             className='absolute hidden opacity-80 right-[520px] lg:top-[2890px] lg:block'
    //           >
    //             <Star8 size={25} />
    //           </div>
    //           <div
    //             data-aos='fade-in'
    //             className='absolute hidden opacity-80 right-[500px] lg:top-[2880px] lg:block'
    //           >
    //             <Star9 size={25} />
    //           </div>
    //         </div>
    //       </div>
    //       <Timeline items={allTimelineTpcs} />
    //     </section>
    //   )}
    //   {/* END TIMELINE */}

    //   {/* FAQ */}
    //   <section className='w-full bg-gradient-section flex flex-col px-8 sm:px-10 md:px-20 lg:px-40 py-8 lg:py-10 xl:py-14 2xl:py-20 items-center justify-center gap-10 pb-20'>
    //     <TitleSection>{tpcPage.faqSectionTitle}</TitleSection>
    //     <div className='w-full h-full flex flex-col gap-3'>
    //       {allFaqTpcs.map((faq, index) => (
    //         <FAQ key={index} question={faq.question} answer={faq.answer} />
    //       ))}
    //     </div>
    //     <div className='absolute lg:-left-4 lg:top-[3920px] lg:block md:-left-8 md:top-[4380px] -left-12 top-[5700px] lg:scale-100 scale-[52%] z-0'>
    //       <Explosion size={20} />
    //     </div>
    //     <div
    //       data-aos='fade-in'
    //       className='absolute hidden opacity-80 right-[80px] lg:top-[4400px] lg:block'
    //     >
    //       <Star8 size={25} />
    //     </div>
    //     <div
    //       data-aos='fade-in'
    //       className='absolute hidden opacity-80 right-[65px] lg:top-[4380px] lg:block'
    //     >
    //       <Star9 size={25} />
    //     </div>
    //   </section>
    //   {/* END FAQ */}
    // </main>
  );
};

export default H4H;

export const metadata: Metadata = {
  title: 'TPC | Sandbox IEEE ITB',
  description:
    'Technovate Paper Competition is a research national-scale competition with 8 stages, such as abstract submission, TPC semi-finalist announcement, TPC full paper, mentoring seminar with experts, full paper submission, finalist announcement, short campaign video, and TPC final pitching.',
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
    canonical: '/events/tpc',
    languages: {
      'en-US': '/en-US/events/tpc',
      'id-ID': '/id-ID/events/tpc',
    },
  },
  openGraph: {
    title: 'Sandbox IEEE ITB',
    description:
      'Technovate Paper Competition is a research national-scale competition with 8 stages, such as abstract submission, TPC semi-finalist announcement, TPC full paper, mentoring seminar with experts, full paper submission, finalist announcement, short campaign video, and TPC final pitching.',
    url: 'https://sandbox.ieeeitb.com/events/tpc',
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
      'Technovate Paper Competition is a research national-scale competition with 8 stages, such as abstract submission, TPC semi-finalist announcement, TPC full paper, mentoring seminar with experts, full paper submission, finalist announcement, short campaign video, and TPC final pitching.',
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
