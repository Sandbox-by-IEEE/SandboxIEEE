"use client";
import GradientBox from "./GradientBox";

const AboutUs = () => {
    return (
        <div className="mb-auto relative justify-center content-center bg-[#071D10]">
            <div
                className="font-poppins text-[24px] lg:text-5xl flex justify-center font-bold py-6 lg:py-12 text-white"
                data-aos="fade-up"
                data-aos-duration="1300"
            >
                <h1>What is Sandbox?</h1>
            </div>

            <GradientBox type="blue" className="h-[227px] w-[336px] lg:h-[363px] lg:w-[1191px]">
                <div className="flex flex-col items-start text-white content-center text-center items-center">
                    {/* Title */}
                    <div>
                        <h1
                            className="font-poppins text-[20px] lg:text-3xl  font-bold leading-tight"
                            data-aos="fade-up"
                            data-aos-duration="1500"
                        >
                            Identity
                        </h1>
                    </div>

                    {/* Paragraph */}
                    <div>
                        <p
                            className="font-poppins text-[12px] lg:text-lg leading-relaxed tracking-wide max-w-[17rem] lg:max-w-2xl mt-4 lg:mt-8 lg:mb-12"
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
                className="p-8 flex flex-col lg:flex-row font-poppins text-center justify-center gap-6 lg:space-x-24"
                data-aos="zoom-in"
                data-aos-duration="1100"
            >
                <div className="flex flex-col items-center  opacity-100 lg:opacity-60 hover:opacity-100 animation-all duration-500 delay-300">
                    <div className="text-[24px] lg:text-[48px] py-1 font-bold bg-gradient-to-r from-[#8C69F9] to-[#533E93] text-transparent bg-clip-text"
                        style={{
                            textShadow: '0 0 20px rgba(255, 255, 255, 0.2)'
                        }}>
                        +49,000
                    </div>
                    <p className="text-[12px] lg:text-[24px] text-white max-w-[16rem]">Lorem ipsum dolor sit amet consectetur.</p>
                </div>
                <div className="flex flex-col items-center ">
                    <div className="text-[24px] lg:text-[64px] py-1 font-bold bg-gradient-to-r from-[#8C69F9] to-[#533E93] text-transparent bg-clip-text"
                        style={{
                            textShadow: '0 0 20px rgba(255, 255, 255, 0.2)'
                        }}>
                        +49,000
                    </div>
                    <p className="text-[12px] lg:text-[24px] text-white max-w-[16rem]">Lorem ipsum dolor sit amet consectetur.</p>
                </div>
                <div className="flex flex-col items-center opacity-100 lg:opacity-60 hover:opacity-100 animation-all duration-500 delay-300">
                    <div className="text-[24px] lg:text-[48px] py-1 font-bold bg-gradient-to-r from-[#8C69F9] to-[#533E93] text-transparent bg-clip-text"
                        style={{
                            textShadow: '0 0 20px rgba(255, 255, 255, 0.2)'
                        }}>
                        +49,000
                    </div>
                    <p className="text-[12px] lg:text-[24px] text-white max-w-[16rem]">Lorem ipsum dolor sit amet consectetur.</p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
