'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import GradientBox from './GradientBox';
import SandboxByIEEEITBIcon from './icons/SandboxByIEEEITBIcon';

function Countdown() {
  const [isAClicked, setIsAClicked] = useState(false);
  const [isBClicked, setIsBClicked] = useState(false);
  const [time, setTime] = useState({
    weeks: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date('11/24/2024 23:59:59').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      const weeks = Math.floor(difference / (1000 * 60 * 60 * 24 * 7));
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      const pad = (num) => (num < 10 ? `0${num}` : num);

      setTime({
        weeks: pad(weeks),
        days: pad(days),
        hours: pad(hours),
        minutes: pad(minutes),
        seconds: pad(seconds),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <GradientBox
      type='default'
      className='lg:h-[697px] lg:w-[1191px] md:w-[336px] md:h-[316px]'
    >
      <div className='absolute inset-0 flex items-center justify-center -z-10'>
        <div className='w-[48rem] h-[48rem] mt-auto mx-auto bg-gradient-radial from-[#255763] to-[#0B305F] opacity-20 blur-3xl rounded-full'></div>
      </div>

      <SandboxByIEEEITBIcon className='mb-16 mx-auto relative justify-center content-center item-center' />

      <div className='mb-auto relative justify-center content-center item-center'>
        <div className='font-poppins text-3xl flex justify-center font-semibold space-x-4 px-5 pb-4 gap-x-2 text-white glow-text'>
          <h2>Until registration closes</h2>
        </div>
        <div className='font-poppins flex glow-text justify-center font-bold space-x-8 px-5 py-1.5 text-white'>
          <div className='flex flex-col items-center'>
            <h1 className='text-8xl'>{time.weeks}</h1>
            <h2 className='text-2xl font-semibold mt-2'>Weeks</h2>
          </div>
          <span className='text-5xl self-center mb-8'>:</span>
          <div className='flex flex-col items-center'>
            <h1 className='text-8xl'>{time.days}</h1>
            <h2 className='text-2xl font-semibold mt-2'>Days</h2>
          </div>
          <span className='text-5xl self-center mb-8'>:</span>
          <div className='flex flex-col items-center'>
            <h1 className='text-8xl'>{time.hours}</h1>
            <h2 className='text-2xl font-semibold mt-2'>Hours</h2>
          </div>
          <span className='text-5xl self-center mb-8'>:</span>
          <div className='flex flex-col items-center'>
            <h1 className='text-8xl'>{time.minutes}</h1>
            <h2 className='text-2xl font-semibold mt-2'>Minutes</h2>
          </div>
        </div>
      </div>
      <div className='mb-auto pt-16 flex flex-row font-poppins text-2xl font-semibold justify-center space-x-12'>
        <Link href='https://www.apple.com'>
          <button
            onClick={() => setIsAClicked(!isAClicked)}
            className={`font-poppins lg:h-[57px] lg:w-[228px] rounded-full border border-white glow-text 
        ${
          isAClicked
            ? 'bg-transparent text-white'
            : 'bg-white text-[#040B15] hover:bg-transparent hover:text-white animation-all duration-200 delay-200'
        }
        `}
          >
            Daftar
          </button>
        </Link>

        <Link href='https://www.nike.com'>
          <button
            onClick={() => setIsBClicked(!isBClicked)}
            className={`font-poppins lg:h-[57px] lg:w-[228px] rounded-full border border-white glow-text 
          ${
            isBClicked
              ? 'bg-[#040B15] text-white'
              : 'bg-transparent text-white hover:bg-white hover:text-[#040B15] animation-all duration-200 delay-200'
          }
        `}
          >
            Guidebook
          </button>
        </Link>
      </div>
    </GradientBox>
  );
}

export default Countdown;
