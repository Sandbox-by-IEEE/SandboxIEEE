'use client';

import Image from 'next/image';
import React, { useState } from 'react';

import Dot from '@/components/icons/dot';
import Next from '@/components/icons/mentors/next';
import Prev from '@/components/icons/mentors/prev';
import CustomLink from '@/components/Link';
import { type Mentor } from '@/types/our-mentors';

interface MentorsCarouselProps {
  options: Mentor[];
}
const MentorCarousel: React.FC<MentorsCarouselProps> = ({ options }) => {
  // State to keep track of the current mentor index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to handle the "Next" button click
  const handleNextClick = () => {
    // Check if the current index is the last index, if so, set to 0, else increment by 1
    setCurrentIndex((currentIndex + 1) % options.length);
  };

  // Function to handle the "Prev" button click
  const handlePrevClick = () => {
    // Check if the current index is the first index, if so, set to last index, else decrement by 1
    setCurrentIndex((currentIndex - 1 + options.length) % options.length);
  };
  const getDisplayedMentors = () => {
    const mentorsLength = options.length;
    const prevIndex = (currentIndex - 1 + mentorsLength) % mentorsLength;
    const nextIndex = (currentIndex + 1) % mentorsLength;
    return [options[prevIndex], options[currentIndex], options[nextIndex]];
  };

  const displayedMentors = getDisplayedMentors();
  return (
    <section className='w-full h-fit flex flex-col items-center justify-center px-40 overflow-hidden'>
      <div className=' flex p-5'>
        {displayedMentors.map((option, index) => (
          <div
            key={option.name}
            className={`w-[250px] transition-all duration-300 h-[350px] md:w-[308px] md:h-[400px] flex items-center rounded-3xl overflow-hidden relative justify-center ${
              index === 1
                ? 'm-0'
                : index == 0
                ? '-mt-5 opacity-70 blur-sm mx-10'
                : 'mx-12 opacity-80 blur-sm -mt-5'
            }`}
          >
            {/* BAckground */}
            <Image
              src={option.image.url}
              className='w-full h-full object-cover object-center'
              width={option.image.width}
              height={option.image.height}
              alt={option.image.title}
            ></Image>
            {/* Content */}
            <div className='w-full absolute bottom-3 lg:bottom-10 flex items-center justify-center'>
              <div className='w-[80%] bg-gradient-to-br from-[#ffb050] via-white/5 to-[#84694875] rounded-[26px] drop-shadow-[0px_0px_10px_rgba(255,255,255,0.7)]'>
                <div className='bg-dark-green rounded-3xl m-[3px]'>
                  <div className='align-middle py-1 px-2 lg:py-2 lg:px-5 bg-gradient-to-br from-[#84694875] via-white/5 to-[#84694875] rounded-3xl flex flex-col text-center justify-center'>
                    <span
                      className='text-center align-middle text-lg lg:text-2xl font-poppins font-bold bg-gradient-brown bg-clip-text text-transparent leading-6 tracking-wide'
                      style={{
                        textShadow: `0px 0px 0.9732px #705229,0px 0px 1.9464px #705229,0px 0px 40.8744px #7052290px 0px 23.3568px #705229,0px 0px 13.6248px #705229,0px 0px 6.8124px #705229,
              `,
                      }}
                    >
                      {option.name}
                    </span>
                    <div className='align-middle flex gap-1 items-center justify-center'>
                      <span className='align-middle text-center font-poppins font-bold text-sm lg:text-lg bg-gradient-brown bg-clip-text text-transparent leading-6 tracking-wide'>
                        {option.post} at
                      </span>
                      <Image
                        src={option.company.url}
                        className='w-[50px] object-contain object-center h-[25px]'
                        width={option.company.width}
                        height={option.company.height}
                        alt={option.company.title}
                      ></Image>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='my-10 relative z-[40] flex items-center justify-center'>
        <CustomLink color='gold' url='#seemore'>
          See More
        </CustomLink>
      </div>
      <div className='flex items-center relative z-[40] justify-center'>
        <button className='custom-prev-button' onClick={handlePrevClick}>
          <Prev size={80} className='w-[80px] aspect-square' />
        </button>
        <div className='flex items-center gap-5 justify-center'>
          {options.map((option, index) => (
            <button key={index} onClick={() => setCurrentIndex(index)}>
              <Dot
                size={20}
                className={`${
                  index !== currentIndex
                    ? 'fill-cream-secondary-light'
                    : 'fill-[#AB814E]'
                }`}
              ></Dot>
            </button>
          ))}
        </div>
        <button className='custom-next-button' onClick={handleNextClick}>
          <Next size={80} className='w-[80px] aspect-square' />
        </button>
      </div>
    </section>
  );
};

export default MentorCarousel;
