'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React, { useRef, useState } from 'react';

import TimelineCard from './TimelineCard';

interface TimelineItem {
  date: Date;
  endDate?: Date;
  text: string;
}

interface Props {
  items: TimelineItem[];
}

const Timeline: React.FC<Props> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const containerRef = useRef<HTMLDivElement>(null);

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const handleNext = () => {
    setDirection('next');
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setDirection('prev');
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleDragEnd = (direction: 'next' | 'prev') => {
    setDirection(direction);
    if (direction === 'next') handleNext();
    else handlePrev();
  };

  const handleScrollEnd = (direction: 'next' | 'prev') => {
    setDirection(direction);
    if (direction === 'next') handleNext();
    else handlePrev();
  };

  const displayItems = [items[items.length - 1], ...items, items[0]];

  return (
    <div className='cursor-pointer w-full mx-auto py-8'>
      <div className='relative'>
        {/* Cards Container */}
        <motion.div
          ref={containerRef}
          className='w-full flex timeline-container'
          style={{
            transform: `translateX(${-activeIndex * (100 / 3)}%)`,
            transition: 'transform 0.5s ease',
          }}
        >
          {displayItems.map((item, index) => (
            <TimelineCard
              key={index}
              text={item.text}
              isActive={index - 1 === activeIndex}
              index={index}
              activeIndex={activeIndex}
              onDragEnd={handleDragEnd}
              onScrollEnd={handleScrollEnd}
            />
          ))}
        </motion.div>

        {/* Navigation Progress Line */}
        <div
          ata-aos='fade-up'
          data-aos-duration='1300'
          className='relative mt-12 md:mt-24'
        >
          <div
            className='absolute w-full h-[1.5px] rounded-full'
            style={{
              backgroundImage:
                'linear-gradient(to right, var(--color-start), var(--color-middle), var(--color-end))',
            }}
          />

          {/* Lingkaran */}
          {/* <motion.div
            className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-lg"
            animate={{
              left: `${(activeIndex + 1) * (100 / displayItems.length)}%`,
            }}
            transition={{ duration: 0.5 }}
          /> */}
        </div>

        {/* Timeline Progress */}
        <div className='relative'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={activeIndex}
              initial={{
                opacity: 0,
                x: direction === 'next' ? 100 : -100,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: direction === 'next' ? -100 : 100,
              }}
              transition={{ duration: 0.4 }}
              className='text-center relative'
            >
              <div className='absolute transform right-1/2 translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-lg'>
                {' '}
              </div>
              <h3 className='pt-6 text-xl font-bold text-white'>
                {formatDate(new Date(items[activeIndex].date))}{' '}
                {items[activeIndex].endDate
                  ? ` - ${formatDate(new Date(items[activeIndex].endDate!))}`
                  : ''}
              </h3>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
