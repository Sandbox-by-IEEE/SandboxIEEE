import React, { HTMLAttributes } from 'react';

const Triangle = ({
  position,
  isWhite = true,
  className,
  style,
}: {
  position: string;
  isWhite?: boolean;
  className?: string;
  style?: HTMLAttributes<HTMLDivElement>['style'];
}) => {
  if (position === 'right') {
    return (
      <div className='w-3 h-6 overflow-hidden inline-block'>
        <div
          className={
            (isWhite
              ? 'h-3 w-3 bg-white -rotate-45 transform origin-top-right'
              : 'h-3 w-3 bg-[#ffe1b9] -rotate-45 transform origin-top-right') +
            ' ' +
            className
          }
          style={style}
        ></div>
      </div>
    );
  }
  if (position === 'left') {
    return (
      <div className='w-3 h-6 overflow-hidden inline-block'>
        <div
          className={
            (isWhite
              ? 'h-3 w-3 bg-white rotate-45 transform origin-top-left'
              : 'h-3 w-3 bg-[#ffe1b9] rotate-45 transform origin-top-left') +
            ' ' +
            className
          }
        ></div>
      </div>
    );
  }
  if (position === 'bottom') {
    return (
      <div className='w-6 h-3 overflow-hidden inline-block'>
        <div
          className={
            (isWhite
              ? 'h-3 w-3 bg-white rotate-45 transform origin-bottom-left'
              : 'h-3 w-3 bg-[#ffe1b9] rotate-45 transform origin-bottom-left') +
            ' ' +
            className
          }
          style={style}
        ></div>
      </div>
    );
  }
  return (
    <div className='w-6 h-3 overflow-hidden inline-block'>
      <div
        className={
          (isWhite
            ? 'h-3 w-3 bg-white -rotate-45 transform origin-top-left'
            : 'h-3 w-3 bg-[#ffe1b9] -rotate-45 transform origin-top-left') +
          ' ' +
          className
        }
        style={style}
      ></div>
    </div>
  );
};

export default Triangle;
