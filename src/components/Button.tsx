
import RightArrow from './icons/RightArrow';

const Button = ({
  color,
  children,
  isIcon,
  isDisabled,
  isFullWidth,
  href,
}: {
  color: 'green' | 'gold' | 'black' | 'trans-green' | 'trans-orange';
  children: JSX.Element | string;
  isIcon?: boolean;
  isDisabled?: boolean;
  isFullWidth?: boolean;
  href?: string;
}) => {
  const colorEffect = {
    green: {
      main: 'bg-[#0D432F] hover:shadow-[0px_0px_20px_5px_#315B4C] text-white',
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
    'trans-green': {
      main: 'border border-[3px] border-[#0D432F] bg-transparent text-[#0D432F] hover:bg-[#494845]',
      arrow: '#0D432F',
    },
    'trans-orange': {
      main: 'border border-[3px] border-[#AB814E] bg-transparent text-[#AB814E] hover:bg-[#494845]',
      arrow: '#AB814E',
    },
  };

  // const router = useRouter();

  // const handleClick = (e) => {
  //   e.preventDefault()
  //   router.push(Url(href))
  // }

  //green, 100%
  return (
    <button
      disabled={isDisabled}
      className={`${
        isFullWidth ? 'w-full' : 'w-[130px] lg:w-[200px]'
      } text-sm lg:text-base disabled:bg-[#D7D2D0] disabled:cursor-not-allowed disabled:text-white h-fit disabled:shadow-sm transition-all duration-300 flex justify-center items-center py-2 px-3 lg:py-3 lg:px-4 rounded-md ${
        colorEffect[color].main
      }`}
    >
      <p className='flex gap-3 w-full items-center justify-center font-poppins font-bold'>
        {children}
        {isIcon && <RightArrow arrowColor={`${colorEffect[color].arrow}`} />}
      </p>
    </button>
  );
  //test button
};

export default Button;
