import { type Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react';

const CMS_QUERY = `
{
  allPastEvents(orderBy: _updatedAt_ASC) {
    title
    image {
      url
      width
      title
      height
    }
    id
    description {
      value
    }
    documentation {
      id
      url
      width
      title
      height
    }
  }
}
`;

function DecoratedTitle({ title }: { title: string }) {
  return (
    <div
      className='relative text-4xl font-extrabold text-[#9a7037] px-4 py-2 inline-block'
      data-aos='zoom-in'
    >
      <div className='aspect-square opacity-80 w-4 md:w-8 absolute -z-[3] top-[-5px] left-[-5px] md:top-[-20px] md:left-[-30px] rotate-[23deg]'>
        <Image
          src='/sparkle.svg'
          alt='Sparkle decoration'
          width={16}
          height={16}
          className='w-4 md:w-8'
        />
      </div>
      <div className='aspect-square opacity-80 absolute -z-[3] bottom-[-5px] left-[-5px] md:bottom-[-10px] md:left-[-30px] rotate-[43deg]'>
        <Image
          src='/sparkle.svg'
          alt='Sparkle decoration'
          width={16}
          height={16}
          className='w-4 md:w-8'
          sizes='(max-width: 768px) 16px, 32px'
          data-aos='fade-in'
        />
      </div>
      <div className='aspect-square opacity-80 w-4 md:w-[25px] absolute -z-[3] top-[-5px] right-[-5px] md:top-[-20px] md:right-[-20px] rotate-[23deg]'>
        <Image
          src='/sparkle.svg'
          alt='Sparkle decoration'
          width={16}
          height={16}
          className='w-4 md:w-8'
          sizes='(max-width: 768px) 16px, 32px'
          data-aos='fade-in'
        />
      </div>
      <div className='aspect-square opacity-80 w-4 md:w-8 absolute -z-[3] bottom-[-5px] right-[-5px] md:bottom-[-10px] md:right-[-30px] rotate-[43deg]'>
        <Image
          src='/sparkle.svg'
          alt='Sparkle decoration'
          width={16}
          height={16}
          className='w-4 md:w-8'
          sizes='(max-width: 768px) 16px, 32px'
          data-aos='fade-in'
        />
      </div>
      <h2
        style={{
          ['textShadow' as any]:
            '0px 0px 27.32px #BD9B65, 0px 0px 1.9464px #BD9B65',
        }}
        data-aos='flip-up'
        className='text-3xl lg:text-[40px] font-bold font-museo-muderno p-1 bg-gradient-brown text-transparent drop-shadow-[2px_3px_10px_10px_#bbcc9e] bg-clip-text'
      >
        {title}
      </h2>
    </div>
  );
}

export default function PastEvent() {
  // const { allPastEvents }: pastEventsProps = await performRequest({
  //   query: CMasync S_QUERY,
  //   revalidate: 0,
  // });
  return notFound();

  // return (
  //   <>
  //     <main className='flex min-h-screen w-full bg-gradient-to-b from-[#0b2712] to-[#123b1a] flex-col font-museo-muderno'>
  //       {/*OUR PAST EVENTS TITLE*/}
  //       <div
  //         data-aos='fade-in'
  //         className='w-full bg-gradient-to-b from-[#0b2712] to-[#123b1a] px-8 sm:px-10 md:px-28 lg:px-36 2xl:px-52 py-8 lg:py-10 xl:py-14 2xl:py-20 flex flex-col gap-12 lg:gap-20 relative'
  //         style={{ background: 'rgba(7, 29, 16)' }}
  //       >
  //         <div
  //           data-aos='fade-up'
  //           className='bg-gradient-brown border-2 border-solid border-[#AB814E] bg-transparent shadow-[0_0_0.9732px_#705229,0_0_1.9464px_#705229,0_0_6.8124px_#705229,0_0_13.6248px_#705229,0_0_23.3568px_#705229,0_0_40.8744px_#705229] p-1.5 rounded-2xl'
  //         >
  //           <div className='bg-gradient-green w-full flex flex-row items-center justify-center  p-4 lg:py-8 sm:px-10 md:px-12 lg:px-16 rounded-xl'>
  //             <DecoratedTitle title='Our past Events' />
  //           </div>
  //         </div>
  //       </div>

  //       {allPastEvents.map((event, index) =>
  //         index % 2 === 0 ? (
  //           // Mile Zero Project Section
  //           <section
  //             key={index}
  //             className='h-auto px-8 sm:px-10 md:px-28 lg:px-36 2xl:px-52 py-8 lg:py-10 xl:py-14 2xl:py-20 bg-gradient-to-b from-[#0b2712] to-[#123b1a] flex flex-col z-[5] gap-16 relative'
  //           >
  //             {/* // Decoration */}
  //             <div className='aspect-square opacity-80 h-72 absolute -z-[3] left-0 top-[100px]'>
  //               <Image
  //                 src='/comet.svg'
  //                 alt='comet'
  //                 width={288}
  //                 height={288}
  //                 className='h-72'
  //                 sizes='(max-width: 768px) 288px, 288px'
  //               />
  //             </div>
  //             {/* // Decoration */}
  //             <div className='aspect-square opacity-80 h-72 absolute -z-[3] top-[500px] right-0 rotate-[180deg]'>
  //               <Image
  //                 src='/comet.svg'
  //                 alt='comet'
  //                 width={288}
  //                 height={288}
  //                 className='h-72'
  //                 sizes='(max-width: 768px) 288px, 288px'
  //               />
  //             </div>
  //             {/* // Decoration */}
  //             <div className='aspect-square opacity-80 h-36 absolute -z-[3] top-[750px] left-[-10px] rotate-[180deg]'>
  //               <Image
  //                 src='/StarDecoration2.svg'
  //                 alt='comet'
  //                 width={144}
  //                 height={144}
  //                 className='h-36'
  //                 sizes='(max-width: 768px) 144px, 144px'
  //               />
  //             </div>
  //             <TitleSection>{event.title}</TitleSection>
  //             <div className='flex flex-col lg:flex-row gap-12 justify-center items-center'>
  //               {/* Image events */}
  //               <div
  //                 data-aos='zoom-in-right'
  //                 className='max-w-[300px]  md:max-w-[450px] aspect-[4/3] rounded-xl overflow-hidden shadow-[0px_0px_20px_7px_#D8B88B] relative'
  //               >
  //                 <Image
  //                   src={event.image.url}
  //                   alt={event.image.title && 'Event Image'}
  //                   width={event.image.width}
  //                   height={event.image.height}
  //                   className='min-w-[300px] md:min-w-[450px] md:max-w-[450px] aspect-[4/3]'
  //                   sizes='(max-width: 768px) 100%, 100%'
  //                 />
  //               </div>
  //               {/* Description */}
  //               <h4
  //                 className='w-full lg:w-[40%] text-[#FFE1B9] text-sm md:text-base xl:text-xl sm:px-10 lg:px-0 self-start font-poppins'
  //                 data-aos='zoom-in-left'
  //               >
  //                 <StructuredText data={event.description} />
  //               </h4>
  //             </div>
  //             <DocumentationCarousel
  //               title={event.title + ' Documentation'}
  //               photos={event.documentation}
  //             />
  //           </section>
  //         ) : (
  //           <section
  //             key={index}
  //             className='h-auto px-8 sm:px-10 md:px-28 lg:px-36 2xl:px-52 py-8 lg:py-10 xl:py-14 2xl:py-20 bg-gradient-to-b from-[#0b2712] to-[#123b1a] flex flex-col gap-16 relative z-[5]'
  //           >
  //             <div className='aspect-square opacity-80 h-16 absolute -z-[3] top-[200px] right-[-10px] rotate-[180deg]'>
  //               <Image
  //                 src='/StarDecoration1.svg'
  //                 alt='comet'
  //                 width={64}
  //                 height={64}
  //                 sizes='(max-width: 768px) 64px, 64px'
  //               />
  //             </div>
  //             {/* title */}
  //             <TitleSection>
  //               <div className='w-full flex flex-row items-center justify-center'>
  //                 <DecoratedTitle title={event.title} />
  //               </div>
  //             </TitleSection>

  //             <div className='flex flex-col lg:flex-row-reverse gap-12 justify-center items-center'>
  //               <div
  //                 data-aos='zoom-in-left'
  //                 className='max-w-[300px] md:max-w-[450px] aspect-[4/3] rounded-xl overflow-hidden shadow-[0px_0px_20px_7px_#D8B88B] relative'
  //               >
  //                 {/* Image */}
  //                 <Image
  //                   src={event.image.url}
  //                   alt={event.image.title && 'Event Image'}
  //                   width={event.image.width}
  //                   height={event.image.height}
  //                   className='min-w-[300px] md:min-w-[450px] md:max-w-[450px] aspect-[4/3]'
  //                   sizes='(max-width: 768px) 100%, 100%'
  //                 />
  //               </div>
  //               {/* Description */}
  //               <h4
  //                 data-aos='zoom-in-right'
  //                 className='w-full lg:w-[40%] text-[#FFE1B9] text-sm md:text-base xl:text-xl sm:px-10 lg:px-0 self-start font-poppins'
  //               >
  //                 <StructuredText data={event.description} />
  //               </h4>
  //             </div>
  //             <DocumentationCarousel
  //               title={event.title + ' Documentation'}
  //               photos={event.documentation}
  //             />
  //           </section>
  //         ),
  //       )}
  //     </main>
  //   </>
  // );
}

export const metadata: Metadata = {
  title: 'Past Events | Sandbox IEEE ITB',
  description:
    'At IEEE ITB, we have a rich history of organizing and hosting a variety of successful events that have made a significant impact in the field of technology and engineering. Our past events have provided a platform for students, professionals, and enthusiasts to come together, learn from one another, and collaborate on innovative projects.',
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
    canonical: '/past-events',
    languages: {
      'en-US': '/en-US/past-events',
      'id-ID': '/id-ID/past-events',
    },
  },
  openGraph: {
    title: 'Sandbox IEEE ITB',
    description:
      'At IEEE ITB, we have a rich history of organizing and hosting a variety of successful events that have made a significant impact in the field of technology and engineering. Our past events have provided a platform for students, professionals, and enthusiasts to come together, learn from one another, and collaborate on innovative projects.',
    url: 'https://sandbox.ieeeitb.com/past-events',
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
      'At IEEE ITB, we have a rich history of organizing and hosting a variety of successful events that have made a significant impact in the field of technology and engineering. Our past events have provided a platform for students, professionals, and enthusiasts to come together, learn from one another, and collaborate on innovative projects.',
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
