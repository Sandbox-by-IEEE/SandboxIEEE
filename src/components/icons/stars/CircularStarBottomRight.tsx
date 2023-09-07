const CircularStarBottomRight = ({ size }: { size: number }) => {
  return (
    <svg
      width='37'
      height='42'
      viewBox='0 0 37 42'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      style={{ scale: size / 25 }}
    >
      <path
        d='M37 6.48304L28.7927 15.9135L29.9364 28.397L17.7936 31.1787L11.4364 41.9661L0 37.0134L-11.4364 42L-17.7936 31.2126L-29.9364 28.431L-28.7927 15.9135L-37 6.48304L-28.7927 -2.98137L-29.9364 -15.4649L-17.7936 -18.2126L-11.4364 -29L0 -24.0473L11.4364 -29L17.7936 -18.2126L29.9364 -15.431L28.7927 -2.94744L37 6.48304ZM28.0191 6.48304L21.8636 -0.674631L22.6709 -10.139L13.4546 -12.1744L8.67818 -20.4176L0 -16.6522L-8.67818 -20.4176L-13.4545 -12.1744L-22.6709 -10.173L-21.8636 -0.708551L-28.0191 6.48304L-21.8636 13.6068L-22.6709 23.1051L-13.4545 25.1405L-8.67818 33.3837L0 29.5843L8.67818 33.3497L13.4546 25.1405L22.6709 23.0712L21.8636 13.6068L28.0191 6.48304Z'
        fill='url(#paint0_linear_185_3196)'
      />
      <defs>
        <linearGradient
          id='paint0_linear_185_3196'
          x1='6.61722'
          y1='48.6096'
          x2='42.5181'
          y2='-7.61481'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#AB814E' />
          <stop offset='1' stopColor='#FFE1B9' />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default CircularStarBottomRight;
