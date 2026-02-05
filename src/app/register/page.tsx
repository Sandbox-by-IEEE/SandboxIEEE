'use client';

import {
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  Mail,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Footer from '@/components/site/Footer';
import Navbar from '@/components/site/Navbar';

/**
 * ============================================================================
 * USER REGISTRATION PAGE
 * ============================================================================
 * 
 * Public registration form for new users
 * Sends activation email after successful registration
 * 
 * Route: /register
 * ============================================================================
 */

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    institution: '',
    phone: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return false;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      setError('Username can only contain letters, numbers, and underscores');
      return false;
    }

    if (!formData.phone.match(/^(\+62|62|0)[0-9]{9,12}$/)) {
      setError('Invalid Indonesian phone number format');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          name: formData.name,
          institution: formData.institution,
          phone: formData.phone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Registration failed');
        setIsLoading(false);
        return;
      }

      setIsSuccess(true);
      setIsLoading(false);
    } catch (err) {
      console.error('Registration error:', err);
      setError('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  // Success Screen
  if (isSuccess) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-b from-[#190204] to-[#080203] flex items-center justify-center p-4 pt-24">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                <CheckCircle2 className="text-green-600" size={40} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2 font-gemunu">
                Registration Successful!
              </h2>
              <p className="text-gray-600">
                Please check your email to activate your account.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
              <div className="flex">
                <Mail className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-blue-900 font-medium mb-1">
                    Activation Email Sent
                  </p>
                  <p className="text-xs text-blue-700">
                    We&apos;ve sent an activation link to <strong>{formData.email}</strong>.
                    Click the link in the email to activate your account.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-yellow-900 font-medium mb-1">
                    Check Your Spam Folder
                  </p>
                  <p className="text-xs text-yellow-700">
                    If you don&apos;t see the email in your inbox, please check your spam or junk folder.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Link
                href="/login"
                className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-xl text-center hover:from-blue-700 hover:to-purple-700 transition-colors"
              >
                Go to Login
              </Link>

              <Link
                href="/"
                className="block w-full bg-gray-100 text-gray-700 font-medium py-3 px-4 rounded-xl text-center hover:bg-gray-200 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Registration Form
  return (
    <>
      <Navbar />
      <div className="relative min-h-screen bg-gradient-to-b from-[#0B0102] via-[#190204] to-[#0B0102] flex items-center justify-center py-20 px-4">
        {/* Background Blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <Image
            src="/hero/hero-circle-1.svg"
            alt=""
            width={800}
            height={800}
            className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/2 opacity-30 animate-float-slow"
            priority
          />
          <Image
            src="/hero/hero-circle-2.svg"
            alt=""
            width={800}
            height={800}
            className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2 opacity-30 animate-float-slow-reverse"
            priority
          />
        </div>

        {/* Glass Card Container */}
        <div className="relative z-10 w-full max-w-2xl">
          <div
            className="relative backdrop-blur-[40px] bg-white/[0.08] rounded-3xl border border-white/20 shadow-[0_8px_32px_0_rgba(77,77,77,0.37)] p-8 md:p-12"
            style={{
              boxShadow: '0 8px 32px 0 rgba(77, 77, 77, 0.37)',
              WebkitBackdropFilter: 'blur(40px)',
            }}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 font-gemunu">
                Create Your Account
              </h1>
              <p className="text-white/70 font-gemunu text-sm md:text-base">
                Join the competition and showcase your skills
              </p>
            </div>

            {/* Logo */}
            <div className="flex justify-center mb-8">
              <Image
                src="/logo/logo-white.svg"
                alt="Sandbox Logo"
                width={80}
                height={80}
                className="w-16 h-16"
              />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Username */}
                <div>
                  <label className="block text-white/90 font-gemunu mb-2 text-sm">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-white/30 font-gemunu"
                    placeholder="johndoe"
                  />
                  <p className="text-xs text-white/50 mt-1 font-gemunu">
                    Letters, numbers, and underscores only
                  </p>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-white/90 font-gemunu mb-2 text-sm">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-white/30 font-gemunu"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-white/90 font-gemunu mb-2 text-sm">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-white/30 font-gemunu"
                  placeholder="John Doe"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Institution */}
                <div>
                  <label className="block text-white/90 font-gemunu mb-2 text-sm">
                    Institution
                  </label>
                  <input
                    type="text"
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-white/30 font-gemunu"
                    placeholder="Institut Teknologi Bandung"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-white/90 font-gemunu mb-2 text-sm">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-white/30 font-gemunu"
                    placeholder="081234567890"
                  />
                  <p className="text-xs text-white/50 mt-1 font-gemunu">
                    Format: 08xxx or +62xxx
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Password */}
                <div>
                  <label className="block text-white/90 font-gemunu mb-2 text-sm">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-white/30 font-gemunu pr-12"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  <p className="text-xs text-white/50 mt-1 font-gemunu">
                    Min. 8 characters
                  </p>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-white/90 font-gemunu mb-2 text-sm">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-white/30 font-gemunu pr-12"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-3 text-white text-sm font-gemunu">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-[35px] rounded-full font-gemunu text-base font-semibold transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: 'linear-gradient(90deg, #FFCD8D 0%, #280003 100%)',
                  boxShadow: '0 8px 24px rgba(255, 205, 141, 0.4), 0 4px 12px rgba(40, 0, 3, 0.3)',
                  color: 'white',
                }}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="animate-spin mr-2" size={16} />
                    Creating Account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </button>

              {/* Login Link */}
              <div className="text-center text-white/70 font-gemunu text-sm">
                Already have an account?{' '}
                <Link href="/login" className="text-white font-semibold hover:underline">
                  Sign In
                </Link>
              </div>
            </form>
          </div>
        </div>

        {/* Floating Animation CSS */}
        <style jsx>{`
          @keyframes floatSlow {
            0%, 100% {
              transform: translate(-50%, -50%) translateY(0px);
            }
            50% {
              transform: translate(-50%, -50%) translateY(-30px);
            }
          }

          @keyframes floatSlowReverse {
            0%, 100% {
              transform: translate(50%, -50%) translateY(0px);
            }
            50% {
              transform: translate(50%, -50%) translateY(-30px);
            }
          }

          :global(.animate-float-slow) {
            animation: floatSlow 20s ease-in-out infinite;
          }

          :global(.animate-float-slow-reverse) {
            animation: floatSlowReverse 20s ease-in-out infinite;
          }
        `}</style>
      </div>
      <Footer />
    </>
  );
}
