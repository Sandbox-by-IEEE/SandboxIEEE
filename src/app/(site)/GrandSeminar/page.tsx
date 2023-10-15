'use client';

import Countdown from '@/components/Countdown';

export default function GrandSeminar() {
  return (
    <div className='flex min-h-screen h-fit w-0 min-w-[100vw] flex-col bg-[#081E11]'>
      {/* replace with navbar */}
      <nav className='w-full h-20 bg-[#051F12] sticky top-0 left-0 flex-shrink-0 z-[500]'>
        Navbar
      </nav>

      <section className='HeroSection w-full h-[calc(100vh-200px)] bg-grand-seminar-banner bg-cover flex overflow-hidden'>
        <div className='container w-full h-full bg-g-seminar-radial-gradient m-auto flex overflow-hidden'>
          <div className='objects block w-fit h-fit m-auto '>
            <h1 className='title font-museo-muderno font-bold text-[70pt] bg-gradient-brown text-transparent bg-clip-text drop-shadow-[0_0px_20px_rgba(171,129,78,1)]'>
              grand seminar
            </h1>
            <div className='buttonSection flex justify-center'>
              <button className='button text-white font-poppins font-bold text-[24px] pt-6 pb-6 pr-16 pl-16 w-fit h fit mt-9 bg-[#0D432F] rounded-lg drop-shadow-[0px_0px_20px_rgba(255,251,185,1)]'>
                REGISTER
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className='Section w-full h-[calc(100vh)] pl-[100px] pr-[100px] bg-gradient-to-b from-[rgba(7,29,16,0.45)] to-[#0F3015] bg-cover flex overflow-hidden'>
        <div className='containerLuar m-auto w-[100%] max-w-[75vw] h-[65%] rounded-[30px] bg-gradient-brown flex min-w-fit'>
          <div className='containerdalam m-auto w-[calc(100%-16px)] h-[calc(100%-16px)] rounded-[28px] bg-gradient-to-b from-[rgba(7,29,16)] to-[#0F3015] overflow-hidden flex flex-col items-center p-32 min-w-fit'>
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
                  <div className='pad w-fit h-fit m-auto bg-[rgba(7,29,16,1)] rounded-sm'>
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

      <section className='Section w-full h-[calc(100vh)] bg-gradient-to-b from-[rgba(7,29,16,0.45)] to-[#0F3015] bg-cover flex overflow-hidden'></section>

      <section className='Section w-full h-[calc(100vh)] bg-gradient-to-b from-[rgba(7,29,16,0.45)] to-[#0F3015] bg-cover flex overflow-hidden'></section>

      <section className='Section w-full h-[calc(100vh)] bg-gradient-to-b from-[rgba(7,29,16,0.45)] to-[#0F3015] bg-cover flex overflow-hidden'></section>

      {/* <footer>Footer</footer>  */}
    </div>
  );
}
