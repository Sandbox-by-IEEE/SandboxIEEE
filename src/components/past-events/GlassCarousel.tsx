'use client';

import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';

import GradientBox from '@/components/GradientBox';
import Dot from '@/components/icons/dot';
import Next from '@/components/icons/mentors/next';
import Prev from '@/components/icons/mentors/prev';
import TitleSection from '@/components/TitleSection';

type GlassCarousel = {
  title: string;
  photos: {
    url: string;
  }[];
};

const GlassCarousel: React.FC<GlassCarousel> = ({ title, photos }) => {
  // State to keep track of the current mentor index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to handle the "Next" button click
  const handleNextClick = useCallback(() => {
    // Check if the current index is the last index, if so, set to 0, else increment by 1
    setCurrentIndex((currentIndex + 1) % photos.length);
  }, [currentIndex, photos.length]);

  // Function to handle the "Prev" button click
  const handlePrevClick = () => {
    // Check if the current index is the first index, if so, set to last index, else decrement by 1
    setCurrentIndex((currentIndex - 1 + photos.length) % photos.length);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      handleNextClick();
    }, 3000); // setiap 3 detik

    return () => clearInterval(interval); // bersihkan interval ketika komponen diunmount
  }, [currentIndex, handleNextClick]);

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
    <section className='w-full h-fit flex flex-col items-center justify-center overflow-hidden'>
      <GradientBox className='min-h-[660px] w-[1206px] max-w-full flex flex-col items-center justify-center gap-8 p-8'>
        <div className=' flex py-10'>
          <div
            onMouseDown={handleDragStart}
            onMouseUp={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchEnd={handleDragEnd}
          >
            {/* Content */}
            <TitleSection>{title}</TitleSection>
            <div className='aspect-[4/3] max-h-[500px] max-md:min-h-[200px] md:min-h-[500px] flex flex-col md:flex-row gap-10 lg:gap-20 relative justify-center items-center overflow-hidden rounded-xl overflow-hidden shadow-[0px_0px_20px_7px_#D8B88B] relative'>
              <Image
                src={photos[currentIndex].url}
                width={666}
                height={500}
                className='aspect-[4/3] max-h-[500px] max-md:min-h-[200px] md:min-h-[500px]'
                objectFit='cover'
                alt=''
              />
            </div>
          </div>
        </div>

        <div className='flex items-center relative z-[40] justify-center'>
          <button className='custom-prev-button' onClick={handlePrevClick}>
            <Prev size={80} className='w-[70px] lg:w-[80px] aspect-square' />
          </button>
          <div className='flex items-center gap-2 lg:gap-5 justify-center'>
            {photos.map((option, index) => (
              <button key={index} onClick={() => setCurrentIndex(index)}>
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
          <button className='custom-next-button' onClick={handleNextClick}>
            <Next size={80} className='w-[70px] lg:w-[80px] aspect-square' />
          </button>
        </div>
      </GradientBox>
    </section>
  );
};

export default GlassCarousel;
