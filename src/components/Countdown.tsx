'use client';
import { useEffect, useState } from 'react';

import CollonIcon from '@/components/icons/CollonIcon';

function Countdown({ targetDate }: { targetDate: Date }) {
  const [countdown, setCountdown] = useState(
    Math.floor(targetDate.getTime() / 1000) - Math.floor(Date.now() / 1000) <= 0
      ? 0
      : Math.floor(targetDate.getTime() / 1000) - Math.floor(Date.now() / 1000),
  );

  // Update Countdown
  useEffect(() => {
    const interval = setInterval(() => {
      if (
        Math.floor(targetDate.getTime() / 1000) -
          Math.floor(Date.now() / 1000) >=
        0
      ) {
        setCountdown(
          Math.floor(targetDate.getTime() / 1000) -
            Math.floor(Date.now() / 1000),
        );
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <>
      <div className='flex flex-col gap-y-6 md:flex-row'>
        <div className='flex flex-row items-center'>
          {/* First Box */}
          <div className='flex w-[110px] lg:w-[137px] aspect-square flex-col items-center justify-center bg-black pt-[14px]'>
            {/* Mobile, Days */}
            <div className='flex flex-row gap-x-[6px] font-museo-muderno font-bold drop-shadow-[0px_0px_23px_#B89D69] text-[50px] lg:text-[68px] leading-none text-white md:hidden'>
              {/* Puluhan */}
              <div
                key={`${Math.floor(
                  Math.floor(countdown / (24 * 3600)) / 10,
                )}_puluhan`}
                className={`${
                  ((countdown % (24 * 3600)) % 3600) % 60 === 0 &&
                  Math.floor(((countdown % (24 * 3600)) % 3600) / 60) === 0 &&
                  Math.floor((countdown % (24 * 3600)) / 3600) === 0 &&
                  Math.floor(countdown / (24 * 3600)) % 10 === 0 &&
                  'animate-countdown-out'
                } ${
                  ((countdown % (24 * 3600)) % 3600) % 60 === 59 &&
                  Math.floor(((countdown % (24 * 3600)) % 3600) / 60) === 59 &&
                  Math.floor((countdown % (24 * 3600)) / 3600) === 23 &&
                  Math.floor(countdown / (24 * 3600)) % 10 === 9 &&
                  'animate-countdown-in'
                }`}
              >
                {Math.floor(Math.floor(countdown / (24 * 3600)) / 10)}
              </div>
              {/* Satuan */}
              <div
                key={`${Math.floor(countdown / (24 * 3600)) % 10}_satuan`}
                className={`${
                  ((countdown % (24 * 3600)) % 3600) % 60 === 0 &&
                  Math.floor(((countdown % (24 * 3600)) % 3600) / 60) === 0 &&
                  Math.floor((countdown % (24 * 3600)) / 3600) === 0 &&
                  'animate-countdown-out'
                } ${
                  ((countdown % (24 * 3600)) % 3600) % 60 === 59 &&
                  Math.floor(((countdown % (24 * 3600)) % 3600) / 60) === 59 &&
                  Math.floor((countdown % (24 * 3600)) / 3600) === 23 &&
                  'animate-countdown-in'
                }`}
              >
                {Math.floor(countdown / (24 * 3600)) % 10}
              </div>
            </div>
            <div className='font-poppins font-bold text-[21px] drop-shadow-[0px_5px_10px_#B89D69] bg-clip-text text-transparent bg-gradient-brown md:hidden'>
              Days
            </div>

            {/* Desktop, Weeks */}
            <div className='hidden flex-row gap-x-[6px] font-museo-muderno font-bold drop-shadow-[0px_0px_23px_#B89D69] text-[50px] lg:text-[68px] leading-none text-white md:flex'>
              {/* Puluhan */}
              <div
                key={`${Math.floor(
                  Math.floor(countdown / (7 * 24 * 3600)) / 10,
                )}_puluhan`}
                className={`${
                  (((countdown % (7 * 24 * 3600)) % (24 * 3600)) % 3600) %
                    60 ===
                    0 &&
                  Math.floor(
                    (((countdown % (7 * 24 * 3600)) % (24 * 3600)) % 3600) / 60,
                  ) === 0 &&
                  Math.floor(
                    ((countdown % (7 * 24 * 3600)) % (24 * 3600)) / 3600,
                  ) === 0 &&
                  Math.floor((countdown % (7 * 24 * 3600)) / (24 * 3600)) ===
                    0 &&
                  Math.floor(countdown / (7 * 24 * 3600)) % 10 === 0 &&
                  'animate-countdown-out'
                } ${
                  (((countdown % (7 * 24 * 3600)) % (24 * 3600)) % 3600) %
                    60 ===
                    59 &&
                  Math.floor(
                    (((countdown % (7 * 24 * 3600)) % (24 * 3600)) % 3600) / 60,
                  ) === 59 &&
                  Math.floor(
                    ((countdown % (7 * 24 * 3600)) % (24 * 3600)) / 3600,
                  ) === 23 &&
                  Math.floor((countdown % (7 * 24 * 3600)) / (24 * 3600)) ===
                    6 &&
                  Math.floor(countdown / (7 * 24 * 3600)) % 10 === 9 &&
                  'animate-countdown-in'
                }`}
              >
                {Math.floor(Math.floor(countdown / (7 * 24 * 3600)) / 10)}
              </div>
              {/* Satuan */}
              <div
                key={`${Math.floor(countdown / (7 * 24 * 3600)) % 10}_satuan`}
                className={`${
                  (((countdown % (7 * 24 * 3600)) % (24 * 3600)) % 3600) %
                    60 ===
                    0 &&
                  Math.floor(
                    (((countdown % (7 * 24 * 3600)) % (24 * 3600)) % 3600) / 60,
                  ) === 0 &&
                  Math.floor(
                    ((countdown % (7 * 24 * 3600)) % (24 * 3600)) / 3600,
                  ) === 0 &&
                  Math.floor((countdown % (7 * 24 * 3600)) / (24 * 3600)) ===
                    0 &&
                  'animate-countdown-out'
                } ${
                  (((countdown % (7 * 24 * 3600)) % (24 * 3600)) % 3600) %
                    60 ===
                    59 &&
                  Math.floor(
                    (((countdown % (7 * 24 * 3600)) % (24 * 3600)) % 3600) / 60,
                  ) === 59 &&
                  Math.floor(
                    ((countdown % (7 * 24 * 3600)) % (24 * 3600)) / 3600,
                  ) === 23 &&
                  Math.floor((countdown % (7 * 24 * 3600)) / (24 * 3600)) ===
                    6 &&
                  'animate-countdown-in'
                }`}
              >
                {Math.floor(countdown / (7 * 24 * 3600)) % 10}
              </div>
            </div>
            <div className='hidden font-poppins font-bold text-[21px] bg-gradient-brown bg-clip-text text-transparent md:block'>
              Weeks
            </div>
          </div>

          <div className='mx-1.5 lg:mx-2 flex items-center'>
            <CollonIcon size={28} className='fill-black' />
          </div>

          {/* Second Box */}
          <div className='flex w-[110px] lg:w-[137px] aspect-square flex-col items-center justify-center bg-black pt-[14px]'>
            {/* Mobile, Hours */}
            <div className='flex flex-row gap-x-[6px] font-museo-muderno font-bold drop-shadow-[0px_0px_23px_#B89D69] text-[50px] lg:text-[68px] leading-none text-white md:hidden'>
              {/* Puluhan */}
              <div
                key={`${Math.floor(
                  Math.floor((countdown % (24 * 3600)) / 3600) / 10,
                )}_puluhan`}
                className={`${
                  ((countdown % (24 * 3600)) % 3600) % 60 === 0 &&
                  Math.floor(((countdown % (24 * 3600)) % 3600) / 60) === 0 &&
                  Math.floor((countdown % (24 * 3600)) / 3600) % 10 === 0 &&
                  'animate-countdown-out'
                } ${
                  ((countdown % (24 * 3600)) % 3600) % 60 === 59 &&
                  Math.floor(((countdown % (24 * 3600)) % 3600) / 60) === 59 &&
                  (Math.floor((countdown % (24 * 3600)) / 3600) % 10 === 9 ||
                    Math.floor((countdown % (24 * 3600)) / 3600) === 23) &&
                  'animate-countdown-in'
                }`}
              >
                {Math.floor(Math.floor((countdown % (24 * 3600)) / 3600) / 10)}
              </div>
              {/* Satuan */}
              <div
                key={`${
                  Math.floor((countdown % (24 * 3600)) / 3600) % 10
                }_satuan`}
                className={`${
                  ((countdown % (24 * 3600)) % 3600) % 60 === 0 &&
                  Math.floor(((countdown % (24 * 3600)) % 3600) / 60) === 0 &&
                  'animate-countdown-out'
                } ${
                  ((countdown % (24 * 3600)) % 3600) % 60 === 59 &&
                  Math.floor(((countdown % (24 * 3600)) % 3600) / 60) === 59 &&
                  'animate-countdown-in'
                }`}
              >
                {Math.floor((countdown % (24 * 3600)) / 3600) % 10}
              </div>
            </div>
            <div className='font-poppins font-bold text-[21px] drop-shadow-[0px_5px_10px_#B89D69] bg-clip-text text-transparent bg-gradient-brown md:hidden'>
              Hours
            </div>

            {/* Desktop, Days */}
            <div className='hidden flex-row gap-x-[6px] font-museo-muderno font-bold drop-shadow-[0px_0px_23px_#B89D69]  text-[50px] lg:text-[68px] leading-none text-white md:flex'>
              {/* Puluhan */}
              <div
                key={`${Math.floor(
                  Math.floor((countdown % (7 * 24 * 3600)) / (24 * 3600)) / 10,
                )}_puluhan`}
              >
                {Math.floor(
                  Math.floor((countdown % (7 * 24 * 3600)) / (24 * 3600)) / 10,
                )}
              </div>
              {/* Satuan */}
              <div
                key={`${
                  Math.floor((countdown % (7 * 24 * 3600)) / (24 * 3600)) % 10
                }_satuan`}
                className={`${
                  (((countdown % (7 * 24 * 3600)) % (24 * 3600)) % 3600) %
                    60 ===
                    0 &&
                  Math.floor(
                    (((countdown % (7 * 24 * 3600)) % (24 * 3600)) % 3600) / 60,
                  ) === 0 &&
                  Math.floor(
                    ((countdown % (7 * 24 * 3600)) % (24 * 3600)) / 3600,
                  ) === 0 &&
                  'animate-countdown-out'
                } ${
                  (((countdown % (7 * 24 * 3600)) % (24 * 3600)) % 3600) %
                    60 ===
                    59 &&
                  Math.floor(
                    (((countdown % (7 * 24 * 3600)) % (24 * 3600)) % 3600) / 60,
                  ) === 59 &&
                  Math.floor(
                    ((countdown % (7 * 24 * 3600)) % (24 * 3600)) / 3600,
                  ) === 23 &&
                  'animate-countdown-in'
                }`}
              >
                {Math.floor((countdown % (7 * 24 * 3600)) / (24 * 3600)) % 10}
              </div>
            </div>
            <div className='hidden font-poppins font-bold text-[21px] drop-shadow-[0px_5px_10px_#B89D69] bg-clip-text text-transparent bg-gradient-brown md:block'>
              Days
            </div>
          </div>
        </div>

        <div className='hidden md:mx-1.5 lg:mx-2 md:flex md:items-center'>
          <CollonIcon size={28} className='fill-black' />
        </div>

        {/* Third Box */}
        <div className='flex flex-row items-center'>
          <div className='flex w-[110px] lg:w-[137px] aspect-square flex-col items-center justify-center bg-black pt-[14px]'>
            {/* Mobile, Minutes */}
            <div className='flex flex-row gap-x-[6px] font-museo-muderno font-bold drop-shadow-[0px_0px_23px_#B89D69] text-[50px] lg:text-[68px] leading-none text-white md:hidden'>
              {/* Puluhan */}
              <div
                key={`${Math.floor(
                  Math.floor(((countdown % (24 * 3600)) % 3600) / 60) / 10,
                )}_puluhan`}
                className={`${
                  ((countdown % (24 * 3600)) % 3600) % 60 === 0 &&
                  Math.floor(((countdown % (24 * 3600)) % 3600) / 60) % 10 ==
                    0 &&
                  'animate-countdown-out'
                } ${
                  ((countdown % (24 * 3600)) % 3600) % 60 === 59 &&
                  Math.floor(((countdown % (24 * 3600)) % 3600) / 60) % 10 ==
                    9 &&
                  'animate-countdown-in'
                }`}
              >
                {Math.floor(
                  Math.floor(((countdown % (24 * 3600)) % 3600) / 60) / 10,
                )}
              </div>
              {/* Satuan */}
              <div
                key={`${
                  Math.floor(((countdown % (24 * 3600)) % 3600) / 60) % 10
                }_satuan`}
                className={`${
                  ((countdown % (24 * 3600)) % 3600) % 60 === 0 &&
                  'animate-countdown-out'
                } ${
                  ((countdown % (24 * 3600)) % 3600) % 60 === 59 &&
                  'animate-countdown-in'
                }`}
              >
                {Math.floor(((countdown % (24 * 3600)) % 3600) / 60) % 10}
              </div>
            </div>
            <div className='font-poppins font-bold text-[21px] drop-shadow-[0px_5px_10px_#B89D69] bg-clip-text text-transparent bg-gradient-brown md:hidden'>
              Minutes
            </div>

            {/* Desktop, Hours */}
            <div className='hidden flex-row gap-x-[6px] font-museo-muderno font-bold drop-shadow-[0px_0px_23px_#B89D69] text-[50px] lg:text-[68px] leading-none text-white md:flex'>
              {/* Puluhan */}
              <div
                key={`${Math.floor(
                  Math.floor(
                    ((countdown % (7 * 24 * 3600)) % (24 * 3600)) / 3600,
                  ) / 10,
                )}_puluhan`}
                className={`${
                  (((countdown % (7 * 24 * 3600)) % (24 * 3600)) % 3600) %
                    60 ===
                    0 &&
                  Math.floor(
                    (((countdown % (7 * 24 * 3600)) % (24 * 3600)) % 3600) / 60,
                  ) === 0 &&
                  Math.floor(
                    ((countdown % (7 * 24 * 3600)) % (24 * 3600)) / 3600,
                  ) %
                    10 ===
                    0 &&
                  'animate-countdown-out'
                } ${
                  (((countdown % (7 * 24 * 3600)) % (24 * 3600)) % 3600) %
                    60 ===
                    59 &&
                  Math.floor(
                    (((countdown % (7 * 24 * 3600)) % (24 * 3600)) % 3600) / 60,
                  ) === 59 &&
                  (Math.floor(
                    ((countdown % (7 * 24 * 3600)) % (24 * 3600)) / 3600,
                  ) %
                    10 ===
                    9 ||
                    Math.floor(
                      ((countdown % (7 * 24 * 3600)) % (24 * 3600)) / 3600,
                    ) == 23) &&
                  'animate-countdown-in'
                }`}
              >
                {Math.floor(
                  Math.floor(
                    ((countdown % (7 * 24 * 3600)) % (24 * 3600)) / 3600,
                  ) / 10,
                )}
              </div>
              {/* Satuan */}
              <div
                key={`${
                  Math.floor(
                    ((countdown % (7 * 24 * 3600)) % (24 * 3600)) / 3600,
                  ) % 10
                }_satuan`}
                className={`${
                  (((countdown % (7 * 24 * 3600)) % (24 * 3600)) % 3600) %
                    60 ===
                    0 &&
                  Math.floor(
                    (((countdown % (7 * 24 * 3600)) % (24 * 3600)) % 3600) / 60,
                  ) === 0 &&
                  'animate-countdown-out'
                } ${
                  (((countdown % (7 * 24 * 3600)) % (24 * 3600)) % 3600) %
                    60 ===
                    59 &&
                  Math.floor(
                    (((countdown % (7 * 24 * 3600)) % (24 * 3600)) % 3600) / 60,
                  ) === 59 &&
                  'animate-countdown-in'
                }`}
              >
                {Math.floor(
                  ((countdown % (7 * 24 * 3600)) % (24 * 3600)) / 3600,
                ) % 10}
              </div>
            </div>
            <div className='hidden font-poppins font-bold text-[21px] drop-shadow-[0px_5px_10px_#B89D69] bg-clip-text text-transparent bg-gradient-brown md:block'>
              Hours
            </div>
          </div>

          <div className='mx-1.5 lg:mx-2 flex items-center'>
            <CollonIcon size={28} className='fill-black' />
          </div>

          {/* 4th Box */}
          <div className='flex w-[110px] lg:w-[137px] aspect-square flex-col items-center justify-center bg-black pt-[14px]'>
            {/* Mobile, Seconds */}
            <div className='flex flex-row gap-x-[6px] font-museo-muderno font-bold drop-shadow-[0px_0px_23px_#B89D69] text-[50px] lg:text-[68px] leading-none text-white md:hidden'>
              {/* Puluhan */}
              <div
                key={`${Math.floor(
                  (((countdown % (24 * 3600)) % 3600) % 60) / 10,
                )}_puluhan`}
                className={`${
                  (((countdown % (24 * 3600)) % 3600) % 60) % 10 === 9 &&
                  'animate-countdown-in'
                } ${
                  (((countdown % (24 * 3600)) % 3600) % 60) % 10 == 0 &&
                  'animate-countdown-out'
                }`}
              >
                {Math.floor((((countdown % (24 * 3600)) % 3600) % 60) / 10)}
              </div>
              {/* Satuan */}
              <div
                key={`${(((countdown % (24 * 3600)) % 3600) % 60) % 10}_satuan`}
                className={`animate-countdown-sec`}
              >
                {(((countdown % (24 * 3600)) % 3600) % 60) % 10}
              </div>
            </div>
            <div className='z-20 bg-black font-poppins font-bold text-[21px] drop-shadow-[0px_5px_10px_#B89D69] bg-clip-text text-transparent bg-gradient-brown md:hidden'>
              Seconds
            </div>

            {/* Desktop, Minutes */}
            <div className='hidden flex-row gap-x-[6px] font-museo-muderno font-bold drop-shadow-[0px_0px_23px_#B89D69] text-[50px] lg:text-[68px] leading-none text-white md:flex'>
              {/* Puluhan */}
              <div
                key={`${Math.floor(
                  Math.floor(
                    (((countdown % (7 * 24 * 3600)) % (24 * 3600)) % 3600) / 60,
                  ) / 10,
                )}_puluhan`}
                className={`${
                  (((countdown % (7 * 24 * 3600)) % (24 * 3600)) % 3600) %
                    60 ===
                    0 &&
                  Math.floor(
                    (((countdown % (7 * 24 * 3600)) % (24 * 3600)) % 3600) / 60,
                  ) %
                    10 ===
                    0 &&
                  'animate-countdown-out'
                } ${
                  (((countdown % (7 * 24 * 3600)) % (24 * 3600)) % 3600) %
                    60 ===
                    59 &&
                  Math.floor(
                    (((countdown % (7 * 24 * 3600)) % (24 * 3600)) % 3600) / 60,
                  ) %
                    10 ===
                    9 &&
                  'animate-countdown-in'
                }`}
              >
                {Math.floor(
                  Math.floor(
                    (((countdown % (7 * 24 * 3600)) % (24 * 3600)) % 3600) / 60,
                  ) / 10,
                )}
              </div>
              {/* Satuan */}
              <div
                key={`${
                  Math.floor(
                    (((countdown % (7 * 24 * 3600)) % (24 * 3600)) % 3600) / 60,
                  ) % 10
                }_satuan`}
                className={`${
                  (((countdown % (7 * 24 * 3600)) % (24 * 3600)) % 3600) %
                    60 ===
                    0 && 'animate-countdown-out'
                } ${
                  (((countdown % (7 * 24 * 3600)) % (24 * 3600)) % 3600) %
                    60 ===
                    59 && 'animate-countdown-in'
                }`}
              >
                {Math.floor(
                  (((countdown % (7 * 24 * 3600)) % (24 * 3600)) % 3600) / 60,
                ) % 10}
              </div>
            </div>
            <div className='z-20 hidden bg-black font-poppins font-bold text-[21px] drop-shadow-[0px_5px_10px_#B89D69] bg-clip-text text-transparent bg-gradient-brown md:block'>
              Minutes
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Countdown;
