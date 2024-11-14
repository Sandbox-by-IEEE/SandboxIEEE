'use client';
import 'react-vertical-timeline-component/style.min.css';

import React from 'react';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';

import GradientBox from '@/components/GradientBox';

type TimelineItem = {
  date: Date;
  text: string;
};

const Timeline = ({ items }: { items: TimelineItem[] }) => {
  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  return (
    <VerticalTimeline lineColor=''>
      {items.map((el, i) => (
        <VerticalTimelineElement
          key={i}
          className='vertical-timeline-element--work'
          contentStyle={{
            background: 'inherit',
            color: '#ffffff',
          }}
          contentArrowStyle={{ borderRight: '7px solid transparent' }}
          iconStyle={{
            background: '#AB814E',
            border: '0px 0px',
            marginTop: '7.5%',
          }}
          dateClassName='mt-[20px]'
        >
          <GradientBox
            className='max-w-[300px] max-h-fit min-h-[90px] sm:min-h-[170px] text-left flex flex-col justify-center items-start gap-6'
            aos={i % 2 === 0 ? 'fade-right' : 'fade-left'}
          >
            <div className='flex flex-col w-fit mx-auto pl-2 sm:pr-8'>
              <h4
                className='text-left font-bold text-lg sm:text-2xl text-[#FFE1B9]'
                data-aos='zoom-in-down'
                data-aos-duration='1000'
              >
                {formatDate(new Date(el.date))}
              </h4>
              <span
                data-aos='zoom-in-up'
                data-aos-duration='1000'
                className='text-sm sm:text-xl'
              >
                {el.text}
              </span>
            </div>
          </GradientBox>
        </VerticalTimelineElement>
      ))}
    </VerticalTimeline>
  );
};

export default Timeline;
