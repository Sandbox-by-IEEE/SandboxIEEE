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
      <h1 className='text-4xl lg:text-5xl font-bold font-museo-muderno p-1 bg-gradient-brown text-transparent drop-shadow-[2px_3px_10px_10px_#bbcc9e] bg-clip-text'>
        {votePage.titleVotePage}
      </h1>

      <div className='flex flex-col gap-10'>
        <h2 className='text-white font-poppins text-justify text-base lg:text-lg'>
          <StructuredText data={votePage.descriptionVote} />
        </h2>
        <ClientVotePage TPCData={TPCData} PTCData={PTCData} />
      </div>
    </main>
  );
};
export default PageVote;
