import React from 'react';

const FileInputIconError = ({ className }: { className?: string }) => {
  return (
    <svg
      width='206'
      height='156'
      viewBox='0 0 206 156'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M195.308 3H10.6923C6.44396 3 3 5.91988 3 9.52174V113.87C3 117.471 6.44396 120.391 10.6923 120.391H195.308C199.556 120.391 203 117.471 203 113.87V9.52174C203 5.91988 199.556 3 195.308 3Z'
        stroke='#FF7387'
        strokeWidth='5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M87.6154 120.391L72.2308 153M118.385 120.391L133.769 153M56.8461 153H149.154M133.769 87.7826L72.2308 35.6087M133.769 35.6087L72.2308 87.7826'
        stroke='#FF7387'
        strokeWidth='5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default FileInputIconError;
