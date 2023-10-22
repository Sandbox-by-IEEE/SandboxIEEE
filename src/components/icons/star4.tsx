const Star4 = ({ size }: { size: number }) => {
  return (
    <svg
      width='143'
      height='858'
      viewBox='0 0 143 858'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      style={{ scale: size / 25 }}
      className='mt-[320px]'
    >
      <g filter='url(#filter0_d_777_4145)'>
        <path
          d='M5.58141 848.263C5.58141 848.263 366.964 608.015 208.574 1'
          stroke='url(#paint0_linear_777_4145)'
          strokeWidth='3'
          shapeRendering='crispEdges'
        />
      </g>
      <defs>
        <filter
          id='filter0_d_777_4145'
          x='0.75293'
          y='0.621277'
          width='253.469'
          height='856.888'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy='4' />
          <feGaussianBlur stdDeviation='2' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
          />
          <feBlend
            mode='normal'
            in2='BackgroundImageFix'
            result='effect1_dropShadow_777_4145'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect1_dropShadow_777_4145'
            result='shape'
          />
        </filter>
        <linearGradient
          id='paint0_linear_777_4145'
          x1='395.869'
          y1='135.289'
          x2='-155.989'
          y2='365.089'
          gradientUnits='userSpaceOnUse'
        >
          <stop offset='0.399307' stopColor='#AB814E' stopOpacity='0' />
          <stop offset='1' stopColor='#FFE1B9' />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Star4;
