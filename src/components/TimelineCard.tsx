import { motion } from 'framer-motion';
import { FC, useEffect, useRef } from 'react';

import GradientBox from '@/components/GradientBox';

interface TimelineCardProps {
  text: string;
  isActive: boolean;
  index: number;
  activeIndex: number;
  onDragEnd: (direction: 'next' | 'prev') => void;
  onScrollEnd: (direction: 'next' | 'prev') => void;
}

const TimelineCard: FC<TimelineCardProps> = ({
  text,
  isActive,
  index,
  activeIndex,
  onDragEnd,
  onScrollEnd,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      event.preventDefault(); // Prevent the default scroll behavior
      event.stopPropagation(); // Prevent the main page from scrolling
      if (event.deltaY < 0) {
        onScrollEnd('prev');
      } else if (event.deltaY > 0) {
        onScrollEnd('next');
      }
    };

    const cardElement = cardRef.current;
    if (cardElement) {
      cardElement.addEventListener('wheel', handleScroll);
    }

    return () => {
      if (cardElement) {
        cardElement.removeEventListener('wheel', handleScroll);
      }
    };
  }, [onScrollEnd]);

  const cardWidthPercentage = 100 / 3;
  const xOffset =
    (index - activeIndex) * cardWidthPercentage - cardWidthPercentage;

  return (
    <motion.div
      ref={cardRef}
      className='flex-shrink-0 w-1/3'
      initial={false}
      animate={{
        x: `${xOffset}%`,
        opacity: isActive ? 1 : 0.5,
        scale: isActive ? 1.2 : 0.9, // Adjusted scale for the middle card
      }}
      drag='x'
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(e, info) => {
        if (info.offset.x < -50) onDragEnd('next');
        if (info.offset.x > 50) onDragEnd('prev');
      }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <GradientBox type='timeline'>
        <div
          className={`bg-[#040B15] p-6 rounded-[50px] min-h-[180px] md:min-h-[200px] lg:min-h-[225px] xl:min-h-[250px] flex flex-col justify-center items-center`}
        >
          <span className='text-xl text-center text-white'>{text}</span>
        </div>
      </GradientBox>
    </motion.div>
  );
};

export default TimelineCard;
