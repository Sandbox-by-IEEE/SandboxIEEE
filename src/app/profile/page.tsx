import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import Image from 'next/image';
import Link from 'next/link';
import { User, Mail, Users } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  const user = session.user;

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] overflow-hidden">
      {/* Background hero circles */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <Image
          src="/home/hero-circle.svg"
          alt="Background decoration"
          width={800}
          height={800}
          className="absolute -top-[200px] -left-[200px] opacity-30 animate-float"
        />
        <Image
          src="/home/hero-circle.svg"
          alt="Background decoration"
          width={600}
          height={600}
          className="absolute -bottom-[150px] -right-[150px] opacity-20 animate-float-reverse"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              style={{
                background: 'linear-gradient(to right, #7B1919, #FFFFFF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              My Profile
            </h1>
            <p className="text-gray-400 text-lg">
              Your personal information and registration status
            </p>
          </div>

          {/* Profile Card */}
          <div
            className="relative backdrop-blur-[40px] rounded-3xl p-8 md:p-12"
            style={{
              background:
                'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
            }}
          >
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row items-center gap-8 mb-8 pb-8 border-b border-white/10">
              {/* Profile Image */}
              <div className="relative">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || 'User'}
                    width={120}
                    height={120}
                    className="rounded-full ring-4 ring-white/20"
                  />
                ) : (
                  <div className="w-[120px] h-[120px] rounded-full bg-gradient-to-br from-[#FF6B7A] to-[#C30010] flex items-center justify-center ring-4 ring-white/20">
                    <User className="w-16 h-16 text-white" />
                  </div>
                )}
              </div>

              {/* User Name and Username */}
              <div className="text-center md:text-left flex-1">
                <h2 className="text-3xl font-bold text-white mb-2">
                  {user.name}
                </h2>
                <p className="text-xl text-gray-400">@{user.username}</p>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-500/50">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-green-400 font-medium">Active</span>
              </div>
            </div>

            {/* Profile Information */}
            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-400 mb-1">Email Address</p>
                  <p className="text-lg text-white">{user.email}</p>
                </div>
              </div>

              {/* Username */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-400 mb-1">Username</p>
                  <p className="text-lg text-white">{user.username}</p>
                </div>
              </div>

              {/* Registration Status */}
              {user.registration && user.registration.length > 0 ? (
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-400 mb-2">
                      Registered Competitions
                    </p>
                    <div className="space-y-3">
                      {user.registration.map((reg: any) => (
                        <div
                          key={reg.id}
                          className="p-4 rounded-xl bg-white/5 border border-white/10"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-white font-semibold">
                              {reg.competition.competitionName}
                            </h4>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${reg.registrationStatus === 'verified'
                                ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                                : reg.registrationStatus === 'pending'
                                  ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50'
                                  : 'bg-red-500/20 text-red-400 border border-red-500/50'
                                }`}
                            >
                              {reg.registrationStatus}
                            </span>
                          </div>
                          {reg.team && (
                            <p className="text-sm text-gray-400">
                              Team: {reg.team.teamName}
                            </p>
                          )}
                          <p className="text-xs text-gray-500 mt-2">
                            Registered on{' '}
                            {new Date(reg.registeredAt).toLocaleDateString(
                              'en-US',
                              {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              }
                            )}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 mb-4">
                    You haven&apos;t registered for any competitions yet
                  </p>
                  <Link
                    href="/competitions"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-white font-medium transition-all hover:scale-105"
                    style={{
                      background: 'linear-gradient(to right, #FFCD8D, #280003)',
                      height: '35px',
                    }}
                  >
                    Browse Competitions
                  </Link>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/"
                className="flex-1 flex items-center justify-center px-6 rounded-xl text-white font-medium transition-all hover:scale-105 border border-white/20"
                style={{
                  height: '35px',
                  background: 'rgba(255, 255, 255, 0.05)',
                }}
              >
                Back to Home
              </Link>
              <Link
                href="/competitions"
                className="flex-1 flex items-center justify-center px-6 rounded-xl text-white font-medium transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(to right, #FFCD8D, #280003)',
                  height: '35px',
                }}
              >
                View Competitions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
