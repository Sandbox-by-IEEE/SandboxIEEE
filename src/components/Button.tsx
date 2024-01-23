import RightArrow from './icons/RightArrow';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color:
    | 'green'
    | 'gold'
    | 'black'
    | 'trans-green'
    | 'trans-orange'
    | 'white'
    | 'light-gold';
  isIcon?: boolean;
  isDisabled?: boolean;
  isFullWidth?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  color,
  children,
  onClick,
  isIcon,
  isDisabled,
  isFullWidth,
  className,
  ...props
}) => {
  const colorEffect = {
    green: {
      main: 'bg-[#0D432F] hover:shadow-[0px_0px_20px_5px_#B49876] text-white disabled:text-[#f2efe1] disabled:bg-[#315B4C] border-[#0D432F] border-[3px] disabled:hover:shadow-[0px_0px_20px_5px_#315B4C] ',
      arrow: '#FFFFFF',
    },
    black: {
      main: 'bg-[#1C1A17] text-[#0D432F] text-white hover:shadow-[0px_0px_3px_3px_#FFFFFF] hover:bg-[#494845] disabled:bg-[#D7D2D0]',
      arrow: '#FFFFFF',
    },
    gold: {
      main: 'bg-[#AB814E] rounded-md hover:shadow-[0px_0px_20px_5px_#B49876] text-white disabled:bg-[#D7D2D0] border-[#AB814E] border-[3px]',
      arrow: '#FFFFFF',
    },
    white: {
      main: 'bg-white hover:shadow-[0px_0px_20px_5px_#315B4C] text-white disabled:bg-[#D7D2D0]',
      arrow: '#FFFFFF',
    },
    'trans-green': {
      main: 'border border-[3px] border-[#0D432F] bg-transparent text-[#0D432F] hover:bg-[#494845] disabled:bg-[#D7D2D0]',
      arrow: '#0D432F',
    },
    'trans-orange': {
      main: 'border border-[3px] border-[#AB814E] bg-transparent text-[#AB814E] hover:bg-[#494845] disabled:bg-[#D7D2D0]',
      arrow: '#AB814E',
    },
    'light-gold': {
      main: 'text-dark-green uppercase font-inter text-[15px] text-black tracking-wide lg:text-base shadow-gray-800 shadow-m bg-[#FFE1B9]',
      arrow: '#FFFFFF',
    },
  };

  //green, 100%
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      aria-label={(children && children.toString()) || 'button'}
      className={`${
        isFullWidth ? 'w-full h-full' : 'w-[130px] lg:w-[180px]'
      } text-sm lg:text-base disabled:cursor-not-allowed disabled:text-white h-fit disabled:shadow-sm transition-all duration-300 flex justify-center items-center py-3 px-4 rounded-md ${
        colorEffect[color].main
      } ${className}`}
      {...props}
    >
      <p className='flex gap-3 w-full text-center items-center justify-center font-poppins font-bold'>
        {children}
        {isIcon && <RightArrow arrowColor={`${colorEffect[color].arrow}`} />}
      </p>
    </button>
  );
  //test button
};

export default Button;
