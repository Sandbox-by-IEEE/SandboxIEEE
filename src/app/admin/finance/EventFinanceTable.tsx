'use client';

import { format } from 'date-fns';
import {
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Clock,
  CreditCard,
  ExternalLink,
  ImageIcon,
  Search,
  XCircle,
} from 'lucide-react';
import React, { useMemo, useState } from 'react';

interface EventPayment {
  id: string;
  amount: number;
  paymentProofUrl: string;
  paymentMethod: string;
  billName: string;
  status: string;
  submittedAt: Date;
  verifiedAt: Date | null;
  verificationNotes: string | null;
  verifiedBy: string | null;
}

export interface EventRegistrationFinance {
  id: string;
  eventCode: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  institution: string;
  verificationStatus: string;
  createdAt: Date;
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
  payment: EventPayment | null;
}

interface EventFinanceTableProps {
  registrations: EventRegistrationFinance[];
  currentStatus: string;
}

const formatIDR = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const EVENT_LABELS: Record<string, string> = {
  'yif-x-grand-seminar': 'YIF & Grand Seminar',
};

export default function EventFinanceTable({
  registrations,
  currentStatus,
}: EventFinanceTableProps): React.JSX.Element {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [proofModal, setProofModal] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return registrations;
    const q = searchQuery.toLowerCase();
    return registrations.filter(
      (r) =>
        r.fullName.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.payment?.billName.toLowerCase().includes(q) ||
        r.institution.toLowerCase().includes(q) ||
        r.eventCode.toLowerCase().includes(q),
    );
  }, [registrations, searchQuery]);

  const getPaymentStatusBadge = (payment: EventPayment | null) => {
    if (!payment) {
      return (
        <span className='inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600'>
          <XCircle size={12} />
          Not Paid
        </span>
      );
    }

    switch (payment.status) {
      case 'verified':
        return (
          <span className='inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700'>
            <CheckCircle size={12} />
            Verified
          </span>
        );
      case 'pending':
        return (
          <span className='inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700'>
            <Clock size={12} />
            Pending
          </span>
        );
      case 'rejected':
        return (
          <span className='inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700'>
            <XCircle size={12} />
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Proof of Payment Modal */}
      {proofModal && (
        <div
          className='fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4'
          onClick={() => setProofModal(null)}
        >
          <div
            className='bg-white rounded-xl max-w-2xl w-full max-h-[85vh] overflow-auto shadow-2xl'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex items-center justify-between p-4 border-b border-gray-200'>
              <h3 className='font-semibold text-gray-900'>Proof of Payment</h3>
              <button
                onClick={() => setProofModal(null)}
                className='text-gray-400 hover:text-gray-600 text-xl font-bold'
              >
                ✕
              </button>
            </div>
            <div className='p-4'>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={proofModal}
                alt='Payment proof'
                className='w-full rounded-lg'
              />
            </div>
            <div className='p-4 border-t border-gray-200'>
              <a
                href={proofModal}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium'
              >
                <ExternalLink size={14} />
                Open in new tab
              </a>
            </div>
          </div>
        </div>
      )}

      <div className='bg-white rounded-xl border border-gray-200 overflow-hidden'>
        {/* Filters Bar */}
        <div className='border-b border-gray-200 bg-gray-50 p-4 space-y-3'>
          {/* Search */}
          <div className='relative'>
            <Search
              className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
              size={18}
            />
            <input
              type='text'
              placeholder='Search by name, email, institution, or bill name...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
          </div>

          {/* Filter Tabs */}
          <div className='flex flex-wrap gap-2'>
            <div className='flex gap-1 bg-white rounded-lg p-1 border border-gray-200'>
              {[
                { label: 'All', value: 'all' },
                { label: 'Unpaid', value: 'unpaid' },
                { label: 'Pending', value: 'pending' },
                { label: 'Verified', value: 'verified' },
                { label: 'Rejected', value: 'rejected' },
              ].map((filter) => (
                <a
                  key={filter.value}
                  href={`/admin/finance?status=${filter.value}&source=events`}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    currentStatus === filter.value
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {filter.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className='px-4 py-2 bg-gray-50 border-b border-gray-100 text-sm text-gray-500'>
          Showing {filtered.length} of {registrations.length} event
          registrations
        </div>

        {/* Table */}
        <div className='overflow-x-auto'>
          {filtered.length === 0 ? (
            <div className='text-center py-12'>
              <CreditCard className='mx-auto text-gray-400 mb-3' size={48} />
              <p className='text-gray-600 text-lg font-medium'>
                No event registrations found
              </p>
              <p className='text-gray-500 text-sm mt-1'>
                Try adjusting your filters or search query
              </p>
            </div>
          ) : (
            <table className='w-full text-sm'>
              <thead>
                <tr className='bg-gray-50 border-b border-gray-200'>
                  <th className='text-left px-4 py-3 font-semibold text-gray-700 w-8'></th>
                  <th className='text-left px-4 py-3 font-semibold text-gray-700'>
                    Registrant
                  </th>
                  <th className='text-left px-4 py-3 font-semibold text-gray-700'>
                    Event
                  </th>
                  <th className='text-left px-4 py-3 font-semibold text-gray-700'>
                    Payment Status
                  </th>
                  <th className='text-right px-4 py-3 font-semibold text-gray-700'>
                    Amount
                  </th>
                  <th className='text-left px-4 py-3 font-semibold text-gray-700'>
                    Method
                  </th>
                  <th className='text-left px-4 py-3 font-semibold text-gray-700'>
                    Proof
                  </th>
                  <th className='text-left px-4 py-3 font-semibold text-gray-700'>
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-100'>
                {filtered.map((reg) => (
                  <React.Fragment key={reg.id}>
                    {/* Main Row */}
                    <tr
                      className='hover:bg-gray-50 cursor-pointer transition-colors'
                      onClick={() => toggleExpand(reg.id)}
                    >
                      <td className='px-4 py-3'>
                        {expandedId === reg.id ? (
                          <ChevronDown size={16} className='text-gray-400' />
                        ) : (
                          <ChevronRight size={16} className='text-gray-400' />
                        )}
                      </td>
                      <td className='px-4 py-3'>
                        <div>
                          <p className='font-medium text-gray-900'>
                            {reg.fullName}
                          </p>
                          <p className='text-xs text-gray-500'>
                            {reg.email} · {reg.institution}
                          </p>
                        </div>
                      </td>
                      <td className='px-4 py-3'>
                        <span className='inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-100 text-teal-700'>
                          {EVENT_LABELS[reg.eventCode] || reg.eventCode}
                        </span>
                      </td>
                      <td className='px-4 py-3'>
                        {getPaymentStatusBadge(reg.payment)}
                      </td>
                      <td className='px-4 py-3 text-right font-mono'>
                        {reg.payment ? (
                          formatIDR(reg.payment.amount)
                        ) : (
                          <span className='text-gray-400'>—</span>
                        )}
                      </td>
                      <td className='px-4 py-3 text-gray-600'>
                        {reg.payment?.paymentMethod || (
                          <span className='text-gray-400'>—</span>
                        )}
                      </td>
                      <td className='px-4 py-3'>
                        {reg.payment?.paymentProofUrl ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setProofModal(reg.payment!.paymentProofUrl);
                            }}
                            className='inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-xs font-medium'
                          >
                            <ImageIcon size={14} />
                            View
                          </button>
                        ) : (
                          <span className='text-gray-400 text-xs'>—</span>
                        )}
                      </td>
                      <td className='px-4 py-3 text-gray-600 text-xs whitespace-nowrap'>
                        {reg.payment
                          ? format(
                              new Date(reg.payment.submittedAt),
                              'dd MMM yyyy',
                            )
                          : format(new Date(reg.createdAt), 'dd MMM yyyy')}
                      </td>
                    </tr>

                    {/* Expanded Details Row */}
                    {expandedId === reg.id && (
                      <tr className='bg-gray-50'>
                        <td colSpan={8} className='px-4 py-4'>
                          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            {/* Registrant Details */}
                            <div className='bg-white rounded-lg border border-gray-200 p-4'>
                              <h4 className='font-semibold text-gray-900 mb-3 flex items-center gap-2'>
                                <CreditCard size={16} />
                                Registrant Details
                              </h4>
                              <div className='space-y-2 text-sm'>
                                <div className='flex justify-between'>
                                  <span className='text-gray-500'>
                                    Full Name
                                  </span>
                                  <span className='text-gray-900 font-medium'>
                                    {reg.fullName}
                                  </span>
                                </div>
                                <div className='flex justify-between'>
                                  <span className='text-gray-500'>Email</span>
                                  <span className='text-gray-900'>
                                    {reg.email}
                                  </span>
                                </div>
                                <div className='flex justify-between'>
                                  <span className='text-gray-500'>Phone</span>
                                  <span className='text-gray-900'>
                                    {reg.phoneNumber}
                                  </span>
                                </div>
                                <div className='flex justify-between'>
                                  <span className='text-gray-500'>
                                    Institution
                                  </span>
                                  <span className='text-gray-900'>
                                    {reg.institution}
                                  </span>
                                </div>
                                {reg.user && (
                                  <div className='flex justify-between'>
                                    <span className='text-gray-500'>
                                      Linked Account
                                    </span>
                                    <span className='text-gray-900'>
                                      {reg.user.name}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Payment Details */}
                            <div className='bg-white rounded-lg border border-gray-200 p-4'>
                              <h4 className='font-semibold text-gray-900 mb-3 flex items-center gap-2'>
                                <CreditCard size={16} />
                                Payment Details
                              </h4>
                              {reg.payment ? (
                                <div className='space-y-2 text-sm'>
                                  <div className='flex justify-between'>
                                    <span className='text-gray-500'>
                                      Bill Name
                                    </span>
                                    <span className='text-gray-900 font-medium'>
                                      {reg.payment.billName}
                                    </span>
                                  </div>
                                  <div className='flex justify-between'>
                                    <span className='text-gray-500'>
                                      Amount
                                    </span>
                                    <span className='text-gray-900 font-medium font-mono'>
                                      {formatIDR(reg.payment.amount)}
                                    </span>
                                  </div>
                                  <div className='flex justify-between'>
                                    <span className='text-gray-500'>
                                      Method
                                    </span>
                                    <span className='text-gray-900'>
                                      {reg.payment.paymentMethod}
                                    </span>
                                  </div>
                                  <div className='flex justify-between'>
                                    <span className='text-gray-500'>
                                      Submitted
                                    </span>
                                    <span className='text-gray-900'>
                                      {format(
                                        new Date(reg.payment.submittedAt),
                                        'dd MMM yyyy, HH:mm',
                                      )}
                                    </span>
                                  </div>
                                  {reg.payment.verifiedAt && (
                                    <div className='flex justify-between'>
                                      <span className='text-gray-500'>
                                        Verified At
                                      </span>
                                      <span className='text-gray-900'>
                                        {format(
                                          new Date(reg.payment.verifiedAt),
                                          'dd MMM yyyy, HH:mm',
                                        )}
                                      </span>
                                    </div>
                                  )}
                                  {reg.payment.verifiedBy && (
                                    <div className='flex justify-between'>
                                      <span className='text-gray-500'>
                                        Verified By
                                      </span>
                                      <span className='text-gray-900'>
                                        {reg.payment.verifiedBy}
                                      </span>
                                    </div>
                                  )}
                                  {reg.payment.verificationNotes && (
                                    <div className='mt-2 p-2 bg-gray-50 rounded-md'>
                                      <span className='text-gray-500 text-xs'>
                                        Notes:
                                      </span>
                                      <p className='text-gray-700 text-sm mt-1'>
                                        {reg.payment.verificationNotes}
                                      </p>
                                    </div>
                                  )}
                                  {reg.payment.paymentProofUrl && (
                                    <div className='mt-3 pt-3 border-t border-gray-100'>
                                      <button
                                        onClick={() =>
                                          setProofModal(
                                            reg.payment!.paymentProofUrl,
                                          )
                                        }
                                        className='inline-flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors'
                                      >
                                        <ImageIcon size={14} />
                                        View Proof of Payment
                                      </button>
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <div className='text-center py-4'>
                                  <CreditCard
                                    className='mx-auto text-gray-300 mb-2'
                                    size={32}
                                  />
                                  <p className='text-gray-500 text-sm'>
                                    No payment submitted yet
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
