'use client';

import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';

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
  const handleNextClick = useCallback(() => {
    // Check if the current index is the last index, if so, set to 0, else increment by 1
    setCurrentIndex((currentIndex + 1) % options.length);
  }, [currentIndex, options.length]);

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
  useEffect(() => {
    const interval = setInterval(() => {
      handleNextClick();
    }, 3000); // setiap 3 detik

    return () => clearInterval(interval); // bersihkan interval ketika komponen diunmount
  }, [currentIndex, handleNextClick]);

  const displayedMentors = getDisplayedMentors();

  const [startX, setStartX] = useState(0);
  const handleDragStart = (e) => {
    // Get position mouse
    const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
  };

  const handleDragEnd = (e) => {
    // Get position mouse
    const clientX =
      e.type === 'touchend' ? e.changedTouches[0].clientX : e.clientX;
    const distance = clientX - startX;

    if (distance < -50) {
      handleNextClick();
    } else if (distance > 50) {
      handlePrevClick();
    }
  };

  return (
    options.length > 2 && (
      <div className='w-full min-h-[600px] md:min-h-[660px] lg:min-h-[710px] flex flex-col items-center justify-center overflow-x-hidden'>
        <div data-aos='fade-up' className=' flex py-10'>
          {displayedMentors.map((option, index) => (
            <div
              onMouseDown={handleDragStart}
              onMouseUp={handleDragEnd}
              onTouchStart={handleDragStart}
              onTouchEnd={handleDragEnd}
              key={option.id}
              className={`w-[220px] transition-all duration-300 h-[320px] md:w-[308px] md:h-[400px] flex items-center rounded-3xl overflow-hidden relative justify-center ${
                index === 1
                  ? 'm-0'
                  : index == 0
                  ? '-mt-5 opacity-70 blur-sm sm:mx-5 lg:mx-10'
                  : 'mx-1 sm:mx-3 lg:mx-12 opacity-80 blur-sm -mt-5'
              }`}
            >
              {/* Background */}
              <Image
                src={option.image.url}
                className='w-[220px] h-[320px] md:w-[308px] md:h-[400px] object-cover object-center'
                width={option.image.width}
                height={option.image.height}
                alt={option.image.title}
                sizes='(max-width: 768px) 220px, 308px'
                priority
              />
              {/* Content */}
              <div className='w-full absolute bottom-3 lg:bottom-8 flex items-center justify-center'>
                <div className='w-[80%] bg-gradient-to-br from-[#ffb050] via-white/5 to-[#84694875] rounded-2xl lg:rounded-[26px] drop-shadow-[0px_0px_10px_rgba(255,255,255,0.7)]'>
                  <div className='bg-dark-green rounded-xl lg:rounded-3xl m-[3px]'>
                    <div className='py-1 px-2 lg:py-2 lg:px-5 bg-gradient-to-br from-[#84694875] via-white/5 to-[#84694875] rounded-xl lg:rounded-3xl flex flex-col  text-center justify-center'>
                      <span
                        className='text-center align-middle break-all text-base md:text-xl lg:text-2xl font-poppins font-bold bg-gradient-brown bg-clip-text text-transparent tracking-wide'
                        style={{
                          textShadow: `0px 0px 0.9732px #705229,0px 0px 1.9464px #705229,0px 0px 40.8744px #7052290px 0px 23.3568px #705229,0px 0px 13.6248px #705229,0px 0px 6.8124px #705229,
              `,
                        }}
                      >
                        {option.name}
                      </span>
                      <span className='flex flex-wrap gap-1 items-center justify-center text-center font-poppins font-bold text-sm md:text-base lg:text-lg bg-gradient-brown bg-clip-text text-transparent tracking-wide'>
                        {option.post} at
                        <Image
                          src={option.company.url}
                          className='w-[50px] object-contain object-center h-[35px]'
                          width={option.company.width}
                          height={option.company.height}
                          alt={option.company.title}
                          sizes='50px'
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          data-aos='fade-down'
          className='my-4 lg:my-10 relative z-[40] flex items-center justify-center'
        >
          <CustomLink color='gold' url='#seemore'>
            See More
          </CustomLink>
        </button>
        <div
          data-aos='flip-up'
          className='flex items-center relative z-[40] justify-center'
        >
          <button
            aria-label='previous'
            className='custom-prev-button'
            onClick={handlePrevClick}
          >
            <Prev size={80} className='w-[70px] lg:w-[80px] aspect-square' />
          </button>
          <div className='mx-4 flex items-center gap-4 lg:gap-5 justify-center'>
            {options.map((option, index) => (
              <button
                aria-label={'dot' + index}
                className='custom-dot-button'
                key={index}
                onClick={() => setCurrentIndex(index)}
              >
                <Dot
                  size={20}
                  className={`${
                    index !== currentIndex
                      ? 'fill-cream-secondary-light'
                      : 'fill-[#AB814E]'
                  } w-[15px] lg:w-[20px] aspect-square`}
                ></Dot>
              </button>
            ))}
          </div>
          <button
            aria-label='next'
            className='custom-next-button'
            onClick={handleNextClick}
          >
            <Next size={80} className='w-[70px] lg:w-[80px] aspect-square' />
          </button>
        </div>
      </div>
    )
  );
};

export default MentorCarousel;
