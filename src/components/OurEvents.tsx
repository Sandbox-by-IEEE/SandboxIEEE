'use client';

import 'aos/dist/aos.css'; // Pastikan AOS CSS di-import

import AOS from 'aos'; // Import AOS
import Image from 'next/image';
import React, { useEffect } from 'react';

import GradientBox from '@/components/GradientBox';
import TitleSection from '@/components/TitleSection';

interface EventCardProps {
  title: string;
  description: string;
  index: number;
}

const EventCard: React.FC<EventCardProps> = ({ title, description, index }) => {
  const bucketImages = ['/bucket1.svg', '/bucket2.svg', '/bucket3.svg'];
  const bucketImage = bucketImages[index % bucketImages.length];

  const decorationImages = ['/event1.svg', '/event2.svg', '/event3.svg'];
  const decorationImage = decorationImages[index % decorationImages.length];

  const mobileDecorationImages = [
    '/eventmobile1.svg',
    '/eventmobile2.svg',
    '/eventmobile3.svg',
  ];
  const mobileDecorationImage =
    mobileDecorationImages[index % mobileDecorationImages.length];

  const getPositionClass = (index: number) => {
    if (index % 3 === 0) {
      return '-right-[230px] -top-[80px]'; // Custom position for the first image
    } else if (index % 3 === 2) {
      return '-right-[230px] -top-[80px]'; // Custom position for the third image
    } else {
      return index % 2 === 0
        ? '-right-[250px] -top-[50px]'
        : '-left-[250px] -top-[50px]'; // Default positions
    }
  };

  return (
    <div className='relative'>
      {/* Bucket  */}
      <div className={`absolute ${getPositionClass(index)} `}>
        <Image
          src={bucketImage}
          alt='Bucket'
          width={400}
          height={400}
          objectFit='cover'
          className='rounded-[40px] fixed-size hidden lg:block'
        />
      </div>
      <div
        className='bg-gradient-to-r from-[#28575cef] to-[#0d2d32da] backdrop-filter backdrop-blur-md rounded-[40px] shadow-lg p-8 flex flex-col relative justify-between mb-8 w-full min-h-[320px]'
        data-aos='fade-up'
      >
        <div className='flex flex-col'>
          <h3 className='text-[20px] sm:text-[26px] lg:text-[32px] font-poppins font-semibold text-white mb-4'>
            {title}
          </h3>
          <p className='text-white text-sm sm:text-[18px] lg:text-[20px] font-poppins'>
            {description}
          </p>
        </div>
        <button className='w-fit mt-4 px-6 lg:px-12 py-2 hover:bg-[#1f2937] hover:border-[#1f2937] border-white border-2 text-white font-poppins font-medium rounded-full transition duration-300'>
          See More
        </button>
        <div className='absolute top-0 -right-0 h-full flex items-end justify-end text-end -z-10'>
          {/* SVG or icon decoration can go here */}
          <Image
            src={decorationImage}
            alt='decoration1'
            width={0}
            height={0}
            style={{ height: '100%', width: 'auto', objectFit: 'cover' }}
            className='fixed-size rounded-r-[40px] right-0 hidden lg:block'
          />
          <Image
            src={mobileDecorationImage}
            alt='decoration1'
            width={0}
            height={0}
            style={{ height: '100%', width: 'auto', objectFit: 'cover' }}
            className='fixed-size rounded-r-[40px] right-0 block lg:hidden'
          />
        </div>
      </div>
    </div>
  );
};

const OurEvents: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animasi 1 detik
      once: true, // Animasi hanya berjalan satu kali
    });
  }, []);

  const events = [
    {
      title: 'PTC (ProtoTech Contest)',
      description:
        'The ProtoTech Contest is a prestigious national prototyping competition for undergraduate teams across Indonesia, offering a comprehensive journey from concept to showcase. This event is structured in three key stages, beginning with abstract submission and followed by an insightful seminar or workshop, submissions of full papers and pitch videos, and personalized coaching sessions with expert mentors.',
    },
    {
      title: 'H4H (Hack for Health)',
      description:
        'Hack4Health is a national hackathon organized by IEEE ITB SB that focuses on driving technological innovations in the healthcare sector. The competition seeks to inspire, nurture, and accelerate the creation of technology-based solutions that make a tangible, positive impact on healthcare services. Hack4Health is divided into three main phases: the early stages, mid stages, and final stages.',
    },
    // {
    //   title: 'Mentors',
    //   description:
    //     'Lorem ipsum dolor sit amet consectetur. Sed aliquam praesent nunc sed nunc arcu sagittis. Senectus in quisque consectetur molestie ut phasellus pharetra urna. Tempor accumsan at nunc mi posuere. Mauris montes elementum et semper amet fermentum in tincidunt.',
    // },
  ];

  return (
    <div className='pt-12 font-poppins relative flex flex-col items-center justify-center'>
      <div className='absolute -top-[80px] z-10 lg:hidden'>
        <Image
          src='/eventbucket.svg'
          alt='Event'
          width={0}
          height={0}
          layout='responsive'
        />
      </div>
      <div className='lg:block hidden mb-12'>
        <TitleSection>Our Events</TitleSection>
      </div>
      <GradientBox type='blue' className='mt-24' inverted={true}>
        <div className='block lg:hidden my-6'>
          <TitleSection>Our Events</TitleSection>
        </div>
        <div className='w-full mx-auto p-[20px] lg:p-12'>
          {/* Flex column untuk layout */}
          <div className='flex flex-col gap-6'>
            {events.map((event, index) => (
              <EventCard
                key={index}
                index={index}
                title={event.title}
                description={event.description}
              />
            ))}
          </div>
        </div>
      </GradientBox>
    </div>
  );
};

export default OurEvents;
