'use client';
import Image from 'next/image';
import Link from 'next/link';

import Button from '@/components/Button';

import background from '../../public/404assets/Background_Sandbox_Logo.png';
import bucket from '../../public/404assets/sand.png';

export default function Home() {
  return (
    <main className='relative flex min-h-screen min-w-screen bg-[#0F3015] flex-col items-center p-24'>
      <Image
        src='404assets/Bintang_jatuh.svg'
        className='absolute right-2 w-[20%] -translate-y-20 translate-x-1 object-contain transition-all duration-300'
        alt='tes'
        width={744}
        height={642}
      />
      <Image
        src='404assets/ring.svg'
        className='absolute right-0 top-0 w-[25%] sm:w-[10%] -translate-x-10 object-contain transition-all duration-300'
        alt='tes'
        width={199}
        height={199}
      />
      {/*Background*/}
      <div className='absolute top-0 left-0 z-0 w-screen h-screen object-contain flex items-center justify-center'>
        <Image
          src={background}
          alt=''
          className='sm:w-[90%] sm:h-[90%] w-[578px] h-[393px] object-contain transition-all duration-300'
          width={1315}
          height={887}
        />
      </div>

      {/*Content*/}
      <div className='relative bg-scroll justify-items-center w-fit h-fit flex flex-col items-center'>
        <Image
          src={bucket}
          alt=''
          className='z-50 object-contain w-[174px] h-[251px] sm:w-[182px] sm:h-[280px] transition-all duration-300'
          width={165}
          height={220}
        />
        <div className='flex flex-col items-center'>
          <h1 className='font-Poppins sm:text-[56px] text-[40px] text-center font-semibold text-white transition-all duration-300'>
            Ups!
          </h1>
          <p className='font-Poppins font-light text-[20px] sm:text-[28px] text-center text-white transition-all duration-300'>
            Halaman yang anda cari tidak ada.
          </p>
          <div className='translate-y-6'>
            <Link href='.'>
              <Button color='gold'>Kembali</Button>
            </Link>
          </div>
        </div>
      </div>
      <Image
        src='404assets/Bintang_jatuh.svg'
        className='absolute rotate-[165deg] bottom-0 left-0 object-contain w-[20%] sm:-translate-x-10 -translate-x-20 -translate-y-10 transition-all duration-300'
        alt='tes'
        width={744}
        height={642}
      />
      <Image
        src='404assets/Vector_155.svg'
        className='absolute bottom-0 left-1 object-contain w-[25%] sm:w-[13%] sm:translate-x-10  translate-x-15 -translate-y-5 transition-all duration-300'
        alt='tes'
        width={236}
        height={206}
      />
    </main>
  );
}
