'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ChevronRight, ChevronDown, Trophy, Calendar, FileText, CheckCircle2 } from 'lucide-react';

import Footer from '@/components/site/Footer';
import Navbar from '@/components/site/Navbar';
import { getCompetitionContent, formatDate } from '@/lib/competition-content';

export default function CompetitionDetailPage() {
  const params = useParams();
  const code = (params.code as string).toUpperCase();
  const content = getCompetitionContent(code);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  // Sample deadline - you can fetch from database
  const deadline = new Date('2026-02-15T23:59:59');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = deadline.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000);

    return () => clearInterval(timer);
  }, [deadline]);

  if (!content) {
    return (
      <div className="min-h-screen bg-[#0B0102] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Competition Not Found</h1>
          <Link
            href="/"
            className="text-[#FFCD8D] hover:underline"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B0102] via-[#190204] to-[#0B0102] font-['Gemunu_Libre']">
      <Navbar />

      <main>
        {/* Hero Section with Countdown */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
          {/* Background Blobs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <Image
              src="/hero/hero-circle-1.svg"
              alt=""
              width={800}
              height={800}
              className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/2 opacity-70"
            />
            <Image
              src="/hero/hero-circle-2.svg"
              alt=""
              width={800}
              height={800}
              className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2 opacity-70"
            />
          </div>

          {/* Glass Card */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
            <div
              className="relative backdrop-blur-[99px] bg-white/[0.08] rounded-[99px] border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] p-8 md:p-12 lg:p-16"
              style={{
                boxShadow: '0 8px 32px 0 rgba(77, 77, 77, 0.37)',
                WebkitBackdropFilter: 'blur(10px)',
              }}
            >
              {/* Competition Name */}
              <div className="text-center mb-8">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-wide">
                  {content.name}
                </h1>
                <p className="text-xl md:text-2xl text-gray-300">
                  {content.tagline}
                </p>
              </div>

              {/* Countdown Timer */}
              <div className="text-center mb-12">
                <p className="text-gray-400 mb-6 text-lg">Registration Closes In</p>
                <div className="flex justify-center gap-4 md:gap-8">
                  {[
                    { label: 'Days', value: timeLeft.days },
                    { label: 'Hours', value: timeLeft.hours },
                    { label: 'Minutes', value: timeLeft.minutes },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="backdrop-blur-md bg-white/10 rounded-3xl p-6 md:p-8 min-w-[100px] md:min-w-[140px]"
                    >
                      <div className="text-4xl md:text-6xl font-bold text-white mb-2">
                        {item.value.toString().padStart(2, '0')}
                      </div>
                      <div className="text-sm md:text-base text-gray-400 uppercase tracking-wider">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div className="text-center">
                <Link
                  href={`/competitions/${code.toLowerCase()}/register`}
                  className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#FFCD8D] via-[#E8A05D] to-[#FFCD8D] rounded-full text-[#0B0102] font-bold text-xl hover:scale-105 transition-transform duration-300 shadow-xl shadow-orange-500/30"
                >
                  Register Now
                  <ChevronRight size={24} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* About Competition */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
              About The Competition
            </h2>
            <div className="backdrop-blur-xl bg-white/[0.08] rounded-3xl border border-white/10 p-8 md:p-12">
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed text-center">
                {content.description}
              </p>
            </div>
          </div>
        </section>

        {/* Prize Pool */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-[#190204]/50 to-transparent">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Trophy className="inline-block text-[#FFCD8D] mb-4" size={48} />
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Prize Pool
              </h2>
              {content.prizePool.total && (
                <p className="text-2xl text-[#FFCD8D]">
                  Total: {content.prizePool.total}
                </p>
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* First Place */}
              <div className="backdrop-blur-xl bg-gradient-to-br from-[#FFD700]/20 to-[#FFA500]/10 rounded-3xl border-2 border-[#FFD700]/30 p-8 text-center transform md:-translate-y-4">
                <div className="text-6xl mb-4">🥇</div>
                <h3 className="text-2xl font-bold text-[#FFD700] mb-2">1st Place</h3>
                <p className="text-3xl font-bold text-white">{content.prizePool.first}</p>
              </div>

              {/* Second Place */}
              <div className="backdrop-blur-xl bg-gradient-to-br from-[#C0C0C0]/20 to-gray-400/10 rounded-3xl border-2 border-[#C0C0C0]/30 p-8 text-center">
                <div className="text-6xl mb-4">🥈</div>
                <h3 className="text-2xl font-bold text-[#C0C0C0] mb-2">2nd Place</h3>
                <p className="text-3xl font-bold text-white">{content.prizePool.second}</p>
              </div>

              {/* Third Place */}
              <div className="backdrop-blur-xl bg-gradient-to-br from-[#CD7F32]/20 to-orange-700/10 rounded-3xl border-2 border-[#CD7F32]/30 p-8 text-center transform md:translate-y-4">
                <div className="text-6xl mb-4">🥉</div>
                <h3 className="text-2xl font-bold text-[#CD7F32] mb-2">3rd Place</h3>
                <p className="text-3xl font-bold text-white">{content.prizePool.third}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Calendar className="inline-block text-[#FFCD8D] mb-4" size={48} />
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                {content.name}&apos;s Timeline
              </h2>
            </div>

            <div className="space-y-6">
              {content.timeline.map((phase, index) => (
                <div
                  key={index}
                  className="backdrop-blur-xl bg-white/[0.08] rounded-3xl border border-white/10 p-6 md:p-8 hover:bg-white/[0.12] transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-[#FFCD8D] mb-2">
                        {phase.phase}
                      </h3>
                      <p className="text-gray-300">
                        {phase.description}
                      </p>
                    </div>
                    <div className="text-right md:text-left md:min-w-[200px]">
                      <div className="text-sm text-gray-400 mb-1">
                        {formatDate(phase.startDate)}
                      </div>
                      {phase.startDate !== phase.endDate && (
                        <div className="text-sm text-gray-400">
                          to {formatDate(phase.endDate)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements & Deliverables */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-[#190204]/50 to-transparent">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Requirements */}
            <div className="backdrop-blur-xl bg-white/[0.08] rounded-3xl border border-white/10 p-8">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle2 className="text-[#FFCD8D]" size={32} />
                <h3 className="text-3xl font-bold text-white">Requirements</h3>
              </div>
              <ul className="space-y-3">
                {content.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-300">
                    <span className="text-[#FFCD8D] mt-1">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Deliverables */}
            <div className="backdrop-blur-xl bg-white/[0.08] rounded-3xl border border-white/10 p-8">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="text-[#FFCD8D]" size={32} />
                <h3 className="text-3xl font-bold text-white">Deliverables</h3>
              </div>
              <ul className="space-y-3">
                {content.deliverables.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-300">
                    <span className="text-[#FFCD8D] mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            {/* Title with QnA Icons */}
            <div className="flex items-center justify-center gap-4 md:gap-8 mb-12 md:mb-16">
              <Image
                src="/qna.svg"
                alt="QnA"
                width={80}
                height={80}
                className="hidden md:block w-12 h-12 md:w-20 md:h-20"
              />
              <h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center"
                style={{
                  background: 'linear-gradient(90deg, #7B1919 0%, #FFFFFF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Any Questions?
              </h2>
              <Image
                src="/qna-2.svg"
                alt="QnA"
                width={80}
                height={80}
                className="hidden md:block w-12 h-12 md:w-20 md:h-20"
              />
            </div>

            <p className="text-center text-white/70 text-sm sm:text-base md:text-lg mb-8 md:mb-12">
              Here are some frequently asked questions about {content.name}
            </p>

            {/* 2-Column FAQ Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {content.faqs.map((faq, index) => (
                <details
                  key={index}
                  className="bg-gradient-to-br from-[#2a0507]/50 to-[#1a0304]/50 rounded-2xl md:rounded-[24px] border border-white/10 overflow-hidden group"
                >
                  <summary className="w-full px-4 md:px-6 py-3 md:py-4 flex items-center justify-between text-left cursor-pointer list-none hover:bg-white/5 transition-colors">
                    <span className="text-white font-semibold text-sm sm:text-base">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className="h-5 w-5 text-white/70 transition-transform group-open:rotate-180"
                    />
                  </summary>
                  <div className="px-4 md:px-6 pb-3 md:pb-4 text-white/70 text-xs sm:text-sm leading-relaxed">
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
