"use client";
import GradientBox from "./GradientBox";
import React, { useState } from 'react';

function Prize ()  {
    const [isHoveredLeft, setIsHoveredLeft] = useState(false);
    const [isHoveredRight, setIsHoveredRight] = useState(false);

    return(
        <div className="p-16">
        <GradientBox type= "default" className = "flex w-[138px] h-[48px] lg:w-[574px] lg:h-[126px] rounded-[124px] items-center justify-center relative">
            <div
            className="font-poppins text-[12px] lg:text-[64px] flex justify-center font-bold text-white"
            data-aos="fade-up"
            data-aos-duration="1300"
            style={{ textShadow: "0 0 20px rgba(255, 255, 255, 0.5)" }}
            >
                <h1>Rp5.000.000</h1>
            </div>
        </GradientBox>
        <GradientBox type="default" className = "flex absolute bottom-[10px] lg:bottom-[32px] w-[48px] h-[46px] lg:w-[78px] lg:h-[70px] rounded-full items-center justify-center">
            <div
            className="font-poppins text-[16px] lg:text-[32px] flex justify-center font-bold text-white"
            data-aos="fade-up"
            data-aos-duration="1300"
            style={{ textShadow: "0 0 20px rgba(255, 255, 255, 0.5)" }}
            >
                <h1>#1</h1>
            </div>
        </GradientBox>

        <div className="flex items-center justify-center space-x-10 lg:space-x-48">

            <div className={`relative transition-all duration-500 ${
                isHoveredLeft ? "blur-none" : "filter lg:blur-[3px] opacity-60 lg:opacity-100"
                } md:filter-none`}
                // style={{ filter: isHoveredLeft ? "none" : "blur(3px)" }}
                onMouseEnter={() => setIsHoveredLeft(true)}
                onMouseLeave={() => setIsHoveredLeft(false)}>
                <GradientBox
                type="default"
                className="flex w-[109px] h-[38px] lg:w-[435px] lg:h-[110px] rounded-[124px] items-center justify-center"
                >
                <div
                    className="font-poppins text-[10px] lg:text-[48px] font-bold text-white"
                    data-aos="fade-up"
                    data-aos-duration="1300"
                    style={{ textShadow: "0 0 20px rgba(255, 255, 255, 0.5)" }}
                >
                    <h1>Rp1.500.000</h1>
                </div>
                </GradientBox>
                <GradientBox
                type="default"
                className="flex absolute bottom-[10px] lg:bottom-[32px] w-[38px] h-[36.42px] lg:w-[78px] lg:h-[70px] rounded-full items-center justify-center"
                >
                <div
                    className="font-poppins text-[12px] lg:text-[32px] font-bold text-white"
                    data-aos="fade-up"
                    data-aos-duration="1300"
                    style={{ textShadow: "0 0 20px rgba(255, 255, 255, 0.2)" }}
                >
                    <h1>#2</h1>
                </div>
                </GradientBox>
            </div>

            <div className={`relative transition-all duration-500 ${
                isHoveredRight ? "blur-none" : "filter lg:blur-[3px] opacity-60 lg:opacity-100"
                } md:filter-none`}
                // style={{ filter: isHoveredRight ? "none" : "blur(3px)" }}
                onMouseEnter={() => setIsHoveredRight(true)}
                onMouseLeave={() => setIsHoveredRight(false)}>
                <GradientBox
                type="default"
                className="flex w-[109px] h-[38px] lg:w-[435px] lg:h-[110px] rounded-[124px] items-center justify-center"
                >
                <div
                    className="font-poppins text-[10px] lg:text-[48px] font-bold text-white"
                    data-aos="fade-up"
                    data-aos-duration="1300"
                    style={{ textShadow: "0 0 20px rgba(255, 255, 255, 0.2)" }}
                >
                    <h1>Rp1.000.000</h1>
                </div>
                </GradientBox>
                <GradientBox
                type="default"
                className="flex absolute bottom-[10px] w-[38px] h-[36.42px] lg:bottom-[32px] lg:w-[78px] lg:h-[70px] rounded-full items-center justify-center"
                >
                <div
                    className="font-poppins text-[12px] lg:text-[32px] font-bold text-white"
                    data-aos="fade-up"
                    data-aos-duration="1300"
                    style={{ textShadow: "0 0 20px rgba(255, 255, 255, 0.2)" }}
                >
                    <h1>#3</h1>
                </div>
                </GradientBox>
            </div>
            </div>
        </div> 
    )
}

export default Prize;