'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { Users } from 'lucide-react';

import Footer from '@/components/site/Footer';
import Navbar from '@/components/site/Navbar';
import { EVENT_CONTENT } from '@/lib/event-content';

const content = EVENT_CONTENT['yif-x-grand-seminar'];

export default function EventPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  const dateISO = content.dateISO;

  const isUpcoming = useMemo(() => {
    return new Date() < new Date(dateISO);
  }, []);

  useEffect(() => {
    const target = new Date(dateISO);

    const calculateTimeLeft = () => {
      const difference = target.getTime() - new Date().getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000);
    return () => clearInterval(timer);
  }, []);

  const countdownLabel = isUpcoming ? 'Event Starts In' : 'Event Has Ended';

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B0102] via-[#190204] to-[#0B0102] font-['Gemunu_Libre']">
      <Navbar />

      <main>
        {/* Hero Section with Countdown */}
        <section className='relative min-h-screen flex items-center justify-center overflow-hidden pt-20'>
          {/* Background Blobs */}
          <div className='absolute inset-0 pointer-events-none overflow-hidden'>
            <Image
              src='/hero/hero-circle-1.svg'
              alt=''
              width={800}
              height={800}
              className='absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/2 opacity-70'
            />
            <Image
              src='/hero/hero-circle-2.svg'
              alt=''
              width={800}
              height={800}
              className='absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2 opacity-70'
            />
          </div>

          {/* Glass Card */}
          <div className='relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32'>
            <div
              className='relative backdrop-blur-[99px] bg-white/[0.08] rounded-3xl md:rounded-[99px] border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] p-6 sm:p-8 md:p-12 lg:p-16'
              style={{
                boxShadow: '0 8px 32px 0 rgba(77, 77, 77, 0.37)',
                WebkitBackdropFilter: 'blur(10px)',
              }}
            >
              {/* Logo */}
              <div className='flex justify-center mb-8 md:mb-12'>
                <Image
                  src='/logo/logo-white.svg'
                  alt='Sandbox Logo'
                  width={80}
                  height={80}
                  className='w-16 h-16 md:w-20 md:h-20'
                  priority
                />
              </div>

              {/* Title with Mascots */}
              <div className='relative flex items-center justify-center mb-8 md:mb-12'>
                {/* Mascot Left */}
                <Image
                  src='/mascots/mascot-1.svg'
                  alt='Mascot'
                  width={200}
                  height={200}
                  className='absolute left-2 sm:left-4 md:left-6 lg:left-12 w-16 h-16 sm:w-20 sm:h-20 md:w-32 md:h-32 lg:w-40 lg:h-40 z-30'
                  priority
                />

                {/* Event Name */}
                <h1
                  className='text-3xl sm:text-3xl md:text-5xl lg:text-7xl font-bold font-gemunu tracking-wider relative z-20 px-14 sm:px-16 md:px-24 lg:px-32 text-center'
                  style={{
                    background:
                      'linear-gradient(90deg, #FFCD8D 0%, #FFFFFF 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 0 20px rgba(255, 205, 141, 0.5))',
                  }}
                >
                  {content.name}
                </h1>

                {/* Mascot Right */}
                <Image
                  src='/mascots/mascot-2.svg'
                  alt='Mascot'
                  width={200}
                  height={200}
                  className='absolute right-2 sm:right-4 md:right-6 lg:right-12 w-16 h-16 sm:w-20 sm:h-20 md:w-32 md:h-32 lg:w-40 lg:h-40 z-30'
                  priority
                />
              </div>

              {/* Tagline */}
              <p className='text-lg md:text-2xl text-gray-300 text-center mb-8 sm:mb-12 italic'>
                {content.tagline}
              </p>

              {/* Countdown Label */}
              <p className='text-gray-400 text-center mb-4 sm:mb-6 text-base sm:text-lg'>
                {countdownLabel}
              </p>

              {/* Countdown Timer */}
              <div className='flex items-center justify-center gap-2 sm:gap-4 md:gap-6 mb-8 md:mb-12'>
                <div className='text-center'>
                  <div className='bg-black/30 rounded-2xl sm:rounded-3xl px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 border border-white/10'>
                    <div className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white font-gemunu'>
                      {String(timeLeft.days).padStart(2, '0')}
                    </div>
                  </div>
                  <div className='text-white/70 text-xs sm:text-sm md:text-base font-gemunu mt-2 uppercase tracking-wider'>
                    Days
                  </div>
                </div>

                <div className='text-3xl sm:text-4xl md:text-5xl font-bold text-white/50 font-gemunu'>
                  :
                </div>

                <div className='text-center'>
                  <div className='bg-black/30 rounded-2xl sm:rounded-3xl px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 border border-white/10'>
                    <div className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white font-gemunu'>
                      {String(timeLeft.hours).padStart(2, '0')}
                    </div>
                  </div>
                  <div className='text-white/70 text-xs sm:text-sm md:text-base font-gemunu mt-2 uppercase tracking-wider'>
                    Hours
                  </div>
                </div>

                <div className='text-3xl sm:text-4xl md:text-5xl font-bold text-white/50 font-gemunu'>
                  :
                </div>

                <div className='text-center'>
                  <div className='bg-black/30 rounded-2xl sm:rounded-3xl px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 border border-white/10'>
                    <div className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white font-gemunu'>
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </div>
                  </div>
                  <div className='text-white/70 text-xs sm:text-sm md:text-base font-gemunu mt-2 uppercase tracking-wider'>
                    Minutes
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What is YIF x Grand Seminar? */}
        <section className='py-20 px-4 sm:px-6 lg:px-8'>
          <div className='max-w-6xl mx-auto'>
            <h2
              className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-gemunu text-center mb-12'
              style={{
                background: 'linear-gradient(90deg, #7B1919 0%, #FFFFFF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              What is {content.name}?
            </h2>
            <div className='backdrop-blur-xl bg-white/[0.08] rounded-3xl border border-white/10 p-8 md:p-12'>
              <p className='text-lg md:text-xl text-gray-300 leading-relaxed text-center'>
                {content.description}
              </p>
            </div>
          </div>
        </section>

        {/* LinkTree */}
        {content.links.length > 0 && (
          <section className='py-16 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-md mx-auto'>
              <h2
                className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-gemunu text-center mb-10'
                style={{
                  background:
                    'linear-gradient(90deg, #7B1919 0%, #FFFFFF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                LinkTree
              </h2>

              <div className='space-y-4'>
                {content.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='block w-full text-center py-3.5 px-6 rounded-full bg-gradient-to-r from-[#3a1a10] to-[#2a1008] border border-[#FFCD8D]/20 text-[#FFCD8D] font-semibold text-base sm:text-lg hover:from-[#4a2a18] hover:to-[#3a1a10] hover:border-[#FFCD8D]/40 transition-all duration-300 shadow-lg shadow-black/20'
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Announcement Speaker */}
        {content.speakers && content.speakers.length > 0 && (
          <section className='py-20 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-5xl mx-auto'>
              <div className='backdrop-blur-xl bg-white/[0.06] rounded-3xl border border-white/10 p-6 sm:p-8 md:p-12'>
                {/* Title */}
                <h2
                  className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-gemunu text-center mb-14'
                  style={{
                    background:
                      'linear-gradient(90deg, #7B1919 0%, #FFFFFF 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Announcement Speaker
                </h2>

                {/* Speakers - Alternating Layout */}
                <div className='space-y-10 md:space-y-14'>
                  {content.speakers.map((speaker, index) => {
                    const isEven = index % 2 === 0;

                    return (
                      <div
                        key={index}
                        className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6 md:gap-8 items-center`}
                      >
                        {/* Description */}
                        <div className='flex-1 backdrop-blur-xl bg-white/[0.06] rounded-2xl border border-white/10 p-6 sm:p-8'>
                          <p className='text-sm sm:text-base text-gray-300 leading-relaxed'>
                            {speaker.description}
                          </p>
                        </div>

                        {/* Speaker Image + Name */}
                        <div className='flex flex-col items-center shrink-0'>
                          <div className='w-40 h-48 sm:w-48 sm:h-56 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center overflow-hidden'>
                            {speaker.imageUrl ? (
                              <Image
                                src={speaker.imageUrl}
                                alt={speaker.name}
                                width={192}
                                height={224}
                                className='w-full h-full object-cover'
                              />
                            ) : (
                              <Users className='w-16 h-16 text-white/20' />
                            )}
                          </div>
                          <p className='mt-3 text-white font-bold text-lg sm:text-xl font-gemunu'>
                            {speaker.name}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
