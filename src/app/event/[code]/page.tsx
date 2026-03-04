'use client';

import { Briefcase, ChevronDown, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import Footer from '@/components/site/Footer';
import Navbar from '@/components/site/Navbar';
import { getEventContent, Speaker } from '@/lib/event-content';

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

              {/* Action Buttons */}
              {content.links.length > 0 && (
                <div className='flex flex-wrap justify-center gap-3 sm:gap-4 mt-4'>
                  {content.links.map((link, index) => {
                    // Internal links use Next.js Link (no new tab)
                    const isInternal = link.url.startsWith('/');
                    if (isInternal) {
                      return (
                        <Link
                          key={index}
                          href={link.url}
                          className='px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-[#3a1a10] to-[#2a1008] border border-[#FFCD8D]/20 text-[#FFCD8D] font-semibold text-sm sm:text-base hover:from-[#4a2a18] hover:to-[#3a1a10] hover:border-[#FFCD8D]/40 transition-all duration-300 shadow-lg shadow-black/20'
                        >
                          {link.label}
                        </Link>
                      );
                    }
                    return (
                      <a
                        key={index}
                        href={link.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-[#3a1a10] to-[#2a1008] border border-[#FFCD8D]/20 text-[#FFCD8D] font-semibold text-sm sm:text-base hover:from-[#4a2a18] hover:to-[#3a1a10] hover:border-[#FFCD8D]/40 transition-all duration-300 shadow-lg shadow-black/20'
                      >
                        {link.label}
                      </a>
                    );
                  })}
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

        {/* LinkTree — buttons moved into the hero card above */}

        {/* Speakers Section */}
        {content.speakers && content.speakers.length > 0 && (
          <SpeakersSection speakers={content.speakers} />
        )}
      </main>

      <Footer />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * Speaker Card — modern profile-card design with portrait, identity & details
 * ───────────────────────────────────────────────────────────────────────────── */

function SpeakerCard({ speaker }: { speaker: Speaker }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className='relative backdrop-blur-xl bg-white/[0.06] rounded-3xl border border-white/10 overflow-hidden transition-all duration-500 hover:border-[#FFCD8D]/30 hover:bg-white/[0.08] hover:shadow-2xl hover:shadow-[#FFCD8D]/10 group'>
      {/* Decorative top accent */}
      <div className='absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#FFCD8D]/40 to-transparent' />

      {/* Portrait Image — large with soft gradient fade */}
      <div className='relative w-full aspect-[4/5] bg-gradient-to-b from-white/[0.04] to-transparent overflow-hidden'>
        {speaker.imageUrl ? (
          <Image
            src={speaker.imageUrl}
            alt={speaker.name}
            fill
            sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px'
            className='object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]'
          />
        ) : (
          <div className='flex items-center justify-center h-full'>
            <Users className='w-20 h-20 text-white/15' />
          </div>
        )}
        {/* Smooth bottom gradient for text readability */}
        <div className='absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#0B0102] via-[#0B0102]/70 to-transparent' />
      </div>

      {/* Identity */}
      <div className='relative px-6 sm:px-8 -mt-14 z-10'>
        {/* Name + verified accent */}
        <div className='flex items-center gap-2.5'>
          <h3 className='text-xl sm:text-2xl font-bold text-white font-gemunu leading-tight'>
            {speaker.name}
          </h3>
          <svg
            viewBox='0 0 24 24'
            className='w-5 h-5 shrink-0 text-[#FFCD8D]'
            fill='currentColor'
          >
            <path d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z' />
          </svg>
        </div>

        {/* Title */}
        <div className='flex items-start gap-2 mt-2'>
          <Briefcase className='w-4 h-4 text-[#FFCD8D]/70 mt-0.5 shrink-0' />
          <p className='text-sm text-[#FFCD8D]/80 font-medium leading-snug'>
            {speaker.title}
          </p>
        </div>
      </div>

      {/* Description */}
      <div className='px-6 sm:px-8 pt-5 pb-6'>
        <p className='text-sm text-gray-300/80 leading-relaxed line-clamp-4'>
          {speaker.description}
        </p>

        {/* Stats row */}
        {speaker.highlights && speaker.highlights.length > 0 && (
          <div className='flex items-center gap-4 mt-5 pt-5 border-t border-white/[0.06]'>
            <div className='flex items-center gap-1.5 text-sm text-gray-400'>
              <Briefcase className='w-3.5 h-3.5 text-[#FFCD8D]/60' />
              <span className='text-white font-semibold'>
                {speaker.highlights.length}
              </span>
              <span>Highlights</span>
            </div>

            <div className='flex-1' />

            <button
              onClick={() => setExpanded(!expanded)}
              className='flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#FFCD8D]/20 text-sm font-semibold text-[#FFCD8D]/80 hover:text-[#FFCD8D] hover:border-[#FFCD8D]/40 transition-all duration-300'
            >
              <span>{expanded ? 'Collapse' : 'Expand'}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
              />
            </button>
          </div>
        )}
      </div>

      {/* Expandable Highlights */}
      {speaker.highlights && speaker.highlights.length > 0 && (
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${expanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <ul className='px-6 sm:px-8 pb-6 space-y-2.5'>
            {speaker.highlights.map((item, i) => (
              <li
                key={i}
                className='flex items-start gap-2.5 text-sm text-gray-300/80 leading-relaxed'
              >
                <span className='text-[#FFCD8D] mt-0.5 shrink-0'>✦</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function SpeakersSection({ speakers }: { speakers: Speaker[] }) {
  return (
    <section className='py-20 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-5xl mx-auto'>
        <h2
          className='text-3xl sm:text-4xl md:text-5xl font-bold text-white font-gemunu text-center mb-4'
          data-aos='fade-up'
        >
          Our Speakers
        </h2>
        <p
          className='text-gray-400 text-center text-base sm:text-lg mb-12 sm:mb-16 max-w-2xl mx-auto'
          data-aos='fade-up'
          data-aos-delay='100'
        >
          Hear from industry leaders and innovators shaping the future of Smart
          Automation Technology.
        </p>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto'>
          {speakers.map((speaker, index) => (
            <div key={index} data-aos='fade-up' data-aos-delay={index * 150}>
              <SpeakerCard speaker={speaker} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
