'use client';

import { CheckCircle2, Loader2, Mail, XCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

import Footer from '@/components/site/Footer';
import Navbar from '@/components/site/Navbar';

/**
 * ============================================================================
 * EMAIL ACTIVATION PAGE
 * ============================================================================
 * 
 * Page that handles email activation when user clicks link from email
 * Validates token and activates user account
 * 
 * Route: /activate?token=xxx
 * ============================================================================
 */

function ActivateContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('Invalid activation link. No token provided.');
      return;
    }

    activateAccount(token);
  }, [token]);

  const activateAccount = async (token: string) => {
    try {
      const response = await fetch(`/api/auth/activate?token=${token}`);
      const data = await response.json();

      if (!response.ok) {
        setStatus('error');
        setMessage(data.error || 'Failed to activate account');
        return;
      }

      setStatus('success');
      setMessage(data.message);
      setUsername(data.user?.username || '');

      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (error) {
      console.error('Activation error:', error);
      setStatus('error');
      setMessage('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-[#0B0102] via-[#190204] to-[#0B0102] flex items-center justify-center p-4 pt-24">
        <div className="max-w-md w-full bg-[#1a0405] rounded-2xl shadow-2xl p-8 border-2 border-[#FFCD8D]/20">
          {/* Loading State */}
          {status === 'loading' && (
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#8B3A3A]/20 to-[#5A2424]/20 rounded-full mb-6 animate-pulse border-2 border-[#FFCD8D]/30">
                <Loader2 className="text-[#FFCD8D] animate-spin" size={40} />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-[#FFCD8D] to-white bg-clip-text text-transparent mb-2">
                Activating Your Account
              </h2>
              <p className="text-[#E8B4A8]">
                Please wait while we verify your email...
              </p>
            </div>
          )}

          {/* Success State */}
          {status === 'success' && (
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#8B5A3A]/30 to-[#5A3824]/30 rounded-full mb-6 border-2 border-[#FFCD8D]/40">
                <CheckCircle2 className="text-[#FFCD8D]" size={40} />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-[#FFCD8D] to-white bg-clip-text text-transparent mb-2">
                Account Activated!
              </h2>
              <p className="text-[#E8B4A8] mb-6">
                {message}
              </p>

              {username && (
                <div className="bg-gradient-to-r from-[#8B5A3A]/20 to-[#5A3824]/20 border border-[#FFCD8D]/30 rounded-xl p-4 mb-6">
                  <p className="text-sm text-[#FFCD8D]">
                    Welcome, <strong>{username}</strong>! 🎉
                  </p>
                </div>
              )}

              <div className="bg-gradient-to-r from-[#8B3A3A]/20 to-[#5A2424]/20 border border-[#8B3A3A]/40 rounded-xl p-4 mb-6">
                <div className="flex">
                  <Mail className="h-5 w-5 text-[#FFCD8D] mr-3 flex-shrink-0 mt-0.5" />
                  <div className="text-left">
                    <p className="text-sm text-[#FFCD8D] font-medium mb-1">
                      Redirecting to Login...
                    </p>
                    <p className="text-xs text-[#E8B4A8]">
                      You will be redirected to the login page in a few seconds.
                    </p>
                  </div>
                </div>
              </div>

              <Link
                href="/login"
                className="block w-full bg-gradient-to-r from-[#8B3A3A] to-[#5A2424] text-white font-semibold py-3 px-4 rounded-xl text-center hover:from-[#9B4A4A] hover:to-[#6A3434] transition-all border border-[#FFCD8D]/30 shadow-lg shadow-[#8B3A3A]/20"
              >
                Go to Login Now
              </Link>
            </div>
          )}

          {/* Error State */}
          {status === 'error' && (
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#8B3A3A]/30 to-[#5A2424]/30 rounded-full mb-6 border-2 border-[#8B3A3A]/50">
                <XCircle className="text-[#8B3A3A]" size={40} />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-[#FFCD8D] to-white bg-clip-text text-transparent mb-2">
                Activation Failed
              </h2>
              <p className="text-[#E8B4A8] mb-6">
                {message}
              </p>

              <div className="bg-gradient-to-r from-[#8B3A3A]/20 to-[#5A2424]/20 border border-[#8B3A3A]/40 rounded-xl p-4 mb-6">
                <p className="text-sm text-[#FFCD8D] font-medium mb-2">
                  Common Issues:
                </p>
                <ul className="text-xs text-[#E8B4A8] text-left space-y-1">
                  <li>• Token has expired (valid for 24 hours)</li>
                  <li>• Token has already been used</li>
                  <li>• Account is already activated</li>
                  <li>• Invalid or corrupted activation link</li>
                </ul>
              </div>

              <div className="space-y-3">
                <Link
                  href="/register"
                  className="block w-full bg-gradient-to-r from-[#8B3A3A] to-[#5A2424] text-white font-semibold py-3 px-4 rounded-xl text-center hover:from-[#9B4A4A] hover:to-[#6A3434] transition-all border border-[#FFCD8D]/30 shadow-lg shadow-[#8B3A3A]/20"
                >
                  Register Again
                </Link>

                <Link
                  href="/login"
                  className="block w-full bg-gradient-to-r from-[#2d0609]/80 to-[#190204]/80 text-[#E8B4A8] font-medium py-3 px-4 rounded-xl text-center hover:from-[#3d0709] hover:to-[#290304] transition-all border border-[#FFCD8D]/20"
                >
                  Try Login Instead
                </Link>

                <Link
                  href="/"
                  className="block text-center text-sm text-[#E8B4A8] hover:text-[#FFCD8D] transition-colors"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default function ActivatePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-[#0B0102] via-[#190204] to-[#0B0102] flex items-center justify-center">
        <Loader2 className="text-[#FFCD8D] animate-spin" size={40} />
      </div>
    }>
      <ActivateContent />
    </Suspense>
  );
}
