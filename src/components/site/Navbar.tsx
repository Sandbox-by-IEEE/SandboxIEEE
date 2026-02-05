'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, User, LogOut } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCompetitionOpen, setIsCompetitionOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm'
        : 'bg-white border-b border-gray-200'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo/logo-white.svg"
              alt="Sandbox Logo"
              width={50}
              height={50}
              className="h-12 w-auto brightness-0"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-[#FF6B7A] transition-colors font-gemunu text-lg font-medium"
            >
              Home
            </Link>

            {/* Competition Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCompetitionOpen(!isCompetitionOpen)}
                className="flex items-center text-gray-700 hover:text-[#FF6B7A] transition-colors font-gemunu text-lg font-medium"
              >
                Competition
                <ChevronDown
                  className={`ml-1 h-4 w-4 transition-transform ${isCompetitionOpen ? 'rotate-180' : ''
                    }`}
                />
              </button>

              {isCompetitionOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden z-50">
                  <Link
                    href="/competitions/ptc"
                    className="block px-4 py-3 text-gray-700 hover:text-[#FF6B7A] hover:bg-gray-50 transition-colors font-gemunu"
                    onClick={() => setIsCompetitionOpen(false)}
                  >
                    ProtoTech Contest
                  </Link>
                  <Link
                    href="/competitions/tpc"
                    className="block px-4 py-3 text-gray-700 hover:text-[#FF6B7A] hover:bg-gray-50 transition-colors font-gemunu"
                    onClick={() => setIsCompetitionOpen(false)}
                  >
                    Technovate Paper
                  </Link>
                  <Link
                    href="/competitions/bcc"
                    className="block px-4 py-3 text-gray-700 hover:text-[#FF6B7A] hover:bg-gray-50 transition-colors font-gemunu"
                    onClick={() => setIsCompetitionOpen(false)}
                  >
                    Business Case Competition
                  </Link>
                </div>
              )}
            </div>

            <button className="text-gray-500 transition-colors font-gemunu text-lg font-medium opacity-50 cursor-not-allowed">
              Event
            </button>
          </div>

          {/* Sign In Button / Profile Dropdown */}
          {status === 'loading' ? (
            <div className="h-[35px] w-24 bg-gray-200 animate-pulse rounded-full" />
          ) : session?.user ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="h-[35px] flex items-center gap-2 bg-gradient-to-r from-[#8B2635] to-[#5A1623] hover:from-[#9B3645] hover:to-[#6A2633] text-white px-6 rounded-full font-gemunu text-base font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || 'User'}
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                ) : (
                  <User className="w-4 h-4" />
                )}
                Profile
                <ChevronDown
                  className={`ml-1 h-4 w-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isProfileOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden z-50">
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {session.user.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      @{session.user.username}
                    </p>
                  </div>

                  {/* Menu Items */}
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-[#FF6B7A] hover:bg-gray-50 transition-colors font-gemunu"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    My Profile
                  </Link>

                  <Link
                    href="/competitions"
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-[#FF6B7A] hover:bg-gray-50 transition-colors font-gemunu"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <ChevronDown className="w-4 h-4 rotate-90" />
                    My Competitions
                  </Link>

                  {/* Sign Out */}
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      signOut({ callbackUrl: '/' });
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors font-gemunu border-t border-gray-200"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="h-[35px] flex items-center bg-gradient-to-r from-[#8B2635] to-[#5A1623] hover:from-[#9B3645] hover:to-[#6A2633] text-white px-6 rounded-full font-gemunu text-base font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(isCompetitionOpen || isProfileOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsCompetitionOpen(false);
            setIsProfileOpen(false);
          }}
        />
      )}
    </nav>
  );
}
