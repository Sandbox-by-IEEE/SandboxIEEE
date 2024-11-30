'use client';
import GradientBox from './GradientBox';

const AboutUs = () => {
  return (
    <div className='mb-auto relative justify-center content-center'>
      <div
        className='font-poppins text-[24px] lg:text-5xl flex justify-center font-bold py-6 lg:py-12 text-white'
        data-aos='fade-up'
        data-aos-duration='1300'
      >
        <h1>What is Sandbox?</h1>
      </div>

      <GradientBox type='blue' className='w-full'>
        <div className='flex flex-col items-start text-white content-center text-center items-center'>
          {/* Title */}
          <div>
            <h1
              className='font-poppins text-[20px] sm:text-[24px] lg:text-3xl mt-6 lg:mt-12 font-bold leading-tight'
              data-aos='fade-up'
              data-aos-duration='1500'
            >
              Identity
            </h1>
          </div>

          {/* Paragraph */}
          <div>
            <p
              className='font-poppins text-[12px] sm:text-lg lg:text-2xl leading-relaxed tracking-wide w-full px-[5vw] text-justify mt-4 mb-8 lg:mt-8 lg:mb-16'
              data-aos='fade-up'
              data-aos-duration='1500'
            >
              The IEEE ITB Student Branch proudly presents The Sandbox 2.0, an
              annual event series dedicated to empowering youth in the fields of
              technological and business advancements. Building on the success
              of Sandbox 1.0, held in 2024 with the grand theme of “Green
              Technology,” Sandbox 2.0 takes a forward leap with the theme
              “Healthcare Technology.” This year’s event is structured to offer
              diverse, enriching experiences through a series of activities,
              including the Sandbox Webinar Series, two major competitions
              (ProtoTech Competition and Hack4Health), an Exhibition, and a
              combined Seminar & Social Night.
            </p>
          </div>
        </div>
      </GradientBox>

      <div
        className='p-8 flex flex-col lg:flex-row font-poppins text-center justify-center gap-6 lg:space-x-24'
        data-aos='zoom-in'
        data-aos-duration='1100'
      >
        <div className='flex flex-col items-center  opacity-100 lg:opacity-60 hover:opacity-100 animation-all duration-500 delay-300'>
          <div
            className='text-[24px] lg:text-[48px] py-1 font-bold bg-gradient-to-r from-[#8C69F9] to-[#533E93] text-transparent bg-clip-text'
            style={{
              textShadow: '0 0 20px rgba(255, 255, 255, 0.2)',
            }}
          >
            +49,000
          </div>
          <p className='text-[12px] lg:text-[24px] text-white max-w-[16rem]'>
            Lorem ipsum dolor sit amet consectetur.
          </p>
        </div>
        <div className='flex flex-col items-center '>
          <div
            className='text-[24px] lg:text-[64px] py-1 font-bold bg-gradient-to-r from-[#8C69F9] to-[#533E93] text-transparent bg-clip-text'
            style={{
              textShadow: '0 0 20px rgba(255, 255, 255, 0.2)',
            }}
          >
            +49,000
          </div>
          <p className='text-[12px] lg:text-[24px] text-white max-w-[16rem]'>
            Lorem ipsum dolor sit amet consectetur.
          </p>
        </div>
        <div className='flex flex-col items-center opacity-100 lg:opacity-60 hover:opacity-100 animation-all duration-500 delay-300'>
          <div
            className='text-[24px] lg:text-[48px] py-1 font-bold bg-gradient-to-r from-[#8C69F9] to-[#533E93] text-transparent bg-clip-text'
            style={{
              textShadow: '0 0 20px rgba(255, 255, 255, 0.2)',
            }}
          >
            +49,000
          </div>
          <p className='text-[12px] lg:text-[24px] text-white max-w-[16rem]'>
            Lorem ipsum dolor sit amet consectetur.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
