'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';

const Countdown = dynamic(() => import('@/components/Countdown'), {
  ssr: false,
});

import { FAQ } from '@/components/FAQ';
import SpeakersCarousel from '@/components/SpeakersCarousel';

export default function GrandSeminar() {
  return (
    <div className=' min-h-screen h-fit w-[100vw] block bg-[#081E11]'>
      {/* replace with navbar */}
      <nav className='w-full h-20 bg-[#051F12] sticky top-0 left-0 flex-shrink-0 z-[500]'>
        Navbar
      </nav>

      <section className='HeroSection w-full h-[100vh] lg:h-[1080px] bg-grand-seminar-banner bg-cover flex justify-center'>
        <div className='container w-[calc(100vw*1.5)] md:w-full h-full bg-g-seminar-radial-gradient m-auto flex overflow-hidden'>
          <div className='objects block w-fit h-fit m-auto '>
            <h1 className='titleText font-museo-muderno font-bold text-[25pt] sm:text-[40pt] md:text-[50pt] lg:text-[60pt] xl:text-[70pt] bg-gradient-brown text-transparent bg-clip-text drop-shadow-[0_0px_20px_rgba(171,129,78,1)]'>
              grand seminar
            </h1>
            <div className='buttonSection flex justify-center'>
              <button className='button text-white font-poppins font-bold md:text-[20px] lg:text-[24px] pt-3 pb-3 pr-8 pl-8 lg:pt-6 lg:pb-6 lg:pr-16 lg:pl-16 w-fit h fit mt-9 bg-[#0D432F] rounded-lg drop-shadow-[0px_0px_20px_rgba(255,251,185,1)]'>
                REGISTER
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className='Section w-full h-[700px] sm:h-[1000px] md:h-[800px] xl:h-[1080px] pl-[100px] pr-[100px] bg-gradient-to-b from-[rgba(7,29,16,0.45)] to-[#0F3015] bg-cover flex justify-center items-center'>
        <div className='containerLuar m-auto w-[700px] xl:w-full top-[-150px] relative sm:top-0 md:h-[750px] h-[1000px] rounded-[30px] bg-gradient-brown flex md:w-[1100px] drop-shadow-[0_0px_20px_rgba(171,129,78,1)] scale-[45%] sm:scale-[65%] md:scale-[70%] lg:scale-75 xl:scale-100'>
          <div className='containerdalam m-auto w-[calc(100%-16px)] h-[calc(100%-16px)] rounded-[28px] bg-gradient-to-b from-[rgba(7,29,16)] to-[#0F3015] overflow-hidden flex flex-col items-center p-32'>
            <h1 className='title font-museo-muderno text-center w-full font-bold text-[40pt] bg-gradient-brown text-transparent bg-clip-text drop-shadow-[0_0px_20px_rgba(171,129,78,1)] mb-20'>
              Pendaftaran akan segera ditutup!
            </h1>
            <Countdown targetDate={new Date('October 28, 2023')} />
            <div className='buttonSection w-fit h-fit flex mt-20'>
              <div className='buttonleft w-[50%] flex pr-6'>
                <button className='Daftar w-[220px] h-[80px] text-[16pt] font-bold font-poppins text-white bg-[#AB814E] rounded-md m-auto drop-shadow-[0_0px_20px_rgba(171,129,78,1)]'>
                  Daftar
                </button>
              </div>
              <div className='buttonRight w-[50%] flex pl-6'>
                <div className='outerContainer h-[80px] w-[220px] m-auto rounded-md flex bg-gradient-brown'>
                  <div className='pad w-fit h-fit m-auto bg-[#0F3015] rounded-sm'>
                    <button className='SeeMore m-auto text-[16pt] h-[72px] w-[211px] font-bold font-poppins rounded-sm bg-gradient-brown text-transparent bg-clip-text'>
                      See more
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='Section w-full h-[530px] sm:h-[1000px] lg:h-[1200px] xl:h-[1080px] pl-[0] pr-[0px] xl:pl-[100px] xl:pr-[100px] bg-gradient-to-b from-[rgba(7,29,16,0.45)] to-[#0F3015] bg-cover flex justify-center'>
        <div className='containerLuar relative top-[-210px] sm:top-[0] md:top-[-100px] lg:top-0 m-auto h-[950px] min-w-[750px] sm:h-[950px] sm:min-w-[750px] sm:w-[750px] md:min-w-[950px] md:w-[950px] md:h-[1200px] lg:h-[1200px] xl:w-full xl:h-[700px] rounded-[30px] bg-gradient-brown flex drop-shadow-[0_0px_20px_rgba(171,129,78,1)] scale-[45%] sm:scale-[65%] md:scale-[70%] lg:scale-75 xl:scale-100'>
          <div className='containerdalam m-auto w-[calc(100%-16px)] h-[calc(100%-16px)] rounded-[28px] bg-gradient-light-cards lg:block xl:flex items-center p-20 overflow-hidden justify-center'>
            <div className='ImageSection w-full md:h-[500px] xl:h-full xl:w-[30%] flex'>
              <Image
                src={'/mascot.svg'}
                alt={'Mascot'}
                width={100}
                height={100}
                className='mascot md:w-[300px] xl:w-[70%] m-auto'
              ></Image>
            </div>
            <div className='Description h-fit lg:h-fit xl:w-[70%] block'>
              <div className='font-museo-muderno w-full text-center font-bold text-[40pt] bg-gradient-brown text-transparent bg-clip-text drop-shadow-[0_0px_20px_rgba(171,129,78,1)] pt-10'>
                Apa itu Grand Seminar?
              </div>
              <p className='font-museo-muderno w-full text-justify font-bold text-[20pt] bg-gradient-brown text-transparent bg-clip-text drop-shadow-[0_0px_20px_rgba(171,129,78,1)] pt-10'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit
                amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className='Section w-full h-fit min-h-[1080px] pl-[100px] pr-[100px] bg-gradient-to-b from-[rgba(7,29,16,0.45)] to-[#0F3015] bg-cover block '>
        <div className='titleSegment w-full h-[200px] flex'>
          <div className='containerLuar m-auto mb-0 w-fit h-fit rounded-[30px] bg-gradient-light-brown flex drop-shadow-[0_0px_20px_rgba(219,184,139,0.7)]'>
            <div className='containerdalam w-fit h-fit rounded-[28px] bg-gradient-light-cards pl-16 pr-16 pt-6 pb-6 flex items-center overflow-hidden m-[8px]'>
              <h1 className='title font-museo-muderno text-center w-full font-bold text-[26pt] bg-gradient-brown text-transparent bg-clip-text drop-shadow-[0_0px_20px_rgba(171,129,78,1)] '>
                Our Speaker
              </h1>
            </div>
          </div>
        </div>
        <div className='CardsContainer h-fit'>
          <SpeakersCarousel />
        </div>
      </section>

      <section className='Section w-full h-fit min-h-[1080px] pl-[100px] pr-[100px] bg-gradient-to-b from-[rgba(7,29,16,0.45)] to-[#0F3015] bg-cover block '>
        <div className='titleSegment w-full h-[200px] flex'>
          <h1 className='title m-auto font-museo-muderno text-center w-full font-bold text-[26pt] bg-gradient-brown text-transparent bg-clip-text drop-shadow-[0_0px_20px_rgba(171,129,78,1)] '>
            Frequently Asked Question
          </h1>
        </div>
        <div className='CardsContainer h-fit space-y-7'>
          <FAQ question={'Kenapa Carousel itu susah'} answer={undefined}></FAQ>
          <FAQ question={'Elektro! Elektro! Elektro!'} answer={undefined}></FAQ>
        </div>
      </section>

      {/* <footer>Footer</footer>  */}
    </div>
  );
}
