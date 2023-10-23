'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { type SponsorLogo } from '@/types/marque-type';

function Marquee({
  showSeconds,
  hideSeconds,
  data,
}: {
  showSeconds: number;
  hideSeconds: number;
  data: SponsorLogo[];
}) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Timer untuk menampilkan dan menyembunyikan komponen
    const timer = setInterval(
      () => {
        setIsVisible(!isVisible);
      },
      (isVisible ? showSeconds : hideSeconds) * 1000,
    );

    return () => {
      clearInterval(timer);
    };
  }, [showSeconds, hideSeconds, isVisible]);

  return (
    isVisible && (
      <div
        className={`overflow-hidden ${
          isVisible
            ? 'opacity-100 pointer-event-auto'
            : 'opacity-0 pointer-events-none'
        } animate-blink fixed bottom-0 z-[1000] bg-green-primary h-[60px] lg:h-[75px] m-auto transition-all duration-300 whitespace-nowrap w-full`}
      >
        <div className='flex gap-7 justify-around py-3 lg:py-4 animate-marquee w-full h-full items-center'>
          {data.map((image, index) => (
            <Image
              key={index}
              src={image.url}
              alt={image.title}
              width={image.width}
              height={image.height}
              priority
              className='w-full h-full object-center object-contain'
            />
          ))}
        </div>
      </div>
    )
  );
}

export default Marquee;
