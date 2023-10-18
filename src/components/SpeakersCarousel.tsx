import SpeakersCard from '@/components/SpeakersCard';

function SpeakersCarousel() {
  return (
    <div className='SpeakersCarousel w-full h-[1080px] flex'>
      <div className='CarouselContainer w-[1200px] m-auto flex'>
        <div className='section1 h-full flex w-[calc(100%/3)] '>
          <SpeakersCard style='scale-90 brightness-75' />
          <SpeakersCard style='scale-90 brightness-75' />
        </div>
        <div className='section2 h-full flex w-[calc(100%/3)]'>
          <SpeakersCard style='' />
        </div>
        <div className='section3 h-full flex w-[calc(100%/3)]'>
          <SpeakersCard style='scale-90 brightness-75' />
          <SpeakersCard style='scale-90 brightness-75' />
        </div>
      </div>
    </div>
  );
}

export default SpeakersCarousel;
