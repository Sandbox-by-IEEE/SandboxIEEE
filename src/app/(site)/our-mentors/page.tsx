'use client';
import React from 'react';

import Abstrak from '@/components/icons/mentors/abstrak1';
import Basket1 from '@/components/icons/mentors/basket1';
import Basket2 from '@/components/icons/mentors/basket2';
import Bintang2 from '@/components/icons/mentors/bintang2';
import Bintang1 from '@/components/icons/mentors/bintangmentor';
import Elips1 from '@/components/icons/mentors/elips1';
import Elips2 from '@/components/icons/mentors/elips2';
import Jatuh1 from '@/components/icons/mentors/jatuh1';
import Jatuh2 from '@/components/icons/mentors/jatuh2';
import MentorCard from '@/components/mentorCards';
import MentorCarousel from '@/components/mentorsCarousel';

export default function Home() {
  return (
    <main className='w-screen bg-[#0b341a] text-white flex min-h-screen flex-col items-center justify-between'>
      <section className='w-screen h-fit bg-gradient-to-b from-[rgba(7,29,16,0.45)] to-[#0F3015]'>
        <div className='mx-20px flex flex-col justify-center items-center'>
          <div className='absolute left-0 top-[400px]'>
            <Bintang2 size={25} />
          </div>
          <div className='absolute right-0 top-[400px]'>
            <Elips1 size={25} />
          </div>
          <div className='absolute left-0 top-[1100px]'>
            <Elips2 size={25} />
          </div>
          <div className='absolute right-0 top-[1050px]'>
            <Abstrak size={25} />
          </div>
          <div className='absolute left-0 top-[750px]'>
            <Jatuh1 size={25} />
          </div>
          <div className='absolute right-0 top-[3400px] sm:top-[2850px]'>
            <Jatuh2 size={25} />
          </div>
          <div className='flex items-center justify-center w-[80%] h-[160px] mx-[10%] mt-[120px] mb-[20px] bg-gradient-brown border-2 border-solid border-[#AB814E] bg-transparent shadow-[0_0_0.9732px_#705229,0_0_1.9464px_#705229,0_0_6.8124px_#705229,0_0_13.6248px_#705229,0_0_23.3568px_#705229,0_0_40.8744px_#705229] p-1.5 rounded-2xl'>
            <div className='relative w-full h-full bg-gradient-green p-4 rounded-xl'>
              <Basket1
                size={25}
                className='absolute -left-[85px] -top-[70px]'
              />
              <div className='flex items-center justify-center w-full h-full'>
                <span
                  style={{
                    ['textShadow' as any]: '0px 0px 17.32px #BD9B65',
                  }}
                  className='bg-gradient-brown text-center text-transparent drop-shadow-[2px_3px_10px_10px_#bbcc9e] bg-clip-text text-3xl lg:text-[50px] font-museo-muderno p-1 font-bold'
                >
                  Our Mentors
                </span>
              </div>
              <Basket2
                size={25}
                className='absolute -right-[100px] -bottom-[80px]'
              />
            </div>
          </div>
          <div className='h-fit w-screen flex flex-col items-center justify-center my-40'>
            <MentorCarousel />
          </div>
          <div className='flex items-center justify-center w-[80%] h-[160px] mx-[10%] mb-[100px] bg-gradient-brown border-2 border-solid border-[#AB814E] bg-transparent shadow-[0_0_0.9732px_#705229,0_0_1.9464px_#705229,0_0_6.8124px_#705229,0_0_13.6248px_#705229,0_0_23.3568px_#705229,0_0_40.8744px_#705229] p-1.5 rounded-2xl'>
            <div className='flex items-center justify-center w-full h-full bg-gradient-green p-4 rounded-xl'>
              <Bintang1
                size={23}
                className='flex items-center justify-center w-full h-full'
              >
                Our Mentors
              </Bintang1>
            </div>
          </div>
          <div className='z-10 w-fit flex flex-col gap-16 items-center justify-center mb-[200px]'>
            <MentorCard
              name='Bubur Ayam.'
              position='President'
              instagram='@alvinchrs'
              company='/mentors/google.png'
              imageUrl='/mentors/image1.jpg'
              horizontal={true}
            >
              “I’m never gonna give you up,” begitulah ucapan inspiratif yang
              sering kita dengar dari Jajang, penulis buku ternama “Let You
              Down”. Dengan karya tersebut, Jajang berhasil menjadi penulis
              terproduktif se-dunia 2023 versi Majalah Times New Roman
            </MentorCard>
            <MentorCard
              name='Bubur Ayam.'
              position='President'
              instagram='@alvinchrs'
              company='/mentors/google.png'
              imageUrl='/mentors/image1.jpg'
              horizontal={true}
              invert={true}
            >
              “I’m never gonna give you up,” begitulah ucapan inspiratif yang
              sering kita dengar dari Jajang, penulis buku ternama “Let You
              Down”. Dengan karya tersebut, Jajang berhasil menjadi penulis
              terproduktif se-dunia 2023 versi Majalah Times New Roman
            </MentorCard>
            <MentorCard
              name='Bubur Ayam.'
              position='President'
              instagram='@alvinchrs'
              company='/mentors/google.png'
              imageUrl='/mentors/image1.jpg'
              horizontal={true}
            >
              “I’m never gonna give you up,” begitulah ucapan inspiratif yang
              sering kita dengar dari Jajang, penulis buku ternama “Let You
              Down”. Dengan karya tersebut, Jajang berhasil menjadi penulis
              terproduktif se-dunia 2023 versi Majalah Times New Roman
            </MentorCard>
          </div>
        </div>
      </section>
      {/* You can map through the filteredData to display the results */}
    </main>
  );
}
