import { Metadata } from 'next';
import React from 'react';
import { StructuredText } from 'react-datocms/structured-text';

import ClientVotePage from '@/app/(site)/events/exhibition/vote/ClientVotePage';
import { performRequest } from '@/lib/datocms';
import { VoteDataProps } from '@/types/exhibition-type';
// const PageVote = () => {
//   notFound();
// };
const PageVote = async () => {
  // Fetch data from CMS
  const CMS_QUERY = `
   {
    votePage {
      titleVotePage
      descriptionVote {
        value
      }
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
   }`;

  const {
    votePage,
    allFinalProjectsTpcExhibitions: TPCData,
    allFinalProjectsPtcExhibitions: PTCData,
  }: VoteDataProps = await performRequest({
    query: CMS_QUERY,
    revalidate: 0,
  });

  return (
    <main className='w-full min-h-screen flex flex-col items-center py-20 pt-14 lg:py-20 bg-gradient-green gap-10 lg:gap-16 px-8 sm:px-14 md:px-24 lg:px-44'>
      <h1
        style={{
          ['textShadow' as any]: '0px 0px 21.32px #BD9B65',
        }}
        className='text-4xl lg:text-5xl text-center font-bold font-museo-muderno p-1 bg-gradient-brown text-transparent drop-shadow-[2px_3px_10px_10px_#bbcc9e] bg-clip-text'
      >
        {votePage.titleVotePage}
      </h1>

      <div className='flex flex-col gap-10'>
        <h2 className='text-white font-poppins font-medium text-center text-base lg:text-lg'>
          <StructuredText data={votePage.descriptionVote} />
        </h2>
        <ClientVotePage TPCData={TPCData} PTCData={PTCData} />
      </div>
    </main>
  );
};
export default PageVote;

export const metadata: Metadata = {
  title: 'Vote | Sandbox IEEE ITB',
  description:
    "Welcome to our voting page! Here, you have the power to cast your vote for your favorite works showcased in our exhibition. The exhibition features an incredible array of innovative projects from both the ProtoTech Contest (TPC) and the Practical Technical Contest (PTC). Each project represents the hard work and creativity of our talented participants. By casting your vote, you play a crucial role in determining the winner and showing your support for their exceptional efforts. Don't miss out on this chance to be a part of the decision-making process and make your voice heard. Explore the projects, choose wisely, and cast your vote now!",
  generator: 'Next.js',
  category: 'Technology',
  applicationName: 'Sandbox IEEE ITB',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'Sandbox',
    'Sandbox IEEE ITB',
    'Sandbox ITB',
    'IEEE ITB',
    'ITB',
    'TPC',
    'PTC',
  ],
  colorScheme: 'dark',
  metadataBase: new URL('https://sandbox.ieeeitb.com/'),
  alternates: {
    canonical: '/events/exhibition/vote',
    languages: {
      'en-US': '/en-US/events/exhibition/vote',
      'id-ID': '/id-ID/events/exhibition/vote',
    },
  },
  verification: {
    google: 'GNYbAgsMCZ49BqBiEJz5TQE0X3H0XZGtURIryEvrNU8',
  },
  openGraph: {
    title: 'Sandbox IEEE ITB',
    description:
      "Welcome to our voting page! Here, you have the power to cast your vote for your favorite works showcased in our exhibition. The exhibition features an incredible array of innovative projects from both the ProtoTech Contest (TPC) and the Practical Technical Contest (PTC). Each project represents the hard work and creativity of our talented participants. By casting your vote, you play a crucial role in determining the winner and showing your support for their exceptional efforts. Don't miss out on this chance to be a part of the decision-making process and make your voice heard. Explore the projects, choose wisely, and cast your vote now!",
    url: 'https://sandbox.ieeeitb.com/events/exhibition/vote',
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
      "Welcome to our voting page! Here, you have the power to cast your vote for your favorite works showcased in our exhibition. The exhibition features an incredible array of innovative projects from both the ProtoTech Contest (TPC) and the Practical Technical Contest (PTC). Each project represents the hard work and creativity of our talented participants. By casting your vote, you play a crucial role in determining the winner and showing your support for their exceptional efforts. Don't miss out on this chance to be a part of the decision-making process and make your voice heard. Explore the projects, choose wisely, and cast your vote now!",
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
