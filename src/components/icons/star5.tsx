const Star5 = ({ size }: { size: number }) => {
  return (
    <svg
      width='19'
      height='19'
      viewBox='0 0 19 19'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      style={{ scale: size / 25 }}
      className='mt-[320px]'
    >
      <rect
        x='10.4092'
        y='-0.648666'
        width='15'
        height='15'
        rx='7.5'
        transform='rotate(51.6915 10.4092 -0.648666)'
        stroke='url(#paint0_linear_1600_273)'
        strokeWidth='3'
      />
      <defs>
        <linearGradient
          id='paint0_linear_1600_273'
          x1='19.2505'
          y1='15.7477'
          x2='26.9629'
          y2='4.15897'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#AB814E' />
          <stop offset='1' stopColor='#FFE1B9' />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Star5;
