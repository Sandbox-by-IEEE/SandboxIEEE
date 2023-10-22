'use client';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import Image from 'next/image';
import React from 'react';
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import Button from '@/components/Button';
import Next from '@/components/icons/mentors/next';
import Prev from '@/components/icons/mentors/prev';

const MentorCarousel = () => {
  return (
    <section className='w-full h-fit flex items-center justify-center'>
      <div className='relative w-fit'>
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
            modifier: 5,
          }}
          pagination={{ el: '.swiper-custom-pagination', clickable: true }}
          navigation={{
            nextEl: '.swiper-next',
            prevEl: '.swiper-prev',
          }}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className='mySwiper relative flex gap-10'
        >
          <div className='relative gap-4'>
            <SwiperSlide className='flex items-center justify-center'>
              <div className='w-[448px] h-[448px]'>
                <Image
                  src='/mentors/image1.jpg'
                  className='w-full h-full object-cover rounded-3xl'
                  width={300}
                  height={300}
                  alt='name'
                ></Image>
              </div>
              <div className='w-full absolute bottom-10'>
                <div className='w-full flex items-center justify-center'>
                  <div className='w-[80%] bg-gradient-to-br from-[#ffb050] via-white/5 to-[#84694875] rounded-[26px] drop-shadow-[0px_0px_10px_rgba(255,255,255,0.7)]'>
                    <div className='bg-dark-green rounded-3xl m-[3px]'>
                      <div className='align-middle py-3 bg-gradient-to-br from-[#84694875] via-white/5 to-[#84694875] rounded-3xl h-[80px] flex flex-col text-center justify-center'>
                        <span
                          className='text-center align-middle text-2xl font-poppins font-bold bg-gradient-brown bg-clip-text text-transparent leading-6 tracking-wide'
                          style={{
                            textShadow: `
              0px 0px 0.9732px #705229,
              0px 0px 1.9464px #705229,
              0px 0px 40.8744px #705229
              0px 0px 23.3568px #705229,
              0px 0px 13.6248px #705229,
              0px 0px 6.8124px #705229,
              `,
                          }}
                        >
                          burhan
                        </span>
                        <div className='align-middle flex gap-1 items-center justify-center'>
                          <span className='align-middle text-center font-poppins font-bold text-sm bg-gradient-brown bg-clip-text text-transparent leading-6 tracking-wide'>
                            President at
                          </span>
                          <div className='h-[25px] w-[50px]'>
                            <Image
                              src={'/mentors/google.png'}
                              className='w-[50px] h-[25px]'
                              width={60}
                              height={0}
                              alt={'name'}
                            ></Image>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className='flex items-center justify-center'>
              <div className='w-[448px] h-[448px]'>
                <Image
                  src='/mentors/image1.jpg'
                  className='w-full h-full object-cover rounded-3xl'
                  width={300}
                  height={300}
                  alt='name'
                ></Image>
                <div className='w-full absolute bottom-10'>
                  <div className='w-full flex items-center justify-center'>
                    <div className='w-[80%] bg-gradient-to-br from-[#ffb050] via-white/5 to-[#84694875] rounded-[26px] drop-shadow-[0px_0px_10px_rgba(255,255,255,0.7)]'>
                      <div className='bg-dark-green rounded-3xl m-[3px]'>
                        <div className='align-middle py-3 bg-gradient-to-br from-[#84694875] via-white/5 to-[#84694875] rounded-3xl h-[80px] flex flex-col text-center justify-center'>
                          <span
                            className='text-center align-middle text-2xl font-poppins font-bold bg-gradient-brown bg-clip-text text-transparent leading-6 tracking-wide'
                            style={{
                              textShadow: `
              0px 0px 0.9732px #705229,
              0px 0px 1.9464px #705229,
              0px 0px 40.8744px #705229
              0px 0px 23.3568px #705229,
              0px 0px 13.6248px #705229,
              0px 0px 6.8124px #705229,
              `,
                            }}
                          >
                            burhan
                          </span>
                          <div className='align-middle flex gap-1 items-center justify-center'>
                            <span className='align-middle text-center font-poppins font-bold text-sm bg-gradient-brown bg-clip-text text-transparent leading-6 tracking-wide'>
                              President at
                            </span>
                            <div className='h-[25px] w-[50px]'>
                              <Image
                                src={'/mentors/google.png'}
                                className='w-[50px] h-[25px]'
                                width={60}
                                height={0}
                                alt={'name'}
                              ></Image>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className='flex items-center justify-center'>
              <div className='w-[448px] h-[448px]'>
                <Image
                  src='/mentors/image1.jpg'
                  className='w-full h-full object-cover rounded-3xl'
                  width={300}
                  height={255}
                  alt='name'
                ></Image>
              </div>
              <div className='w-full absolute bottom-10'>
                <div className='w-full flex items-center justify-center'>
                  <div className='w-[80%] bg-gradient-to-br from-[#ffb050] via-white/5 to-[#84694875] rounded-[26px] drop-shadow-[0px_0px_10px_rgba(255,255,255,0.7)]'>
                    <div className='bg-dark-green rounded-3xl m-[3px]'>
                      <div className='align-middle py-3 bg-gradient-to-br from-[#84694875] via-white/5 to-[#84694875] rounded-3xl h-[80px] flex flex-col text-center justify-center'>
                        <span
                          className='text-center align-middle text-2xl font-poppins font-bold bg-gradient-brown bg-clip-text text-transparent leading-6 tracking-wide'
                          style={{
                            textShadow: `
              0px 0px 0.9732px #705229,
              0px 0px 1.9464px #705229,
              0px 0px 40.8744px #705229
              0px 0px 23.3568px #705229,
              0px 0px 13.6248px #705229,
              0px 0px 6.8124px #705229,
              `,
                          }}
                        >
                          burhan
                        </span>
                        <div className='align-middle flex gap-1 items-center justify-center'>
                          <span className='align-middle text-center font-poppins font-bold text-sm bg-gradient-brown bg-clip-text text-transparent leading-6 tracking-wide'>
                            President at
                          </span>
                          <div className='h-[25px] w-[50px]'>
                            <Image
                              src={'/mentors/google.png'}
                              className='w-[50px] h-[25px]'
                              width={60}
                              height={0}
                              alt={'name'}
                            ></Image>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </div>
          <div className='my-10 flex items-center justify-center'>
            <Button color='gold'>See More</Button>
          </div>
          <div className='flex items-center justify-center'>
            <div className='  swiper-prev slider-arrow'>
              <Prev size={25} />
            </div>
            <div className='flex items-center justify-center'>
              <div className='swiper-custom-pagination flex items-center justify-center gap-2 w-full h-[20px]'></div>
            </div>
            <div className='swiper-next slider-arrow'>
              <Next size={25} />
            </div>
          </div>
        </Swiper>
      </div>
    </section>
  );
};

export default MentorCarousel;
