import Image from 'next/image';

import Instagram from '@/components/icons/instagram';

const MentorCard = ({
  name,
  position,
  instagram,
  imageUrl,
  company,
  children,
  horizontal,
}: {
  name: string;
  position: string;
  instagram: string;
  imageUrl: string;
  company: string;
  children?: string;
  horizontal?: boolean;
}) => {
  return (
    <article
      className={`flex ${
        horizontal
          ? 'w-[412px] lg:w-[620px] items-stretch '
          : 'w-[229px] lg:w-[297px] flex-col'
      } h-fit rounded-3xl bg-dark-green`}
    >
      {/* Setting for div imageUrl and the text imageUrl */}
      {imageUrl && (
        <div
          className={`relative  ${
            horizontal ? 'rounded-l-3xl' : 'rounded-t-3xl'
          } bg-neutral-300 shadow-none ${
            !horizontal
              ? children
                ? 'h-[194px] w-full lg:h-[251px]'
                : 'h-[244px] w-full lg:h-[316.85px]'
              : 'h-[279px] w-full lg:h-[361.68px]'
          }`}
        >
          <Image
            src={imageUrl}
            className='w-full h-full object-cover rounded-t-3xl'
            width={417}
            height={255}
            alt={name}
          ></Image>
        </div>
      )}

      {/* Text Content */}
      <div
        className={`flex flex-col ${
          children
            ? 'gap-4 lg:gap-[22px] lg:pt-[15px]'
            : 'py-[15px] lg:pt-[35px] lg:pb-[30px]'
        } p-5 lg:p-[19px]  ${horizontal && 'flex-1 lg:mx-3'}`}
      >
        {/* Title */}
        <div className='bg-gradient-to-br from-[#ffb050] via-white/5 to-[#84694875] rounded-[26px] drop-shadow-[0px_0px_10px_rgba(255,255,255,0.7)]'>
          <div className='bg-dark-green rounded-3xl m-[3px]'>
            <div className='align-middle py-3 bg-gradient-to-br from-[#84694875] via-white/5 to-[#84694875] rounded-3xl h-[80px] flex flex-col text-center justify-center'>
              <span
                className='text-center align-middle text-xl font-poppins font-bold bg-gradient-brown bg-clip-text text-transparent leading-6 tracking-wide'
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
                {name}
              </span>
              <div className='align-middle flex gap-1 items-center justify-center'>
                <span className='align-middle text-center font-poppins font-bold text-sm bg-gradient-brown bg-clip-text text-transparent leading-6 tracking-wide'>
                  {position} at
                </span>
                <div className='h-[25px] w-[50px]'>
                  <Image
                    src={company}
                    className='w-[50px] h-[25px]'
                    width={60}
                    height={0}
                    alt={name}
                  ></Image>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Children */}
        <p
          className={`flex items-center break-all text-justify text-cream-secondary-light font-poppins text-xs tracking-wide`}
        >
          {children}
        </p>
        <div className='gap-2 flex items-center break-all text-justify text-cream-secondary-light font-poppins text-xs tracking-wide'>
          <Instagram size={20} /> {instagram}
        </div>
      </div>
    </article>
  );
};

export default MentorCard;
