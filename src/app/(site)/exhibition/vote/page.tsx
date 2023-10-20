import { Metadata } from 'next';
import React from 'react';
import { StructuredText } from 'react-datocms/structured-text';

import ClientVotePage from '@/app/(site)/exhibition/vote/ClientVotePage';
import { performRequest } from '@/lib/datocms';
import { VoteDataProps } from '@/types/exhibition-type';

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
  });
  return (
    <main className='w-full min-h-screen flex flex-col items-center py-20 pt-14 lg:py-20 bg-gradient-green gap-10 lg:gap-16 px-8 sm:px-14 md:px-24 lg:px-44'>
      <h1
        style={{
          ['text-shadow' as any]: '0px 0px 21.32px #BD9B65',
        }}
        className='text-4xl lg:text-5xl text-center font-bold font-museo-muderno p-1 bg-gradient-brown text-transparent drop-shadow-[2px_3px_10px_10px_#bbcc9e] bg-clip-text'
      >
        {votePage.titleVotePage}
      </h1>

      <div className='flex flex-col gap-10'>
        <h2 className='text-white font-poppins font-medium text-justify text-base lg:text-lg'>
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
    'The Sandbox by IEEE is a series of events providing opportunities to all young-minds through 3 key milestones consisting of a Grand Seminar, 2 competitions namely ProtoTech Contest (a practical electrical engineering contest) and Technovate Paper (a research and technical documents) Competition, and Exhibition. This event invites experts from various fields of work as trainers, judges and webinar speakers. Finalists from both ProtoTech Contest and TechNovate Paper Competition will be given time to pitch and showcase their products in front of the judging panels on the Exhibition day. All the final winners from both competitions will be bestowed during this time. The objective of this event is to establish innovative and practical solutions for a developing country like Indonesia. Additionally, this event also aims to educate the local society by unveiling and enhancing tools that foster tranquility and ease.',
  generator: 'Next.js',
  applicationName: 'Sandbox IEEE ITB',
  colorScheme: 'dark',
  openGraph: {
    title: 'Sandbox IEEE ITB',
    description:
      'The Sandbox by IEEE is a series of events providing opportunities to all young-minds through 3 key milestones consisting of a Grand Seminar, 2 competitions namely ProtoTech Contest (a practical electrical engineering contest) and Technovate Paper (a research and technical documents) Competition, and Exhibition. This event invites experts from various fields of work as trainers, judges and webinar speakers. Finalists from both ProtoTech Contest and TechNovate Paper Competition will be given time to pitch and showcase their products in front of the judging panels on the Exhibition day. All the final winners from both competitions will be bestowed during this time. The objective of this event is to establish innovative and practical solutions for a developing country like Indonesia. Additionally, this event also aims to educate the local society by unveiling and enhancing tools that foster tranquility and ease.',
    url: 'https://sandbox.ieeeitb.com/',
    siteName: 'Sandbox IEEE ITB',
    images: [
      {
        url: 'https://sandbox.ieeeitb.com/link-preview.png',
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
      'The Sandbox by IEEE is a series of events providing opportunities to all young-minds through 3 key milestones consisting of a Grand Seminar, 2 competitions namely ProtoTech Contest (a practical electrical engineering contest) and Technovate Paper (a research and technical documents) Competition, and Exhibition. This event invites experts from various fields of work as trainers, judges and webinar speakers. Finalists from both ProtoTech Contest and TechNovate Paper Competition will be given time to pitch and showcase their products in front of the judging panels on the Exhibition day. All the final winners from both competitions will be bestowed during this time. The objective of this event is to establish innovative and practical solutions for a developing country like Indonesia. Additionally, this event also aims to educate the local society by unveiling and enhancing tools that foster tranquility and ease.',
    images: [
      {
        url: 'https://sandbox.ieeeitb.com/link-preview.png',
        width: 1200,
        height: 630,
        alt: 'Sandbox IEEE ITB Logo',
      },
    ],
  },
};
