import RightArrow from './icons/RightArrow';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color: 'green' | 'gold' | 'black' | 'trans-green' | 'trans-orange' | 'white';
  isIcon?: boolean;
  isDisabled?: boolean;
  isFullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  color,
  children,
  onClick,
  isIcon,
  isDisabled,
  isFullWidth,
  ...props
}) => {
  const colorEffect = {
    green: {
      main: 'bg-[#0D432F] hover:shadow-[0px_0px_20px_5px_#315B4C] text-white disabled:bg-[#0D432F] disabled:bg-opacity-40',
      arrow: '#FFFFFF',
    },
    black: {
      main: 'bg-[#1C1A17] text-[#0D432F] text-white hover:shadow-[0px_0px_3px_3px_#FFFFFF] hover:bg-[#494845] disabled:bg-[#D7D2D0]',
      arrow: '#FFFFFF',
    },
    gold: {
      main: 'bg-[#AB814E] rounded-md hover:shadow-[0px_0px_20px_5px_#B49876] text-white disabled:bg-[#D7D2D0]',
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
  };

  //green, 100%
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`${
        isFullWidth ? 'w-full h-full' : 'w-[130px] lg:w-[200px]'
      } text-sm lg:text-base disabled:cursor-not-allowed disabled:text-white h-fit disabled:shadow-sm transition-all duration-300 flex justify-center items-center py-2 px-3 lg:py-3 lg:px-4 rounded-md ${
        colorEffect[color].main
      }`}
      {...props}
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
