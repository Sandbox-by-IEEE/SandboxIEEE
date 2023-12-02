'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

export interface ImageType {
  id: string;
  url: string;
  title: string;
  width: number;
  height: number;
}

export default function BackgroundCarousel({
  images,
}: {
  images: ImageType[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % images.length);
    }, 5000); // setiap 5 detik

    return () => clearInterval(interval); // bersihkan interval ketika komponen diunmount
  }, [currentIndex, images.length]);

  return (
    <div className='bg-[#514e4e] bg-opacity-70'>
      <Image
        key={images[currentIndex].id}
        src={images[currentIndex].url}
        width={images[currentIndex].width}
        height={images[currentIndex].height}
        alt={images[currentIndex].title}
        priority
        className='animate-blink w-full object-cover h-[771px] max-h-screen object-center'
        sizes='100vw'
      />
    </div>
  );
}
