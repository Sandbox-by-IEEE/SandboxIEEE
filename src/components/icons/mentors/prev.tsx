const Prev = ({ size, className }: { size: number; className?: string }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 132 132'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <g filter='url(#filter0_dddddd_1594_2427)'>
        <path
          d='M66 91C79.8058 91 91 79.8058 91 66C91 52.1942 79.8058 41 66 41C52.1942 41 41 52.1942 41 66C41 79.8058 52.1942 91 66 91ZM57.3672 65.6373L71.0949 55.7042C71.3906 55.4922 71.8036 55.7042 71.8036 56.067V58.6842C71.8036 59.2533 71.5301 59.7946 71.067 60.1295L62.9531 66L71.067 71.8705C71.5301 72.2054 71.8036 72.7411 71.8036 73.3158V75.933C71.8036 76.2958 71.3906 76.5078 71.0949 76.2958L57.3672 66.3627C57.1217 66.1842 57.1217 65.8158 57.3672 65.6373Z'
          fill='#FFE1B9'
        />
      </g>
      <defs>
        <filter
          id='filter0_dddddd_1594_2427'
          x='0.125599'
          y='0.125599'
          width='131.749'
          height='131.749'
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
          <feOffset />
          <feGaussianBlur stdDeviation='0.4866' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0.439216 0 0 0 0 0.321569 0 0 0 0 0.160784 0 0 0 1 0'
          />
          <feBlend
            mode='normal'
            in2='BackgroundImageFix'
            result='effect1_dropShadow_1594_2427'
          />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset />
          <feGaussianBlur stdDeviation='0.9732' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0.439216 0 0 0 0 0.321569 0 0 0 0 0.160784 0 0 0 1 0'
          />
          <feBlend
            mode='normal'
            in2='effect1_dropShadow_1594_2427'
            result='effect2_dropShadow_1594_2427'
          />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset />
          <feGaussianBlur stdDeviation='3.4062' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0.439216 0 0 0 0 0.321569 0 0 0 0 0.160784 0 0 0 1 0'
          />
          <feBlend
            mode='normal'
            in2='effect2_dropShadow_1594_2427'
            result='effect3_dropShadow_1594_2427'
          />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset />
          <feGaussianBlur stdDeviation='6.8124' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0.439216 0 0 0 0 0.321569 0 0 0 0 0.160784 0 0 0 1 0'
          />
          <feBlend
            mode='normal'
            in2='effect3_dropShadow_1594_2427'
            result='effect4_dropShadow_1594_2427'
          />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset />
          <feGaussianBlur stdDeviation='11.6784' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0.439216 0 0 0 0 0.321569 0 0 0 0 0.160784 0 0 0 1 0'
          />
          <feBlend
            mode='normal'
            in2='effect4_dropShadow_1594_2427'
            result='effect5_dropShadow_1594_2427'
          />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset />
          <feGaussianBlur stdDeviation='20.4372' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0.439216 0 0 0 0 0.321569 0 0 0 0 0.160784 0 0 0 1 0'
          />
          <feBlend
            mode='normal'
            in2='effect5_dropShadow_1594_2427'
            result='effect6_dropShadow_1594_2427'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect6_dropShadow_1594_2427'
            result='shape'
          />
        </filter>
      </defs>
    </svg>
  );
};

export default Prev;
