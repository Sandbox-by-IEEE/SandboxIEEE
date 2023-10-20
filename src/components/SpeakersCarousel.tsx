'use client';
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

import SpeakersCard from '@/components/SpeakerCard';
import { Speaker } from '@/types/grand-seminar';
interface SpeakersCarouselProps {
  data: Speaker[];
}
const SpeakersCarousel: React.FC<SpeakersCarouselProps> = ({ data }) => {
  return (
    <div className='SpeakersCarousel w-full h-[1080px] flex'>
      <div className='CarouselContainer w-[1300px] m-auto flex'>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, EffectCoverflow]}
          spaceBetween={50}
          slidesPerView={2}
          navigation
          pagination={{ clickable: true, type: 'bullets' }}
          scrollbar={{ draggable: true }}
          loop={true}
          effect={'coverflow'}
          coverflowEffect={{
            stretch: 0,
            depth: 50,
            modifier: 0,
            slideShadows: true,
          }}
        >
          {data.map((speaker) => (
            <SwiperSlide key={speaker.id}>
              <SpeakersCard
                id={speaker.id}
                name={speaker.name}
                instagramUsername={speaker.instagramUsername}
                imageSpeaker={speaker.imageSpeaker}
                explanationSpeaker={speaker.explanationSpeaker}
                company={speaker.company}
                positionSpeaker={speaker.positionSpeaker}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SpeakersCarousel;
