'use client';

// import PrototechContest from '@/app/tpc/components/PrototechContest';
import Button from '@/components/Button';
import Countdown from '@/components/Countdown';

import Image from 'next/image';
import React, { useState } from 'react';

type GlassCarousel = {
  title: string;
  photos?: string[];
};

function CarouselButtons({ numActive, setNumActive, capacity }) {
  return (
    <div className='w-[60%] lg:w-[9%] relative flex flex-row justify-between items-center'>
      {Array.from(Array(capacity), (_, i) => (
        <div key={i} className='relative rounded-full'>
          <button
            className='rounded-full aspect-square w-4  absolute'
            onClick={() => setNumActive(i + 1)}
          >
            <Image
              src={`${
                i + 1 != numActive ? '/lightcircle.svg' : '/darkcircle.svg'
              }`}
              alt=''
              fill
            />
          </button>
        </div>
      ))}
    </div>
  );
}

function GoldenBorderBox({ children }) {
  return (
    <div className='h-full px-0.5 py-0.5 bg-gradient-to-tr from-[#AB814E] to-[#FFFBB9] rounded shadow-lg shadow-[0px_0px_5px_1px_rgba(171,129,78,0.8)] m-4 w-full h-full'>
      {' '}
      <div className='w-full h-full bg-green-primary rounded shadow-lg shadow-[0px_0px_5px_1px_rgba(171,129,78,0.8)_inset] p-4 flex flex-row justify-center items-center relative'>
        {children}
      </div>
    </div>
  );
}

function GlassCarousel({ title, photos }: GlassCarousel) {
  const [numActive, setNumActive] = useState<number>(1);
  const photoss = ['/checked.svg', '/google-logo.png'];
  return (
    <>
      <div className='h-[340px] lg:h-[510px] w-full rounded-xl border-2 bg-gradient-to-br from-[#84694875] via-white/5 to-[#84694875] flex flex-col items-center gap-8 justify-center p-4'>
        <div className='relative  text-lg lg:text-4xl font-extrabold text-[#9a7037] '>
          <p className='absolute top-0 left-0 text-[#FFE1B9] backdrop-blur-sm'>
            {title}
          </p>
          <h2 className='z-10'>{title}</h2>
        </div>

        <div className='aspect-video w-4/5 lg:w-1/2 relative'>
          <div className='absolute w-full h-full duration-500'>
            <Image fill alt='' src={photoss[numActive - 1]} objectFit='cover' />
          </div>
        </div>

        <CarouselButtons
          numActive={numActive}
          setNumActive={setNumActive}
          capacity={5}
        />
      </div>
    </>
  );
}

function Judule({ title, colorClass }: { title: string; colorClass?: string }) {
  return (
    <div className='relative text-4xl font-extrabold text-[#9a7037] px-4 py-2 inline-block'>
      {/* <div className='aspect-square w-8 absolute z-10 top-[-20px] left-[-30px] rotate-[23deg]'>
        <Image src='/sparkle.svg' alt='' fill></Image>
      </div>
      <div className='aspect-square w-[25px] absolute z-10 bottom-[-10px] left-[-30px] rotate-[43deg]'>
        <Image src='/sparkle.svg' alt='' fill></Image>
      </div>
      <div className='aspect-square w-[25px] absolute z-10 top-[-20px] w-[32px] right-[-20px] rotate-[23deg]'>
        <Image src='/sparkle.svg' alt='' fill></Image>
      </div>
      <div className='aspect-square w-8 absolute z-10 bottom-[-10px] right-[-30px] rotate-[43deg]'>
        <Image src='/sparkle.svg' alt='' fill></Image>
      </div> */}
      <p className='absolute top-0 left-0 text-[#FFE1B9] backdrop-blur-sm bg-gradient-to-tr from-[#AB814E] to-[#FFFBB9] inline-block text-transparent bg-clip-text px-4 py-2'>
        {title}
      </p>
      <h2 className={`text-[#AB814E] text-[36px]`}>{title}</h2>
    </div>
  );
}

