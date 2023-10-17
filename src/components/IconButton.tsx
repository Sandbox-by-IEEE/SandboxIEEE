import Bell from './icons/Bell';

const IconButton = ({
  color,
  isDisabled,
}: {
  color: 'green' | 'gold' | 'black' | 'trans-green' | 'trans-orange';
  isDisabled?: boolean;
  isFullWidth?: boolean;
}) => {
  const colorEffect = {
    green:
      'bg-[#0D432F] hover:bg-[#315B4C] hover:shadow-[0px_0px_20px_5px_#315B4C]',
    black:
      'bg-[#1C1A17] text-[#0D432F] hover:shadow-[0px_0px_3px_3px_#FFFFFF] hover:bg-[#494845]',
    gold: 'bg-[#AB814E] hover:bg-[#B49876] hover:shadow-[0px_0px_20px_5px_#B49876]',
    'trans-green':
      'border border-[#0D432F] bg-transparent text-[#0D432F] hover:bg-[#494845]',
    'trans-orange':
      'border border-[#AB814E] bg-transparent text-[#AB814E] hover:bg-[#494845]',
  };

  //green, 100%
  return (
    <button
      disabled={isDisabled}
      className={`disabled:bg-[#D7D2D0] disabled:cursor-not-allowed disabled:text-white font-poppins w-fit h-fit transition-all duration-300 flex justify-center items-center py-2 px-2 lg:py-3 lg:px-3 hover:shadow-md rounded-full ${colorEffect[color]}`}
    >
      <p className='flex gap-3 w-fit h-fit items-center justify-center'>
        {<Bell />}
      </p>
    </button>
  );
  //test button
};

export default IconButton;
