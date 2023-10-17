import SpeakersCard from '@/components/SpeakersCard';

function SpeakersCarousel() {
  return (
    <div className='SpeakersCarousel w-full h-[1080px] flex'>
      <div className='CarouselContainer w-fit h-fit m-auto'>
        <SpeakersCard />
      </div>
    </div>
  );
}

export default SpeakersCarousel;
