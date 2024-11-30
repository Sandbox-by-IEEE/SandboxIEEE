import React from 'react';

const X: React.FC = () => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      color='white'
    >
      <line x1='1' y1='1' x2='23' y2='23' stroke='white' strokeWidth='2' />
      <line x1='1' y1='23' x2='23' y2='1' stroke='white' strokeWidth='2' />
    </svg>
  );
};

export default X;
