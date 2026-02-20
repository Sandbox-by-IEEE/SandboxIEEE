'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import {
  ChevronRight,
  ChevronDown,
  Trophy,
  Calendar,
  FileText,
  CheckCircle2,
} from 'lucide-react';

import Footer from '@/components/site/Footer';
import Navbar from '@/components/site/Navbar';
import { getCompetitionContent, formatDate } from '@/lib/competition-content';

interface TimelineEvent {
  id: string;
  phase: string;
  label: string;
  description: string | null;
  startDate: string;
  endDate: string;
  sortOrder: number;
  phaseType: string;
}

interface CompetitionData {
  id: string;
  code: string;
  name: string;
  description: string | null;
  registrationOpen: string;
  registrationDeadline: string;
  preliminaryStart: string;
  preliminaryDeadline: string;
  semifinalStart: string;
  semifinalDeadline: string;
  finalStart: string | null;
  finalDeadline: string | null;
  grandFinalDate: string | null;
  registrationFee: number;
  minTeamSize: number;
  maxTeamSize: number;
  isActive: boolean;
  timelineEvents: TimelineEvent[];
}

export default function CompetitionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const code = (params.code as string).toUpperCase();
  const content = getCompetitionContent(code);

  const [competition, setCompetition] = useState<CompetitionData | null>(null);
  const [loading, setLoading] = useState(true);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  // Fetch competition data from DB (includes timeline events and deadlines)
  useEffect(() => {
    async function fetchCompetition() {
      try {
        const res = await fetch(`/api/competitions/${code.toLowerCase()}`);
        if (res.ok) {
          const data = await res.json();
          setCompetition(data.competition || data);
        }
      } catch {
        // Fallback to content-only mode
      } finally {
        setLoading(false);
      }
    }
    fetchCompetition();
  }, [code]);

  // Countdown to registration deadline (from DB)
  // Use stable string values for deps to prevent infinite re-render loops
  const deadlineStr =
    competition?.registrationDeadline || '2026-03-08T16:59:59Z';
  const regOpenStr = competition?.registrationOpen || '2026-02-20T17:00:00Z';

  const { isRegOpen, isRegUpcoming } = useMemo(() => {
    const now = new Date();
    const dl = new Date(deadlineStr);
    const ro = new Date(regOpenStr);
    return {
      isRegOpen: now >= ro && now <= dl,
      isRegUpcoming: now < ro,
    };
  }, [deadlineStr, regOpenStr]);

  useEffect(() => {
    const deadline = new Date(deadlineStr);
    const registrationOpen = new Date(regOpenStr);
    const target = isRegUpcoming ? registrationOpen : deadline;

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
  }, [deadlineStr, regOpenStr, isRegUpcoming]);

  if (!content) {
    return (
      <div className='min-h-screen bg-[#0B0102] flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold text-white mb-4'>
            Competition Not Found
          </h1>
          <Link href='/' className='text-[#FFCD8D] hover:underline'>
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  // Determine countdown label
  const countdownLabel = isRegUpcoming
    ? 'Registration Opens In'
    : isRegOpen
      ? 'Registration Closes In'
      : 'Registration Closed';

  // Use DB timeline events if available, otherwise empty
  const timelineEvents: TimelineEvent[] = competition?.timelineEvents || [];

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
              className='relative backdrop-blur-[99px] bg-white/[0.08] rounded-[99px] border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] p-8 md:p-12 lg:p-16'
              style={{
                boxShadow: '0 8px 32px 0 rgba(77, 77, 77, 0.37)',
                WebkitBackdropFilter: 'blur(10px)',
              }}
            >
              {/* Competition Name */}
              <div className='text-center mb-8'>
                <h1 className='text-5xl md:text-7xl font-bold text-white mb-4 tracking-wide'>
                  {content.name}
                </h1>
                <p className='text-xl md:text-2xl text-gray-300'>
                  {content.tagline}
                </p>
              </div>

              {/* Countdown Timer */}
              <div className='text-center mb-12'>
                <p className='text-gray-400 mb-6 text-lg'>{countdownLabel}</p>
                <div className='flex justify-center gap-4 md:gap-8'>
                  {[
                    { label: 'Days', value: timeLeft.days },
                    { label: 'Hours', value: timeLeft.hours },
                    { label: 'Minutes', value: timeLeft.minutes },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className='backdrop-blur-md bg-white/10 rounded-3xl p-6 md:p-8 min-w-[100px] md:min-w-[140px]'
                    >
                      <div className='text-4xl md:text-6xl font-bold text-white mb-2'>
                        {item.value.toString().padStart(2, '0')}
                      </div>
                      <div className='text-sm md:text-base text-gray-400 uppercase tracking-wider'>
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div className='text-center'>
                {status === 'loading' || loading ? (
                  <div className='inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-400 rounded-full text-white font-bold text-xl opacity-50'>
                    Loading...
                  </div>
                ) : !isRegOpen ? (
                  <div className='inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-gray-500 via-gray-600 to-gray-500 rounded-full text-white/70 font-bold text-xl cursor-not-allowed'>
                    {isRegUpcoming
                      ? 'Registration Not Yet Open'
                      : 'Registration Closed'}
                  </div>
                ) : session ? (
                  <Link
                    href={`/competitions/${code.toLowerCase()}/register`}
                    className='inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#FFCD8D] via-[#E8A05D] to-[#FFCD8D] rounded-full text-[#0B0102] font-bold text-xl hover:scale-105 transition-transform duration-300 shadow-xl shadow-orange-500/30'
                  >
                    Register Now
                    <ChevronRight size={24} />
                  </Link>
                ) : (
                  <button
                    onClick={() =>
                      router.push(
                        '/login?callbackUrl=' +
                          encodeURIComponent(
                            `/competitions/${code.toLowerCase()}/register`,
                          ),
                      )
                    }
                    className='inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#FFCD8D] via-[#E8A05D] to-[#FFCD8D] rounded-full text-[#0B0102] font-bold text-xl hover:scale-105 transition-transform duration-300 shadow-xl shadow-orange-500/30'
                  >
                    Login to Register
                    <ChevronRight size={24} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* About Competition */}
        <section className='py-20 px-4 sm:px-6 lg:px-8'>
          <div className='max-w-6xl mx-auto'>
            <h2 className='text-4xl md:text-5xl font-bold text-white text-center mb-12'>
              About The Competition
            </h2>
            <div className='backdrop-blur-xl bg-white/[0.08] rounded-3xl border border-white/10 p-8 md:p-12'>
              <p className='text-lg md:text-xl text-gray-300 leading-relaxed text-center'>
                {content.description}
              </p>
            </div>
          </div>
        </section>

        {/* Prize Pool */}
        <section className='py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-[#190204]/50 to-transparent'>
          <div className='max-w-6xl mx-auto'>
            <div className='text-center'>
              <Trophy className='inline-block text-[#FFCD8D] mb-4' size={48} />
              <h2 className='text-4xl md:text-5xl font-bold text-white mb-8'>
                Prize Pool
              </h2>

              {/* Single Total Prize Badge */}
              <div className='inline-block backdrop-blur-xl bg-gradient-to-br from-[#FFD700]/20 to-[#FFA500]/10 rounded-3xl border-2 border-[#FFD700]/30 px-12 py-10'>
                <div className='text-6xl mb-4'>🏆</div>
                <p className='text-2xl text-gray-300 mb-2'>Total Prize Pool</p>
                <p className='text-5xl md:text-6xl font-bold text-[#FFD700]'>
                  {content.prizePool.total}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className='py-20 px-4 sm:px-6 lg:px-8'>
          <div className='max-w-5xl mx-auto'>
            <div className='text-center mb-12'>
              <Calendar
                className='inline-block text-[#FFCD8D] mb-4'
                size={48}
              />
              <h2 className='text-4xl md:text-5xl font-bold text-white'>
                {content.name}&apos;s Timeline
              </h2>
            </div>

            <div className='space-y-6'>
              {timelineEvents.length > 0 ? (
                timelineEvents
                  .sort((a, b) => a.sortOrder - b.sortOrder)
                  .map((event) => (
                    <div
                      key={event.id}
                      className='backdrop-blur-xl bg-white/[0.08] rounded-3xl border border-white/10 p-6 md:p-8 hover:bg-white/[0.12] transition-all duration-300'
                    >
                      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                        <div className='flex-1'>
                          <div className='flex items-center gap-3 mb-2'>
                            <span
                              className={`inline-block w-3 h-3 rounded-full ${
                                event.phaseType === 'registration'
                                  ? 'bg-green-400'
                                  : event.phaseType === 'submission'
                                    ? 'bg-blue-400'
                                    : event.phaseType === 'announcement'
                                      ? 'bg-yellow-400'
                                      : 'bg-purple-400'
                              }`}
                            />
                            <h3 className='text-2xl font-bold text-[#FFCD8D]'>
                              {event.label}
                            </h3>
                          </div>
                          {event.description && (
                            <p className='text-gray-300 ml-6'>
                              {event.description}
                            </p>
                          )}
                        </div>
                        <div className='text-right md:text-left md:min-w-[200px]'>
                          <div className='text-sm text-gray-400 mb-1'>
                            {formatDate(event.startDate)}
                          </div>
                          {event.startDate !== event.endDate && (
                            <div className='text-sm text-gray-400'>
                              to {formatDate(event.endDate)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <div className='text-center text-gray-500 py-8'>
                  Timeline coming soon...
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Requirements & Deliverables */}
        <section className='py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-[#190204]/50 to-transparent'>
          <div className='max-w-6xl mx-auto grid md:grid-cols-2 gap-8'>
            {/* Requirements */}
            <div className='backdrop-blur-xl bg-white/[0.08] rounded-3xl border border-white/10 p-8'>
              <div className='flex items-center gap-3 mb-6'>
                <CheckCircle2 className='text-[#FFCD8D]' size={32} />
                <h3 className='text-3xl font-bold text-white'>Requirements</h3>
              </div>
              <ul className='space-y-3'>
                {content.requirements.map((req, index) => (
                  <li
                    key={index}
                    className='flex items-start gap-3 text-gray-300'
                  >
                    <span className='text-[#FFCD8D] mt-1'>•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Deliverables */}
            <div className='backdrop-blur-xl bg-white/[0.08] rounded-3xl border border-white/10 p-8'>
              <div className='flex items-center gap-3 mb-6'>
                <FileText className='text-[#FFCD8D]' size={32} />
                <h3 className='text-3xl font-bold text-white'>Deliverables</h3>
              </div>
              <ul className='space-y-3'>
                {content.deliverables.map((item, index) => (
                  <li
                    key={index}
                    className='flex items-start gap-3 text-gray-300'
                  >
                    <span className='text-[#FFCD8D] mt-1'>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className='py-20 px-4 sm:px-6 lg:px-8'>
          <div className='max-w-5xl mx-auto'>
            {/* Title with QnA Icons */}
            <div className='flex items-center justify-center gap-4 md:gap-8 mb-12 md:mb-16'>
              <Image
                src='/qna.svg'
                alt='QnA'
                width={128}
                height={128}
                className='hidden md:block w-32 h-32 md:w-32 md:h-32'
              />
              <h2
                className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center font-gemunu'
                style={{
                  background:
                    'linear-gradient(90deg, #7B1919 0%, #FFFFFF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Any Questions?
              </h2>
              <Image
                src='/qna-2.svg'
                alt='QnA'
                width={192}
                height={192}
                className='hidden md:block w-48 h-48 md:w-48 md:h-48 -ml-16'
              />
            </div>

            {/* 2-Column FAQ Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4'>
              {content.faqs.map((faq, index) => (
                <details
                  key={index}
                  className='bg-gradient-to-br from-[#2a0507]/50 to-[#1a0304]/50 rounded-2xl md:rounded-[24px] border border-white/10 overflow-hidden group'
                >
                  <summary className='w-full px-4 md:px-6 py-3 md:py-4 flex items-center justify-between text-left cursor-pointer list-none hover:bg-white/5 transition-colors'>
                    <span className='text-white font-semibold text-sm sm:text-base'>
                      {faq.question}
                    </span>
                    <ChevronDown className='h-5 w-5 text-white/70 transition-transform group-open:rotate-180' />
                  </summary>
                  <div className='px-4 md:px-6 pb-3 md:pb-4 text-white/70 text-xs sm:text-sm leading-relaxed'>
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
