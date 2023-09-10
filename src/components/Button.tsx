import RightArrow from './icons/RightArrow';

const Button = ({
  isTextWhite,
  bgColor,
  bgOpacity,
  isGlow,
  text = 'Button',
  isIcon,
  isDisabled,
}: {
  isTextWhite?: boolean;
  bgColor: 'green' | 'gold' | 'black' | 'disabled';
  bgOpacity: number;
  isGlow?: boolean;
  text?: string | undefined;
  isIcon?: boolean;
  isDisabled?: boolean;
}) => {
  //disabled
  if (isDisabled) {
    return (
      <button
        className={
          isIcon
            ? 'relative sm:w-[200px] sm:h-[48px] w-[110px] h-[35px]'
            : 'relative sm:w-[185px] sm:h-[48px] w-[105px] h-[35px]'
        }
      >
        <div className='absolute inset-0 bg-[#D7D2D0] flex justify-center items-center w-full h-full rounded-md cursor-not-allowed'>
          <div className='flex gap-2'>
            <p
              className={
                isTextWhite
                  ? 'text-white font-bold'
                  : 'text-[#0D432F] font-bold'
              }
            >
              {text}
            </p>
            {isIcon && <RightArrow arrowColor='#FFFFFF' />}
          </div>
        </div>
      </button>
    );
  }

  //green, 100%
  if (bgOpacity === 100 && bgColor === 'green' && isTextWhite) {
    return (
      <button
        className={
          isIcon
            ? 'relative sm:w-[200px] sm:h-[48px] w-[110px] h-[35px]'
            : 'relative sm:w-[185px] sm:h-[48px] w-[105px] h-[35px]'
        }
      >
        <div className='absolute inset-0 bg-[#0D432F] hover:bg-[#315B4C] flex justify-center items-center w-full h-full rounded-md shadow-[0px_0px_20px_5px_#315B4C] hover:shadow-md'>
          <div className='flex gap-2'>
            <p
              className={
                isTextWhite
                  ? 'text-white font-bold'
                  : 'text-[#0D432F] font-bold'
              }
            >
              {text}
            </p>
            {isIcon && <RightArrow arrowColor='#FFFFFF' />}
          </div>
        </div>
      </button>
    );
  }

  //gold, 100%
  if (bgOpacity === 100 && bgColor === 'gold' && isTextWhite) {
    return (
      <button
        className={
          isIcon
            ? 'relative sm:w-[200px] sm:h-[48px] w-[110px] h-[35px]'
            : 'relative sm:w-[185px] sm:h-[48px] w-[105px] h-[35px]'
        }
      >
        <div className='absolute inset-0 bg-[#AB814E] hover:bg-[#B49876] flex justify-center items-center w-full h-full rounded-md shadow-[0px_0px_20px_5px_#B49876] hover:shadow-md '>
          <div className='flex gap-2'>
            <p
              className={
                isTextWhite
                  ? 'text-white font-bold'
                  : 'text-[#0D432F] font-bold'
              }
            >
              {text}
            </p>
            {isIcon && <RightArrow arrowColor='#FFFFFF' />}
          </div>
        </div>
      </button>
    );
  }

  //black, 100%
  if (bgOpacity === 100 && bgColor === 'black' && isTextWhite) {
    return (
      <button
        className={
          isIcon
            ? 'relative sm:w-[200px] sm:h-[48px] w-[110px] h-[35px]'
            : 'relative sm:w-[185px] sm:h-[48px] w-[105px] h-[35px]'
        }
      >
        {isGlow && (
          <div className='absolute inset-0 bg-[#1C1A17] flex justify-center items-center w-full h-full rounded-md blur' />
        )}
        <div className='absolute inset-0 bg-[#1C1A17] flex justify-center items-center w-full h-full rounded-md shadow-md '>
          <div className='flex gap-2'>
            <p
              className={
                isTextWhite
                  ? 'text-white font-bold'
                  : 'text-[#0D432F] font-bold'
              }
            >
              {text}
            </p>
            {isIcon && <RightArrow arrowColor='#FFFFFF' />}
          </div>
        </div>
      </button>
    );
  }

  //green, white 0%
  if (bgOpacity === 0 && bgColor === 'green' && !isTextWhite) {
    return (
      <button
        className={
          isIcon
            ? 'relative sm:w-[200px] sm:h-[48px] w-[110px] h-[35px]'
            : 'relative sm:w-[185px] sm:h-[48px] w-[105px] h-[35px]'
        }
      >
        <div className='absolute inset-0 border-2 border-[#0D432F] bg-[#FFFFFF] flex justify-center items-center w-full h-full rounded-md hover:bg-[#FFFFFF] '>
          <div className='flex gap-2'>
            <p
              className={
                isTextWhite
                  ? 'text-white font-bold'
                  : 'text-[#0D432F] font-bold'
              }
            >
              {text}
            </p>
            {isIcon && <RightArrow arrowColor='#0D432F' />}
          </div>
        </div>
      </button>
    );
  }

  //gold, white 0%
  if (bgOpacity === 0 && bgColor === 'gold' && !isTextWhite) {
    return (
      <button
        className={
          isIcon
            ? 'relative sm:w-[200px] sm:h-[48px] w-[110px] h-[35px]'
            : 'relative sm:w-[185px] sm:h-[48px] w-[105px] h-[35px]'
        }
      >
        <div className='absolute inset-0 border-2 border-[#AB814E] bg-[ffffff00] flex justify-center items-center w-full h-full rounded-md '>
          <div className='flex gap-2'>
            <p
              className={
                isTextWhite
                  ? 'text-white font-bold'
                  : 'text-[#AB814E] font-bold'
              }
            >
              {text}
            </p>
            {isIcon && <RightArrow arrowColor='#AB814E' />}
          </div>
        </div>
      </button>
    );
  }
  //green, white 20%
  if (bgOpacity === 20 && bgColor === 'green' && !isTextWhite) {
    return (
      <button
        className={
          isIcon
            ? 'relative sm:w-[200px] sm:h-[48px] w-[110px] h-[35px]'
            : 'relative sm:w-[185px] sm:h-[48px] w-[105px] h-[35px]'
        }
      >
        <div className='absolute inset-0 border-2 bg-[#FFFFFF] opacity-20 flex justify-center items-center w-full h-full rounded-md '></div>
        <div className='absolute inset-0 border-2 border-[#0D432F] bg-[ffffff00] flex justify-center items-center w-full h-full rounded-md '>
          <div className='flex gap-2'>
            <p
              className={
                isTextWhite
                  ? 'text-white font-bold'
                  : 'text-[#0D432F] font-bold'
              }
            >
              {text}
            </p>
            {isIcon && <RightArrow arrowColor='#0D432F' />}
          </div>
        </div>
      </button>
    );
  }

  //gold, white 20%
  if (bgOpacity === 20 && bgColor === 'gold' && !isTextWhite) {
    return (
      <button
        className={
          isIcon
            ? 'relative sm:w-[200px] sm:h-[48px] w-[110px] h-[35px]'
            : 'relative sm:w-[185px] sm:h-[48px] w-[105px] h-[35px]'
        }
      >
        <div className='absolute inset-0 border-2 bg-[#FFFFFF] opacity-20 flex justify-center items-center w-full h-full rounded-md '></div>
        <div className='absolute inset-0 border-2 border-[#AB814E] bg-[ffffff00] flex justify-center items-center w-full h-full rounded-md '>
          <div className='flex gap-2'>
            <p
              className={
                isTextWhite
                  ? 'text-white font-bold'
                  : 'text-[#AB814E] font-bold'
              }
            >
              {text}
            </p>
            {isIcon && <RightArrow arrowColor='#AB814E' />}
          </div>
        </div>
      </button>
    );
  }

  //green, white 100%
  if (bgOpacity === 100 && bgColor === 'green' && !isTextWhite) {
    return (
      <button
        className={
          isIcon
            ? 'relative sm:w-[200px] sm:h-[48px] w-[110px] h-[35px]'
            : 'relative sm:w-[185px] sm:h-[48px] w-[105px] h-[35px]'
        }
      >
        <div className='absolute inset-0 border-2 border-[#0D432F] bg-[#FFFFFF] flex justify-center items-center w-full h-full rounded-md '>
          <div className='flex gap-2'>
            <p
              className={
                isTextWhite
                  ? 'text-white font-bold'
                  : 'text-[#0D432F] font-bold'
              }
            >
              {text}
            </p>
            {isIcon && <RightArrow arrowColor='#0D432F' />}
          </div>
        </div>
      </button>
    );
  }

  //gold, white 100%
  if (bgOpacity === 100 && bgColor === 'gold') {
    return (
      <button
        className={
          isIcon
            ? 'relative sm:w-[200px] sm:h-[48px] w-[110px] h-[35px]'
            : 'relative sm:w-[185px] sm:h-[48px] w-[105px] h-[35px]'
        }
      >
        <div className='absolute inset-0 border-2 border-[#AB814E] bg-[ffffff00] flex justify-center items-center w-full h-full rounded-md '>
          <div className='flex gap-2'>
            <p
              className={
                isTextWhite
                  ? 'text-white font-bold'
                  : 'text-[#AB814E] font-bold'
              }
            >
              {text}
            </p>
            {isIcon && <RightArrow arrowColor='#AB814E' />}
          </div>
        </div>
      </button>
    );
  }

  //test button
  return (
    <button className='relative w-[185px] h-[48px] sm:w-[110px] sm:h-[35px]'>
      <div className='absolute inset-0 bg-[#4c7fcd] flex justify-center items-center w-full h-full rounded-md blur' />
      <div className='absolute inset-0 bg-[#4c7fcd] flex justify-center items-center w-full h-full rounded-md '>
        <div className='flex gap-2'>
          <p
            className={
              isTextWhite ? 'text-white font-bold' : 'text-green-500 font-bold'
            }
          >
            Choose the correct styling
          </p>
          {isIcon && <RightArrow arrowColor='#D7D2D0' />}
        </div>
      </div>
    </button>
  );
};

export default Button;
