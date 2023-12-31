import Link from 'next/link';

import RightArrow from './icons/RightArrow';
const CustomLink = ({
  color,
  children,
  isIcon,
  url,
  isFullWidth,
  ...props
}: {
  color: 'green' | 'gold' | 'black' | 'trans-green' | 'trans-orange' | 'white';
  children: JSX.Element | string;
  isIcon?: boolean;
  url?: string;
  isFullWidth?: boolean;
}) => {
  const colorEffect = {
    green: {
      main: 'bg-[#0D432F] hover:shadow-[0px_0px_20px_5px_#D6B285] text-white',
      arrow: '#FFFFFF',
    },
    black: {
      main: 'bg-[#1C1A17] text-[#0D432F] text-white hover:shadow-[0px_0px_3px_3px_#FFFFFF] hover:bg-[#494845]',
      arrow: '#FFFFFF',
    },
    gold: {
      main: 'bg-[#AB814E] rounded-md hover:shadow-[0px_0px_20px_5px_#B49876] text-white',
      arrow: '#FFFFFF',
    },
    white: {
      main: 'bg-white hover:shadow-[0px_0px_20px_5px_#315B4C] text-white',
      arrow: '#FFFFFF',
    },
    'trans-green': {
      main: 'border border-[3px] border-[#0D432F] bg-transparent text-[#0D432F] hover:bg-[#494845]',
      arrow: '#0D432F',
    },
    'trans-orange': {
      main: 'border border-[3px] border-[#AB814E] bg-transparent text-[#AB814E] hover:bg-[#494845]',
      arrow: '#AB814E',
    },
  };

  //green, 100%
  return (
    url && (
      <Link
        href={url}
        className={`${
          isFullWidth ? 'w-full h-full' : 'min-w-[140px] lg:w-[200px]'
        } text-sm lg:text-base disabled:bg-[#D7D2D0] disabled:cursor-not-allowed disabled:text-white h-fit disabled:shadow-sm transition-all duration-300 flex justify-center items-center py-3 px-4 rounded-md ${
          colorEffect[color].main
        }`}
        {...props}
      >
        <p className='flex gap-3 w-full items-center  text-center justify-center font-poppins font-bold'>
          {children}
          {isIcon && <RightArrow arrowColor={`${colorEffect[color].arrow}`} />}
        </p>
      </Link>
    )
  );
  //test CustomLink
};

export default CustomLink;
