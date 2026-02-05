import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import {
  Calendar,
  Users,
  DollarSign,
  FileText,
  Award,
  ArrowLeft,
  Clock,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

/**
 * ============================================================================
 * COMPETITION DETAIL PAGE
 * ============================================================================
 * 
 * Dynamic route that displays full details of a specific competition
 * Shows timeline, requirements, prizes, and registration button
 * 
 * Route: /competitions/[code] (e.g., /competitions/ptc)
 * ============================================================================
 */


interface CompetitionDetailPageProps {
  params: Promise<{
    code: string;
  }>;
}

export async function generateMetadata({ params }: CompetitionDetailPageProps) {
  const { code } = await params;
  const competition = await prisma.competition.findUnique({
    where: { code: code.toUpperCase() },
  });










  if (!competition) {
    return {
      title: 'Competition Not Found | The Sandbox 3.0',
    };
  }

  return {
    title: `${competition.name} | The Sandbox 3.0`,
    description: competition.description,
  };
}

export default async function CompetitionDetailPage({ params }: CompetitionDetailPageProps) {
  const { code } = await params;
  const competition = await prisma.competition.findUnique({
    where: { code: code.toUpperCase() },
  });

  if (!competition || !competition.isActive) {
    notFound();
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Jakarta',
    }).format(new Date(date));
  };

  const isRegistrationOpen = new Date() < new Date(competition.registrationDeadline);
  const currentPhase = getCurrentPhase(competition);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            href="/competitions"
            className="inline-flex items-center text-white/90 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Competitions
          </Link>

          <div className="flex items-start justify-between">
            <div>
              <div className="inline-block bg-white/20 px-4 py-1 rounded-full text-sm font-semibold mb-4">
                {competition.code}
              </div>
              <h1 className="text-5xl font-bold mb-4">
                {competition.name}
              </h1>
              <p className="text-xl text-white/90 max-w-3xl">
                {competition.description}
              </p>
            </div>

            <div className="text-right">
              {isRegistrationOpen ? (
                <div className="bg-green-500 px-6 py-3 rounded-xl">
                  <div className="text-sm font-medium mb-1">Status</div>
                  <div className="text-lg font-bold">OPEN</div>
                </div>
              ) : (
                <div className="bg-red-500 px-6 py-3 rounded-xl">
                  <div className="text-sm font-medium mb-1">Status</div>
                  <div className="text-lg font-bold">CLOSED</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Key Information */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Competition Overview
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-xl mr-4">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Team Size</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {competition.minTeamSize === competition.maxTeamSize
                        ? `${competition.minTeamSize} members`
                        : `${competition.minTeamSize}-${competition.maxTeamSize} members`}
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-xl mr-4">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Registration Fee</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {formatCurrency(competition.registrationFee)}
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-purple-100 p-3 rounded-xl mr-4">
                    <Clock className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Current Phase</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {currentPhase}
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-yellow-100 p-3 rounded-xl mr-4">
                    <Award className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Competition Type</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {getCompetitionType(competition.code)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Calendar className="h-6 w-6 mr-3 text-blue-600" />
                Competition Timeline
              </h2>

              <div className="space-y-6">
                <TimelineItem
                  title="Registration"
                  deadline={competition.registrationDeadline}
                  description="Team registration and payment"
                  isPassed={new Date() > new Date(competition.registrationDeadline)}
                />

                <TimelineItem
                  title="Preliminary Submission"
                  deadline={competition.preliminaryDeadline}
                  description={getPreliminaryDescription(competition.code)}
                  isPassed={new Date() > new Date(competition.preliminaryDeadline)}
                />

                <TimelineItem
                  title="Semifinal Submission"
                  deadline={competition.semifinalDeadline}
                  description={getSemifinalDescription(competition.code)}
                  isPassed={new Date() > new Date(competition.semifinalDeadline)}
                />

                {competition.finalDeadline && (
                  <TimelineItem
                    title="Final Submission"
                    deadline={competition.finalDeadline}
                    description="Final pitch deck submission"
                    isPassed={new Date() > new Date(competition.finalDeadline)}
                  />
                )}
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <FileText className="h-6 w-6 mr-3 text-blue-600" />
                Requirements
              </h2>

              <div className="space-y-4">
                <RequirementItem text={`Team of ${competition.minTeamSize}${competition.minTeamSize !== competition.maxTeamSize ? `-${competition.maxTeamSize}` : ''} members`} />
                <RequirementItem text="All team members must be registered users" />
                <RequirementItem text="Payment of registration fee required" />
                <RequirementItem text="One team per user per competition" />
                <RequirementItem text={getSpecificRequirement(competition.code)} />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Registration CTA */}
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">
                  Ready to Compete?
                </h3>
                <p className="text-white/90 mb-6">
                  {isRegistrationOpen
                    ? 'Register your team now and showcase your skills!'
                    : 'Registration is currently closed. Check back next year!'}
                </p>

                {isRegistrationOpen ? (
                  <Link
                    href="/register"
                    className="block w-full bg-white text-blue-600 font-semibold py-4 px-6 rounded-xl text-center hover:bg-gray-50 transition-colors"
                  >
                    Register Now →
                  </Link>
                ) : (
                  <button
                    disabled
                    className="block w-full bg-white/20 text-white font-semibold py-4 px-6 rounded-xl text-center cursor-not-allowed"
                  >
                    Registration Closed
                  </button>
                )}
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">Quick Facts</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Competition Code</span>
                    <span className="font-semibold text-gray-900">{competition.code}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Min Team Size</span>
                    <span className="font-semibold text-gray-900">{competition.minTeamSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Max Team Size</span>
                    <span className="font-semibold text-gray-900">{competition.maxTeamSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Entry Fee</span>
                    <span className="font-semibold text-gray-900">
                      {formatCurrency(competition.registrationFee)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function TimelineItem({
  title,
  deadline,
  description,
  isPassed
}: {
  title: string;
  deadline: Date;
  description: string;
  isPassed: boolean;
}) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Jakarta',
    }).format(new Date(date));
  };

  return (
    <div className={`flex items-start ${isPassed ? 'opacity-50' : ''}`}>
      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${isPassed ? 'bg-gray-200' : 'bg-blue-100'
        }`}>
        <CheckCircle2 className={`h-5 w-5 ${isPassed ? 'text-gray-500' : 'text-blue-600'}`} />
      </div>
      <div className="ml-4 flex-1">
        <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
        <p className="text-sm text-gray-600 mb-1">{description}</p>
        <p className="text-sm font-medium text-blue-600">
          Deadline: {formatDate(deadline)} WIB
        </p>
      </div>
    </div>
  );
}

function RequirementItem({ text }: { text: string }) {
  return (
    <div className="flex items-start">
      <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
      <span className="text-gray-700">{text}</span>
    </div>
  );
}

// Helper Functions
function getCurrentPhase(competition: any): string {
  const now = new Date();

  if (now < new Date(competition.registrationDeadline)) {
    return 'Registration';
  } else if (now < new Date(competition.preliminaryDeadline)) {
    return 'Preliminary';
  } else if (now < new Date(competition.semifinalDeadline)) {
    return 'Semifinal';
  } else if (competition.finalDeadline && now < new Date(competition.finalDeadline)) {
    return 'Final';
  }

  return 'Completed';
}

function getCompetitionType(code: string): string {
  switch (code) {
    case 'PTC':
      return 'Hardware & IoT';
    case 'TPC':
      return 'Research Paper';
    case 'BCC':
      return 'Business Case';
    default:
      return 'Competition';
  }
}

function getPreliminaryDescription(code: string): string {
  switch (code) {
    case 'PTC':
      return 'Submit project proposal and prototype design';
    case 'TPC':
      return 'Submit research paper abstract';
    case 'BCC':
      return 'Submit business case analysis';
    default:
      return 'Submit preliminary work';
  }
}

function getSemifinalDescription(code: string): string {
  switch (code) {
    case 'PTC':
      return 'Submit working prototype video and documentation';
    case 'TPC':
      return 'Submit full research paper';
    case 'BCC':
      return 'Submit business solution proposal';
    default:
      return 'Submit semifinal work';
  }
}

function getSpecificRequirement(code: string): string {
  switch (code) {
    case 'PTC':
      return 'Hardware prototype must be functional';
    case 'TPC':
      return 'Research must be original and unpublished';
    case 'BCC':
      return 'Business case must address real-world problem';
    default:
      return 'Follow all competition guidelines';
  }
}
