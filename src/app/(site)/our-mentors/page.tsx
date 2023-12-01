import { type Metadata } from 'next';
import React from 'react';

import CommingSoonPage from '@/app/(site)/coming-soon/page';

const OurMentorsPage = () => {
  const CMS_QUERY = `
  {async 
    ourMentorsPage {
      title
      subtitleSection
    }
    allMentorDetails(orderBy: name_ASC) {
      id
      name
      post
      linkedin
      image {
        width
        title
        url
        height
      }
      desc {
        value
      }
      company {
        width
        title
        url
        height
      }
    }
  }`;

  // const { ourMentorsPage, allMentorDetails }: OurMentorsPageProps =
  //   await performRequest({
  //     query: CMS_QUERY,
  //     revalidate: 0,
  //   });
  return <CommingSoonPage />;

  // return (
  //   <main className='w-full bg-[#0b341a] text-white min-h-screen '>
  //     <div className='w-full relative z-[3] flex flex-col justify-center py-[80px] lg:py-[120px] items-center bg-gradient-to-b from-[rgba(7,29,16,0.45)] to-[#0F3015]'>
  //       <div>
  //         <div className='absolute -z-[2] opacity-80 left-0 top-[400px]'>
  //           <Bintang2 size={25} />
  //         </div>
  //         <div className='absolute -z-[2] opacity-80 right-0 top-[400px]'>
  //           <Elips1 size={25} />
  //         </div>
  //         <div className='absolute -z-[2] opacity-80 left-0 top-[1100px]'>
  //           <Elips2 size={25} />
  //         </div>
  //         <div className='absolute -z-[2] opacity-80 right-0 top-[1050px]'>
  //           <Abstrak size={25} />
  //         </div>
  //         <div className='absolute -z-[2] opacity-80 left-0 top-[750px]'>
  //           <Jatuh1 size={25} />
  //         </div>
  //         <div className='absolute -z-[2] opacity-80 right-0 top-[3400px] sm:top-[2850px]'>
  //           <Jatuh2 size={25} />
  //         </div>
  //       </div>
  //       {/* h1 Title Page */}
  //       <section className='flex flex-col gap-5 lg:gap-10 w-full items-center justify-center px-8 sm:px-10 md:px-20 xl:px-32 2xl:px-40'>
  //         <div
  //           data-aos='zoom-in'
  //           className='bg-gradient-brown border-2 border-solid border-[#AB814E] bg-transparent shadow-[0_0_0.9732px_#705229,0_0_1.9464px_#705229,0_0_6.8124px_#705229,0_0_13.6248px_#705229,0_0_23.3568px_#705229,0_0_40.8744px_#705229] p-1.5 rounded-2xl'
  //         >
  //           <div className='relative bg-gradient-green items-center justify-center p-4 lg:py-6 sm:px-10 md:px-12 lg:px-16 rounded-xl'>
  //             <Basket1
  //               size={25}
  //               className='absolute -left-[130px] w-[130px] lg:w-[200px] lg:-left-[300px] -top-[70px]'
  //             />
  //             <h2
  //               style={{
  //                 ['textShadow' as any]: '0px 0px 17.32px #BD9B65',
  //               }}
  //               className='bg-gradient-brown text-center text-transparent drop-shadow-[2px_3px_10px_10px_#bbcc9e] bg-clip-text text-3xl lg:text-[45px] font-museo-muderno p-1 font-bold'
  //             >
  //               {ourMentorsPage.title}
  //             </h2>
  //             <Basket2
  //               size={25}
  //               className='absolute -right-[130px] w-[130px] lg:w-[200px] lg:-right-[300px] -bottom-[80px]'
  //             />
  //           </div>
  //         </div>
  //         {/* Carousels */}
  //         {allMentorDetails.length > 2 && (
  //           <div className='w-full flex flex-col items-center justify-center py-8 lg:py-16'>
  //             <MentorCarousel options={allMentorDetails} />
  //           </div>
  //         )}
  //       </section>
  //       {ourMentorsPage.subtitleSection && (
  //         <section
  //           className={`flex flex-col gap-20 w-full items-center justify-center px-8 sm:px-10 md:px-20 lg:px-40 ${
  //             allMentorDetails.length <= 2 && 'py-8 lg:py-16'
  //           }`}
  //         >
  //           {/* Our Mentors subtitle */}
  //           {ourMentorsPage.subtitleSection && allMentorDetails.length > 2 && (
  //             <div
  //               data-aos='fade-up'
  //               id='seemore'
  //               className='max-w-[1300px] bg-transparent shadow-[0_0_0.9732px_#705229,0_0_1.9464px_#705229,0_0_6.8124px_#705229,0_0_13.6248px_#705229,0_0_23.3568px_#705229,0_0_40.8744px_#705229] p-0.5 rounded-2xl'
  //             >
  //               <div className='bg-gradient-green items-center justify-center p-4 lg:py-6 sm:px-10 md:px-12 lg:px-16 rounded-xl'>
  //                 <TitleSection>{ourMentorsPage.subtitleSection}</TitleSection>
  //               </div>
  //             </div>
  //           )}

  //           <MentorCards options={allMentorDetails} data-aos='zoom-in' />
  //         </section>
  //       )}
  //     </div>

  //     {/* You can map through the filteredData to display the results */}
  //   </main>
  // );
};

export default OurMentorsPage;

export const metadata: Metadata = {
  title: 'Our Mentors | Sandbox IEEE ITB',
  description:
    'Meet our team of expert mentors at Sandbox IEEE ITB. Explore expert profiles, gain valuable insights, and connect with them on LinkedIn. Elevate your knowledge and network with our mentors.',
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
    canonical: '/our-mentors',
    languages: {
      'en-US': '/en-US/our-mentors',
      'id-ID': '/id-ID/our-mentors',
    },
  },
  openGraph: {
    title: 'Sandbox IEEE ITB',
    description:
      'Meet our team of expert mentors at Sandbox IEEE ITB. Explore expert profiles, gain valuable insights, and connect with them on LinkedIn. Elevate your knowledge and network with our mentors.',
    url: 'https://sandbox.ieeeitb.com/our-mentors',
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
      'Meet our team of expert mentors at Sandbox IEEE ITB. Explore expert profiles, gain valuable insights, and connect with them on LinkedIn. Elevate your knowledge and network with our mentors.',
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
