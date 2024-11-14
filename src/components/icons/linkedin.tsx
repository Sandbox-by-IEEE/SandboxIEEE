const Linkedin = ({
  size,
  className,
}: {
  size: number;
  className?: string;
}) => {
  return (
    <svg
      width='25'
      height='25'
      viewBox='0 0 25 25'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      style={{ scale: size / 25 }}
      className={className}
    >
      <path
        d='M5.7858 8.18573H0.96776C0.753928 8.18573 0.580664 8.3605 0.580664 8.57602V24.1816C0.580664 24.3972 0.753928 24.5719 0.96776 24.5719H5.7858C5.99963 24.5719 6.1729 24.3972 6.1729 24.1816V8.57602C6.1729 8.3605 5.99963 8.18573 5.7858 8.18573Z'
        fill='url(#paint0_linear_216_476)'
      />
      <path
        d='M3.37852 0.427979C1.62544 0.427979 0.199219 1.86437 0.199219 3.62992C0.199219 5.39626 1.62544 6.8332 3.37852 6.8332C5.13021 6.8332 6.55527 5.39618 6.55527 3.62992C6.55535 1.86437 5.13021 0.427979 3.37852 0.427979Z'
        fill='url(#paint1_linear_216_476)'
      />
      <path
        d='M18.0408 7.79788C16.1057 7.79788 14.6752 8.6366 13.8076 9.58959V8.57603C13.8076 8.36051 13.6343 8.18575 13.4205 8.18575H8.80639C8.59256 8.18575 8.4193 8.36051 8.4193 8.57603V24.1817C8.4193 24.3972 8.59256 24.5719 8.80639 24.5719H13.6139C13.8277 24.5719 14.001 24.3972 14.001 24.1817V16.4605C14.001 13.8586 14.702 12.845 16.5009 12.845C18.46 12.845 18.6157 14.47 18.6157 16.5944V24.1817C18.6157 24.3973 18.789 24.572 19.0028 24.572H23.8121C24.026 24.572 24.1992 24.3973 24.1992 24.1817V15.6218C24.1992 11.7529 23.4675 7.79788 18.0408 7.79788Z'
        fill='url(#paint2_linear_216_476)'
      />
      <defs>
        <linearGradient
          id='paint0_linear_216_476'
          x1='14.3453'
          y1='26.8197'
          x2='26.7878'
          y2='8.23504'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#AB814E' />
          <stop offset='1' stopColor='#FFFBB9' />
        </linearGradient>
        <linearGradient
          id='paint1_linear_216_476'
          x1='14.3453'
          y1='26.8197'
          x2='26.7878'
          y2='8.23504'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#AB814E' />
          <stop offset='1' stopColor='#FFFBB9' />
        </linearGradient>
        <linearGradient
          id='paint2_linear_216_476'
          x1='14.3453'
          y1='26.8197'
          x2='26.7878'
          y2='8.23504'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#AB814E' />
          <stop offset='1' stopColor='#FFFBB9' />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Linkedin;
