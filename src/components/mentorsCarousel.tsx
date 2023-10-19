'use client';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import React from 'react';
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import MentorCard from '@/components/mentorCards';

const MentorCarousel = () => {
  return (
    <section className='w-full h-screen flex items-center justify-center'>
      <div>
        <Swiper
          slidesPerView={3}
          spaceBetween={0}
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          pagination={{ el: '.swiper-pagination', clickable: true }}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className='mySwiper'
        >
          <div>
            <SwiperSlide>
              <div className=''>
                <MentorCard
                  name='Farhan Budi.'
                  position='President'
                  instagram='@alvinchrs'
                  company='/mentors/google.png'
                  imageUrl='/mentors/image1.jpg'
                >
                  “I’m never gonna give you up,” begitulah ucapan inspiratif
                  yang sering kita dengar dari Jajang, penulis buku ternama “Let
                  You Down”. Dengan karya tersebut, Jajang berhasil menjadi
                  penulis terproduktif se-dunia 2023 versi Majalah Times New
                  Roman
                </MentorCard>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className=''>
                <MentorCard
                  name='Bang Samsul.'
                  position='Manager'
                  instagram='@alvinchrs'
                  company='/mentors/google.png'
                  imageUrl='/mentors/image1.jpg'
                >
                  “I’m never gonna give you up,” begitulah ucapan inspiratif
                  yang sering kita dengar dari Jajang, penulis buku ternama “Let
                  You Down”. Dengan karya tersebut, Jajang berhasil menjadi
                  penulis terproduktif se-dunia 2023 versi Majalah Times New
                  Roman
                </MentorCard>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className=''>
                <MentorCard
                  name='Bubur Ayam.'
                  position='President'
                  instagram='@alvinchrs'
                  company='/mentors/google.png'
                  imageUrl='/mentors/image1.jpg'
                >
                  “I’m never gonna give you up,” begitulah ucapan inspiratif
                  yang sering kita dengar dari Jajang, penulis buku ternama “Let
                  You Down”. Dengan karya tersebut, Jajang berhasil menjadi
                  penulis terproduktif se-dunia 2023 versi Majalah Times New
                  Roman
                </MentorCard>
              </div>
            </SwiperSlide>
          </div>
        </Swiper>
      </div>
    </section>
  );
};

export default MentorCarousel;
