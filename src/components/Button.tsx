import RightArrow from './icons/RightArrow';

const Button = ({
  color,
  children,
  isIcon,
  isDisabled,
  isFullWidth,
}: {
  color: 'green' | 'gold' | 'black' | 'trans-green' | 'trans-orange';
  children: JSX.Element | string;
  isIcon?: boolean;
  isDisabled?: boolean;
  isFullWidth?: boolean;
}) => {
  const colorEffect = {
    green:
      'bg-[#0D432F] hover:bg-[#315B4C] text-[#0D432F] hover:shadow-[0px_0px_20px_5px_#315B4C] text-white',
    black:
      'bg-[#1C1A17] text-[#0D432F] text-white hover:shadow-[0px_0px_3px_3px_#FFFFFF]',
    gold: 'bg-[#AB814E] hover:bg-[#B49876] rounded-md hover:shadow-[0px_0px_20px_5px_#B49876]  text-white',
    'trans-green':
      'border border-[#0D432F] bg-transparent text-[#0D432F] hover:bg-[#494845]',
    'trans-orange':
      'border border-[#AB814E] bg-transparent text-[#AB814E] hover:bg-[#494845]',
  };

  //green, 100%
  return (
    <button
      disabled={isDisabled}
      className={`${
        isFullWidth ? 'w-full' : 'w-[130px] lg:w-[200px]'
      } text-sm lg:text-base font-bold disabled:bg-[#D7D2D0] disabled:cursor-not-allowed disabled:text-white font-poppins h-fit transition-all duration-300 flex justify-center items-center py-2 px-3 lg:py-3 lg:px-4 hover:shadow-md rounded-md ${
        colorEffect[color]
      }`}
    >
      <p className='flex gap-3 w-full items-center justify-center'>
        {children}
        {isIcon && <RightArrow arrowColor='#FFFFFF' />}
      </p>
    </button>
  );
  //test button
};

export default Button;