export default function TPC() {
  return (
    <main className='flex h-0 min-h-screen w-0 min-w-[100vw] flex-col overflow-y-scroll font-museo-muderno'>
      {/*PROTOTECH CONTEST*/}
      <section
        className='h-auto p-10 bg-gradient-to-b from-[#0b2712] to-[#123b1a]'
        style={
          {
            // backgroundImage: 'url(public/assets/image8.png)',
          }
        }
      >
        <div className='p-6 rounded-md flex flex-col items-center gap-8 mx-4 my-12'>
          <div className='w-full flex flex-row items-center justify-center'>
            <Judule
              title='Prototech Contest'
              colorClass='bg-gradient-to-tr from-[#AB814E] to-[#FFFBB9]'
            />
          </div>
          <div
            className='rounded-lg'
            style={{ boxShadow: '0px 0px 5px 2px rgba(171,129,78,0.8)' }}
          >
            <Button
              children='REGISTER'
              color='green'
              isIcon={false}
              isFullWidth={true}
              isDisabled={false}
            />
          </div>
        </div>
      </section>
      {/* END PROTOTECH CONTEST */}

      {/*APA ITU TPC*/}
      <section
        className='h-auto p-10 bg-gradient-to-b from-[#0b2712] to-[#123b1a] flex flex-col gap-16 '
        style={{
          backgroundImage: 'linear-gradient(to bottom, #0b2713, #0f3015)',
        }}
      >
        <div
          className='p-2 rounded-xl flex flex-col items-center gap-8 lg:mx-12 my-12 bg-gradient-to-r from-[#AB814E] to-[#FFFBB9]'
          style={{ backgroundColor: 'rgba(171,129,78,0.8)' }}
        >
          <div
            className='h-full w-full rounded-xl'
            style={{
              backgroundImage: 'linear-gradient(to bottom, #0b2713, #0f3015)',
            }}
          >
            <div className='w-full flex flex-row items-center justify-center mt-8'>
              <Judule
                title='Apa itu TPC?'
                colorClass='bg-gradient-to-tr from-[#AB814E] to-[#FFFBB9]'
              />
            </div>
            <div className='w-full flex flex-col lg:flex-row justify-left items-center mb-8'>
              <div className='aspect-video w-full lg:w-[40%] relative'>
                <div className='absolute w-full aspect-video duration-500'>
                  <Image
                    fill
                    alt=''
                    src={'/Group_1235.png'}
                    objectFit='contain'
                  />
                </div>
              </div>
              <article className='w-full lg:w-[50%] lg:-mx-16 font-poppins justify-center text-justify'>
                <p className='text-[#FFE1B9] text-lg mx-2'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                  minim veniam, quis nostrud exercitation ullamco laboris nisi
                  ut aliquip ex ea commodo consequat.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>
      {/* END APA ITU TPC */}

      {/* HADIAH */}
      <section className='h-auto p-10 bg-gradient-to-b from-[#0b2712] to-[#123b1a] flex flex-col gap-16 '>
        <div className='flex flex-col items-center gap-8 '>
          <div className='w-full flex flex-row items-center justify-center'>
            <Judule
              title='Hadiah'
              colorClass='bg-gradient-to-tr from-[#AB814E] to-[#FFFBB9]'
            />
          </div>
          <div className='w-full flex flex-col lg:flex-row gap-8 justify-left items-center mb-12'>
            <div className='aspect-video w-full lg:w-[30%] relative lg:mr-32 left-[-20px]'>
              <div className='aspect-square w-[40%] absolute z-10 lg:top-[-40px] w-[32px] lg:left-[202px] rotate-[-23.7deg]'>
                <Image
                  fill
                  alt=''
                  src={'/Group_1244.svg'}
                  objectFit='contain'
                />
              </div>
            </div>
            <article className='w-full lg:w-[40%] font-poppins text-justify justify-center'>
              <p className='text-[#FFE1B9] text-xl font-semibold'>
                Juara 1: Rp4.500.000,00 + e-sertifikat
              </p>
              <p className='text-[#FFE1B9] text-xl font-semibold'>
                Juara 2: Rp2.500.000,00 + e-sertifikat
              </p>
              <p className='text-[#FFE1B9] text-xl font-semibold'>
                Juara 3: Rp1.500.000,00 + e-sertifikat
              </p>
            </article>
            <div className='aspect-video w-full lg:w-[30%] relative'>
              <div className='aspect-square w-[190px] absolute z-10 bottom-[-62px] right-[172px] rotate-[]'>
                <Image
                  fill
                  alt=''
                  src={'/Group_1243.svg'}
                  objectFit='contain'
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END HADIAH */}

      {/* REGULASI */}
      <section
        className='h-auto p-10 bg-gradient-to-b from-[#0b2712] to-[#123b1a] flex flex-col gap-16 '
        style={{
          backgroundImage:
            'linear-gradient(to bottom, rgba(5, 31, 18, 0.9961), rgba(6, 25, 12, 0.9961))',
        }}
      >
        <div
          className='p-2 rounded-xl flex flex-col items-center gap-8 lg:mx-12 my-12'
          style={{ backgroundColor: '#0F3015' }}
        >
          <div className='h-full w-full rounded-xl'>
            <div className='my-8 w-full flex flex-row items-center justify-center'>
              <Judule
                title='Regulasi Perlombaan'
                colorClass='bg-gradient-to-tr from-[#AB814E] to-[#FFFBB9]'
              />
            </div>
            <div className='w-full flex flex-col lg:flex-row gap-8 justify-left items-center lg:px-20 pb-12'>
              <article className='w-full lg:w-[100%] font-poppins text-justify justify-center'>
                <p className='text-white text-base font-semibold'>
                  1. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Neque in voluptate magnam, itaque eaque soluta. Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Neque in
                  voluptate magnam, itaque eaque soluta.
                </p>
                <p className='text-white text-base font-semibold'>
                  2. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Neque in voluptate magnam, itaque eaque soluta. Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Neque in
                  voluptate magnam, itaque eaque soluta.
                </p>
                <p className='text-white text-base font-semibold'>
                  3. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Neque in voluptate magnam, itaque eaque soluta. Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Neque in
                  voluptate magnam, itaque eaque soluta.
                </p>
                <p className='text-white text-base font-semibold'>
                  4. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Neque in voluptate magnam, itaque eaque soluta. Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Neque in
                  voluptate magnam, itaque eaque soluta.
                </p>
                <p className='text-white text-base font-semibold'>
                  5. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Neque in voluptate magnam, itaque eaque soluta. Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Neque in
                  voluptate magnam, itaque eaque soluta.
                </p>
                <p className='text-white text-base font-semibold'>
                  6. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Neque in voluptate magnam, itaque eaque soluta. Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Neque in
                  voluptate magnam, itaque eaque soluta.
                </p>
                <p className='text-white text-base font-semibold'>
                  7. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Neque in voluptate magnam, itaque eaque soluta. Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Neque in
                  voluptate magnam, itaque eaque soluta.
                </p>
                <p className='text-white text-base font-semibold'>
                  8. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Neque in voluptate magnam, itaque eaque soluta. Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Neque in
                  voluptate magnam, itaque eaque soluta.
                </p>
                <p className='text-white text-base font-semibold'>
                  9. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Neque in voluptate magnam, itaque eaque soluta. Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Neque in
                  voluptate magnam, itaque eaque soluta.
                </p>
                <p className='text-white text-base font-semibold'>
                  10. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Neque in voluptate magnam, itaque eaque soluta. Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Neque in
                  voluptate magnam, itaque eaque soluta.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>
      {/* END REGULASI */}

      {/* REGISTRATION */}
      <section className='h-auto p-10 bg-gradient-to-b from-[#0b2712] to-[#123b1a] flex flex-col gap-16 '>
        <div className='flex flex-col items-center gap-8 '>
          <div className='w-full flex flex-row items-center justify-center'>
            <Judule
              title='Registration Fees'
              colorClass='bg-gradient-to-tr from-[#AB814E] to-[#FFFBB9]'
            />
          </div>
          <div className='w-full flex flex-col lg:flex-row gap-8 justify-left items-center pb-8'>
            <div className='aspect-video w-full lg:w-[30%] relative'>
              <div className='aspect-square w-[40%] absolute z-10 top-[-40px] w-[32px] left-[202px] rotate-[-23.7deg]'>
                <Image
                  fill
                  alt=''
                  src={'/Group_1244.svg'}
                  objectFit='contain'
                />
              </div>
            </div>
            <article className='w-full lg:w-[40%] font-poppins text-center justify-center'>
              <p className='text-[#FFFBB9] text-xl font-semibold'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis, numquam veniam repellat atque.
              </p>
            </article>
            <div className='aspect-video w-full lg:w-[30%] relative'>
              <div className='aspect-square w-[190px] absolute z-10 bottom-[-62px] right-[172px] rotate-[]'>
                <Image
                  fill
                  alt=''
                  src={'/Group_1243.svg'}
                  objectFit='contain'
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END REGISTRATION */}

      {/* COUNTDOWN */}
      <section className='h-auto p-10 bg-gradient-to-b from-[#0b2712] to-[#123b1a] flex flex-col gap-16 '>
        <div className='p-6 border-2 rounded-xl flex flex-col items-center gap-8 mx-8 my-12 py-16'>
          <div className='w-full flex flex-row items-center justify-center'>
            <Judule
              title='Pendaftaran TPC akan segera ditutup!'
              colorClass='bg-gradient-to-tr from-[#AB814E] to-[#FFFBB9]'
            />
          </div>
          <div className='w-full flex flex-col lg:flex-row justify-center items-center mt-4'>
            <div className='aspect-video w-full lg:w-[30%] relative'>
              <div className='aspect-square w-[190px] absolute z-10 bottom-[-62px] right-[172px] rotate-[]'></div>
            </div>
            <article className='w-full lg:w-[100%] lg:px-20 font-poppins'>
              <Countdown targetDate={new Date('2023-12-31T23:59:59')} />
            </article>
            <div className='aspect-video w-full lg:w-[30%] relative'>
              <div className='aspect-square w-[190px] absolute z-10 bottom-[-62px] right-[172px] rotate-[]'></div>
            </div>
          </div>

          <div className='w-full flex flex-col lg:flex-row justify-center items-center gap-2 mt-12'>
            <div className='w-[180px]'>
              <Button
                children='Daftar'
                color='gold'
                isIcon={false}
                isFullWidth={true}
                isDisabled={false}
              />
            </div>
            <div className='border-2 border-[#AB814E] rounded-lg w-[180px]'>
              <Button
                children='See more'
                color='green'
                isIcon={false}
                isFullWidth={true}
                isDisabled={false}
              />
            </div>
          </div>
        </div>
      </section>
      {/* END COUNTDOWN */}

      {/* TIMELINE */}
      <section className='h-auto p-10 bg-gradient-to-b from-[#0b2712] to-[#123b1a] flex flex-col gap-16'>
        <div className='p-6 border-2 rounded-xl flex flex-col items-center gap-8 mx-12 my-12'>
          <div className='w-full flex flex-row items-center justify-center'>
            <Judule
              title='Timeline'
              colorClass='bg-gradient-to-tr from-[#AB814E] to-[#FFFBB9]'
            />
          </div>
        </div>

        {/* KIRI */}
        <div className='w-full flex flex-row lg:flex-row justify-center items-center px-20 divide-x-[16px]'>
          <div className='w-full flex flex-col'>
            <div className='w-full lg:w-[100%] font-poppins justify-center text-justify my-4 invisible'>
              <p className='text-[#FFE1B9] text-lg mx-4'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat.
              </p>
            </div>
            <div className='w-full flex flex-row lg:w-[100%] font-poppins justify-center text-justify my-4'>
              <div className='w-10/12 flex flex-row text-center mt-4'>
                <div className='w-fit border-2 rounded-xl p-12 ml-64'>
                  <p className='text-[#FFE1B9] text-lg font-bold'>
                    15 Oktober 2023
                  </p>
                  <p className='text-[#FFE1B9] text-lg'>Open Regist PTC</p>
                </div>
              </div>
              <div className='aspect-video w-full lg:w-2/12 relative right-[-60px] top-[50px]'>
                <div className='absolute w-full aspect-video duration-500'>
                  <Image
                    fill
                    alt=''
                    src={'/Ellipse396.svg'}
                    objectFit='contain'
                  />
                </div>
              </div>
            </div>
            <div className='w-full lg:w-[100%] font-poppins justify-center text-justify my-4 invisible'>
              <p className='text-[#FFE1B9] text-lg mx-4'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat.
              </p>
            </div>
            <div className='w-full flex flex-row lg:w-[100%] font-poppins justify-center text-justify my-4'>
              <div className='w-10/12 flex flex-row text-center mt-4'>
                <div className='w-fit border-2 rounded-xl p-12 ml-64'>
                  <p className='text-[#FFE1B9] text-lg font-bold'>
                    15 Oktober 2023
                  </p>
                  <p className='text-[#FFE1B9] text-lg'>Open Regist PTC</p>
                </div>
              </div>
              <div className='aspect-video w-full lg:w-2/12 relative right-[-60px] top-[50px]'>
                <div className='absolute w-full aspect-video duration-500'>
                  <Image
                    fill
                    alt=''
                    src={'/Ellipse396.svg'}
                    objectFit='contain'
                  />
                </div>
              </div>
            </div>
            <div className='w-full lg:w-[100%] font-poppins justify-center text-justify my-4 invisible'>
              <p className='text-[#FFE1B9] text-lg mx-4'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
          {/* END KIRI */}

          {/* KANAN */}
          <div className='w-full flex flex-col'>
            <div className='w-full flex flex-row lg:w-[100%] font-poppins justify-center text-justify my-4'>
              <div className='aspect-video w-full lg:w-2/12 relative left-[-60px] top-[50px]'>
                <div className='absolute w-full aspect-video duration-500'>
                  <Image
                    fill
                    alt=''
                    src={'/Ellipse396.svg'}
                    objectFit='contain'
                  />
                </div>
              </div>
              <div className='w-10/12 flex flex-row text-center mt-4'>
                <div className='w-fit border-2 rounded-xl p-12'>
                  <p className='text-[#FFE1B9] text-lg font-bold'>
                    15 Oktober 2023
                  </p>
                  <p className='text-[#FFE1B9] text-lg'>Open Regist PTC</p>
                </div>
              </div>
            </div>
            <div className='w-full lg:w-[100%] font-poppins justify-center text-justify my-4 invisible'>
              <p className='text-[#FFE1B9] text-lg mx-4'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat.
              </p>
            </div>
            <div className='w-full flex flex-row lg:w-[100%] font-poppins justify-center text-justify my-4'>
              <div className='aspect-video w-full lg:w-2/12 relative left-[-60px] top-[50px]'>
                <div className='absolute w-full aspect-video duration-500'>
                  <Image
                    fill
                    alt=''
                    src={'/Ellipse396.svg'}
                    objectFit='contain'
                  />
                </div>
              </div>
              <div className='w-10/12 flex flex-row text-center mt-4'>
                <div className='w-fit border-2 rounded-xl p-12'>
                  <p className='text-[#FFE1B9] text-lg font-bold'>
                    15 Oktober 2023
                  </p>
                  <p className='text-[#FFE1B9] text-lg'>Open Regist PTC</p>
                </div>
              </div>
            </div>
            <div className='w-full lg:w-[100%] font-poppins justify-center text-justify my-4 invisible'>
              <p className='text-[#FFE1B9] text-lg mx-4'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat.
              </p>
            </div>
            <div className='w-full flex flex-row lg:w-[100%] font-poppins justify-center text-justify my-4'>
              <div className='aspect-video w-full lg:w-2/12 relative left-[-60px] top-[50px]'>
                <div className='absolute w-full aspect-video duration-500'>
                  <Image
                    fill
                    alt=''
                    src={'/Ellipse396.svg'}
                    objectFit='contain'
                  />
                </div>
              </div>
              <div className='w-10/12 flex flex-row text-center mt-4'>
                <div className='w-fit border-2 rounded-xl p-12'>
                  <p className='text-[#FFE1B9] text-lg font-bold'>
                    15 Oktober 2023
                  </p>
                  <p className='text-[#FFE1B9] text-lg'>Open Regist PTC</p>
                </div>
              </div>
            </div>
          </div>
          {/* END KANAN */}
        </div>
      </section>
      {/* END TIMELINE */}

      {/* FAQ */}
      <section className='h-auto p-10 bg-gradient-to-b from-[#0b2712] to-[#123b1a] flex flex-col gap-16 '>
        <div className='p-6 flex flex-col items-center gap-8 mx-12 my-12'>
          <div className='w-full flex flex-row items-center justify-center'>
            <Judule
              title='Frequently Asked Questions'
              colorClass='bg-gradient-to-tr from-[#AB814E] to-[#FFFBB9]'
            />
          </div>
          <div className='w-full border-2 rounded-lg p-8 flex flex-col lg:flex-col justify-left items-center'>
            <div className='w-full lg:w-[100%] font-poppins justify-center text-justify lg:-ml-8'>
              <Judule
                title='Bagaimana caranya dapet IP4?'
                colorClass='bg-gradient-to-tr from-[#AB814E] to-[#FFFBB9]'
              />
            </div>
            <article className='w-full lg:w-[100%] font-poppins justify-center text-justify'>
              <p className='text-[#FFE1B9] text-lg'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat.
              </p>
            </article>
          </div>
          <div className='w-full border-2 rounded-lg p-8 flex flex-col lg:flex-col justify-left items-center'>
            <div className='w-full lg:w-[100%] font-poppins justify-center text-justify lg:-ml-8'>
              <Judule
                title='Bagaimana caranya dapet IP4?'
                colorClass='bg-gradient-to-tr from-[#AB814E] to-[#FFFBB9]'
              />
            </div>
            <article className='w-full lg:w-[100%] font-poppins justify-center text-justify'>
              <p className='text-[#FFE1B9] text-lg'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat.
              </p>
            </article>
          </div>
          <div className='w-full border-2 rounded-lg p-8 flex flex-col lg:flex-col justify-left items-center'>
            <div className='w-full lg:w-[100%] font-poppins justify-center text-justify lg:-ml-8'>
              <Judule
                title='Bagaimana caranya dapet IP4?'
                colorClass='bg-gradient-to-tr from-[#AB814E] to-[#FFFBB9]'
              />
            </div>
            <article className='w-full lg:w-[100%] font-poppins justify-center text-justify'>
              <p className='text-[#FFE1B9] text-lg'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat.
              </p>
            </article>
          </div>
        </div>
      </section>
      {/* END FAQ */}
    </main>
  );
}
