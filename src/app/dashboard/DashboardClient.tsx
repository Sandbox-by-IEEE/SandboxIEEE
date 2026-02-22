'use client';

import { Search, Trophy } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import Footer from '@/components/site/Footer';
import Navbar from '@/components/site/Navbar';

import ProgressTracker from './_components/ProgressTracker';
import StatusBanner from './_components/StatusBanner';
import SubmissionSection from './_components/SubmissionSection';
import TeamProfileCard from './_components/TeamProfileCard';

interface DashboardClientProps {
  user: any;
}

export default function DashboardClient({ user }: DashboardClientProps) {
  const { registration } = user;
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSubmissionSuccess = () => {
    setRefreshKey((prev) => prev + 1);
    window.location.reload();
  };

  // ============================================================================
  // EMPTY STATE: User has no competition registration
  // ============================================================================
  if (!registration) {
    return (
      <div className='relative min-h-screen bg-gradient-to-b from-[#0B0102] via-[#190204] to-[#0B0102] overflow-hidden'>
        <div className='absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none'>
          <Image
            src='/home/hero-circle.svg'
            alt='Background decoration'
            width={800}
            height={800}
            className='absolute -top-[200px] -left-[200px] opacity-20 animate-float'
          />
        </div>

        <Navbar />

        <div className='relative z-10 container mx-auto px-4 py-20'>
          <div className='max-w-2xl mx-auto'>
            <div className='text-center mb-12'>
              <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 tracking-wide font-gemunu'>
                My Competition
              </h1>
            </div>

            {/* Empty State Card */}
            <div className='relative backdrop-blur-xl bg-gradient-to-br from-[#5A2424]/40 via-[#3d1a1a]/30 to-[#2d0e0e]/40 rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-8 md:p-12 border border-white/10 shadow-2xl text-center'>
              <div className='mb-6'>
                <div className='w-24 h-24 mx-auto bg-gradient-to-br from-[#6B2D2D]/60 to-[#4a1f1f]/60 rounded-full flex items-center justify-center border-2 border-[#FFCD8D]/20 mb-6'>
                  <Trophy className='w-12 h-12 text-[#FFCD8D]/60' />
                </div>
                <h2 className='text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-[#FFE4B5] via-[#FFCD8D] to-[#FFE4B5] bg-clip-text text-transparent font-gemunu'>
                  No Competition Yet
                </h2>
                <p className='text-gray-400 text-base md:text-lg mb-2'>
                  You haven&apos;t registered for any competition yet.
                </p>
                <p className='text-gray-500 text-sm mb-8'>
                  Browse our competitions and join one to get started on your
                  journey!
                </p>
              </div>

              <Link
                href='/#competitions'
                className='inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FFCD8D] via-[#E8A05D] to-[#FFCD8D] rounded-2xl text-[#2d0e0e] font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-xl shadow-orange-500/30'
              >
                <Search className='w-5 h-5' />
                Browse Competitions
              </Link>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  // ============================================================================
  // NORMAL STATE: User has a competition registration
  // ============================================================================

  return (
    <div className='relative min-h-screen bg-gradient-to-b from-[#0B0102] via-[#190204] to-[#0B0102] overflow-hidden'>
      {/* Background Decorations */}
      <div className='absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none'>
        <Image
          src='/home/hero-circle.svg'
          alt='Background decoration'
          width={800}
          height={800}
          className='absolute -top-[200px] -left-[200px] opacity-20 animate-float'
        />
        <Image
          src='/home/hero-circle.svg'
          alt='Background decoration'
          width={600}
          height={600}
          className='absolute -bottom-[150px] -right-[150px] opacity-15 animate-float-reverse'
        />
      </div>

      <Navbar />

      <div className='relative z-10 container mx-auto px-4 py-20'>
        <div className='max-w-5xl mx-auto'>
          {/* Page Title */}
          <div className='text-center mb-12'>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 tracking-wide font-gemunu'>
              Team Profile
            </h1>
            <p className='text-gray-400 text-base md:text-lg font-gemunu'>
              Track your team progress and manage submissions here.
            </p>
          </div>

          {/* Status Banner - Pending/Rejected */}
          <StatusBanner registration={registration} />

          {/* Team Profile Card with Mascots */}
          <TeamProfileCard registration={registration} user={user} />

          {/* Progress Tracker */}
          <ProgressTracker
            currentPhase={registration.currentPhase}
            verificationStatus={registration.verificationStatus}
            isPreliminaryQualified={registration.isPreliminaryQualified}
            isSemifinalQualified={registration.isSemifinalQualified}
            competition={registration.competition}
          />

          {/* Submission Section - Dynamic based on phase */}
          {registration.verificationStatus === 'approved' && (
            <SubmissionSection
              key={refreshKey}
              registration={registration}
              onSuccess={handleSubmissionSuccess}
            />
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
