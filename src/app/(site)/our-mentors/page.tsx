'use client';
import React from 'react';

import MentorCard from '@/components/mentorCards';
import MentorCarousel from '@/components/mentorsCarousel';

export default function Home() {
  return (
    <main className='w-screen bg-[#0b341a] text-white flex min-h-screen flex-col items-center justify-between'>
      <section className='w-screen h-fit bg-gradient-to-b from-[rgba(7,29,16,0.45)] to-[#0F3015]'>
        <div className='mx-20px flex flex-col justify-center items-center'>
          <div className='flex items-center justify-center w-[80%] h-[120px] mx-[10%] mt-[60px] mb-[20px] bg-gradient-brown border-2 border-solid border-[#AB814E] bg-transparent shadow-[0_0_0.9732px_#705229,0_0_1.9464px_#705229,0_0_6.8124px_#705229,0_0_13.6248px_#705229,0_0_23.3568px_#705229,0_0_40.8744px_#705229] p-1.5 rounded-2xl'>
            <div className='flex items-center justify-center w-full h-full bg-gradient-green p-4 rounded-xl'>
              <span
                style={{
                  ['textShadow' as any]: '0px 0px 17.32px #BD9B65',
                }}
                className='bg-gradient-brown text-center text-transparent drop-shadow-[2px_3px_10px_10px_#bbcc9e] bg-clip-text text-3xl lg:text-[40px] font-museo-muderno p-1 font-bold'
              >
                Our Mentors
              </span>
            </div>
          </div>
          <div className='h-fit w-screen flex flex-col items-center justify-center my-40'>
            <MentorCarousel />
          </div>
          <div className='flex items-center justify-center w-[80%] h-[120px] mx-[10%] my-[20px] bg-gradient-brown border-2 border-solid border-[#AB814E] bg-transparent shadow-[0_0_0.9732px_#705229,0_0_1.9464px_#705229,0_0_6.8124px_#705229,0_0_13.6248px_#705229,0_0_23.3568px_#705229,0_0_40.8744px_#705229] p-1.5 rounded-2xl'>
            <div className='flex items-center justify-center w-full h-full bg-gradient-green p-4 rounded-xl'>
              <span
                style={{
                  ['textShadow' as any]: '0px 0px 17.32px #BD9B65',
                }}
                className='bg-gradient-brown text-center text-transparent drop-shadow-[2px_3px_10px_10px_#bbcc9e] bg-clip-text text-3xl lg:text-[40px] font-museo-muderno p-1 font-bold'
              >
                Our Mentors
              </span>
            </div>
          </div>
          <div className='w-fit flex flex-col gap-16 items-center justify-center my-10'>
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
