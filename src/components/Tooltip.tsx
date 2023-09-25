'use client';
import React, { useEffect, useState } from 'react';

import Triangle from '@/components/icons/Triangle';

const Tooltip = ({
  message,
  position,
  children,
  isWhite = true,
}: {
  position: 'bottom' | 'left' | 'right' | 'top';
  message: string;
  children: React.ReactNode;
  isWhite?: boolean;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const delayTime = 50;
  let showTimer: NodeJS.Timeout;
  let hideTimer: NodeJS.Timeout;

  const handleMouseEnter = () => {
    showTimer = setTimeout(() => setIsVisible(true), delayTime);
  };

  const handleMouseLeave = () => {
    clearTimeout(showTimer);
    hideTimer = setTimeout(() => setIsVisible(false), 2 * delayTime);
  };

  useEffect(() => {
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tooltipPositionStyles = {
    bottom:
      'absolute bottom-0 translate-y-full left-1/2 -translate-x-1/2 flex-col-reverse',
    left: 'absolute top-1/2 -translate-y-1/2 left-0 -translate-x-full',
    right:
      'absolute top-1/2 -translate-y-1/2 right-0 translate-x-full flex-row-reverse',
    top: 'absolute top-0 -translate-y-full left-1/2 -translate-x-1/2 flex-col',
  };

  const tooltipColorStyles = isWhite ? 'bg-white' : 'bg-[#ffe1b9]';

  return (
    <div
      className={`flex ${position} relative`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isVisible && (
        <div
          className={`${tooltipPositionStyles[position]} flex items-center justify-center z-[200]`}
        >
          <p
            className={`px-2 py-1 text-black min-w-[100px] font-bold rounded-md ${tooltipColorStyles}`}
          >
            {message}
          </p>
          <Triangle position={position} isWhite={isWhite} />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
