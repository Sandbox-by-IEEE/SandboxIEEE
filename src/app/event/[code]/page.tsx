'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import {
  Calendar,
  MapPin,
  Users,
} from 'lucide-react';

import Footer from '@/components/site/Footer';
import Navbar from '@/components/site/Navbar';
import { getEventContent } from '@/lib/event-content';

export default function EventDetailPage() {
  const params = useParams();
  const code = params.code as string;
  const content = getEventContent(code);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  // Countdown timer
  const dateISO = content?.dateISO || '';

  const isUpcoming = useMemo(() => {
    if (!dateISO) return false;
    return new Date() < new Date(dateISO);
  }, [dateISO]);

  useEffect(() => {
    if (!dateISO) return;
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
  }, [dateISO]);

  if (!content) {
    return (
      <div className='min-h-screen bg-[#0B0102] flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold text-white mb-4'>
            Event Not Found
          </h1>
          <Link href='/' className='text-[#FFCD8D] hover:underline'>
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const countdownLabel = isUpcoming ? 'Event Starts In' : 'Stay Tuned';

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
              {/* Event Name */}
              <div className='text-center mb-6 sm:mb-8'>
                <h1 className='text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-3 sm:mb-4 tracking-wide'>
                  {content.name}
                </h1>
                <p className='text-xl md:text-2xl text-gray-300'>
                  {content.tagline}
                </p>
              </div>

              {/* Countdown Timer */}
              {isUpcoming && (
                <div className='text-center mb-8 sm:mb-12'>
                  <p className='text-gray-400 mb-4 sm:mb-6 text-base sm:text-lg'>
                    {countdownLabel}
                  </p>
                  <div className='flex justify-center gap-3 sm:gap-4 md:gap-8'>
                    {[
                      { label: 'Days', value: timeLeft.days },
                      { label: 'Hours', value: timeLeft.hours },
                      { label: 'Minutes', value: timeLeft.minutes },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className='backdrop-blur-md bg-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 min-w-[80px] sm:min-w-[100px] md:min-w-[140px]'
                      >
                        <div className='text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-1 sm:mb-2'>
                          {item.value.toString().padStart(2, '0')}
                        </div>
                        <div className='text-xs sm:text-sm md:text-base text-gray-400 uppercase tracking-wider'>
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* If not upcoming, show a coming soon message */}
              {!isUpcoming && (
                <div className='text-center mb-8'>
                  <p className='text-xl text-gray-400'>{countdownLabel}</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* What is [Event]? */}
        <section className='py-20 px-4 sm:px-6 lg:px-8'>
          <div className='max-w-6xl mx-auto'>
            <h2 className='text-4xl md:text-5xl font-bold text-white text-center mb-12'>
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
              <h2 className='text-3xl sm:text-4xl font-bold text-white text-center mb-10 font-gemunu'>
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
                <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-white font-gemunu text-center mb-14'>
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
