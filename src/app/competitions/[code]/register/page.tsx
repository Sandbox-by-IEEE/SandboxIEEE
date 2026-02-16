'use client';

import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

import Footer from '@/components/site/Footer';
import Navbar from '@/components/site/Navbar';

/**
 * ============================================================================
 * COMPETITION REGISTRATION FORM - MULTI-STEP
 * ============================================================================
 * 
 * 3-Step Registration Flow:
 * 1. Team Identity - Team name, institution (competition auto-selected from URL)
 * 2. Team Members - Leader + member details
 * 3. Review & Confirm - Summary before submission
 * 
 * Route: /competitions/[code]/register
 * Example: /competitions/ptc/register
 * ============================================================================
 */

type Competition = 'BCC' | 'TPC' | 'PTC';

interface TeamMember {
  fullName: string;
  phoneNumber?: string;
  email?: string;
  proofOfRegistrationLink: string;
}

interface FormData {
  // Step 1: Team Identity
  competitionCode: Competition;
  teamName: string;
  institution: string;

  // Step 2: Team Members
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

  // Initialize members based on competition
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
      // Validate leader
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

      // Validate members
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

      // Success - redirect to success page or show confirmation
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
      <div className="min-h-screen bg-[#0B0102] pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Registration Form</h1>
            <p className="text-[#E8B4A8]">Complete the form below to register your team</p>
          </div>

          {/* Main Container with Mascot */}
          <div className="relative">
            {/* Mascot Character */}
            <div className="absolute -left-4 -top-12 md:-left-16 md:-top-16 z-10">
              <Image
                src="/mascots/mascot-3.svg"
                alt="Mascot"
                width={180}
                height={180}
                className="w-32 h-32 md:w-44 md:h-44"
              />
            </div>

