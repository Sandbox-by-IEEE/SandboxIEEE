'use client';

import { ChevronRight, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

import Footer from '@/components/site/Footer';
import Navbar from '@/components/site/Navbar';

type Competition = 'BCC' | 'TPC' | 'PTC';

interface TeamMember {
  fullName: string;
  phoneNumber?: string;
  email?: string;
  proofOfRegistrationLink: string;
}

interface FormData {
  competitionCode: Competition;
  teamName: string;
  institution: string;
  leaderName: string;
  leaderPhone: string;
  leaderEmail: string;
  leaderPassword: string;
  leaderProofLink: string;
  members: TeamMember[];
}

const COMPETITION_DETAILS = {
  BCC: { name: 'Business Case Competition', min: 3, max: 3 },
  TPC: { name: 'Technovate Paper Competition', min: 2, max: 3 },
  PTC: { name: 'ProtoTech Contest', min: 3, max: 5 },
};

function RegistrationContent() {
  const router = useRouter();
  const params = useParams();
  const competitionCode = (params.code as string).toUpperCase() as Competition;

  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState<FormData>({
    competitionCode: competitionCode,
    teamName: '',
    institution: '',
    leaderName: '',
    leaderPhone: '',
    leaderEmail: '',
    leaderPassword: '',
    leaderProofLink: '',
    members: [],
  });

  useEffect(() => {
    const minMembers = COMPETITION_DETAILS[formData.competitionCode].min;
    const initialMembers = Array(minMembers - 1).fill(null).map(() => ({
      fullName: '',
      proofOfRegistrationLink: '',
    }));
    setFormData(prev => ({ ...prev, members: initialMembers }));
  }, [formData.competitionCode]);

  const validateStep = (step: number): boolean => {
    setError('');

    if (step === 1) {
      if (!formData.teamName.trim()) {
        setError('Team name is required');
        return false;
      }
      if (!formData.institution.trim()) {
        setError('Institution/University is required');
        return false;
      }
    }

    if (step === 2) {
      if (!formData.leaderName.trim()) {
        setError('Leader full name is required');
        return false;
      }
      if (!formData.leaderPhone.trim()) {
        setError('Leader phone number is required');
        return false;
      }
      if (!formData.leaderEmail.trim() || !formData.leaderEmail.includes('@')) {
        setError('Valid leader email is required');
        return false;
      }
      if (!formData.leaderPassword || formData.leaderPassword.length < 8) {
        setError('Password must be at least 8 characters');
        return false;
      }
      if (!formData.leaderProofLink.trim() || !formData.leaderProofLink.startsWith('http')) {
        setError('Leader proof of registration link is required (must be a valid URL)');
        return false;
      }

      for (let i = 0; i < formData.members.length; i++) {
        const member = formData.members[i];
        if (!member.fullName.trim()) {
          setError(`Member ${i + 2} full name is required`);
          return false;
        }
        if (!member.proofOfRegistrationLink.trim() || !member.proofOfRegistrationLink.startsWith('http')) {
          setError(`Member ${i + 2} proof of registration link is required (must be a valid URL)`);
          return false;
        }
      }
    }

    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setError('');
  };

  const handleSubmit = async () => {
    if (!validateStep(2)) return;

    setIsLoading(true);
    setError('');

    try {
      const payload = {
        competitionCode: formData.competitionCode,
        teamName: formData.teamName,
        institution: formData.institution,
        leaderName: formData.leaderName,
        leaderEmail: formData.leaderEmail,
        leaderPhone: formData.leaderPhone,
        leaderPassword: formData.leaderPassword,
        members: formData.members.map(m => ({
          fullName: m.fullName,
          email: m.email || `${m.fullName.replace(/\s+/g, '').toLowerCase()}@placeholder.com`,
          phoneNumber: m.phoneNumber || '000000000000',
          proofOfRegistrationLink: m.proofOfRegistrationLink,
        })),
      };

      const response = await fetch('/api/competitions/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      router.push(`/competitions/${competitionCode.toLowerCase()}/register/success?email=${encodeURIComponent(formData.leaderEmail)}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit registration');
    } finally {
      setIsLoading(false);
    }
  };

  const addMember = () => {
    const maxMembers = COMPETITION_DETAILS[formData.competitionCode].max;
    if (formData.members.length < maxMembers - 1) {
      setFormData(prev => ({
        ...prev,
        members: [...prev.members, { fullName: '', proofOfRegistrationLink: '' }],
      }));
    }
  };

  const removeMember = (index: number) => {
    const minMembers = COMPETITION_DETAILS[formData.competitionCode].min;
    if (formData.members.length > minMembers - 1) {
      setFormData(prev => ({
        ...prev,
        members: prev.members.filter((_, i) => i !== index),
      }));
    }
  };

  const updateMember = (index: number, field: keyof TeamMember, value: string) => {
    setFormData(prev => ({
      ...prev,
      members: prev.members.map((m, i) =>
        i === index ? { ...m, [field]: value } : m
      ),
    }));
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-[#0B0102] via-[#190204] to-[#0B0102] pt-32 pb-16 px-4 font-['Gemunu_Libre']">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-3 tracking-wide">
              Registration Form
            </h1>
            <p className="text-gray-400 text-lg">Complete the form below to register your team</p>
          </div>

          {/* Main Container with Mascot */}
          <div className="relative">
            {/* Mascot Character - Positioned like clip/pin */}
            <div className="absolute -left-8 -top-20 md:-left-12 md:-top-24 z-20">
              <Image
                src="/mascots/mascot-3.svg"
                alt="Mascot"
                width={200}
                height={200}
                className="w-40 h-40 md:w-48 md:h-48 drop-shadow-2xl"
              />
            </div>

            {/* Glassmorphism Container */}
            <div className="relative backdrop-blur-xl bg-gradient-to-br from-[#5A2424]/40 via-[#3d1a1a]/30 to-[#2d0e0e]/40 rounded-[2.5rem] p-8 md:p-12 border border-white/10 shadow-2xl">
              {/* Progress Header */}
              <div className="bg-gradient-to-br from-[#6B2D2D]/50 to-[#4a1f1f]/50 backdrop-blur-md rounded-3xl p-8 border border-white/10 mb-8">
                <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-[#FFE4B5] via-[#FFCD8D] to-[#FFE4B5] bg-clip-text text-transparent">
                  {currentStep === 1 && 'Team Identity'}
                  {currentStep === 2 && 'Team Members'}
                  {currentStep === 3 && 'Review & Confirm'}
                </h2>

                {/* Progress Indicator */}
                <div className="flex items-center justify-center gap-2">
                  {['Team Identity', 'Team Members', 'Review & Confirm'].map((label, index) => {
                    const step = index + 1;
                    return (
                      <div key={step} className="flex items-center">
                        <div className="flex flex-col items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${step === currentStep
                            ? 'bg-gradient-to-br from-[#FFCD8D] to-[#E8A05D] text-[#2d0e0e] scale-110 shadow-lg shadow-orange-500/30'
                            : step < currentStep
                              ? 'bg-[#6B2D2D] text-white border-2 border-[#FFCD8D]/50'
                              : 'bg-[#3d1a1a]/60 text-gray-500 border-2 border-gray-600/30'
                            }`}>
                            {step}
                          </div>
                          <span className="text-xs text-gray-400 mt-2 hidden lg:block max-w-[100px] text-center leading-tight">
                            {label}
                          </span>
                        </div>
                        {step < 3 && (
                          <div className={`w-12 md:w-20 h-1 mx-2 rounded-full transition-all ${step < currentStep ? 'bg-gradient-to-r from-[#FFCD8D] to-[#E8A05D]' : 'bg-gray-700/50'
                            }`} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Form Content */}
              <div className="bg-gradient-to-br from-[#5A2424]/30 to-[#3d1a1a]/20 backdrop-blur-sm rounded-3xl p-6 md:p-10 border border-white/5">
                {/* Error Message */}
                {error && (
                  <div className="mb-6 p-4 bg-red-900/30 border border-red-500/50 rounded-2xl backdrop-blur-sm">
                    <p className="text-red-200 text-sm">{error}</p>
                  </div>
                )}

                {/* Step 1: Team Identity */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    {/* Competition Badge */}
                    <div className="bg-gradient-to-r from-[#6B2D2D]/50 to-[#4a1f1f]/50 backdrop-blur-md rounded-2xl p-6 border border-[#FFCD8D]/20">
                      <h3 className="text-xl font-bold text-[#FFCD8D] mb-1">
                        {COMPETITION_DETAILS[competitionCode].name}
                      </h3>
                      <p className="text-xs text-gray-400">
                        {COMPETITION_DETAILS[competitionCode].min === COMPETITION_DETAILS[competitionCode].max
                          ? `Requires exactly ${COMPETITION_DETAILS[competitionCode].min} members`
                          : `Requires ${COMPETITION_DETAILS[competitionCode].min}-${COMPETITION_DETAILS[competitionCode].max} members`
                        }
                      </p>
                    </div>

                    <div>
                      <label className="block text-white mb-3 font-medium text-lg">
                        Team Name<span className="text-[#FFCD8D] ml-1">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.teamName}
                        onChange={(e) => setFormData(prev => ({ ...prev, teamName: e.target.value }))}
                        placeholder="Choose a creative name that represents your team (max 50 characters)"
                        className="w-full bg-[#2d0e0e]/60 backdrop-blur-sm border-2 border-white/10 focus:border-[#FFCD8D]/50 rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none transition-all duration-300"
                        maxLength={50}
                      />
                    </div>

                    <div>
                      <label className="block text-white mb-3 font-medium text-lg">
                        Institution / University<span className="text-[#FFCD8D] ml-1">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.institution}
                        onChange={(e) => setFormData(prev => ({ ...prev, institution: e.target.value }))}
                        placeholder="Full name of your institution"
                        className="w-full bg-[#2d0e0e]/60 backdrop-blur-sm border-2 border-white/10 focus:border-[#FFCD8D]/50 rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none transition-all duration-300"
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Team Members */}
                {currentStep === 2 && (
                  <div className="space-y-8">
                    {/* Leader Section */}
                    <div className="bg-gradient-to-br from-[#6B2D2D]/40 to-[#4a1f1f]/30 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                      <h3 className="text-2xl font-bold text-[#FFCD8D] mb-4">#1 Team Leader</h3>
                      <p className="text-sm text-gray-400 mb-6">
                        As the team leader, you&apos;ll be the main point of contact. Please provide complete information.
                      </p>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-white mb-2 text-sm font-medium">
                            Full Name <span className="text-[#FFCD8D]">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.leaderName}
                            onChange={(e) => setFormData(prev => ({ ...prev, leaderName: e.target.value }))}
                            placeholder="Enter your full name"
                            className="w-full bg-[#2d0e0e]/60 backdrop-blur-sm border-2 border-white/10 focus:border-[#FFCD8D]/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-all text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-white mb-2 text-sm font-medium">
                            Phone Number <span className="text-[#FFCD8D]">*</span>
                          </label>
                          <input
                            type="tel"
                            value={formData.leaderPhone}
                            onChange={(e) => setFormData(prev => ({ ...prev, leaderPhone: e.target.value }))}
                            placeholder="Enter your phone number"
                            className="w-full bg-[#2d0e0e]/60 backdrop-blur-sm border-2 border-white/10 focus:border-[#FFCD8D]/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-all text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-white mb-2 text-sm font-medium">
                            Email Address <span className="text-[#FFCD8D]">*</span>
                          </label>
                          <input
                            type="email"
                            value={formData.leaderEmail}
                            onChange={(e) => setFormData(prev => ({ ...prev, leaderEmail: e.target.value }))}
                            placeholder="Enter your email address"
                            className="w-full bg-[#2d0e0e]/60 backdrop-blur-sm border-2 border-white/10 focus:border-[#FFCD8D]/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-all text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-white mb-2 text-sm font-medium">
                            Password <span className="text-[#FFCD8D]">*</span>
                          </label>
                          <input
                            type="password"
                            value={formData.leaderPassword}
                            onChange={(e) => setFormData(prev => ({ ...prev, leaderPassword: e.target.value }))}
                            placeholder="Create a password (min. 8 characters)"
                            className="w-full bg-[#2d0e0e]/60 backdrop-blur-sm border-2 border-white/10 focus:border-[#FFCD8D]/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-all text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-white mb-2 text-sm font-medium">
                            Proof of Registration (Link) <span className="text-[#FFCD8D]">*</span>
                          </label>
                          <input
                            type="url"
                            value={formData.leaderProofLink}
                            onChange={(e) => setFormData(prev => ({ ...prev, leaderProofLink: e.target.value }))}
                            placeholder="https://drive.google.com/..."
                            className="w-full bg-[#2d0e0e]/60 backdrop-blur-sm border-2 border-white/10 focus:border-[#FFCD8D]/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-all text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Members Sections */}
                    {formData.members.map((member, index) => (
                      <div key={index} className="bg-gradient-to-br from-[#6B2D2D]/40 to-[#4a1f1f]/30 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-2xl font-bold text-[#FFCD8D]">#{index + 2} Member</h3>
                          {formData.members.length > COMPETITION_DETAILS[formData.competitionCode].min - 1 && (
                            <button
                              type="button"
                              onClick={() => removeMember(index)}
                              className="text-xs text-red-400 hover:text-red-300 transition-colors px-3 py-1 border border-red-400/50 rounded-lg"
                            >
                              Remove
                            </button>
                          )}
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-white mb-2 text-sm font-medium">
                              Full Name <span className="text-[#FFCD8D]">*</span>
                            </label>
                            <input
                              type="text"
                              value={member.fullName}
                              onChange={(e) => updateMember(index, 'fullName', e.target.value)}
                              placeholder="Enter full name"
                              className="w-full bg-[#2d0e0e]/60 backdrop-blur-sm border-2 border-white/10 focus:border-[#FFCD8D]/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-all text-sm"
                            />
                          </div>

                          <div>
                            <label className="block text-white mb-2 text-sm font-medium">
                              Proof of Registration (Link) <span className="text-[#FFCD8D]">*</span>
                            </label>
                            <input
                              type="url"
                              value={member.proofOfRegistrationLink}
                              onChange={(e) => updateMember(index, 'proofOfRegistrationLink', e.target.value)}
                              placeholder="https://drive.google.com/..."
                              className="w-full bg-[#2d0e0e]/60 backdrop-blur-sm border-2 border-white/10 focus:border-[#FFCD8D]/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-all text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Add Member Button */}
                    {formData.members.length < COMPETITION_DETAILS[formData.competitionCode].max - 1 && (
                      <button
                        type="button"
                        onClick={addMember}
                        className="w-full py-4 bg-[#2d0e0e]/40 backdrop-blur-sm border-2 border-dashed border-[#FFCD8D]/30 rounded-2xl text-gray-300 hover:border-[#FFCD8D] hover:text-[#FFCD8D] transition-all duration-300 font-medium"
                      >
                        + Add Member (Optional)
                      </button>
                    )}
                  </div>
                )}

                {/* Step 3: Review & Confirm */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-[#6B2D2D]/40 to-[#4a1f1f]/30 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                      <h3 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-[#FFE4B5] via-[#FFCD8D] to-[#FFE4B5] bg-clip-text text-transparent">
                        {formData.teamName}
                      </h3>
                      <p className="text-center text-gray-400 mb-6 text-lg">{formData.institution}</p>

                      <div className="border-t border-white/10 pt-6">
                        <h4 className="text-sm font-semibold text-[#FFCD8D] mb-3 uppercase tracking-wide">Team Leader</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Name:</span>
                            <span className="text-white font-medium">{formData.leaderName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Email:</span>
                            <span className="text-white">{formData.leaderEmail}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Phone:</span>
                            <span className="text-white">{formData.leaderPhone}</span>
                          </div>
                        </div>
                      </div>

                      {formData.members.length > 0 && (
                        <div className="border-t border-white/10 pt-6 mt-6">
                          <h4 className="text-sm font-semibold text-[#FFCD8D] mb-3 uppercase tracking-wide">Team Members</h4>
                          <div className="space-y-3">
                            {formData.members.map((member, index) => (
                              <div key={index} className="flex justify-between items-center text-sm">
                                <span className="text-gray-400">Member {index + 2}:</span>
                                <span className="text-white">{member.fullName}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="text-center text-sm text-gray-400 bg-[#2d0e0e]/40 backdrop-blur-sm rounded-2xl p-4 border border-white/5">
                      ℹ️ After submission, you will receive a confirmation within 24 hours. Please check your inbox and spam folder.
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center mt-10 gap-4">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      disabled={isLoading}
                      className="px-8 py-4 bg-[#2d0e0e]/60 backdrop-blur-sm border-2 border-white/10 rounded-2xl text-white hover:border-[#FFCD8D]/50 hover:bg-[#3d1a1a]/60 transition-all duration-300 disabled:opacity-50 font-medium"
                    >
                      Back
                    </button>
                  )}

                  {currentStep === 1 && <div />}

                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={isLoading}
                      className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#8B4513] to-[#6B2D2D] border-2 border-[#FFCD8D]/30 rounded-2xl text-white hover:from-[#9B5523] hover:to-[#7B3D3D] transition-all duration-300 shadow-lg shadow-orange-900/20 disabled:opacity-50 ml-auto font-bold"
                    >
                      <span>Next</span>
                      <ChevronRight size={20} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className="flex items-center justify-center gap-2 px-10 py-4 bg-gradient-to-r from-[#FFCD8D] via-[#E8A05D] to-[#FFCD8D] rounded-2xl text-[#2d0e0e] font-bold hover:from-[#FFD9A3] hover:via-[#F0B070] hover:to-[#FFD9A3] transition-all duration-300 shadow-xl shadow-orange-500/30 disabled:opacity-50 ml-auto text-lg"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="animate-spin" size={22} />
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

export default function CompetitionRegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0B0102] flex items-center justify-center">
        <Loader2 className="text-[#FFCD8D] animate-spin" size={40} />
      </div>
    }>
      <RegistrationContent />
    </Suspense>
  );
}
