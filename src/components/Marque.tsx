'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

function Marquee({
  showSeconds,
  hideSeconds,
}: {
  showSeconds: number;
  hideSeconds: number;
}) {
  const [isVisible, setIsVisible] = useState(true);

  // Hide and rehide based on showSeconds and hideSeconds props
  useEffect(() => {
    const showInterval = setInterval(
      () => {
        setIsVisible(true);
        const hideInterval = setTimeout(() => {
          setIsVisible(false);
          clearTimeout(hideInterval);
        }, showSeconds * 1000);
      },
      (showSeconds + hideSeconds) * 1000,
    );

    return () => {
      clearInterval(showInterval);
    };
  }, [showSeconds, hideSeconds]);

  // Define an array of image data with src and alt values
  const imageData = [
    { src: '/google-logo.png', alt: 'Google Logo 1' },
    { src: '/google-logo.png', alt: 'Google Logo 2' },
    { src: '/google-logo.png', alt: 'Google Logo 3' },
    { src: '/google-logo.png', alt: 'Google Logo 3' },
    { src: '/google-logo.png', alt: 'Google Logo 3' },
    { src: '/google-logo.png', alt: 'Google Logo 3' },
    { src: '/google-logo.png', alt: 'Google Logo 3' },
    { src: '/google-logo.png', alt: 'Google Logo 3' },
    { src: '/google-logo.png', alt: 'Google Logo 3' },
  ];

  return (
    isVisible && (
      <div
        className={`overflow-hidden animate-blink fixed bottom-0 bg-green-primary transition-all duration-300 whitespace-nowrap w-full`}
      >
        <div className='flex gap-4 justify-around py-2 lg:py-3 animate-marquee w-full'>
          {imageData.map((image, index) => (
            <Image
              key={index}
              src={image.src}
              alt={image.alt}
              width={40}
              height={40}
              priority
              className='w-[30px] aspect-square lg:w-[40px] object-center object-contain'
            />
          ))}
        </div>
      </div>
    )
  );
}

export default Marquee;
