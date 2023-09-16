import Image from 'next/image';

import EyeIcon from './icons/EyeIcon';

const Cards = ({
  title,
  imageUrl,
  children,
  leftTag,
  rightTag,
  horizontal,
  buttonText,
  onClick,
}: {
  title: string;
  imageUrl: string;
  children?: string;
  leftTag?: string;
  rightTag?: string;
  horizontal?: boolean;
  buttonText?: string;
  onClick?: () => void;
}) => {
  return (
    <article
      className={`flex ${
        horizontal
          ? 'w-[412px] lg:w-[620px] items-stretch'
          : 'w-[229px] lg:w-[297px] flex-col'
      } h-fit rounded-md bg-dark-green`}
    >
      {/* Setting for div imageUrl and the text imageUrl */}
      {imageUrl && (
        <div
          className={`relative  ${
            horizontal ? 'rounded-l-md' : 'rounded-t-md'
          } bg-neutral-300 shadow-none ${
            !horizontal
              ? children
                ? buttonText
                  ? 'h-[194px] w-full lg:h-[251px]'
                  : 'h-[244px] w-full lg:h-[316.85px]'
                : 'h-[279px] w-full lg:h-[361.68px]'
              : 'w-[150px] lg:w-[260px] 2xl:w-[300px]'
          }`}
        >
          <Image
            src='/google-logo.png'
            className='w-full h-full object-contain'
            width={417}
            height={255}
            alt={title}
          ></Image>
          {/* Tag Label  */}
          {(leftTag || rightTag) && (
            <div className='absolute px-4 bottom-2 z-20 flex items-center justify-between w-full font-poppins text-xs text-white '>
              <p style={{ textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
                {leftTag}
              </p>
              <div className='flex items-center gap-1 break-all'>
                <EyeIcon
                  className={
                    'w-5 h-5 lg:w-6 lg:h-6 drop-shadow-[0px_4px_15px_#000000]'
                  }
                  size={15}
                />
                <p style={{ textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
                  {rightTag}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Text Content */}
      <div
        className={`flex flex-col ${
          children
            ? 'gap-4 lg:gap-[22px] lg:pt-[30px]'
            : 'py-[23px] lg:pt-[35px] lg:pb-[30px]'
        } p-5 lg:p-[19px]  ${horizontal && 'flex-1 lg:mx-3'}`}
      >
        {/* Title */}
        <h4
          className='font-poppins font-bold text-2xl bg-gradient-brown bg-clip-text text-transparent leading-6 tracking-wide lg:text-4xl '
          style={{
            textShadow: `
            0px 0px 0.9732px #705229,
            0px 0px 1.9464px #705229,
            0px 0px 40.8744px #705229
            0px 0px 23.3568px #705229,
            0px 0px 13.6248px #705229,
            0px 0px 6.8124px #705229,
            `,
          }}
        >
          {title}
        </h4>
        {/* Children */}
        <p
          className={`flex items-center break-all text-justify text-cream-secondary-light font-poppins text-xs tracking-wide  ${
            !buttonText && children && 'mb-2'
          }`}
        >
          {children}
        </p>
        {/* Button */}
        {buttonText && (
          <button
            className='flex py-2 px-3 font-poppins font-bold text-white text-center w-full text-sm justify-center bg-green-primary rounded-md'
            onClick={onClick}
          >
            {buttonText}
          </button>
        )}
      </div>
    </article>
  );
};

export default Cards;
