'use client';

import 'aos/dist/aos.css';

import AOS from 'aos';
import Image from 'next/image';
import React, { useEffect } from 'react';

import GradientBox from '@/components/GradientBox';

const Regulations: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <GradientBox
      type='blue'
      className=' w-[336px] h-[900px] lg:h-[500px] lg:w-[1191px] rounded-[50px] backdrop-blur-md'
    >
      <div
        className='font-poppins relative max-w-7xl mx-auto px-6 py-12 rounded-3xl shadow-xl'
        data-aos='fade-up'
      >
        <div className='absolute w-[300px] lg:w-[400px] -top-28 -right-20 z-0 transform rotate-12'>
          <Image
            src='/assets/mascot_regulation.png'
            alt='Mascot'
            width={300}
            height={300}
            priority
            className='rounded-full'
            data-aos='fade-in'
          />
        </div>

        {/* Title */}
        <h2
          className='text-4xl font-bold text-white text-center mb-8 relative z-10'
          data-aos='zoom-in'
        >
          Regulations
        </h2>

        {/* Regulation Box */}
        <div
          className='relative bg-gradient-to-b from-[#35737ad4] to-[#18555fd7] p-8 rounded-xl shadow-lg z-10 backdrop-blur-md bg-opacity-95'
          style={{
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.4)',
          }}
        >
          <ul className='text-white space-y-4 list-none'>
            <li>
              1. Lorem ipsum dolor sit amet consectetur. Sed aliquam praesent
              nunc sed nunc arcu sagittis.
            </li>
            <li>
              2. Lorem ipsum dolor sit amet consectetur. Sed aliquam praesent
              nunc sed nunc arcu sagittis.
            </li>
            <li>
              3. Lorem ipsum dolor sit amet consectetur. Sed aliquam praesent
              nunc sed nunc arcu sagittis.
            </li>
            <li>
              4. Lorem ipsum dolor sit amet consectetur. Sed aliquam praesent
              nunc sed nunc arcu sagittis.
            </li>
          </ul>
        </div>
      </div>
    </GradientBox>
  );
};

export default Regulations;
