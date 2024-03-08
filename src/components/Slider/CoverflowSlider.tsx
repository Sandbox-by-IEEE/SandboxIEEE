// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import React from 'react';
// import required modules
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

const CoverFlowSlider = ({ children }: { children: React.ReactNode[] }) => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
      effect={'coverflow'}
      grabCursor={true}
      centeredSlides={true}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
      }}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={true}
      navigation={true}
      loop={true}
      modules={[EffectCoverflow, Pagination, Navigation]}
      className='mySwiper overflow-visible shadow-none'
      initialSlide={2}
    >
      {children.map((child, idx) => (
        <SwiperSlide key={idx} className='overflow-visible my-10 w-fit'>
          {child}
        </SwiperSlide>
      ))}
      ...
    </Swiper>
  );
};

export default CoverFlowSlider;
