'use client';
import Image from 'next/image';

import GradientBox from './GradientBox';

interface AboutCompeProps {
  title: string;
  subtitle: string;
  description?: string;
}

const AboutCompe = ({ title, subtitle, description }: AboutCompeProps) => {
  return (
    <div className='mb-auto relative justify-center content-center item-center p-8 lg:p-16'>
      <div
        className='absolute inset-0 left-[-32px] lg:left-[304px] items-center'
        data-aos='fade-up'
        data-aos-duration='1500'
      >
        <Image
          src='/IMG_6797.svg'
          alt='sandy'
          width={158}
          height={158}
          className='lg:w-[294px] lg:h-[294px]'
        />
      </div>
      <div
        className='z-20 font-poppins text-[24px] p-4 lg:p-0 lg:text-[48px] flex justify-center font-bold  lg:py-8 text-white'
        data-aos='fade-up'
        data-aos-duration='1300'
      >
        <h1 className='z-20'>{title}</h1>
      </div>

      <GradientBox
        type='blue'
        className='w-[80vw] rounded-[50px] backdrop-blur-md'
      >
        <div className='py-6 flex flex-col text-white content-center text-center items-center'>
          {/* Title */}
          <div>
            <h1
              className='font-poppins text-xl lg:text-3xl font-bold leading-tight tracking-wide'
              data-aos='fade-up'
              data-aos-duration='1500'
            >
              {subtitle}
            </h1>
          </div>

          {/* Paragraph */}
          <div className='w-[90%] text-justify'>
            <p
              className='font-poppins text-xs lg:text-lg leading-relaxed tracking-wide mt-4 lg:mt-8'
              data-aos='fade-up'
              data-aos-duration='1500'
            >
              {description}
            </p>
          </div>
        </div>
      </GradientBox>
    </div>
  );
};

export default AboutCompe;
