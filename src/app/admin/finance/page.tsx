import {
  Banknote,
  Calendar,
  CheckCircle,
  Clock,
  CreditCard,
  DollarSign,
  Trophy,
  Users,
  XCircle,
} from 'lucide-react';
import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';

import EventFinanceTable from './EventFinanceTable';
import FinanceTable from './FinanceTable';

/**
 * ============================================================================
 * ADMIN FINANCE DASHBOARD
 * ============================================================================
 *
 * Purpose: Monitor cash flow and payment status for bookkeeping
 * Access: super_admin, finance only
 *
 * Features:
 * - Financial summary cards (total revenue, pending, verified, rejected)
 * - Combined competition + event payment data
 * - Full registrant list with payment status
 * - Proof of payment viewing
 * - Filter by payment status, competition, and source (competition/events)
 * - Export-ready data for bookkeeping
 *
 * ============================================================================
 */

export default async function FinanceDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{
    status?: string;
    competition?: string;
    source?: string;
  }>;
}) {
  const session = await auth();

  if (!session?.admin) {
    redirect('/admin-login');
  }

  // Only super_admin and finance can access
  if (!['super_admin', 'finance'].includes(session.admin.role)) {
    redirect('/admin/dashboard');
  }

  const params = await searchParams;
  const statusFilter = params.status || 'all';
  const competitionFilter = params.competition || 'all';
  const sourceFilter = params.source || 'competitions';

  // Build registration filter
  const registrationWhere: Record<string, unknown> = {};
  if (competitionFilter !== 'all') {
    registrationWhere.competition = { code: competitionFilter };
  }

  // Fetch all data in parallel (competition + event)
  const [
    registrations,
    competitions,
    compPaymentStats,
    eventRegistrations,
    eventPaymentStats,
  ] = await Promise.all([
    // All competition registrations with team + payment data
    prisma.competitionRegistration.findMany({
      where: registrationWhere,
      select: {
        id: true,
        verificationStatus: true,
        currentPhase: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            username: true,
          },
        },
        competition: {
          select: {
            id: true,
            code: true,
            name: true,
          },
        },
        team: {
          select: {
            id: true,
            teamName: true,
            members: {
              select: {
                id: true,
                fullName: true,
                institution: true,
                orderIndex: true,
              },
              orderBy: { orderIndex: 'asc' as const },
            },
          },
        },
        payment: {
          select: {
            id: true,
            amount: true,
            paymentProofUrl: true,
            paymentMethod: true,
            billName: true,
            status: true,
            submittedAt: true,
            verifiedAt: true,
            verificationNotes: true,
            verifiedBy: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' as const },
    }),

    // All competitions for filter dropdown
    prisma.competition.findMany({
      select: { id: true, code: true, name: true },
      orderBy: { name: 'asc' },
    }),

    // Competition payment statistics
    Promise.all([
      prisma.payment.count(),
      prisma.payment.count({ where: { status: 'pending' } }),
      prisma.payment.count({ where: { status: 'verified' } }),
      prisma.payment.count({ where: { status: 'rejected' } }),
      prisma.payment.aggregate({
        _sum: { amount: true },
        where: { status: 'verified' },
      }),
      prisma.payment.aggregate({
        _sum: { amount: true },
      }),
    ]),

    // Event registrations with payment data
    prisma.eventRegistration.findMany({
      select: {
        id: true,
        eventCode: true,
        fullName: true,
        email: true,
        phoneNumber: true,
        institution: true,
        verificationStatus: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        payment: {
          select: {
            id: true,
            amount: true,
            paymentProofUrl: true,
            paymentMethod: true,
            billName: true,
            status: true,
            submittedAt: true,
            verifiedAt: true,
            verificationNotes: true,
            verifiedBy: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' as const },
    }),

    // Event payment statistics
    Promise.all([
      prisma.eventPayment.count(),
      prisma.eventPayment.count({ where: { status: 'pending' } }),
      prisma.eventPayment.count({ where: { status: 'verified' } }),
      prisma.eventPayment.count({ where: { status: 'rejected' } }),
      prisma.eventPayment.aggregate({
        _sum: { amount: true },
        where: { status: 'verified' },
      }),
      prisma.eventPayment.aggregate({
        _sum: { amount: true },
      }),
    ]),
  ]);

  // Competition payment stats
  const [
    compTotalPayments,
    compPendingPayments,
    compVerifiedPayments,
    compRejectedPayments,
    compVerifiedRevenue,
    compTotalSubmitted,
  ] = compPaymentStats;

  // Event payment stats
  const [
    eventTotalPayments,
    eventPendingPayments,
    eventVerifiedPayments,
    eventRejectedPayments,
    eventVerifiedRevenue,
    eventTotalSubmitted,
  ] = eventPaymentStats;

  // Combined totals
  const totalVerifiedAmount =
    (compVerifiedRevenue._sum.amount || 0) +
    (eventVerifiedRevenue._sum.amount || 0);
  const totalSubmittedAmount =
    (compTotalSubmitted._sum.amount || 0) +
    (eventTotalSubmitted._sum.amount || 0);
  const totalPayments = compTotalPayments + eventTotalPayments;
  const pendingPayments = compPendingPayments + eventPendingPayments;
  const verifiedPayments = compVerifiedPayments + eventVerifiedPayments;
  const rejectedPayments = compRejectedPayments + eventRejectedPayments;

  const totalCompRegistrations = registrations.length;
  const paidCompRegistrations = registrations.filter((r) => r.payment).length;
  const totalEventRegistrations = eventRegistrations.length;
  const paidEventRegistrations = eventRegistrations.filter(
    (r) => r.payment,
  ).length;
  const totalRegistrations = totalCompRegistrations + totalEventRegistrations;
  const paidRegistrations = paidCompRegistrations + paidEventRegistrations;
  const unpaidRegistrations = totalRegistrations - paidRegistrations;

  // Apply status filter for competition registrations
  const filteredRegistrations = registrations.filter((r) => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'unpaid') return !r.payment;
    if (statusFilter === 'pending') return r.payment?.status === 'pending';
    if (statusFilter === 'verified') return r.payment?.status === 'verified';
    if (statusFilter === 'rejected') return r.payment?.status === 'rejected';
    return true;
  });

  // Apply status filter for event registrations
  const filteredEventRegistrations = eventRegistrations.filter((r) => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'unpaid') return !r.payment;
    if (statusFilter === 'pending') return r.payment?.status === 'pending';
    if (statusFilter === 'verified') return r.payment?.status === 'verified';
    if (statusFilter === 'rejected') return r.payment?.status === 'rejected';
    return true;
  });

  // Format currency
  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div>
        <h1 className='text-3xl font-bold text-gray-900'>Finance Dashboard</h1>
        <p className='text-gray-600 mt-2'>
          Monitor payment status, cash flow, and bookkeeping for all
          competitions and events
        </p>
      </div>

      {/* Financial Summary Cards — Combined totals */}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
        {/* Total Verified Revenue */}
        <div className='bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200'>
          <div className='flex items-center gap-3 mb-2'>
            <div className='bg-green-100 p-2 rounded-lg'>
              <DollarSign className='text-green-600' size={24} />
            </div>
            <h3 className='font-semibold text-green-900 text-sm'>
              Verified Revenue
            </h3>
          </div>
          <p className='text-2xl font-bold text-green-900'>
            {formatIDR(totalVerifiedAmount)}
          </p>
          <p className='text-sm text-green-700 mt-1'>
            From {verifiedPayments} verified payments
          </p>
        </div>

        {/* Total Submitted */}
        <div className='bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200'>
          <div className='flex items-center gap-3 mb-2'>
            <div className='bg-blue-100 p-2 rounded-lg'>
              <Banknote className='text-blue-600' size={24} />
            </div>
            <h3 className='font-semibold text-blue-900 text-sm'>
              Total Submitted
            </h3>
          </div>
          <p className='text-2xl font-bold text-blue-900'>
            {formatIDR(totalSubmittedAmount)}
          </p>
          <p className='text-sm text-blue-700 mt-1'>
            From {totalPayments} payment submissions
          </p>
        </div>

        {/* Pending Verification */}
        <div className='bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-6 border border-yellow-200'>
          <div className='flex items-center gap-3 mb-2'>
            <div className='bg-yellow-100 p-2 rounded-lg'>
              <Clock className='text-yellow-600' size={24} />
            </div>
            <h3 className='font-semibold text-yellow-900 text-sm'>
              Pending Review
            </h3>
          </div>
          <p className='text-2xl font-bold text-yellow-900'>
            {pendingPayments}
          </p>
          <p className='text-sm text-yellow-700 mt-1'>Awaiting verification</p>
        </div>

        {/* Registration Payment Rate */}
        <div className='bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-200'>
          <div className='flex items-center gap-3 mb-2'>
            <div className='bg-purple-100 p-2 rounded-lg'>
              <CreditCard className='text-purple-600' size={24} />
            </div>
            <h3 className='font-semibold text-purple-900 text-sm'>
              Payment Rate
            </h3>
          </div>
          <p className='text-2xl font-bold text-purple-900'>
            {totalRegistrations > 0
              ? Math.round((paidRegistrations / totalRegistrations) * 100)
              : 0}
            %
          </p>
          <p className='text-sm text-purple-700 mt-1'>
            {paidRegistrations} of {totalRegistrations} registrants paid
          </p>
        </div>
      </div>

      {/* Payment Status Breakdown */}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
        <div className='bg-white rounded-xl p-4 border border-gray-200'>
          <div className='flex items-center gap-2'>
            <Users className='text-gray-500' size={18} />
            <span className='text-sm text-gray-600'>Total Registrations</span>
          </div>
          <p className='text-2xl font-bold text-gray-900 mt-1'>
            {totalRegistrations}
          </p>
          <p className='text-xs text-gray-500 mt-0.5'>
            {totalCompRegistrations} competition · {totalEventRegistrations}{' '}
            event
          </p>
        </div>
        <div className='bg-white rounded-xl p-4 border border-gray-200'>
          <div className='flex items-center gap-2'>
            <XCircle className='text-gray-400' size={18} />
            <span className='text-sm text-gray-600'>Not Yet Paid</span>
          </div>
          <p className='text-2xl font-bold text-gray-900 mt-1'>
            {unpaidRegistrations}
          </p>
        </div>
        <div className='bg-white rounded-xl p-4 border border-gray-200'>
          <div className='flex items-center gap-2'>
            <CheckCircle className='text-green-500' size={18} />
            <span className='text-sm text-gray-600'>Verified</span>
          </div>
          <p className='text-2xl font-bold text-green-700 mt-1'>
            {verifiedPayments}
          </p>
          <p className='text-xs text-gray-500 mt-0.5'>
            {compVerifiedPayments} comp · {eventVerifiedPayments} event
          </p>
        </div>
        <div className='bg-white rounded-xl p-4 border border-gray-200'>
          <div className='flex items-center gap-2'>
            <XCircle className='text-red-500' size={18} />
            <span className='text-sm text-gray-600'>Rejected</span>
          </div>
          <p className='text-2xl font-bold text-red-700 mt-1'>
            {rejectedPayments}
          </p>
        </div>
      </div>

      {/* Source Tabs */}
      <div className='flex gap-2'>
        <a
          href={`/admin/finance?status=${statusFilter}&competition=${competitionFilter}&source=competitions`}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all border ${
            sourceFilter === 'competitions'
              ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
              : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
          }`}
        >
          <Trophy size={16} />
          Competitions
          <span
            className={`text-xs px-1.5 py-0.5 rounded-full ${
              sourceFilter === 'competitions'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {totalCompRegistrations}
          </span>
        </a>
        <a
          href={`/admin/finance?status=${statusFilter}&source=events`}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all border ${
            sourceFilter === 'events'
              ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
              : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
          }`}
        >
          <Calendar size={16} />
          Events
          <span
            className={`text-xs px-1.5 py-0.5 rounded-full ${
              sourceFilter === 'events'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {totalEventRegistrations}
          </span>
        </a>
      </div>

      {/* Finance Table — conditional based on source */}
      {sourceFilter === 'events' ? (
        <EventFinanceTable
          registrations={filteredEventRegistrations}
          currentStatus={statusFilter}
        />
      ) : (
        <FinanceTable
          registrations={filteredRegistrations}
          competitions={competitions}
          currentStatus={statusFilter}
          currentCompetition={competitionFilter}
        />
      )}
    </div>
  );
}
