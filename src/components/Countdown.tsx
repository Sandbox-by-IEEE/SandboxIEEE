'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import CollonIcon from '@/components/icons/CollonIcon';
import TitleSection from '@/components/TitleSection';

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
          <div
            className='flex w-[110px] lg:w-[137px] aspect-square flex-col items-center justify-center bg-black pt-[14px]'
            data-aos='flip-down'
            data-aos-duration='1000'
          >
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

          <div
            className='mx-1.5 lg:mx-2 flex items-center'
            data-aos='fade-zoom-in'
            data-aos-duration='1200'
          >
            <CollonIcon size={28} className='fill-black' />
          </div>

          {/* Second Box */}
          <div
            className='flex w-[110px] lg:w-[137px] aspect-square flex-col items-center justify-center bg-black pt-[14px]'
            data-aos='flip-down'
            data-aos-duration='1500'
          >
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

        <div
          className='hidden md:mx-1.5 lg:mx-2 md:flex md:items-center'
          data-aos='fade-zoom-in'
          data-aos-duration='1200'
        >
          <CollonIcon size={28} className='fill-black' />
        </div>

        {/* Third Box */}
        <div
          className='flex flex-row items-center'
          data-aos='flip-down'
          data-aos-duration='2000'
        >
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

          <div
            className='mx-1.5 lg:mx-2 flex items-center'
            data-aos='fade-zoom-in'
            data-aos-duration='1200'
          >
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

const CountDownDisplay = ({
  sectionTitle,
  targetDate,
  type,
  children,
}: {
  sectionTitle: string;
  targetDate: Date;
  type: string;
  children: React.ReactNode;
}) => {
  const { data: sessionData } = useSession();
  const ticket =
    (type !== 'exhibition' && sessionData?.user.ticket?.[type]) || null;
  if (
    type !== 'exhibition' &&
    (ticket === null ||
      ticket.buy == false ||
      !sessionData?.user ||
      ticket?.verified !== 'verified')
  )
    return <></>;
  else {
    return (
      <section className='w-full flex flex-col gap-2 bg-gradient-section px-8 sm:px-10 md:px-20 lg:px-40 py-8 lg:py-10 xl:py-14 2xl:py-20'>
        <div
          data-aos='flip-up'
          className='rounded-xl bg-gradient-brown border-2 border-solid border-[#AB814E] bg-transparent shadow-[0_0_0.9732px_#705229,0_0_1.9464px_#705229,0_0_6.8124px_#705229,0_0_13.6248px_#705229,0_0_23.3568px_#705229,0_0_40.8744px_#705229] p-1.5'
        >
          <div className='bg-gradient-green flex flex-col items-center justify-center rounded-xl py-10 px-8 lg:px-16 gap-10'>
            {/* Title */}
            <TitleSection>{sectionTitle}</TitleSection>
            {/* Countdown */}
            <Countdown targetDate={targetDate} />
            {/* Button */}
            {children}
          </div>
        </div>
      </section>
    );
  }
};
export default CountDownDisplay;
