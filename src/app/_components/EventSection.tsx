import Image from 'next/image';
import Link from 'next/link';

import { EVENT_CONTENT } from '@/lib/event-content';

const event = EVENT_CONTENT['yif-x-grand-seminar'];

export default function EventSection() {
  return (
    <section className='py-12 md:py-20 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <h2
          className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 md:mb-16 font-gemunu'
          style={{
            background: 'linear-gradient(90deg, #7B1919 0%, #FFFFFF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Event
        </h2>

        <div className='relative bg-gradient-to-br from-[#8B2635] to-[#5A1623] rounded-3xl md:rounded-[54px] p-8 md:p-12 lg:p-16 border border-white/10 shadow-2xl overflow-hidden'>
          {/* Decorative mascots */}
          <div className='absolute -left-6 -bottom-6 opacity-20 pointer-events-none hidden md:block'>
            <Image
              src='/mascots/mascot-1.svg'
              alt=''
              width={200}
              height={200}
              className='w-40 lg:w-52'
            />
          </div>
          <div className='absolute -right-6 -top-6 opacity-20 pointer-events-none hidden md:block'>
            <Image
              src='/mascots/mascot-2.svg'
              alt=''
              width={200}
              height={200}
              className='w-40 lg:w-52'
            />
          </div>

          {/* Content */}
          <div className='relative z-10 flex flex-col items-center text-center'>
            <h3 className='text-3xl sm:text-4xl md:text-5xl font-bold text-white font-gemunu mb-3 md:mb-4'>
              {event.name}
            </h3>
            <p className='text-lg sm:text-xl md:text-2xl text-[#FFCD8D] font-gemunu mb-4 md:mb-6'>
              {event.tagline}
            </p>

            <p className='text-white/80 font-gemunu mb-2 text-sm sm:text-base max-w-3xl leading-relaxed line-clamp-3'>
              {event.description}
            </p>

            <div className='flex flex-wrap justify-center gap-3 text-white/60 font-gemunu text-sm sm:text-base mb-6 md:mb-8'>
              <span className='flex items-center gap-1.5'>📅 {event.date}</span>
              <span className='flex items-center gap-1.5'>
                📍 {event.venue}
              </span>
            </div>

            <Link
              href='/event'
              className='inline-block px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-[#FFCD8D] via-[#E8A05D] to-[#FFCD8D] rounded-full text-[#0B0102] font-bold font-gemunu text-base sm:text-lg hover:scale-105 transition-transform duration-300 shadow-xl shadow-orange-500/30'
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
