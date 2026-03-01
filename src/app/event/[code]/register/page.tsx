'use client';

import {
  ChevronRight,
  Loader2,
  Upload,
  FileImage,
  X,
  CheckCircle,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';

import Footer from '@/components/site/Footer';
import Navbar from '@/components/site/Navbar';
import { getEventContent, type EventContent } from '@/lib/event-content';

interface FormData {
  eventCode: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  institution: string;
  paymentProof: File | null;
}

// Event registration fee
const EVENT_FEE = 50000;

function formatCurrency(amount: number): string {
  return `Rp ${amount.toLocaleString('id-ID')}`;
}

function RegistrationContent() {
  const router = useRouter();
  const params = useParams();
  const { data: session, status: authStatus } = useSession();
  const eventCode = params.code as string;
  const [eventContent, setEventContent] = useState<EventContent | null>(null);

  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [regCheckLoading, setRegCheckLoading] = useState(true);
  const [regClosed, setRegClosed] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // Resolve event content
  useEffect(() => {
    const content = getEventContent(eventCode);
    if (!content) {
      router.push('/event');
      return;
    }
    setEventContent(content);
  }, [eventCode, router]);

  // Redirect unauthenticated users
  useEffect(() => {
    if (authStatus === 'unauthenticated') {
      router.push(
        '/login?callbackUrl=' +
          encodeURIComponent(`/event/${eventCode}/register`),
      );
    }
  }, [authStatus, router, eventCode]);

  // Check if user already registered for this event
  useEffect(() => {
    if (authStatus !== 'authenticated') return;

    async function checkRegistration() {
      try {
        const res = await fetch('/api/events/register');
        if (res.ok) {
          const data = await res.json();
          const existing = data.registrations?.find(
            (r: { eventCode: string }) => r.eventCode === eventCode,
          );
          if (existing) {
            setRegClosed(
              'You are already registered for this event. Check your dashboard for status.',
            );
          }
        }
      } catch {
        // Allow form to load if check fails
      } finally {
        setRegCheckLoading(false);
      }
    }

    checkRegistration();
  }, [authStatus, eventCode]);

  const [formData, setFormData] = useState<FormData>({
    eventCode,
    fullName: '',
    email: '',
    phoneNumber: '',
    institution: '',
    paymentProof: null,
  });

  // Pre-fill email from session
  useEffect(() => {
    if (session?.user?.email) {
      setFormData((prev) => ({
        ...prev,
        email: session.user?.email || '',
        fullName: session.user?.name || '',
      }));
    }
  }, [session]);

  const validateStep = (step: number): boolean => {
    setError('');

    if (step === 1) {
      if (!formData.fullName.trim() || formData.fullName.length < 3) {
        setError('Full name must be at least 3 characters');
        return false;
      }
      if (
        !formData.email.trim() ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
      ) {
        setError('Valid email address is required');
        return false;
      }
      if (
        !formData.phoneNumber.trim() ||
        formData.phoneNumber.replace(/\D/g, '').length < 10
      ) {
        setError('Phone number must be at least 10 digits');
        return false;
      }
      if (!formData.institution.trim() || formData.institution.length < 3) {
        setError('Institution/University name is required');
        return false;
      }
    }

    if (step === 2) {
      if (!formData.paymentProof) {
        setError('Payment proof is required');
        return false;
      }
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(formData.paymentProof.type)) {
        setError('Payment proof must be a JPG or PNG image');
        return false;
      }
      if (formData.paymentProof.size > 5 * 1024 * 1024) {
        setError('Payment proof file size must be less than 5MB');
        return false;
      }
    }

    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setError('');
  };

  const isSubmitting = useRef(false);

  const handleSubmit = useCallback(async () => {
    if (!validateStep(2)) return;
    if (isSubmitting.current) return;

    isSubmitting.current = true;
    setIsLoading(true);
    setError('');

    try {
      const body = new globalThis.FormData();
      body.append('eventCode', formData.eventCode);
      body.append('fullName', formData.fullName);
      body.append('email', formData.email);
      body.append('phoneNumber', formData.phoneNumber);
      body.append('institution', formData.institution);

      if (formData.paymentProof) {
        body.append('paymentProof', formData.paymentProof);
      }

      const response = await fetch('/api/events/register', {
        method: 'POST',
        body,
        signal: AbortSignal.timeout(60000),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error(
            data.error?.message || 'Too many requests. Please try again later.',
          );
        }
        throw new Error(
          data.error?.message || data.error || 'Registration failed',
        );
      }

      setIsSuccess(true);
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        setError(
          'Request timeout. Please check your connection and try again.',
        );
      } else {
        setError(
          err instanceof Error ? err.message : 'Failed to submit registration',
        );
      }
    } finally {
      setIsLoading(false);
      isSubmitting.current = false;
    }
  }, [formData]);

  if (
    !eventContent ||
    authStatus === 'loading' ||
    authStatus === 'unauthenticated' ||
    regCheckLoading
  ) {
    return (
      <>
        <Navbar />
        <div className='min-h-screen bg-gradient-to-b from-[#0B0102] via-[#190204] to-[#0B0102] flex items-center justify-center'>
          <Loader2 className='text-[#FFCD8D] animate-spin' size={40} />
        </div>
        <Footer />
      </>
    );
  }

  if (regClosed) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-b from-[#0B0102] via-[#190204] to-[#0B0102] pt-32 pb-16 px-4 font-['Gemunu_Libre']">
          <div className='max-w-2xl mx-auto text-center'>
            <div className='backdrop-blur-xl bg-gradient-to-br from-[#5A2424]/40 via-[#3d1a1a]/30 to-[#2d0e0e]/40 rounded-[2.5rem] p-8 md:p-12 border border-white/10 shadow-2xl'>
              <div className='w-20 h-20 mx-auto bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-full flex items-center justify-center border-2 border-red-500/30 mb-6'>
                <X className='w-10 h-10 text-red-400' />
              </div>
              <h2 className='text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-[#FFE4B5] via-[#FFCD8D] to-[#FFE4B5] bg-clip-text text-transparent'>
                Registration Unavailable
              </h2>
              <p className='text-gray-400 text-base md:text-lg mb-8'>
                {regClosed}
              </p>
              <Link
                href={`/event/${eventCode}`}
                className='inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#8B3A3A] to-[#6B2D2D] border-2 border-[#FFCD8D]/30 rounded-2xl text-white font-bold hover:from-[#9B4A4A] hover:to-[#7B3D3D] transition-all duration-300'
              >
                Back to Event
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (isSuccess) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-b from-[#0B0102] via-[#190204] to-[#0B0102] pt-32 pb-16 px-4 font-['Gemunu_Libre']">
          <div className='max-w-2xl mx-auto text-center'>
            <div className='backdrop-blur-xl bg-gradient-to-br from-[#5A2424]/40 via-[#3d1a1a]/30 to-[#2d0e0e]/40 rounded-[2.5rem] p-8 md:p-12 border border-white/10 shadow-2xl'>
              <div className='w-20 h-20 mx-auto bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-full flex items-center justify-center border-2 border-green-500/30 mb-6'>
                <CheckCircle className='w-10 h-10 text-green-400' />
              </div>
              <h2 className='text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-[#FFE4B5] via-[#FFCD8D] to-[#FFE4B5] bg-clip-text text-transparent'>
                Registration Successful!
              </h2>
              <p className='text-gray-400 text-base md:text-lg mb-4'>
                Thank you for registering for{' '}
                <strong className='text-[#FFCD8D]'>{eventContent.name}</strong>.
              </p>
              <p className='text-gray-500 text-sm mb-8'>
                Your registration is pending admin review. You will receive a
                confirmation within 24 hours. Please check your inbox and spam
                folder.
              </p>
              <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                <Link
                  href={`/event/${eventCode}`}
                  className='inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#8B3A3A] to-[#6B2D2D] border-2 border-[#FFCD8D]/30 rounded-2xl text-white font-bold hover:from-[#9B4A4A] hover:to-[#7B3D3D] transition-all duration-300'
                >
                  Back to Event
                </Link>
                <Link
                  href='/'
                  className='inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#2d0e0e]/60 border-2 border-white/10 rounded-2xl text-white font-bold hover:border-[#FFCD8D]/50 transition-all duration-300'
                >
                  Go to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-[#0B0102] via-[#190204] to-[#0B0102] pt-32 pb-16 px-4 font-['Gemunu_Libre']">
        <div className='max-w-5xl mx-auto'>
          <div className='text-center mb-8 sm:mb-12'>
            <h1 className='text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-3 tracking-wide'>
              Event Registration
            </h1>
            <p className='text-gray-400 text-base sm:text-lg'>
              Register for {eventContent.name}
            </p>
          </div>

          <div className='relative'>
            <div className='absolute -left-4 -top-16 sm:-left-8 sm:-top-20 md:-left-12 md:-top-24 z-20 hidden sm:block'>
              <Image
                src='/mascots/mascot-3.svg'
                alt='Mascot'
                width={200}
                height={200}
                className='w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 drop-shadow-2xl'
              />
            </div>

            <div className='relative backdrop-blur-xl bg-gradient-to-br from-[#5A2424]/40 via-[#3d1a1a]/30 to-[#2d0e0e]/40 rounded-3xl sm:rounded-[2.5rem] p-5 sm:p-8 md:p-12 border border-white/10 shadow-2xl'>
              {/* Step indicator */}
              <div className='bg-gradient-to-br from-[#6B2D2D]/50 to-[#4a1f1f]/50 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-white/10 mb-8'>
                <h2 className='text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 bg-gradient-to-r from-[#FFE4B5] via-[#FFCD8D] to-[#FFE4B5] bg-clip-text text-transparent'>
                  {currentStep === 1 && 'Personal Information'}
                  {currentStep === 2 && 'Payment'}
                  {currentStep === 3 && 'Review & Confirm'}
                </h2>

                <div className='flex items-center justify-center gap-1 sm:gap-2'>
                  {['Personal Info', 'Payment', 'Review & Confirm'].map(
                    (label, index) => {
                      const step = index + 1;
                      return (
                        <div key={step} className='flex items-center'>
                          <div className='flex flex-col items-center'>
                            <div
                              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-300 ${
                                step === currentStep
                                  ? 'bg-gradient-to-br from-[#FFCD8D] to-[#E8A05D] text-[#2d0e0e] scale-110 shadow-lg shadow-orange-500/30'
                                  : step < currentStep
                                    ? 'bg-[#6B2D2D] text-white border-2 border-[#FFCD8D]/50'
                                    : 'bg-[#3d1a1a]/60 text-gray-500 border-2 border-gray-600/30'
                              }`}
                            >
                              {step}
                            </div>
                            <span className='text-[10px] sm:text-xs text-gray-400 mt-1 sm:mt-2 max-w-[60px] sm:max-w-[100px] text-center leading-tight'>
                              {label}
                            </span>
                          </div>
                          {step < 3 && (
                            <div
                              className={`w-8 sm:w-16 md:w-24 h-0.5 sm:h-1 mx-0.5 sm:mx-2 rounded-full transition-all ${
                                step < currentStep
                                  ? 'bg-gradient-to-r from-[#FFCD8D] to-[#E8A05D]'
                                  : 'bg-gray-700/50'
                              }`}
                            />
                          )}
                        </div>
                      );
                    },
                  )}
                </div>
              </div>

              {/* Form content */}
              <div className='bg-gradient-to-br from-[#5A2424]/30 to-[#3d1a1a]/20 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 border border-white/5'>
                {error && (
                  <div className='mb-6 p-4 bg-red-900/30 border border-red-500/50 rounded-2xl backdrop-blur-sm'>
                    <p className='text-red-200 text-sm'>{error}</p>
                  </div>
                )}

                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div className='space-y-6'>
                    <div className='bg-gradient-to-r from-[#6B2D2D]/50 to-[#4a1f1f]/50 backdrop-blur-md rounded-2xl p-6 border border-[#FFCD8D]/20'>
                      <h3 className='text-xl font-bold text-[#FFCD8D] mb-1'>
                        {eventContent.name}
                      </h3>
                      <p className='text-xs text-gray-400'>
                        {eventContent.date} • {eventContent.venue}
                      </p>
                    </div>

                    <div>
                      <label className='block text-white mb-2 text-sm font-medium'>
                        Full Name <span className='text-[#FFCD8D]'>*</span>
                      </label>
                      <input
                        type='text'
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            fullName: e.target.value,
                          }))
                        }
                        placeholder='Enter your full name'
                        className='w-full bg-[#2d0e0e]/60 backdrop-blur-sm border-2 border-white/10 focus:border-[#FFCD8D]/50 rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none transition-all duration-300'
                      />
                    </div>

                    <div>
                      <label className='block text-white mb-2 text-sm font-medium'>
                        Email <span className='text-[#FFCD8D]'>*</span>
                      </label>
                      <input
                        type='email'
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        placeholder='your@email.com'
                        className='w-full bg-[#2d0e0e]/60 backdrop-blur-sm border-2 border-white/10 focus:border-[#FFCD8D]/50 rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none transition-all duration-300'
                      />
                    </div>

                    <div>
                      <label className='block text-white mb-2 text-sm font-medium'>
                        Phone Number <span className='text-[#FFCD8D]'>*</span>
                      </label>
                      <input
                        type='tel'
                        value={formData.phoneNumber}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            phoneNumber: e.target.value,
                          }))
                        }
                        placeholder='e.g. 08123456789'
                        className='w-full bg-[#2d0e0e]/60 backdrop-blur-sm border-2 border-white/10 focus:border-[#FFCD8D]/50 rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none transition-all duration-300'
                      />
                    </div>

                    <div>
                      <label className='block text-white mb-2 text-sm font-medium'>
                        Institution / School / University{' '}
                        <span className='text-[#FFCD8D]'>*</span>
                      </label>
                      <input
                        type='text'
                        value={formData.institution}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            institution: e.target.value,
                          }))
                        }
                        placeholder='Full name of your institution'
                        className='w-full bg-[#2d0e0e]/60 backdrop-blur-sm border-2 border-white/10 focus:border-[#FFCD8D]/50 rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none transition-all duration-300'
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Payment */}
                {currentStep === 2 && (
                  <div className='space-y-6'>
                    <div className='bg-gradient-to-r from-[#6B2D2D]/50 to-[#4a1f1f]/50 backdrop-blur-md rounded-2xl p-6 border border-[#FFCD8D]/20'>
                      <h3 className='text-xl font-bold text-[#FFCD8D] mb-3'>
                        Registration Fee
                      </h3>
                      <p className='text-3xl font-bold text-white mb-2'>
                        {formatCurrency(EVENT_FEE)}
                      </p>
                      <p className='text-xs text-gray-400'>
                        Please pay{' '}
                        <strong className='text-[#FFCD8D]'>exactly</strong> this
                        amount.
                      </p>
                    </div>

                    {/* QRIS Payment Section */}
                    <div className='bg-gradient-to-br from-[#6B2D2D]/40 to-[#4a1f1f]/30 backdrop-blur-md rounded-2xl p-6 border border-white/10'>
                      <h4 className='text-lg font-bold text-[#FFCD8D] mb-4'>
                        Payment via QRIS
                      </h4>
                      <div className='flex justify-center mb-4'>
                        <div className='w-64 h-64 bg-[#2d0e0e]/60 border-2 border-dashed border-[#FFCD8D]/30 rounded-2xl flex items-center justify-center overflow-hidden'>
                          <Image
                            src='/payments/qris.webp'
                            alt='QRIS Payment Code'
                            width={240}
                            height={240}
                            className='rounded-xl object-contain'
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              if (target.parentElement) {
                                target.parentElement.innerHTML =
                                  '<p class="text-gray-500 text-sm text-center px-4">QRIS image will be displayed here.<br/>Contact admin for payment details.</p>';
                              }
                            }}
                          />
                        </div>
                      </div>
                      <p className='text-sm text-gray-300 text-center'>
                        Scan the QRIS code above to make payment of{' '}
                        <strong className='text-[#FFCD8D]'>
                          {formatCurrency(EVENT_FEE)}
                        </strong>
                      </p>
                    </div>

                    {/* Payment Instructions */}
                    <div className='bg-gradient-to-br from-[#6B2D2D]/40 to-[#4a1f1f]/30 backdrop-blur-md rounded-2xl p-6 border border-white/10'>
                      <h4 className='text-lg font-bold text-[#FFCD8D] mb-3'>
                        Payment Instructions
                      </h4>
                      <ol className='space-y-2 text-sm text-gray-300 list-decimal list-inside'>
                        <li>
                          Pay exactly{' '}
                          <strong className='text-[#FFCD8D]'>
                            {formatCurrency(EVENT_FEE)}
                          </strong>{' '}
                          using the QRIS code above
                        </li>
                        <li>
                          Take a screenshot or download the payment confirmation
                        </li>
                        <li>
                          Upload the payment proof below (JPG/PNG, max 5MB)
                        </li>
                      </ol>
                    </div>

                    {/* Upload Payment Proof */}
                    <div className='bg-gradient-to-br from-[#6B2D2D]/40 to-[#4a1f1f]/30 backdrop-blur-md rounded-2xl p-6 border border-white/10'>
                      <h4 className='text-lg font-bold text-[#FFCD8D] mb-3'>
                        Upload Payment Proof{' '}
                        <span className='text-[#FFCD8D]'>*</span>
                      </h4>

                      {!formData.paymentProof ? (
                        <label className='flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-[#FFCD8D]/30 rounded-2xl cursor-pointer hover:border-[#FFCD8D] transition-all duration-300 bg-[#2d0e0e]/40'>
                          <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                            <Upload className='w-12 h-12 mb-4 text-[#FFCD8D]/60' />
                            <p className='mb-2 text-lg text-gray-300'>
                              <span className='font-semibold text-[#FFCD8D]'>
                                Click to upload
                              </span>{' '}
                              or drag and drop
                            </p>
                            <p className='text-sm text-gray-500'>
                              JPG or PNG (MAX. 5MB)
                            </p>
                          </div>
                          <input
                            type='file'
                            className='hidden'
                            accept='image/jpeg,image/png,image/jpg'
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                setFormData((prev) => ({
                                  ...prev,
                                  paymentProof: file,
                                }));
                              }
                            }}
                          />
                        </label>
                      ) : (
                        <div className='space-y-4'>
                          <div className='relative'>
                            <img
                              src={URL.createObjectURL(formData.paymentProof)}
                              alt='Payment proof preview'
                              className='w-full max-h-80 object-contain rounded-xl border border-white/10'
                            />
                            <button
                              type='button'
                              onClick={() =>
                                setFormData((prev) => ({
                                  ...prev,
                                  paymentProof: null,
                                }))
                              }
                              className='absolute top-2 right-2 p-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors'
                            >
                              <X size={16} />
                            </button>
                          </div>
                          <div className='flex items-center gap-3 text-sm text-gray-300'>
                            <FileImage size={16} className='text-[#FFCD8D]' />
                            <span>{formData.paymentProof.name}</span>
                            <span className='text-gray-500'>
                              (
                              {(
                                formData.paymentProof.size /
                                1024 /
                                1024
                              ).toFixed(2)}{' '}
                              MB)
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 3: Review & Confirm */}
                {currentStep === 3 && (
                  <div className='space-y-6'>
                    <div className='bg-gradient-to-br from-[#6B2D2D]/40 to-[#4a1f1f]/30 backdrop-blur-md rounded-2xl p-8 border border-white/10'>
                      <h3 className='text-3xl font-bold text-center mb-2 bg-gradient-to-r from-[#FFE4B5] via-[#FFCD8D] to-[#FFE4B5] bg-clip-text text-transparent'>
                        {eventContent.name}
                      </h3>
                      <p className='text-center text-gray-400 mb-6 text-lg'>
                        {eventContent.date} • {eventContent.venue}
                      </p>

                      <div className='border-t border-white/10 pt-6'>
                        <h4 className='text-sm font-semibold text-[#FFCD8D] mb-3 uppercase tracking-wide'>
                          Personal Information
                        </h4>
                        <div className='space-y-2 text-sm'>
                          <div className='flex justify-between'>
                            <span className='text-gray-400'>Full Name:</span>
                            <span className='text-white font-medium'>
                              {formData.fullName}
                            </span>
                          </div>
                          <div className='flex justify-between'>
                            <span className='text-gray-400'>Email:</span>
                            <span className='text-white'>{formData.email}</span>
                          </div>
                          <div className='flex justify-between'>
                            <span className='text-gray-400'>Phone:</span>
                            <span className='text-white'>
                              {formData.phoneNumber}
                            </span>
                          </div>
                          <div className='flex justify-between'>
                            <span className='text-gray-400'>Institution:</span>
                            <span className='text-white'>
                              {formData.institution}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className='border-t border-white/10 pt-6 mt-6'>
                        <h4 className='text-sm font-semibold text-[#FFCD8D] mb-3 uppercase tracking-wide'>
                          Registration Fee
                        </h4>
                        <div className='flex justify-between text-sm'>
                          <span className='text-gray-400'>Amount:</span>
                          <span className='text-white font-bold'>
                            {formatCurrency(EVENT_FEE)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {formData.paymentProof && (
                      <div className='bg-gradient-to-br from-[#6B2D2D]/40 to-[#4a1f1f]/30 backdrop-blur-md rounded-2xl p-6 border border-white/10'>
                        <h4 className='text-sm font-semibold text-[#FFCD8D] mb-3 uppercase tracking-wide'>
                          Payment Proof
                        </h4>
                        <div className='flex items-center gap-3 text-sm text-gray-300'>
                          <FileImage size={16} className='text-[#FFCD8D]' />
                          <span>{formData.paymentProof.name}</span>
                          <span className='text-gray-500'>
                            (
                            {(formData.paymentProof.size / 1024 / 1024).toFixed(
                              2,
                            )}{' '}
                            MB)
                          </span>
                        </div>
                      </div>
                    )}

                    <div className='text-center text-sm text-gray-400 bg-[#2d0e0e]/40 backdrop-blur-sm rounded-2xl p-4 border border-white/5'>
                      ℹ️ After submission, you will receive a confirmation
                      within 24 hours. Please check your inbox and spam folder.
                    </div>
                  </div>
                )}

                {/* Navigation buttons */}
                <div className='flex justify-between items-center mt-10 gap-4'>
                  {currentStep > 1 && (
                    <button
                      type='button'
                      onClick={handleBack}
                      disabled={isLoading}
                      className='px-8 py-4 bg-[#2d0e0e]/60 backdrop-blur-sm border-2 border-white/10 rounded-2xl text-white hover:border-[#FFCD8D]/50 hover:bg-[#3d1a1a]/60 transition-all duration-300 disabled:opacity-50 font-medium'
                    >
                      Back
                    </button>
                  )}

                  {currentStep === 1 && <div />}

                  {currentStep < 3 ? (
                    <button
                      type='button'
                      onClick={handleNext}
                      disabled={isLoading}
                      className='flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#8B4513] to-[#6B2D2D] border-2 border-[#FFCD8D]/30 rounded-2xl text-white hover:from-[#9B5523] hover:to-[#7B3D3D] transition-all duration-300 shadow-lg shadow-orange-900/20 disabled:opacity-50 ml-auto font-bold'
                    >
                      <span>Next</span>
                      <ChevronRight size={20} />
                    </button>
                  ) : (
                    <button
                      type='button'
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className='flex items-center justify-center gap-2 px-10 py-4 bg-gradient-to-r from-[#FFCD8D] via-[#E8A05D] to-[#FFCD8D] rounded-2xl text-[#2d0e0e] font-bold hover:from-[#FFD9A3] hover:via-[#F0B070] hover:to-[#FFD9A3] transition-all duration-300 shadow-xl shadow-orange-500/30 disabled:opacity-50 ml-auto text-lg'
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className='animate-spin' size={22} />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <span>Submit</span>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default function EventRegisterPage() {
  return (
    <Suspense
      fallback={
        <div className='min-h-screen bg-[#0B0102] flex items-center justify-center'>
          <Loader2 className='text-[#FFCD8D] animate-spin' size={40} />
        </div>
      }
    >
      <RegistrationContent />
    </Suspense>
  );
}
