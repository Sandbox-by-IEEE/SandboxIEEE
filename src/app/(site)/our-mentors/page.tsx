'use client';
import React from 'react';

import MentorCard from '@/components/mentorCards';

export default function Home() {
  return (
    <main className='w-screen bg-[#0b341a] text-white flex min-h-screen flex-col items-center justify-between'>
      <section className='w-screen bg-gradient-to-b from-[rgba(7,29,16,0.45)] to-[#0F3015]'>
        <div className=' h-full w-screen flex flex-col items-center justify-center my-20'>
          <div className=''>
            <MentorCard
              name='Farhan Budi.'
              position='President'
              instagram='@alvinchrs'
              company='/mentors/google.png'
              imageUrl='/mentors/image1.jpg'
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
