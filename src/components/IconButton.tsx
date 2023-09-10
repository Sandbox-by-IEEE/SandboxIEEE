import Bell from './icons/Bell';
const IconButton = ({
  bgColor,
}: {
  bgColor: 'green' | 'gold' | 'black' | 'disabled';
}) => {
  if (bgColor == 'green') {
    return (
      <button className='relative w-[48.212px] h-[48.212px]'>
        <div className='absolute inset-0 flex justify-center items-center rounded-full bg-[#0D432F] hover:bg-[#315B4C] w-full h-full shadow-md'>
          {<Bell />}
        </div>
      </button>
    );
  }

  if (bgColor == 'gold') {
    return (
      <button className='relative w-[48.212px] h-[48.212px]'>
        <div className='absolute inset-0 flex justify-center items-center rounded-full bg-[#AB814E] hover:bg-[#B49876] w-full h-full'>
          {<Bell />}
        </div>
      </button>
    );
  }

  if (bgColor == 'black') {
    return (
      <button className='relative w-[48.212px] h-[48.212px]'>
        <div className='absolute inset-0 flex justify-center items-center rounded-full bg-[#1C1A17] hover:bg-[#1C1A17] w-full h-full shadow-md'>
          {<Bell />}
        </div>
      </button>
    );
  }

  if (bgColor == 'disabled') {
    return (
      <button className='relative w-[48.212px] h-[48.212px]'>
        <div className='absolute inset-0 flex justify-center items-center rounded-full bg-[#D7D2D0] w-full h-full cursor-not-allowed'>
          {<Bell />}
        </div>
      </button>
    );
  }
};

export default IconButton;
