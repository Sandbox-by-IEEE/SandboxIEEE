import React from 'react';

import ClientVotePage from '@/app/(site)/exhibition/vote/ClientVotePage';

const PageVote = () => {
  const TPCData = [
    {
      teamsName: 'Team Alpha',
      topic: 'Innovation in Tech',
      imageUrl: '/google-logo.png',
      isVote: true,
      urlCreation: 'https://www.google.com/',
    },
    {
      teamsName: 'Team Beta',
      topic: 'Sustainable Solutions',
      imageUrl: '/google-logo.png',
      isVote: true,
      urlCreation: 'https://www.google.com/',
    },
    {
      teamsName: 'Team Gamma',
      topic: 'Future of Healthcare',
      imageUrl: '/google-logo.png',
      isVote: true,
      urlCreation: 'https://www.google.com/',
    },
  ];
  const PTCData = [
    {
      teamsName: 'Team Delta',
      topic: 'Clean Energy Solutions',
      imageUrl: '/background.png',
      isVote: true,
    },
    {
      teamsName: 'Team Echo',
      topic: 'Cyber Security Innovations',
      imageUrl: '/google-logo.png',
      isVote: true,
    },
    {
      teamsName: 'Team Foxtrot',
      topic: 'AI in Education',
      imageUrl: '/Mascot.png',
      isVote: true,
    },
  ];
  return (
    <main className='w-full min-h-screen flex flex-col items-center py-20 pt-14 lg:py-20 bg-gradient-green gap-10 lg:gap-16 px-8 sm:px-10 md:px-20 lg:px-40'>
      <h1 className='text-4xl lg:text-5xl font-bold font-museo-muderno p-1 bg-gradient-brown text-transparent drop-shadow-[2px_3px_10px_10px_#bbcc9e] bg-clip-text'>
        Exhibition
      </h1>

      <div className='flex flex-col gap-10'>
        <h2 className='text-white font-poppins text-justify text-base lg:text-lg'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a ipsum
          at sapien dignissim interdum sit amet sit amet nisl. Vestibulum quis
          volutpat ipsum, consequat blandit mi. Vivamus id porta dolor, vel
          tristique libero. Cras scelerisque purus in quam posuere blandit.
          Lorem ipsum dolor sit amet, consectetur adipiscing{' '}
        </h2>
        <ClientVotePage TPCData={TPCData} PTCData={PTCData} />
      </div>
    </main>
  );
};
export default PageVote;
