'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function TimelineSection() {
  const timeline = [
    {
      label: 'Open Registration',
      date: '21 Feb',
      image: '/timeline/circle-1.svg',
    },
    {
      label: 'Close Registration',
      date: '8 Mar',
      image: '/timeline/circle-2.svg',
    },
    {
      label: 'Preliminary Round',
      date: '23 Feb – 15 Mar',
      image: '/timeline/circle-3.svg',
    },
    {
      label: 'Semifinal Round',
      date: '17 Mar – 10 Apr',
      image: '/timeline/circle-4.svg',
    },
    { label: 'Grand Final', date: '25 Apr', image: '/timeline/circle-5.svg' },
  ];

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true });
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      el?.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.6;
    el.scrollBy({
      left: dir === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <section id='timeline' className='py-12 md:py-20 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <h2
          className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 md:mb-16 font-gemunu'
          style={{
            background: 'linear-gradient(90deg, #7B1919 0%, #FFFFFF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Our Timeline
        </h2>

        {/* Horizontal scrollable with navigation arrows */}
        <div className='relative'>
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className='absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/60 border border-white/20 text-white/80 flex items-center justify-center hover:bg-black/80 transition-colors backdrop-blur-sm -ml-1 sm:ml-0'
              aria-label='Scroll left'
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className='absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/60 border border-white/20 text-white/80 flex items-center justify-center hover:bg-black/80 transition-colors backdrop-blur-sm -mr-1 sm:mr-0'
              aria-label='Scroll right'
            >
              <ChevronRight size={20} />
            </button>
          )}

          <div
            ref={scrollRef}
            className='flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory px-2 pb-4 lg:justify-center'
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {timeline.map((item, index) => (
              <div
                key={index}
                className='flex flex-col items-center text-center snap-center shrink-0 w-[140px] sm:w-[160px] md:w-[180px]'
              >
                <div className='relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mb-3 md:mb-4'>
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    className='object-contain'
                  />
                </div>
                <div className='text-lg sm:text-xl md:text-2xl font-bold text-white font-gemunu mb-1 whitespace-nowrap'>
                  {item.date}
                </div>
                <div className='text-white/70 font-gemunu text-xs sm:text-sm md:text-base whitespace-nowrap'>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
