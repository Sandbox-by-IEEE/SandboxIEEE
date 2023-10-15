import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Countdown = dynamic(() => import('@/components/Countdown'), {
  ssr: false,
});

import { FAQ } from '@/components/FAQ';
import CustomLink from '@/components/Link';
import VoteCard from '@/components/VoteCard';
const voteCardData = [
  {
    teamsName: 'Team Alpha',
    topic: 'Innovation in Tech',
    imageUrl: '/google-logo.png',
    isVote: false,
  },
  {
    teamsName: 'Team Beta',
    topic: 'Sustainable Solutions',
    imageUrl: '/google-logo.png',
    isVote: false,
  },
  {
    teamsName: 'Team Gamma',
    topic: 'Future of Healthcare',
    imageUrl: '/google-logo.png',
    isVote: false,
  },
  // Add more objects as needed
];

const faqData = [
  {
    question: 'What is the capital of France?',
    answer:
      'The capital of France is Paris. Paris is known for its art, gastronomy, and culture. The city is home to numerous iconic landmarks such as the Eiffel Tower, the Louvre Museum, and the Notre-Dame Cathedral.',
  },
  {
    question: 'How many continents are there?',
    answer:
      'There are 7 continents: Africa, Antarctica, Asia, Europe, North America, Oceania, and South America. Each continent has its own unique geography, climate, and biodiversity.',
  },
  {
    question: 'What is the largest mammal in the world?',
    answer:
      'The largest mammal in the world is the blue whale. Blue whales can reach lengths of up to 100 feet and weigh as much as 200 tons. Despite their enormous size, blue whales primarily feed on small shrimp-like animals called krill.',
  },
  {
    question: 'How does photosynthesis work?',
    answer:
      'Photosynthesis is the process by which plants, algae, and some bacteria convert sunlight into energy. In this process, these organisms use sunlight to convert carbon dioxide and water into glucose, a type of sugar that they use for energy. Oxygen is released as a byproduct of this process.',
  },
  {
    question: 'What is the speed of light?',
    answer:
      "The speed of light in a vacuum is approximately 299,792 kilometers per second (km/s) or about 186,282 miles per second (mi/s). This speed is often represented by the symbol 'c' and is a fundamental constant of nature. It is also the maximum speed at which information or matter can travel through space.",
  },
  // Add more objects as needed
];
const ExhibitionPage = () => {
  return (
    <main className='w-full min-h-screen flex flex-col items-center justify-center bg-gradient-green gap-16 lg:gap-20'>
      {/* Background Section */}
      <section className='relative w-full h-fit'>
        <Image
          src={'/background.png'}
          width={1920}
          height={571}
          alt='Background Exhibition'
          className='w-full object-cover h-[671px] object-center'
        />
        {/* Text Content on background */}
        <div className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-20 w-fit h-fit flex flex-col gap-8 items-center justify-center'>
          <h1 className='text-4xl lg:text-5xl font-bold font-museo-muderno p-1 bg-gradient-brown text-transparent drop-shadow-[2px_3px_10px_10px_#bbcc9e] bg-clip-text'>
            Exhibition
          </h1>
          <CustomLink color='green' url='/exhibition'>
            See More
          </CustomLink>
        </div>
      </section>

      {/* Explanation */}
      <section className='w-full flex flex-col bg-gradient-green px-8 sm:px-10 md:px-20 lg:px-40'>
        <div className='bg-gradient-brown p-1.5 lg:p-2 rounded-md'>
          <div className='bg-gradient-green gap-4 lg:gap-10 flex flex-col items-center justify-center py-10 px-4 sm:px-10 md:px-12 lg:px-16'>
            {/* Title */}
            <h2 className='bg-gradient-brown text-center lg:text-left text-transparent drop-shadow-[2px_3px_10px_10px_#bbcc9e] bg-clip-text text-3xl lg:text-[40px] font-museo-muderno p-1 font-bold'>
              Apa itu Exhibition?
            </h2>
            {/* Split Mascot & Description */}
            <div className='flex flex-col lg:flex-row w-full gap-4 lg:gap-10 xl:gap-20 items-center justify-center'>
              {/* Image Mascot */}
              <Image
                alt='Mascot Image'
                src='/Mascot.png'
                width={226}
                height={301}
                className='w-[130px] h-[200px] lg:w-[226px] lg:h-[301px] object-contain object-center'
              />
              {/* Description */}
              <p className='text-cream-secondary-light font-poppins text-base lg:text-lg font-medium w-full lg:w-[1000px]'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit
                amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className='w-full flex flex-col gap-10 bg-gradient-green px-8 sm:px-10 md:px-20 lg:px-40 items-center justify-center'>
        <h2 className='bg-gradient-brown text-transparent drop-shadow-[2px_3px_10px_10px_#bbcc9e] bg-clip-text text-3xl lg:text-[40px] font-museo-muderno p-1 font-bold'>
          Location
        </h2>
        {/* GMaps */}
        <div
          id='gmap-canvas'
          className='w-full h-[500px] lg:h-[560px] xl:w-[1100px] rounded-lg overflow-hidden'
        >
          <iframe
            className='h-full w-full border-0'
            src='https://www.google.com/maps/embed/v1/place?q=ITB&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8'
          ></iframe>
        </div>
        {/* Text Click Here */}
        <Link href={'/'} className='text-white font-poppins text-lg -mt-5'>
          Click here to open in Google Maps
        </Link>
      </section>

      {/* CountDown */}
      <section className='w-full flex flex-col gap-2 bg-gradient-green px-8 sm:px-10 md:px-20 lg:px-40'>
        <div className='bg-gradient-brown p-1.5 lg:p-2 rounded-md'>
          <div className='bg-gradient-green flex flex-col items-center justify-center py-10 px-8 lg:px-16 gap-10'>
            {/* Title */}
            <h2 className='bg-gradient-brown text-center lg:text-left text-transparent drop-shadow-[2px_3px_10px_10px_#bbcc9e] bg-clip-text text-3xl lg:text-[40px] font-museo-muderno p-1 font-bold'>
              Pendaftaran Exhibition Dalam
            </h2>
            {/* Countdown */}
            <Countdown targetDate={new Date(2023, 9, 20)} />
            {/* Button */}
            <div className='flex gap-3 sm:gap-4 md:gap-6 lg:gap-10'>
              <CustomLink color='gold' url='/exhibition'>
                Daftar
              </CustomLink>
              <CustomLink color='trans-orange' url='/exhibition'>
                See more
              </CustomLink>
            </div>
          </div>
        </div>
      </section>

      {/* Voting Regulations */}
      <section className='w-full flex flex-col gap-2 bg-gradient-green px-8 sm:px-10 md:px-20 lg:px-40'>
        <div className='bg-[#0F3015] rounded-2xl flex flex-col items-center justify-center py-10 px-8 lg:px-16 gap-10 shadow-[0px_0px_6px_7px_#AB814E]'>
          {/* Title */}
          <h2 className='bg-gradient-brown text-center lg:text-left text-transparent drop-shadow-[2px_3px_10px_10px_#bbcc9e] bg-clip-text text-3xl lg:text-[40px] font-museo-muderno p-1 font-bold'>
            Voting Regulation
          </h2>
          {/* Description */}
          <p className='text-white text-sm lg:text-base'>
            1. .Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam. 2. .Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam. 3. .Lorem ipsum dolor
            sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam. 4..Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam. 5. .Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam. 6..Lorem ipsum dolor
            sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam. 7. .Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam. 8. .Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam. 9. .Lorem ipsum dolor
            sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam. 10. .Lorem ipsum dolor sit amet, consectetur adipiscing
            elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam.
          </p>
        </div>
      </section>

      {/* Final Project Spill */}
      <section className='w-full flex flex-col items-center justify-center gap-10 bg-gradient-green px-8 sm:px-10 md:px-20 lg:px-40'>
        <h2 className='bg-gradient-brown text-center text-transparent bg-clip-text text-3xl lg:text-[40px] font-museo-muderno p-1 font-bold'>
          Final Project Teams
        </h2>
        {/* TPC */}
        <h3 className='bg-gradient-brown text-center text-transparent bg-clip-text text-2xl lg:text-3xl -m-4 font-museo-muderno p-1 font-bold'>
          TPC
        </h3>
        <div className='flex items-stretch justify-center flex-wrap gap-4 lg:gap-6 2xl:gap-10'>
          {voteCardData.map((card, index) => (
            <VoteCard
              key={index}
              teamsName={card.teamsName}
              topic={card.topic}
              imageUrl={card.imageUrl}
              isVote={card.isVote}
            />
          ))}
        </div>
        {/* PTC */}
        <h3 className='bg-gradient-brown text-center text-transparent bg-clip-text text-2xl lg:text-3xl -m-4 font-museo-muderno p-1 font-bold'>
          PTC
        </h3>
        <div className='flex items-stretch justify-center flex-wrap gap-4 lg:gap-6 2xl:gap-10'>
          {voteCardData.map((card, index) => (
            <VoteCard
              key={index}
              teamsName={card.teamsName}
              topic={card.topic}
              imageUrl={card.imageUrl}
              isVote={card.isVote}
            />
          ))}
        </div>
        <CustomLink color='gold' url='/ex'>
          See More
        </CustomLink>
      </section>

      {/* FAQ */}
      <section className='w-full flex flex-col bg-gradient-green px-8 sm:px-10 md:px-20 lg:px-40 items-center justify-center gap-10 pb-20'>
        <h2 className='bg-gradient-brown text-transparent drop-shadow-[2px_3px_10px_10px_#bbcc9e] text-center bg-clip-text text-3xl lg:text-[40px] font-museo-muderno p-1 font-bold'>
          Frequently Asked Questions
        </h2>
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
