'use client';

import 'aos/dist/aos.css'; // Pastikan AOS CSS di-import

import AOS from 'aos'; // Import AOS
import React, { useEffect } from 'react';

interface EventCardProps {
  title: string;
  description: string;
}

const EventCard: React.FC<EventCardProps> = ({ title, description }) => (
  <div
    className='bg-gradient-to-r from-[#28575c] to-[#0d2d32] rounded-xl p-8 shadow-lg relative mb-8 max-w-2xl mx-auto'
    data-aos='fade-up'
  >
    <h3 className='text-2xl font-poppins font-semibold text-white mb-4'>
      {title}
    </h3>
    <p className='text-white text-sm font-poppins'>{description}</p>
    <button className='mt-4 px-4 py-2 bg-black text-white font-poppins font-medium rounded-full hover:bg-gradient-to-r hover:from-[#28575c] hover:to-[#0d2d32] transition duration-300'>
      See More
    </button>
    <div className='absolute right-4 bottom-4'>
      {/* SVG or icon decoration can go here */}
    </div>
  </div>
);

const OurEvents: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animasi 1 detik
      once: true, // Animasi hanya berjalan satu kali
    });
  }, []);

  const events = [
    {
      title: 'PTC',
      description:
        'Lorem ipsum dolor sit amet consectetur. Sed aliquam praesent nunc sed nunc arcu sagittis. Senectus in quisque consectetur molestie ut phasellus pharetra urna. Tempor accumsan at nunc mi posuere. Mauris montes elementum et semper amet fermentum in tincidunt.',
    },
    {
      title: 'HCI (Health Care Ideathon)',
      description:
        'Lorem ipsum dolor sit amet consectetur. Sed aliquam praesent nunc sed nunc arcu sagittis. Senectus in quisque consectetur molestie ut phasellus pharetra urna. Tempor accumsan at nunc mi posuere. Mauris montes elementum et semper amet fermentum in tincidunt.',
    },
    {
      title: 'Mentors',
      description:
        'Lorem ipsum dolor sit amet consectetur. Sed aliquam praesent nunc sed nunc arcu sagittis. Senectus in quisque consectetur molestie ut phasellus pharetra urna. Tempor accumsan at nunc mi posuere. Mauris montes elementum et semper amet fermentum in tincidunt.',
    },
  ];

  return (
    <section className='bg-[#040B15] py-12 font-poppins'>
      <div className='max-w-7xl mx-auto px-6'>
        <h2
          className='text-3xl font-poppins font-extrabold text-center text-white mb-8'
          data-aos='zoom-in'
        >
          Events
        </h2>
        {/* Flex column untuk layout */}
        <div className='flex flex-col gap-6'>
          {events.map((event, index) => (
            <EventCard
              key={index}
              title={event.title}
              description={event.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurEvents;
