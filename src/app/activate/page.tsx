'use client';

import { CheckCircle2, Loader2, Mail,XCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter,useSearchParams } from 'next/navigation';
import { Suspense,useEffect, useState } from 'react';

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
      <div className="min-h-screen bg-gradient-to-b from-[#190204] to-[#080203] flex items-center justify-center p-4 pt-24">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          {/* Loading State */}
          {status === 'loading' && (
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6 animate-pulse">
                <Loader2 className="text-blue-600 animate-spin" size={40} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Activating Your Account
              </h2>
              <p className="text-gray-600">
                Please wait while we verify your email...
              </p>
            </div>
          )}

          {/* Success State */}
          {status === 'success' && (
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <CheckCircle2 className="text-green-600" size={40} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Account Activated!
              </h2>
              <p className="text-gray-600 mb-6">
                {message}
              </p>

              {username && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                  <p className="text-sm text-green-900">
                    Welcome, <strong>{username}</strong>! 🎉
                  </p>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <div className="flex">
                  <Mail className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                  <div className="text-left">
                    <p className="text-sm text-blue-900 font-medium mb-1">
                      Redirecting to Login...
                    </p>
                    <p className="text-xs text-blue-700">
                      You will be redirected to the login page in a few seconds.
                    </p>
                  </div>
                </div>
              </div>

              <Link
                href="/login"
                className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-xl text-center hover:from-blue-700 hover:to-purple-700 transition-colors"
              >
                Go to Login Now
              </Link>
            </div>
          )}

          {/* Error State */}
          {status === 'error' && (
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
                <XCircle className="text-red-600" size={40} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Activation Failed
              </h2>
              <p className="text-gray-600 mb-6">
                {message}
              </p>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                <p className="text-sm text-yellow-900 font-medium mb-2">
                  Common Issues:
                </p>
                <ul className="text-xs text-yellow-700 text-left space-y-1">
                  <li>• Token has expired (valid for 24 hours)</li>
                  <li>• Token has already been used</li>
                  <li>• Account is already activated</li>
                  <li>• Invalid or corrupted activation link</li>
                </ul>
              </div>

              <div className="space-y-3">
                <Link
                  href="/register"
                  className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-xl text-center hover:from-blue-700 hover:to-purple-700 transition-colors"
                >
                  Register Again
                </Link>

                <Link
                  href="/login"
                  className="block w-full bg-gray-100 text-gray-700 font-medium py-3 px-4 rounded-xl text-center hover:bg-gray-200 transition-colors"
                >
                  Try Login Instead
                </Link>

                <Link
                  href="/"
                  className="block text-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
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
      <div className="min-h-screen bg-gradient-to-b from-[#190204] to-[#080203] flex items-center justify-center">
        <Loader2 className="text-blue-600 animate-spin" size={40} />
      </div>
    }>
      <ActivateContent />
    </Suspense>
  );
}
