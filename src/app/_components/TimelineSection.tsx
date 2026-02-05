import Image from 'next/image';

export default function TimelineSection() {
  const timeline = [
    { label: 'Open Registration', date: '16 Feb', image: '/timeline/circle-1.svg' },
    { label: 'Close Registration', date: '16 Feb', image: '/timeline/circle-2.svg' },
    { label: 'Technical Meeting', date: '16 Feb', image: '/timeline/circle-3.svg' },
    { label: 'Main Event', date: '16 Feb', image: '/timeline/circle-4.svg' },
    { label: 'Judges', date: '16 Feb', image: '/timeline/circle-5.svg' },
  ];

  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 md:mb-16 font-gemunu"
          style={{
            background: 'linear-gradient(90deg, #7B1919 0%, #FFFFFF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Our Timeline
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {timeline.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mb-3 md:mb-4">
                <Image
                  src={item.image}
                  alt={item.label}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-white font-gemunu mb-1">
                {item.date}
              </div>
              <div className="text-white/70 font-gemunu text-xs sm:text-sm md:text-base">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
