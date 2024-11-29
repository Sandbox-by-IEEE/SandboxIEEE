import { motion } from 'framer-motion';
import { FC } from 'react';

import GradientBox from '@/components/GradientBox';

interface TimelineCardProps {
  text: string;
  isActive: boolean;
  index: number;
  activeIndex: number;
  onDragEnd: (direction: 'next' | 'prev') => void;
}

const TimelineCard: FC<TimelineCardProps> = ({
  text,
  isActive,
  index,
  activeIndex,
  onDragEnd,
}) => {
  const cardWidthPercentage = 100 / 3;
  const xOffset =
    (index - activeIndex) * cardWidthPercentage - cardWidthPercentage;

  return (
    <motion.div
      className='flex-shrink-0 w-1/3'
      initial={false}
      animate={{
        x: `${xOffset}%`,
        opacity: isActive ? 1 : 0.5,
        scale: isActive ? 1 : 0.9,
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
