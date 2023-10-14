'use client';

import dynamic from 'next/dynamic';

import IEEEITBStudentBranchIcon from '@/components/icons/IEEEITBStudentBranchIcon';
import SandboxByIEEEITBIcon from '@/components/icons/SandboxByIEEEITBIcon';

const Countdown = dynamic(() => import('@/components/Countdown'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className='flex h-0 min-h-screen w-0 min-w-[100vw] flex-col overflow-y-scroll font-museo-muderno'>
      {/* replace with navbar */}
      <nav className='w-full h-20 bg-[#051F12] sticky top-0 left-0 flex-shrink-0 z-[500]'>
        Navbar
      </nav>
      <section className='h-screen w-full flex flex-col bg-slate-800 flex-shrink-0'>
        {/* content */}
        <div className='flex w-full h-0 flex-grow flex-shrink-0 flex-col items-center justify-center'>
          <h1>Sandbox 2023</h1>
          <p>The Biggest Awikwok In The World</p>
          <button>See Our Events</button>
        </div>
      </section>

      {/* Countdown Section */}
      <section className='h-auto p-10 bg-gradient-to-b from-[#0b2712] to-[#123b1a]'>
        <div className='p-6 border-2 rounded-md flex flex-col items-center gap-8'>
          <h2 className='text-4xl font-bold'>
            Pendaftaran Exhibition akan segera ditutup!
          </h2>
          <Countdown targetDate={new Date('October 28, 2023')} />
          <div className='flex gap-4 py-8'>
            <button className='border-2 rounded-md px-2 py-1 font-poppins'>
              Daftar
            </button>
            <button className='border-2 rounded-md px-2 py-1 font-poppins'>
              See more
            </button>
          </div>
        </div>
      </section>

      {/* Trailer Section */}
      <section className='h-auto p-10 bg-[#092a16] flex flex-col items-center space-y-8'>
        <h2 className='text-4xl font-bold'>Trailer Sandbox 2023</h2>
        <div className='h-[400px] w-[500px] max-w-full rounded-lg bg-slate-200'>
          {/* Youtube iframe */}
        </div>
        <div className='flex gap-8'>
          <button className='border-2 rounded-md px-2 py-1 font-poppins'>
            Get To Know Us
          </button>
          <button className='border-2 rounded-md px-2 py-1 font-poppins'>
            Partner With Us
          </button>
        </div>
      </section>

      {/* About Sandbox */}
      <section className='h-auto p-10 bg-gradient-to-b from-[#0b2712] to-[#123b1a] flex justify-center items-center'>
        <div className='min-h-[660px] w-[1206px] rounded-xl border-2 bg-gradient-to-br from-[#84694875] via-white/5 to-[#84694875] flex flex-col items-center justify-center gap-8 p-4'>
          <div className=' relative text-4xl font-extrabold text-[#9a7037] '>
            <p className='absolute top-0 left-0 text-[#FFE1B9] backdrop-blur-sm text-center'>
              Apasih Sandbox Itu?
            </p>
            <h2 className='z-10 text-center'>Apasih Sandbox Itu?</h2>
          </div>
          <div className='flex gap-5 flex-wrap justify-center'>
            <SandboxByIEEEITBIcon />
            <IEEEITBStudentBranchIcon />
          </div>
          <p className='text-[#FFE1B9] sm:px-20'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>

          <button className='border-2 rounded-md px-2 py-1 font-poppins'>
            See More
          </button>
        </div>
      </section>

      {/* Our Events */}
      <section className='h-auto p-10 bg-gradient-to-b from-[#0b2712] to-[#123b1a] space-y-4 w-full'>
        {/* Title */}
        <div className='relative w-fit mx-auto'>
          <div className='rounded-[4px] overflow-hidden transition-all duration-300'>
            <div className='gradient-border-bg relative shadow-lg shadow-cream-secondary-light px-3 py-2'>
              <p className='py-4 text-transparent bg-clip-text bg-gradient-to-tr from-[#af8954] via-[#cfb57c] to-[#ede1a2] text-[32px] font-extrabold tracking-wider w-full text-center md:text-left shadow-lg'>
                Our Events
              </p>
            </div>
          </div>
          <div className='absolute top-0 blur-[4px] rounded-[4px] overflow-hidden transition-all duration-300'>
            <div className='gradient-border-bg relative shadow-lg shadow-cream-secondary-light px-3 py-2'>
              <p className='py-4 text-transparent bg-clip-text bg-gradient-to-tr from-[#af8954] via-[#cfb57c] to-[#ede1a2] text-[32px] font-extrabold tracking-wider w-full text-center md:text-left shadow-lg'>
                Our Events
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className='flex flex-col sm:flex-row w-full bg-[#071D10] shadow-md shadow-[#00000040] max-w-[1200px] mx-auto text-[#FFE1B9]'>
          <div className='w-full sm:w-[30%] sm:h-auto h-40 sm:aspect-[9/8] bg-slate-200 flex-shrink-0'></div>
          <div className='flex justify-center w-full p-8'>
            <div className='flex flex-col items-start w-full h-full'>
              <div className='relative shadow-lg'>
                <p className='py-4 text-transparent bg-clip-text bg-gradient-to-tr from-[#af8954] via-[#cfb57c] to-[#ede1a2] text-[32px] font-extrabold tracking-wider w-full text-center md:text-left shadow-lg font-poppins'>
                  Exhibition
                </p>

                <p className='py-4 text-transparent bg-clip-text bg-gradient-to-tr from-[#745737] to-[#c1aa8d] text-[32px] font-extrabold tracking-wider blur-[10px] absolute top-0 w-full text-center md:text-left select-none z-[50] font-poppins'>
                  Exhibition
                </p>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a
                ipsum at sapien dignissim interdum sit amet sit amet nisl.{' '}
              </p>
              <div className='flex gap-2 items-end h-full'>
                <button className='border-2'>REPLACE BUTTON Daftar</button>
                <button className='border-2'>REPLACE BUTTON See More</button>
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-col sm:flex-row-reverse w-full bg-[#071D10] shadow-md shadow-[#00000040] max-w-[1200px] mx-auto text-[#FFE1B9]'>
          <div className='w-full sm:w-[30%] sm:h-auto h-40 sm:aspect-[9/8] bg-slate-200 flex-shrink-0'></div>
          <div className='flex justify-center w-full p-8'>
            <div className='flex flex-col items-start w-full h-full'>
              <div className='relative shadow-lg'>
                <p className='py-4 text-transparent bg-clip-text bg-gradient-to-tr from-[#af8954] via-[#cfb57c] to-[#ede1a2] text-[32px] font-extrabold tracking-wider w-full text-center md:text-left shadow-lg font-poppins'>
                  Grand Seminar
                </p>

                <p className='py-4 text-transparent bg-clip-text bg-gradient-to-tr from-[#745737] to-[#c1aa8d] text-[32px] font-extrabold tracking-wider blur-[10px] absolute top-0 w-full text-center md:text-left select-none z-[50] font-poppins'>
                  Grand Seminar
                </p>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a
                ipsum at sapien dignissim interdum sit amet sit amet nisl.
              </p>
              <div className='flex gap-2 items-end h-full'>
                <button className='border-2'>REPLACE BUTTON Daftar</button>
                <button className='border-2'>REPLACE BUTTON See More</button>
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-col sm:flex-row w-full bg-[#071D10] shadow-md shadow-[#00000040] max-w-[1200px] mx-auto text-[#FFE1B9]'>
          <div className='w-full sm:w-[30%] sm:h-auto h-40 sm:aspect-[9/8] bg-slate-200 flex-shrink-0'></div>
          <div className='flex justify-center w-full p-8'>
            <div className='flex flex-col items-start w-full h-full'>
              <div className='relative shadow-lg'>
                <p className='py-2 text-transparent bg-clip-text bg-gradient-to-tr from-[#af8954] via-[#cfb57c] to-[#ede1a2] text-[32px] font-extrabold tracking-wider w-full text-center md:text-left shadow-lg font-poppins'>
                  PTC
                </p>

                <p className='py-2 text-transparent bg-clip-text bg-gradient-to-tr from-[#745737] to-[#c1aa8d] text-[32px] font-extrabold tracking-wider blur-[10px] absolute top-0 w-full text-center md:text-left select-none z-[50] font-poppins'>
                  PTC
                </p>
              </div>
              <div className='relative shadow-lg'>
                <p className='text-transparent bg-clip-text bg-gradient-to-tr from-[#af8954] via-[#cfb57c] to-[#ede1a2] text-[27px] font-extrabold tracking-wider w-full text-center md:text-left shadow-lg font-poppins'>
                  Total Prize 1000USD!
                </p>

                <p className='text-transparent bg-clip-text bg-gradient-to-tr from-[#745737] to-[#c1aa8d] text-[27px] font-extrabold tracking-wider blur-[10px] absolute top-0 w-full text-center md:text-left select-none z-[50] font-poppins'>
                  Total Prize 1000USD!
                </p>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a
                ipsum at sapien dignissim interdum sit amet sit amet nisl.{' '}
              </p>
              <div className='flex gap-2 items-end h-full'>
                <button className='border-2'>REPLACE BUTTON Daftar</button>
                <button className='border-2'>REPLACE BUTTON See More</button>
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-col sm:flex-row-reverse w-full bg-[#071D10] shadow-md shadow-[#00000040] max-w-[1200px] mx-auto text-[#FFE1B9]'>
          <div className='w-full sm:w-[30%] sm:h-auto h-40 sm:aspect-[9/8] bg-slate-200 flex-shrink-0'></div>
          <div className='flex justify-center w-full p-8'>
            <div className='flex flex-col items-start w-full h-full'>
              <div className='relative shadow-lg'>
                <p className='py-2 text-transparent bg-clip-text bg-gradient-to-tr from-[#af8954] via-[#cfb57c] to-[#ede1a2] text-[32px] font-extrabold tracking-wider w-full text-center md:text-left shadow-lg font-poppins'>
                  TPC
                </p>

                <p className='py-2 text-transparent bg-clip-text bg-gradient-to-tr from-[#745737] to-[#c1aa8d] text-[32px] font-extrabold tracking-wider blur-[10px] absolute top-0 w-full text-center md:text-left select-none z-[50] font-poppins'>
                  TPC
                </p>
              </div>
              <div className='relative shadow-lg'>
                <p className='text-transparent bg-clip-text bg-gradient-to-tr from-[#af8954] via-[#cfb57c] to-[#ede1a2] text-[27px] font-extrabold tracking-wider w-full text-center md:text-left shadow-lg font-poppins'>
                  Total Prize 1000USD!
                </p>

                <p className='text-transparent bg-clip-text bg-gradient-to-tr from-[#745737] to-[#c1aa8d] text-[27px] font-extrabold tracking-wider blur-[10px] absolute top-0 w-full text-center md:text-left select-none z-[50] font-poppins'>
                  Total Prize 1000USD!
                </p>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a
                ipsum at sapien dignissim interdum sit amet sit amet nisl.{' '}
              </p>
              <div className='flex gap-2 items-end h-full'>
                <button className='border-2'>REPLACE BUTTON Daftar</button>
                <button className='border-2'>REPLACE BUTTON See More</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className='h-auto p-10 bg-[#092a16]'>
        <div className='relative w-full text-center'>
          <div className='rounded-[4px] overflow-hidden transition-all duration-300 w-full'>
            <div className='gradient-border-bg relative shadow-lg shadow-cream-secondary-light px-3 py-2 w-full'>
              <p className='py-4 text-transparent bg-clip-text bg-gradient-to-tr from-[#af8954] via-[#cfb57c] to-[#ede1a2] text-[32px] font-extrabold tracking-wider w-full text-center shadow-lg'>
                Timeline
              </p>
            </div>
          </div>
          <div className='absolute top-0 blur-[4px] rounded-[4px] overflow-hidden transition-all duration-300 w-full'>
            <div className='gradient-border-bg relative shadow-lg shadow-cream-secondary-light px-3 py-2 w-full'>
              <p className='py-4 text-transparent bg-clip-text bg-gradient-to-tr from-[#af8954] via-[#cfb57c] to-[#ede1a2] text-[32px] font-extrabold tracking-wider w-full text-center shadow-lg'>
                Timeline
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ + Sponsor and media partner */}
      <section className='h-auto p-10 bg-gradient-to-b from-[#0b2712] to-[#123b1a]'>
        Frequently Asked Questions
      </section>

      <footer>Footer</footer>
    </main>
  );
}
