'use client';
import Image from "next/image";
import { useSession } from 'next-auth/react';
import { useEffect, useState } from "react";
import SandboxByIEEEITBIcon from "./icons/SandboxByIEEEITBIcon";
import GradientBox from "./GradientBox";
import Link from 'next/link';


function Countdown() {
  const [isAClicked, setIsAClicked] = useState(false);
  const [isBClicked, setIsBClicked] = useState(false);
  const [time, setTime] = useState({
    weeks: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const target = new Date("11/24/2024 23:59:59").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      const weeks = Math.floor(difference / (1000 * 60 * 60 * 24 * 7))
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      const pad = (num) => (num < 10 ? `0${num}` : num);

      setTime({
        weeks: pad(weeks),
        days: pad(days),
        hours: pad(hours),
        minutes: pad(minutes),
        seconds: pad(seconds)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <GradientBox type='default' className="relative lg:h-[697px] lg:w-[1191px] w-[336px] h-[316px] rounded-[64px] lg:rounded-[128px] overflow-hidden">
      <div className="absolute inset-0 flex -z-10">
        <div className="w-lg h-lg lg:w-[48rem] items-center lg:h-[48rem] mt-auto mx-auto bg-gradient-radial from-[#255763] to-[#0B305F] opacity-20 blur-3xl rounded-full"></div>
      </div>

      <SandboxByIEEEITBIcon className="lg:w-[165px] lg:h-[176px] w-[60px] h-[64px] lg:mb-16 mx-auto relative justify-center content-center item-center" />

      <div className="mb-auto relative justify-center content-center item-center">
        <div className="font-poppins lg:text-3xl text-[12px] flex justify-center font-semibold pb-6 pt-4 lg:pb-4 gap-x-2 text-white"
          style={{ textShadow: "0 0 20px rgba(171, 129, 78, 0.5)" }}>
          <h2>Until registration closes</h2>
        </div>
        <div className="font-poppins flex justify-center font-bold lg:space-x-8 space-x-3 lg:px-6 lg:py-1.5 text-white"
          style={{ textShadow: "0 0 20px rgba(171, 129, 78, 0.5)" }}>
          <div className="flex flex-col items-center">
            <h1 className="lg:text-8xl text-3xl">{time.weeks}</h1>
            <h2 className="lg:text-2xl  text-xs font-semibold mt-2">Weeks</h2>
          </div>
          <span className="lg:text-5xl text-xs self-center mb-6 lg:mb-8">:</span>
          <div className="flex flex-col items-center">
            <h1 className="lg:text-8xl text-3xl">{time.days}</h1>
            <h2 className="lg:text-2xl text-xs font-semibold mt-2">Days</h2>
          </div>
          <span className="lg:text-5xl text-xs self-center mb-6 lg:mb-8">:</span>
          <div className="flex flex-col items-center">
            <h1 className="lg:text-8xl text-3xl">{time.hours}</h1>
            <h2 className="lg:text-2xl text-xs font-semibold mt-2">Hours</h2>
          </div>
          <span className="lg:text-5xl text-xs self-center mb-6 lg:mb-8">:</span>
          <div className="flex flex-col items-center">
            <h1 className="lg:text-8xl text-3xl">{time.minutes}</h1>
            <h2 className="lg:text-2xl text-xs font-semibold mt-2">Minutes</h2>
          </div>
        </div>
      </div>
      <div className="lg:mb-auto mb-4 pt-6 lg:pt-5 lg:pt-16 flex flex-row font-poppins lg:text-2xl text-xs font-semibold justify-center lg:space-x-12 space-x-5">
        <Link href="https://www.apple.com">
          <button onMouseDown={() => {
            setIsBClicked(true);
            setTimeout(() => setIsBClicked(false), 0);
          }}
            className={`font-poppins lg:h-[57px] lg:text-2xl text-xs lg:w-[228px] h-[34px] w-[99px] rounded-full border border-white 
        ${isAClicked ? "bg-white text-[#040B15]" : "bg-white text-[#040B15] hover:bg-transparent hover:text-white animation-all duration-200 delay-200"}
        `}
            style={{ textShadow: "0 0 20px rgba(171, 129, 78, 0.5)" }}
          >
            Daftar
          </button>
        </Link>

        <Link href="https://www.nike.com">
          <button onMouseDown={() => {
            setIsBClicked(true);
            setTimeout(() => setIsBClicked(false), 0);
          }}
            className={`font-poppins lg:h-[57px] lg:w-[228px] h-[34px] w-[99px] lg:text-2xl text-xs rounded-full border border-white
          ${isBClicked ? "bg-transparent text-white" : "bg-transparent text-white hover:bg-white hover:text-[#040B15] animation-all duration-200 delay-200"}
        `}
            style={{ textShadow: "0 0 20px rgba(171, 129, 78, 0.5)" }}>
            Guidebook
          </button>
        </Link>

      </div>
    </GradientBox>
  );
};

export default Countdown;