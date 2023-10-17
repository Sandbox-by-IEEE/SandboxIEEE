const CircularStarTopLeft = ({ size }: { size: number }) => {
  return (
    <svg
      width='17'
      height='18'
      viewBox='0 0 17 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      style={{ scale: size / 25 }}
    >
      <path
        d='M29 13.9933L25.7836 17.7124L26.2318 22.6354L21.4732 23.7324L18.9818 27.9866L14.5 26.0334L10.0182 28L7.52682 23.7458L2.76818 22.6488L3.21636 17.7124L0 13.9933L3.21636 10.2609L2.76818 5.33779L7.52682 4.25418L10.0182 0L14.5 1.95318L18.9818 0L21.4732 4.25418L26.2318 5.35117L25.7836 10.2742L29 13.9933ZM25.4805 13.9933L23.0682 11.1706L23.3845 7.43813L19.7727 6.63545L17.9009 3.38462L14.5 4.86956L11.0991 3.38462L9.22727 6.63545L5.61545 7.42475L5.93182 11.1572L3.51955 13.9933L5.93182 16.8027L5.61545 20.5485L9.22727 21.3512L11.0991 24.602L14.5 23.1037L17.9009 24.5886L19.7727 21.3512L23.3845 20.5351L23.0682 16.8027L25.4805 13.9933Z'
        fill='url(#paint0_linear_191_3249)'
      />
      <defs>
        <linearGradient
          id='paint0_linear_191_3249'
          x1='17.0932'
          y1='30.6066'
          x2='31.2886'
          y2='8.51465'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#AB814E' />
          <stop offset='1' stopColor='#FFE1B9' />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default CircularStarTopLeft;
