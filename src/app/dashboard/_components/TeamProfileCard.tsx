'use client';

import Image from 'next/image';

interface TeamProfileCardProps {
  registration: any;
  user: any;
}

export default function TeamProfileCard({
  registration,
  user,
}: TeamProfileCardProps) {
  const { team } = registration;
  const rawMembers = team?.members || [];

  // Sort members so the leader (whose email matches the registered user) is always first.
  // The leader's email matches user.email since that's who created the registration.
  const leaderEmail = user?.email;
  const members = [...rawMembers].sort((a: any, b: any) => {
    const aIsLeader = a.email === leaderEmail ? -1 : 0;
    const bIsLeader = b.email === leaderEmail ? -1 : 0;
    if (aIsLeader !== bIsLeader) return aIsLeader - bIsLeader;
    // Preserve original order for non-leader members
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

  return (
    <div className='relative mb-12'>
      {/* Outer Glassmorphism Container */}
      <div className='relative backdrop-blur-xl bg-gradient-to-br from-[#5A2424]/40 via-[#3d1a1a]/30 to-[#2d0e0e]/40 rounded-2xl sm:rounded-[2.5rem] p-4 sm:p-6 md:p-8 lg:p-12 border border-white/10 shadow-2xl mt-24 sm:mt-32 md:mt-40'>
        {/* Mascot Group overlapping from top */}
        <div className='absolute left-1/2 -translate-x-1/2 -top-20 sm:-top-28 md:-top-36 w-full max-w-md sm:max-w-2xl px-4 z-10 pointer-events-none'>
          <Image
            src='/mascots/mascot-group.svg'
            alt='Team Mascots'
            width={800}
            height={400}
            className='w-full h-auto drop-shadow-2xl'
            priority
          />
        </div>

        {/* Team Name Header Card */}
        <div className='bg-gradient-to-br from-[#6B2D2D]/50 to-[#4a1f1f]/50 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/10 mb-8'>
          <h2 className='text-2xl md:text-3xl font-bold text-center mb-3 bg-gradient-to-r from-[#FFE4B5] via-[#FFCD8D] to-[#FFE4B5] bg-clip-text text-transparent font-gemunu'>
            Hi, Team {team?.teamName}!
          </h2>
          <p className='text-center text-lg md:text-xl text-[#E8B4A8]'>
            {team?.institution}
          </p>
        </div>

        {/* Inner Content Card */}
        <div className='bg-gradient-to-br from-[#5A2424]/30 to-[#3d1a1a]/20 backdrop-blur-sm rounded-3xl p-4 md:p-6 lg:p-10 border border-white/5'>
          {/* Member List */}
          <div className='space-y-3'>
            {members.map((member: any, index: number) => (
              <div
                key={member.id}
                className='flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 px-4 md:px-5 rounded-xl bg-[#2d0e0e]/60 backdrop-blur-sm border-2 border-white/10 hover:border-[#FFCD8D]/30 transition-all gap-1'
              >
                <span className='text-gray-400 text-sm font-medium'>
                  {member.email === leaderEmail
                    ? '#1 Team Leader'
                    : `#${index + 1} Member`}
                </span>
                <span className='text-white font-medium'>
                  {member.fullName}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
