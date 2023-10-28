'use client';

import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';

import GradientBox from '@/components/GradientBox';
import Dot from '@/components/icons/dot';
import Next from '@/components/icons/mentors/next';
import Prev from '@/components/icons/mentors/prev';
import { Documentation } from '@/types/past-events';

type DocumentationCarouselProps = {
  title: string;
  photos: Documentation[];
};

const DocumentationCarousel: React.FC<DocumentationCarouselProps> = ({
  title,
  photos,
}) => {
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
    <section
      className='w-full h-fit flex flex-col items-center justify-center overflow-hidden'
      data-aos='fade-in'
      data-aos-duration='1000'
    >
      <GradientBox className='min-h-[660px] w-full max-w-[450px] sm:max-w-[500px] md:max-w-full md:w-[1100px]  flex flex-col items-center justify-center p-5 md:p-8 lg:p-6 2xlp-10'>
        <div
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
          className='flex flex-col gap-10 px-10 lg:py-5'
        >
          {/* Content */}
          <h4
            style={{
              ['textShadow' as any]: '0px 0px 17.32px #BD9B65',
            }}
            data-aos='zoom-in'
            className='bg-gradient-brown text-center text-transparent drop-shadow-[2px_3px_10px_10px_#bbcc9e] bg-clip-text text-2xl lg:text-3xl font-museo-muderno p-1 font-bold'
          >
            {title}
          </h4>
          <div
            key={photos[currentIndex].title}
            data-aos='fade-in'
            className='animate-blink m-auto max-lg:w-full lg:aspect-[5/3] h-[200px] md:h-[300px] lg:h-[350px] flex flex-col md:flex-row gap-10 lg:gap-20 justify-center items-center rounded-xl overflow-hidden shadow-[0px_0px_20px_7px_#D8B88B] relative'
          >
            <Image
              src={photos[currentIndex].url}
              width={photos[currentIndex].width}
              height={photos[currentIndex].height}
              className='w-full h-full animate-blink object-contain object-center'
              alt={photos[currentIndex].title}
              sizes='(max-width: 768px) 100%, 100%'
            />
          </div>
        </div>

        <div
          className='flex items-center relative z-[40] justify-center'
          data-aos='fade-up'
        >
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

export default DocumentationCarousel;
