import React from 'react';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';

import GradientBox from '@/components/GradientBox';

type TimelineItem = {
  date: string;
  text: string;
};

const Timeline = ({ items }: { items: TimelineItem[] }) => {
  return (
    <VerticalTimeline>
      {items.map((el, i) => (
        <VerticalTimelineElement
          key={i}
          className='vertical-timeline-element--work'
          contentStyle={{
            background: 'inherit',
            color: '#fff',
          }}
          contentArrowStyle={{ borderRight: '7px solid transparent' }}
          iconStyle={{
            background: '#AB814E',
            border: '0px 0px',
            marginTop: '10%',
          }}
          dateClassName='mt-[40px]'
        >
          <GradientBox className='max-w-[300px] max-h-fit min-h-[100px] sm:min-h-[180px] text-left flex flex-col justify-center items-start gap-6'>
            <div className='flex flex-col w-fit mx-auto pl-2 sm:pr-8'>
              <span className='text-left font-bold text-lg sm:text-2xl text-[#FFE1B9]'>
                {el.date}
              </span>
              <span className='text-sm sm:text-xl'>{el.text}</span>
            </div>
          </GradientBox>
        </VerticalTimelineElement>
      ))}
    </VerticalTimeline>
  );
};

export default Timeline;
