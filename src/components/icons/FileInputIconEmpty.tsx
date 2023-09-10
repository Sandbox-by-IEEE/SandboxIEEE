import React from 'react';

const FileInputIconEmpty = ({ scale = 1 }: { scale?: number }) => {
  return (
    <svg
      width='730'
      height='188'
      viewBox='0 0 730 165'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      style={{ scale }}
    >
      <path
        d='M457.308 19H272.692C268.444 19 265 21.9199 265 25.5217V129.87C265 133.471 268.444 136.391 272.692 136.391H457.308C461.556 136.391 465 133.471 465 129.87V25.5217C465 21.9199 461.556 19 457.308 19Z'
        stroke='#DBB88B'
        strokeOpacity='0.6'
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M349.615 136.391L334.231 169M380.385 136.391L395.769 169M318.846 169H411.154M403.462 77.6957H326.538M365 45.087V110.304'
        stroke='#DBB88B'
        strokeOpacity='0.6'
        strokeWidth='4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default FileInputIconEmpty;
