// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import React from 'react';
// import required modules
import { Navigation, Pagination } from 'swiper/modules';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

const NormalSlider = ({ children }: { children: React.ReactNode[] }) => {
  return (
    <Swiper
      slidesPerView={1}
      grabCursor={true}
      centeredSlides={true}
      pagination={true}
      navigation={true}
      loop={true}
      modules={[Pagination, Navigation]}
      className='mySwiper overflow-visible'
      initialSlide={2}
    >
      {children.map((child, idx) => (
        <SwiperSlide key={idx} className='overflow-visible my-10 w-full'>
          {child}
        </SwiperSlide>
      ))}
      ...
    </Swiper>
  );
};

export default NormalSlider;
