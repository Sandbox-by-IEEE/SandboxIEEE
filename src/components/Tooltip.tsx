'use client';
import React, { useEffect, useState } from 'react';

import Triangle from '@/components/icons/Triangle';

const Tooltip = ({
  message,
  position,
  children,
  isWhite = true,
}: {
  position: string;
  message: string;
  children: React.ReactNode;
  isWhite?: boolean;
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const delayTime = 50;

  let showTimer: NodeJS.Timeout;
  let hideTimer: NodeJS.Timeout;

  const handleMouseEnter = () => {
    showTimer = setTimeout(() => {
      setIsVisible(true);
    }, delayTime);
  };

  const handleMouseLeave = () => {
    clearTimeout(showTimer);
    hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2 * delayTime);
  };

  // Clear timers when the component unmounts to avoid memory leaks
  useEffect(() => {
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (position === 'bottom') {
    return (
      <div className='flex flex-col-reverse relative'>
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {children}
        </div>
        {isVisible && (
          <div className='flex absolute bottom-0 translate-y-full left-1/2 -translate-x-1/2  items-center flex-col justify-center '>
            <Triangle position='bottom' isWhite={isWhite} />
            <p
              className={
                isWhite
                  ? 'px-2 py-1 text-black bg-white min-w-[100px] font-bold rounded-md'
                  : 'bg-[#ffe1b9] px-2 py-1 text-black min-w-[100px] font-bold rounded-md'
              }
            >
              {message}
            </p>
          </div>
        )}
      </div>
    );
  }
  if (position === 'left') {
    return (
      <div className='flex relative'>
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {children}
        </div>
        {isVisible && (
          <div className='absolute top-1/2 -translate-y-1/2 left-0 -translate-x-full flex items-center justify-center'>
            <p
              className={
                isWhite
                  ? 'px-2 py-1 text-black bg-white min-w-[100px] font-bold rounded-md'
                  : 'bg-[#ffe1b9] px-2 py-1 text-black min-w-[100px] font-bold rounded-md'
              }
            >
              {message}
            </p>
            <Triangle position='left' isWhite={isWhite} />
          </div>
        )}
      </div>
    );
  }
  if (position === 'right') {
    return (
      <div className='flex relative'>
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {children}
        </div>
        {isVisible && (
          <div className='absolute top-1/2 -translate-y-1/2 right-0 translate-x-full flex items-center justify-center '>
            <Triangle position='right' isWhite={isWhite} />
            <p
              className={
                isWhite
                  ? 'px-2 py-1 text-black bg-white min-w-[100px] font-bold rounded-md'
                  : 'bg-[#ffe1b9] px-2 py-1 text-black min-w-[100px] font-bold rounded-md'
              }
            >
              {message}
            </p>
          </div>
        )}
      </div>
    );
  }
  return (
    <div className='flex flex-col relative'>
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {children}
      </div>
      {isVisible && (
        <div className='absolute top-0 -translate-y-full left-1/2 -translate-x-1/2 flex items-center justify-center flex-col'>
          <p
            className={
              isWhite
                ? 'px-2 py-1 text-black bg-white min-w-[100px] font-bold rounded-md'
                : 'bg-[#ffe1b9] px-2 py-1 text-black min-w-[100px] font-bold rounded-md'
            }
          >
            {message}
          </p>
          <Triangle position='top' isWhite={isWhite} />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
