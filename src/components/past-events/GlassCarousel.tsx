'use client';
import Image from 'next/image';
import { useState } from 'react';

import GradientBox from '@/components/GradientBox';
import TitleSection from '@/components/TitleSection';

type GlassCarousel = {
  title: string;
  photos: {
    url: string;
  }[];
};

export default function GlassCarousel({ title, photos }: GlassCarousel) {
  const [numActive, setNumActive] = useState<number>(1);
  return (
    <>
      <GradientBox className='min-h-[660px] w-[1206px] max-w-full flex flex-col items-center justify-center gap-8 p-8'>
        <TitleSection>{title}</TitleSection>
        <div className='aspect-[4/3] max-h-[500px] max-md:min-h-[200px] md:min-h-[500px] flex flex-col md:flex-row gap-10 lg:gap-20 relative justify-center items-center overflow-hidden rounded-xl overflow-hidden shadow-[0px_0px_20px_7px_#D8B88B] relative'>
          <Image
            src={photos[numActive - 1].url}
            fill
            objectFit='cover'
            alt=''
          />
        </div>

        <CarouselButtons
          numActive={numActive}
          setNumActive={setNumActive}
          capacity={5}
        />
      </GradientBox>
    </>
  );
}

function CarouselButtons({ numActive, setNumActive, capacity }) {
  return (
    <div className='w-[60%] lg:w-[9%] relative flex flex-row justify-between items-center'>
      {Array.from(Array(capacity), (_, i) => (
        <div key={i} className='relative rounded-full'>
          <button
            className='rounded-full aspect-square w-4  absolute'
            onClick={() => setNumActive(i + 1)}
          >
            <Image
              src={`${
                i + 1 != numActive ? '/lightcircle.svg' : '/darkcircle.svg'
              }`}
              alt=''
              fill
            />
          </button>
        </div>
      ))}
    </div>
  );
}
