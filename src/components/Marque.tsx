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
    isVisible &&
    data &&
    data.length > 0 && (
      <div
        className={`overflow-hidden ${
          isVisible
            ? 'opacity-100 pointer-event-auto'
            : 'opacity-0 pointer-events-none'
        } animate-trans border-t border-cream-secondary-normal fixed bottom-0 z-[1000] h-[50px] lg:h-[60px] m-auto transition-all duration-300 whitespace-nowrap w-full`}
        style={{
          background:
            'linear-gradient(180deg, rgba(7, 29, 16, 0.48) 0%, rgba(1, 6, 3, 0.08) 33.85%, rgba(0, 0, 0, 0.00) 69.27%, rgba(6, 26, 14, 0.48) 100%), var(--Primary, #0D432F)',
        }}
      >
        <Image
          src={'/sparkle-marquee.svg'}
          alt='Marquee Sparkle'
          width={30}
          height={30}
          className='absolute left-10 top-2 -z-[10]'
        />
        <div className='flex gap-7 justify-around py-2 animate-marquee w-full h-full items-center'>
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
        <Image
          src={'/sparkle-marquee.svg'}
          alt='Marquee Sparkle'
          width={30}
          height={30}
          className='absolute right-10 top-2 -z-[10] scale-x-[-1]'
        />
      </div>
    )
  );
}

export default Marquee;
