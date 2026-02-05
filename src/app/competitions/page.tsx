import { prisma } from '@/lib/db';
import { Calendar, Users, DollarSign, Trophy } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';

/**
 * ============================================================================
 * COMPETITIONS LIST PAGE
 * ============================================================================
 * 
 * Public page that displays all active competitions
 * Users can browse and click to view competition details
 * 
 * Route: /competitions
 * ============================================================================
 */

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Competitions | The Sandbox 3.0',
  description: 'Browse all available competitions at The Sandbox 3.0 by IEEE ITB Student Branch',
};

export default async function CompetitionsPage() {
  // Fetch all active competitions
  const competitions = await prisma.competition.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      code: 'asc',
    },
  });

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Competitions
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Explore our exciting competitions and showcase your skills. Choose the challenge that fits your passion!
              </p>
            </div>
          </div>
        </div>

        {/* Competitions Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {competitions.map((competition) => (
              <CompetitionCard key={competition.id} competition={competition} />
            ))}
          </div>

          {competitions.length === 0 && (
            <div className="text-center py-16">
              <Trophy className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Active Competitions
              </h3>
              <p className="text-gray-600">
                Check back soon for upcoming competitions!
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
} interface CompetitionCardProps {
  competition: {
    id: string;
    code: string;
    name: string;
    description: string | null;
    registrationDeadline: Date;
    registrationFee: number;
    minTeamSize: number;
    maxTeamSize: number;
  };
}

function CompetitionCard({ competition }: CompetitionCardProps) {
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
    }).format(new Date(date));
  };

  const isRegistrationOpen = new Date() < new Date(competition.registrationDeadline);
  const daysLeft = Math.ceil(
    (new Date(competition.registrationDeadline).getTime() - new Date().getTime()) /
    (1000 * 60 * 60 * 24)
  );

  return (
    <Link
      href={`/competitions/${competition.code.toLowerCase()}`}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-500"
    >
      {/* Header with Code */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">
            {competition.code}
          </span>
          {isRegistrationOpen && daysLeft > 0 && daysLeft <= 7 && (
            <span className="text-xs font-medium bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full animate-pulse">
              {daysLeft} days left
            </span>
          )}
        </div>
        <h3 className="text-2xl font-bold group-hover:scale-105 transition-transform">
          {competition.name}
        </h3>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-gray-600 mb-6 line-clamp-3">
          {competition.description || 'No description available'}
        </p>

        {/* Info Grid */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-sm text-gray-700">
            <Calendar className="h-4 w-4 mr-3 text-blue-500" />
            <span>Register by: <span className="font-semibold">{formatDate(competition.registrationDeadline)}</span></span>
          </div>

          <div className="flex items-center text-sm text-gray-700">
            <Users className="h-4 w-4 mr-3 text-purple-500" />
            <span>Team size: <span className="font-semibold">
              {competition.minTeamSize === competition.maxTeamSize
                ? competition.minTeamSize
                : `${competition.minTeamSize}-${competition.maxTeamSize}`} members
            </span></span>
          </div>

          <div className="flex items-center text-sm text-gray-700">
            <DollarSign className="h-4 w-4 mr-3 text-green-500" />
            <span>Registration fee: <span className="font-semibold">{formatCurrency(competition.registrationFee)}</span></span>
          </div>
        </div>

        {/* Status Badge */}
        <div className="pt-4 border-t border-gray-100">
          {isRegistrationOpen ? (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-green-600 flex items-center">
                <span className="h-2 w-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                Open for Registration
              </span>
              <span className="text-blue-600 font-medium text-sm group-hover:translate-x-1 transition-transform">
                View Details →
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-red-600 flex items-center">
                <span className="h-2 w-2 bg-red-500 rounded-full mr-2"></span>
                Registration Closed
              </span>
              <span className="text-gray-500 font-medium text-sm">
                View Details →
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
