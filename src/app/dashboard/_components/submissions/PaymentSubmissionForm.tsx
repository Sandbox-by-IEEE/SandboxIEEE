'use client';

import { CheckCircle, Clock, ExternalLink, XCircle } from 'lucide-react';

interface PaymentSubmissionFormProps {
  registration: any;
  onSuccess: () => void;
}

export default function PaymentSubmissionForm({
  registration,
  onSuccess,
}: PaymentSubmissionFormProps) {
  const payment = registration.payment;

  const statusConfig = {
    pending: {
      icon: Clock,
      label: 'Pending Verification',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20',
      borderColor: 'border-yellow-500/30',
      description: 'Your payment proof is being reviewed by our team.',
    },
    verified: {
      icon: CheckCircle,
      label: 'Payment Verified',
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
      borderColor: 'border-green-500/30',
      description:
        'Your payment has been verified. You can proceed to the next phase!',
    },
    rejected: {
      icon: XCircle,
      label: 'Payment Rejected',
      color: 'text-red-400',
      bgColor: 'bg-red-500/20',
      borderColor: 'border-red-500/30',
      description:
        'Your payment was rejected. Please contact the organizer for assistance.',
    },
  };

  const status = payment
    ? statusConfig[payment.status as keyof typeof statusConfig] ||
      statusConfig.pending
    : null;

  return (
    <div
      className='backdrop-blur-[40px] rounded-3xl p-8 md:p-10'
      style={{
        background:
          'linear-gradient(135deg, rgba(139, 58, 58, 0.4) 0%, rgba(90, 36, 36, 0.3) 100%)',
        border: '2px solid rgba(255, 205, 141, 0.2)',
      }}
    >
      <h3
        className='text-2xl font-bold text-center mb-6'
        style={{
          background: 'linear-gradient(90deg, #FFCD8D 0%, #FFFFFF 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Payment Status
      </h3>

      {!payment ? (
        <div className='text-center py-8'>
          <p className='text-gray-400'>
            No payment information found. Payment proof was submitted during
            registration.
          </p>
        </div>
      ) : (
        <div className='space-y-6'>
          {/* Status Badge */}
          {status && (
            <div
              className={`flex items-center gap-3 p-4 rounded-xl ${status.bgColor} border ${status.borderColor}`}
            >
              <status.icon className={`w-6 h-6 ${status.color}`} />
              <div>
                <p className={`font-semibold ${status.color}`}>
                  {status.label}
                </p>
                <p className='text-sm text-gray-300'>{status.description}</p>
              </div>
            </div>
          )}

          {/* Payment Details */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='bg-white/5 rounded-xl p-4 border border-white/10'>
              <p className='text-xs text-gray-400 uppercase tracking-wider mb-1'>
                Amount
              </p>
              <p className='text-lg font-bold text-[#FFCD8D]'>
                Rp {payment.amount?.toLocaleString('id-ID') || '—'}
              </p>
            </div>
            <div className='bg-white/5 rounded-xl p-4 border border-white/10'>
              <p className='text-xs text-gray-400 uppercase tracking-wider mb-1'>
                Payment Method
              </p>
              <p className='text-lg font-semibold text-white'>
                {payment.paymentMethod || '—'}
              </p>
            </div>
          </div>

          {/* Payment Proof */}
          {payment.paymentProofUrl && (
            <div className='bg-white/5 rounded-xl p-4 border border-white/10'>
              <p className='text-xs text-gray-400 uppercase tracking-wider mb-3'>
                Payment Proof
              </p>
              <a
                href={payment.paymentProofUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2 text-[#FFCD8D] hover:text-white transition-colors'
              >
                <ExternalLink className='w-4 h-4' />
                <span>View Payment Proof</span>
              </a>
            </div>
          )}

          {/* Submitted At */}
          <div className='bg-white/5 rounded-xl p-4 border border-white/10'>
            <p className='text-xs text-gray-400 uppercase tracking-wider mb-1'>
              Submitted
            </p>
            <p className='text-sm text-gray-300'>
              {new Date(payment.submittedAt).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>

          {/* Verification Notes */}
          {payment.verificationNotes && (
            <div className='bg-white/5 rounded-xl p-4 border border-white/10'>
              <p className='text-xs text-gray-400 uppercase tracking-wider mb-1'>
                Notes from Reviewer
              </p>
              <p className='text-sm text-gray-300'>
                {payment.verificationNotes}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
