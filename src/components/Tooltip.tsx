'use client';
import React, { useEffect, useState } from 'react';

import Triangle from '@/components/icons/Triangle';

const Tooltip = ({
  message,
  position,
  children,
  translationX = '0px',
  translationY = '0px',
  isWhite = true,
}: {
  position: string;
  message: string;
  children: React.ReactNode;
  translationX?: string;
  translationY?: string;
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
          <div
            className='absolute inset-0'
            style={{
              transform: `translate(${translationX}, ${translationY})`,
            }}
          >
            <div className='relative flex justify-center items-center'>
              <div className='absolute top-0 left-0 flex items-center flex-col'>
                <Triangle position='bottom' isWhite={isWhite} />
                <p
                  className={
                    isWhite
                      ? 'px-2 py-1 text-black bg-white min-w-[100px] font-[600] rounded-md'
                      : 'bg-[#ffe1b9] px-2 py-1 text-black min-w-[100px] font-[600] rounded-md'
                  }
                >
                  {message}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  if (position === 'left') {
    return (
      <div className='flex'>
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {children}
        </div>
        {isVisible && (
          <div
            className='relative flex justify-center items-center'
            style={{
              transform: `translate(${translationX}, ${translationY})`,
            }}
          >
            <div className='absolute top-0 left-0 flex items-center'>
              <p
                className={
                  isWhite
                    ? 'px-2 py-1 text-black bg-white min-w-[100px] font-[600] rounded-md'
                    : 'bg-[#ffe1b9] px-2 py-1 text-black min-w-[100px] font-[600] rounded-md'
                }
              >
                {message}
              </p>
              <Triangle position='left' isWhite={isWhite} />
            </div>
          </div>
        )}
      </div>
    );
  }
  if (position === 'right') {
    return (
      <div className='flex'>
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {children}
        </div>
        {isVisible && (
          <div className='relative flex justify-center items-center'>
            <div
              className='absolute top-0 left-0 flex items-center'
              style={{
                transform: `translate(${translationX}, ${translationY})`,
              }}
            >
              <Triangle position='right' isWhite={isWhite} />
              <p
                className={
                  isWhite
                    ? 'px-2 py-1 text-black bg-white min-w-[100px] font-[600] rounded-md'
                    : 'bg-[#ffe1b9] px-2 py-1 text-black min-w-[100px] font-[600] rounded-md'
                }
              >
                {message}
              </p>
            </div>
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
        <div
          className='absolute inset-0'
          style={{
            transform: `translate(${translationX}, ${translationY})`,
          }}
        >
          <div className='relative flex justify-center items-center'>
            <div className='absolute top-0 left-0 flex items-center flex-col'>
              <p
                className={
                  isWhite
                    ? 'px-2 py-1 text-black bg-white min-w-[100px] font-[600] rounded-md'
                    : 'bg-[#ffe1b9] px-2 py-1 text-black min-w-[100px] font-[600] rounded-md'
                }
              >
                {message}
              </p>
              <Triangle position='top' isWhite={isWhite} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