            {/* Progress Bar Container */}
            <div className="bg-gradient-to-br from-[#2d0609]/80 to-[#190204]/80 rounded-3xl p-8 md:p-12 border-2 border-[#8B3A3A]/30 mb-8">
              <h2 className="text-2xl font-bold text-center mb-6" style={{
                background: 'linear-gradient(90deg, #FFCD8D 0%, #FFFFFF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                {currentStep === 1 && 'Team Identity'}
                {currentStep === 2 && 'Team Members'}
                {currentStep === 3 && 'Review & Confirm'}
              </h2>

              {/* Progress Indicator */}
              <div className="flex items-center justify-center gap-4 mb-8">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`flex flex-col items-center ${step < 3 ? 'mr-4' : ''}`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${step === currentStep
                        ? 'bg-gradient-to-r from-[#FFCD8D] to-[#FFFFFF] text-[#190204]'
                        : step < currentStep
                          ? 'bg-[#8B3A3A] text-white'
                          : 'bg-[#2d0609] text-[#9b7a6f] border-2 border-[#8B3A3A]/30'
                        }`}>
                        {step}
                      </div>
                      <span className="text-xs text-[#E8B4A8] mt-2 hidden md:block">
                        {step === 1 && 'Team Identity'}
                        {step === 2 && 'Team Members'}
                        {step === 3 && 'Review & Confirm'}
                      </span>
                    </div>
                    {step < 3 && (
                      <div className={`w-16 h-1 ${step < currentStep ? 'bg-[#8B3A3A]' : 'bg-[#2d0609]'}`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Form Content Container */}
            <div className="bg-gradient-to-br from-[#2d0609]/60 to-[#190204]/60 rounded-3xl p-6 md:p-10 border-2 border-[#8B3A3A]/30">
              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-[#8B3A3A]/20 border border-[#8B3A3A]/50 rounded-xl">
                  <p className="text-[#FFCD8D] text-sm">{error}</p>
                </div>
              )}

              {/* Step 1: Team Identity */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  {/* Competition Info (Read-only) */}
                  <div className="bg-[#2d0609]/60 rounded-2xl p-6 border border-[#8B3A3A]/30">
                    <h3 className="text-lg font-bold text-[#FFCD8D] mb-2">
                      {COMPETITION_DETAILS[competitionCode].name} ({competitionCode})
                    </h3>
                    <p className="text-xs text-[#9b7a6f]">
                      {COMPETITION_DETAILS[competitionCode].min === COMPETITION_DETAILS[competitionCode].max
                        ? `Requires exactly ${COMPETITION_DETAILS[competitionCode].min} members`
                        : `Requires ${COMPETITION_DETAILS[competitionCode].min}-${COMPETITION_DETAILS[competitionCode].max} members`
                      }
                    </p>
                  </div>

                  <div>
                    <label className="block text-[#E8B4A8] mb-2 font-medium">
                      Team Name <span className="text-[#FFCD8D]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.teamName}
                      onChange={(e) => setFormData(prev => ({ ...prev, teamName: e.target.value }))}
                      placeholder="Choose a creative name that represents your team (50 characters max)"
                      className="w-full bg-[#3d0709]/80 border border-[#8B3A3A]/40 rounded-xl px-4 py-3 text-white placeholder-[#9b7a6f] focus:outline-none focus:border-[#FFCD8D]/50 transition-colors"
                      maxLength={50}
                    />
                  </div>

                  <div>
                    <label className="block text-[#E8B4A8] mb-2 font-medium">
                      Institution / University <span className="text-[#FFCD8D]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.institution}
                      onChange={(e) => setFormData(prev => ({ ...prev, institution: e.target.value }))}
                      placeholder="Full name of your institution"
                      className="w-full bg-[#3d0709]/80 border border-[#8B3A3A]/40 rounded-xl px-4 py-3 text-white placeholder-[#9b7a6f] focus:outline-none focus:border-[#FFCD8D]/50 transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Team Members */}
              {currentStep === 2 && (
                <div className="space-y-8">
                  {/* Leader Section */}
                  <div className="bg-[#2d0609]/60 rounded-2xl p-6 border border-[#8B3A3A]/30">
                    <h3 className="text-xl font-bold text-[#FFCD8D] mb-4">#1 Team Leader</h3>
                    <p className="text-sm text-[#E8B4A8] mb-6">
                      As the team leader, you'll be the main of contact. Please provide complete information for all team members.
                    </p>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-[#E8B4A8] mb-2 text-sm">
                          Full Name <span className="text-[#FFCD8D]">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.leaderName}
                          onChange={(e) => setFormData(prev => ({ ...prev, leaderName: e.target.value }))}
                          placeholder="Enter your full name"
                          className="w-full bg-[#3d0709]/80 border border-[#8B3A3A]/40 rounded-xl px-4 py-3 text-white placeholder-[#9b7a6f] focus:outline-none focus:border-[#FFCD8D]/50 transition-colors text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-[#E8B4A8] mb-2 text-sm">
                          Phone Number <span className="text-[#FFCD8D]">*</span>
                        </label>
                        <input
                          type="tel"
                          value={formData.leaderPhone}
                          onChange={(e) => setFormData(prev => ({ ...prev, leaderPhone: e.target.value }))}
                          placeholder="Enter your phone number"
                          className="w-full bg-[#3d0709]/80 border border-[#8B3A3A]/40 rounded-xl px-4 py-3 text-white placeholder-[#9b7a6f] focus:outline-none focus:border-[#FFCD8D]/50 transition-colors text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-[#E8B4A8] mb-2 text-sm">
                          Email Address <span className="text-[#FFCD8D]">*</span>
                        </label>
                        <input
                          type="email"
                          value={formData.leaderEmail}
                          onChange={(e) => setFormData(prev => ({ ...prev, leaderEmail: e.target.value }))}
                          placeholder="Enter your email address"
                          className="w-full bg-[#3d0709]/80 border border-[#8B3A3A]/40 rounded-xl px-4 py-3 text-white placeholder-[#9b7a6f] focus:outline-none focus:border-[#FFCD8D]/50 transition-colors text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-[#E8B4A8] mb-2 text-sm">
                          Password <span className="text-[#FFCD8D]">*</span>
                        </label>
                        <input
                          type="password"
                          value={formData.leaderPassword}
                          onChange={(e) => setFormData(prev => ({ ...prev, leaderPassword: e.target.value }))}
                          placeholder="Create a password (min. 8 characters)"
                          className="w-full bg-[#3d0709]/80 border border-[#8B3A3A]/40 rounded-xl px-4 py-3 text-white placeholder-[#9b7a6f] focus:outline-none focus:border-[#FFCD8D]/50 transition-colors text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-[#E8B4A8] mb-2 text-sm">
                          Proof of Registration (Link) <span className="text-[#FFCD8D]">*</span>
                        </label>
                        <input
                          type="url"
                          value={formData.leaderProofLink}
                          onChange={(e) => setFormData(prev => ({ ...prev, leaderProofLink: e.target.value }))}
                          placeholder="Share a Google Drive folder containing screenshots of proof. Top: Read the Guidelines properly"
                          className="w-full bg-[#3d0709]/80 border border-[#8B3A3A]/40 rounded-xl px-4 py-3 text-white placeholder-[#9b7a6f] focus:outline-none focus:border-[#FFCD8D]/50 transition-colors text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Members Sections */}
                  {formData.members.map((member, index) => (
                    <div key={index} className="bg-[#2d0609]/60 rounded-2xl p-6 border border-[#8B3A3A]/30">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-[#FFCD8D]">#{index + 2} Member</h3>
                        {formData.members.length > COMPETITION_DETAILS[formData.competitionCode].min - 1 && (
                          <button
                            type="button"
                            onClick={() => removeMember(index)}
                            className="text-xs text-[#8B3A3A] hover:text-[#FFCD8D] transition-colors"
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-[#E8B4A8] mb-2 text-sm">
                            Full Name <span className="text-[#FFCD8D]">*</span>
                          </label>
                          <input
                            type="text"
                            value={member.fullName}
                            onChange={(e) => updateMember(index, 'fullName', e.target.value)}
                            placeholder="Enter your full name"
                            className="w-full bg-[#3d0709]/80 border border-[#8B3A3A]/40 rounded-xl px-4 py-3 text-white placeholder-[#9b7a6f] focus:outline-none focus:border-[#FFCD8D]/50 transition-colors text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-[#E8B4A8] mb-2 text-sm">
                            Proof of Registration (Link) <span className="text-[#FFCD8D]">*</span>
                          </label>
                          <input
                            type="url"
                            value={member.proofOfRegistrationLink}
                            onChange={(e) => updateMember(index, 'proofOfRegistrationLink', e.target.value)}
                            placeholder="Share a Google Drive folder containing screenshots of proof. Top: Read the Guidelines properly"
                            className="w-full bg-[#3d0709]/80 border border-[#8B3A3A]/40 rounded-xl px-4 py-3 text-white placeholder-[#9b7a6f] focus:outline-none focus:border-[#FFCD8D]/50 transition-colors text-sm"
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
                      className="w-full py-3 bg-[#2d0609]/60 border-2 border-dashed border-[#8B3A3A]/50 rounded-xl text-[#E8B4A8] hover:border-[#FFCD8D]/50 hover:text-[#FFCD8D] transition-colors"
                    >
                      + Add Member (Optional)
                    </button>
                  )}
                </div>
              )}

              {/* Step 3: Review & Confirm */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="bg-[#2d0609]/60 rounded-2xl p-6 border border-[#8B3A3A]/30">
                    <h3 className="text-2xl font-bold text-center mb-2" style={{
                      background: 'linear-gradient(90deg, #FFCD8D 0%, #FFFFFF 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}>
                      {formData.teamName}
                    </h3>
                    <p className="text-center text-[#E8B4A8] mb-6">{formData.institution}</p>

                    <div className="border-t border-[#8B3A3A]/30 pt-6">
                      <h4 className="text-sm font-semibold text-[#FFCD8D] mb-3">Team Leader</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-[#9b7a6f]">Name:</span>
                          <span className="text-[#E8B4A8] font-medium">{formData.leaderName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#9b7a6f]">Email:</span>
                          <span className="text-[#E8B4A8]">{formData.leaderEmail}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#9b7a6f]">Phone:</span>
                          <span className="text-[#E8B4A8]">{formData.leaderPhone}</span>
                        </div>
                      </div>
                    </div>

                    {formData.members.length > 0 && (
                      <div className="border-t border-[#8B3A3A]/30 pt-6 mt-6">
                        <h4 className="text-sm font-semibold text-[#FFCD8D] mb-3">Members</h4>
                        <div className="space-y-4">
                          {formData.members.map((member, index) => (
                            <div key={index} className="flex justify-between items-center text-sm">
                              <span className="text-[#9b7a6f]">Member {index + 2}:</span>
                              <span className="text-[#E8B4A8]">{member.fullName}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="text-center text-sm text-[#E8B4A8] bg-[#2d0609]/40 rounded-xl p-4 border border-[#8B3A3A]/30">
                    After submission, you will receive a confirmation within 24 hours. Please check your inbox and spam folder.
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-8 gap-4">
                {/* Back Button */}
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-6 py-3 bg-[#2d0609]/80 border border-[#8B3A3A]/40 rounded-xl text-[#E8B4A8] hover:border-[#FFCD8D]/50 hover:text-[#FFCD8D] transition-all disabled:opacity-50"
                  >
                    <ChevronLeft size={20} />
                    <span>Back</span>
                  </button>
                )}

                {/* Spacer for alignment */}
                {currentStep === 1 && <div />}

                {/* Next/Submit Button */}
                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#8B3A3A] to-[#5A2424] border border-[#FFCD8D]/30 rounded-xl text-white hover:from-[#9B4A4A] hover:to-[#6A3434] transition-all shadow-lg shadow-[#8B3A3A]/20 disabled:opacity-50 ml-auto"
                  >
                    <span>Next</span>
                    <ChevronRight size={20} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-[#FFCD8D] to-[#DBB88B] rounded-xl text-[#190204] font-bold hover:from-[#FFD9A3] hover:to-[#EBC89B] transition-all shadow-lg disabled:opacity-50 ml-auto"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
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
