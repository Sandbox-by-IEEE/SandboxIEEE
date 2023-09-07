const CircularStarTopRight = ({ size }: { size: number }) => {
  return (
    <svg
      width='42'
      height='35'
      viewBox='0 0 42 35'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      style={{ scale: size / 25 }}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M34.5 5.54774C18.5101 5.54774 5.54774 18.5101 5.54774 34.5C5.54774 50.4899 18.5101 63.4523 34.5 63.4523C50.4899 63.4523 63.4523 50.4899 63.4523 34.5C63.4523 18.5101 50.4899 5.54774 34.5 5.54774ZM0 34.5C0 15.4462 15.4462 0 34.5 0C53.5538 0 69 15.4462 69 34.5C69 53.5538 53.5538 69 34.5 69C15.4462 69 0 53.5538 0 34.5Z'
        fill='url(#paint0_linear_185_3194)'
      />
      <defs>
        <linearGradient
          id='paint0_linear_185_3194'
          x1='40.6701'
          y1='75.4234'
          x2='76.1472'
          y2='22.1151'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#AB814E' />
          <stop offset='1' stopColor='#FFE1B9' />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default CircularStarTopRight;
