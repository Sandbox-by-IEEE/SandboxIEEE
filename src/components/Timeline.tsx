'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React, { useRef, useState } from 'react';

import TimelineCard from './TimelineCard';

interface TimelineItem {
  date: Date;
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

  const displayItems = [items[items.length - 1], ...items, items[0]];

  return (
    <div className='w-full mx-auto py-8'>
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
            />
          ))}
        </motion.div>

        {/* Timeline Progress */}
        <div className='relative mt-8'>
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
              className='text-center mt-4'
            >
              <h3 className='text-xl font-bold text-white'>
                {formatDate(new Date(items[activeIndex].date))}
              </h3>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Progress Line */}
        <div className='relative mt-4'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={activeIndex}
              initial={{ width: 0, left: direction === 'next' ? '100%' : 0 }}
              animate={{ width: '100%', left: 0 }}
              exit={{ width: 0, left: direction === 'next' ? 0 : '100%' }}
              transition={{ duration: 0.4 }}
              className='absolute w-full h-[1.5px] rounded-full'
              style={{
                backgroundImage:
                  'linear-gradient(to right, var(--color-start), var(--color-middle), var(--color-end))',
              }}
            />
          </AnimatePresence>

          {/* Lingkaran */}
          {/* <div
            className="absolute -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-lg left-[49%]"/> */}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
