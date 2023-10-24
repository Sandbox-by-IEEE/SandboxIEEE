const Elips2 = ({ size }: { size: number }) => {
  return (
    <svg
      width='101'
      height='147'
      viewBox='0 0 101 147'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      style={{ scale: size / 25 }}
    >
      <circle
        cx='0.5'
        cy='53.5'
        r='45.5'
        stroke='url(#paint0_linear_1681_2184)'
        strokeWidth='16'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M81 112.981C73.2577 112.981 66.9813 119.258 66.9813 127C66.9813 134.742 73.2577 141.019 81 141.019C88.7423 141.019 95.0187 134.742 95.0187 127C95.0187 119.258 88.7423 112.981 81 112.981ZM61 127C61 115.954 69.9543 107 81 107C92.0457 107 101 115.954 101 127C101 138.046 92.0457 147 81 147C69.9543 147 61 138.046 61 127Z'
        fill='url(#paint1_linear_1681_2184)'
      />
      <defs>
        <linearGradient
          id='paint0_linear_1681_2184'
          x1='8.63739'
          y1='107.471'
          x2='55.426'
          y2='37.1663'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#AB814E' />
          <stop offset='1' stopColor='#FFE1B9' />
        </linearGradient>
        <linearGradient
          id='paint1_linear_1681_2184'
          x1='84.5769'
          y1='150.724'
          x2='105.143'
          y2='119.82'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#AB814E' />
          <stop offset='1' stopColor='#FFE1B9' />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Elips2;
