"use client";
import GradientBox from "./GradientBox";

const AboutUs = () => {
    return (
        <div className="mb-auto relative justify-center content-center item-center bg-[#071D10]">
            <div
                className="font-poppins text-5xl flex justify-center font-bold space-x-4 px-5 py-12 gap-x-2 text-white"
                data-aos="fade-up"
                data-aos-duration="1300"
            >
                <h1>What is Sandbox?</h1>
            </div>

            <GradientBox type="blue" className="lg:h-[363px] lg:w-[1191px]">
                <div className="flex flex-col items-start text-white content-center text-center items-center">
                    {/* Title */}
                    <div>
                        <h1
                            className="font-poppins text-3xl font-bold leading-tight tracking-wide"
                            data-aos="fade-up"
                            data-aos-duration="1500"
                        >
                            Lorem ipsum dolor sit amet
                        </h1>
                    </div>

                    {/* Paragraph */}
                    <div>
                        <p
                            className="font-poppins text-lg leading-relaxed tracking-wide max-w-2xl mt-8"
                            data-aos="fade-up"
                            data-aos-duration="1500"
                        >
                            Lorem ipsum dolor sit amet consectetur. Sed aliquam praesent nunc sed
                            nunc arcu sagittis. Senectus in quisque consectetur molestie ut phasellus
                            pharetra urna. Tempor accumsan at nunc mi posuere. Mauris montes elementum
                            et semper amet fermentum in tincidunt.
                        </p>
                    </div>
                </div>
            </GradientBox>

            <div
                className="p-10 flex flex-row font-poppins text-center justify-center space-x-24"
                data-aos="zoom-in"
                data-aos-duration="1100"
            >
                <div className="flex flex-col items-center space-y-1 opacity-60 hover:opacity-100 animation-all duration-500 delay-300">
                    <div className="text-5xl py-1 font-bold bg-gradient-to-r from-[#8C69F9] to-[#533E93] text-transparent bg-clip-text glow-text-white">
                        +49,000
                    </div>
                    <p className="text-white max-w-[12rem]">Lorem ipsum dolor sit amet consectetur.</p>
                </div>
                <div className="flex flex-col items-center space-y-1">
                    <div className="text-6xl py-1 font-bold bg-gradient-to-r from-[#8C69F9] to-[#533E93] text-transparent bg-clip-text glow-text-white">
                        +49,000
                    </div>
                    <p className="text-xl text-white max-w-[16rem]">Lorem ipsum dolor sit amet consectetur.</p>
                </div>
                <div className="flex flex-col items-center space-y-1 opacity-60 hover:opacity-100 animation-all duration-500 delay-300">
                    <div className="text-5xl py-1 font-bold bg-gradient-to-r from-[#8C69F9] to-[#533E93] text-transparent bg-clip-text glow-text-white">
                        +49,000
                    </div>
                    <p className="text-white max-w-[12rem]">Lorem ipsum dolor sit amet consectetur.</p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
