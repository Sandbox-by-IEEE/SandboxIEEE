'use client';

import Image from 'next/image';

function Judges() {
  return (
    <div className='p-8 lg:p-16'>
      <div
        className='font-poppins text-[24px] lg:text-[48px] flex justify-center font-bold text-white'
        data-aos='fade-up'
        data-aos-duration='1300'
      >
        <h1>Judges</h1>
      </div>

      <div
        className='p-6 lg:p-12 flex flex-row lg:flex-row font-poppins text-center justify-center space-x-6 lg:space-x-32'
        data-aos='fade-up'
        data-aos-duration='1300'
      >
        <div className='flex flex-col items-center'>
          <div
            className='w-[84px] h-[81px] lg:w-[273px] lg:h-[281px] rounded-full p-[2px] lg:p-[4px]'
            style={{
              boxShadow: '0px 0px 25.6px 0px #FFE1B980',
              background:
                'linear-gradient(151.86deg, #FFFFFF 8.75%, rgba(19, 77, 73, 0) 75.19%)',
            }}
          >
            <div className='w-full h-full rounded-full bg-black'>
              <Image
                src='/1.png'
                alt='judges1'
                width={84}
                height={81}
                className='lg:w-[273px] lg:w-[281px]'
              />
            </div>
          </div>
          <div className='pt-2 lg:pt-8 text-[12px] lg:text-[24px] max-w-[4rem] lg:max-w-none font-poppins font-semibold text-white'>
            <h1>Alvin Christopher</h1>
          </div>
        </div>

        <div className='flex flex-col items-center'>
          <div
            className='w-[84px] h-[81px] lg:w-[273px] lg:h-[281px] rounded-full p-[2px] lg:p-[4px]'
            style={{
              boxShadow: '0px 0px 25.6px 0px #FFE1B980',
              background:
                'linear-gradient(151.86deg, #FFFFFF 8.75%, rgba(19, 77, 73, 0) 75.19%)',
            }}
          >
            <div className='w-full h-full rounded-full bg-black'>
              <Image
                src='/1.png'
                alt='judges2'
                width={84}
                height={81}
                className='lg:w-[273px] lg:w-[281px]'
              />
            </div>
          </div>
          <div className='pt-2 lg:pt-8 text-[12px] lg:text-[24px] max-w-[4rem] lg:max-w-none font-poppins font-semibold text-white'>
            <h1>Bagas Noor</h1>
          </div>
        </div>

        <div className='flex flex-col items-center'>
          <div
            className='w-[84px] h-[81px] lg:w-[273px] lg:h-[281px] rounded-full p-[2px] lg:p-[4px]'
            style={{
              boxShadow: '0px 0px 25.6px 0px #FFE1B980',
              background:
                'linear-gradient(151.86deg, #FFFFFF 8.75%, rgba(19, 77, 73, 0) 75.19%)',
            }}
          >
            <div className='w-full h-full rounded-full bg-black'>
              <Image
                src='/1.png'
                alt='judges3'
                width={84}
                height={81}
                className='lg:w-[273px] lg:w-[281px]'
              />
            </div>
          </div>
          <div className='pt-2 lg:pt-8 text-[12px] lg:text-[24px] max-w-[4rem] lg:max-w-none font-poppins font-semibold text-white'>
            <h1>Izhar Alif</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Judges;
