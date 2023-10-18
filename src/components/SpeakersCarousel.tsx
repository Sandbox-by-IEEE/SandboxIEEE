import 'swiper/css';
import 'swiper/css/effect-coverflow';

import {
  A11y,
  EffectCoverflow,
  Navigation,
  Pagination,
  Scrollbar,
} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import SpeakersCard from '@/components/SpeakersCard';

function SpeakersCarousel() {
  return (
    <div className='SpeakersCarousel w-full h-[1080px] flex'>
      <div className='CarouselContainer w-[1200px] m-auto flex'>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, EffectCoverflow]}
          spaceBetween={50}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true, type: 'bullets' }}
          scrollbar={{ draggable: true }}
          loop={true}
          effect={'coverflow'}
          coverflowEffect={{
            stretch: 0,
            depth: 100,
            modifier: 9,
            slideShadows: true,
          }}
        >
          <SwiperSlide>
            <SpeakersCard />
          </SwiperSlide>
          <SwiperSlide>
            <SpeakersCard />
          </SwiperSlide>
          <SwiperSlide>
            <SpeakersCard />
          </SwiperSlide>
          <SwiperSlide>
            <SpeakersCard />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default SpeakersCarousel;
