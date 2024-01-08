'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import Button from '@/components/Button';
import { callToast } from '@/components/Toast';

function showToast(status, description) {
  callToast({ status, description });
}

export default function ButtonRegistration({
  children,
  type,
  color,
  isDisabled = false,
}: {
  children?: JSX.Element | string;
  type: 'TPC' | 'PTC' | 'exhibition';
  color:
    | 'green'
    | 'gold'
    | 'black'
    | 'trans-green'
    | 'trans-orange'
    | 'white'
    | 'light-gold';
  isDisabled?: boolean;
}) {
  const { data: sessionData, status } = useSession();
  const router = useRouter();
  const ticket =
    (type !== 'exhibition' && sessionData?.user.ticket?.[type]) || null;
  const onClick = () => {
    if (status === 'loading') return;
    if (ticket == null) return;
    // Login Validation
    if (!sessionData?.user) {
      showToast('error', 'Unauthorized, please login first');
      return;
    }

    if (ticket?.buy == false) {
      showToast('error', 'You cannot access this page!');
      return;
    }

    if (ticket?.buy && ticket?.verified !== 'verified') {
      showToast(
        'error',
        'You failed on document validation stage. Thank you for your participation!',
      );
      return;
    }

    if (
      ticket.regist2Status === 'waiting' ||
      ticket.regist2Status === 'success'
    ) {
      showToast('error', 'Your team already submitted the abstract.');
      return;
    }

    if (ticket.regist2Status === 'qualified') {
      showToast(
        'success',
        'Your team already passed the abstract submission stage.',
      );
      return;
    }

    return router.push(`/events/${type.toLowerCase()}/abstract-submission`);
  };

  return (
    ticket &&
    ticket.buy && (
      <div>
        <Button
          color={color}
          isDisabled={
            status === 'loading' ||
            ticket.regist2Status === 'waiting' ||
            ticket.regist2Status === 'success' ||
            ticket.regist2Status === 'failed' ||
            ticket.regist2Status === 'qualified' ||
            isDisabled
          }
          isFullWidth
          onClick={onClick}
        >
          {ticket.verified === 'pending'
            ? 'Your registration is being processed'
            : ticket.verified === 'rejected'
            ? 'Your registration rejected'
            : ticket.regist2Status === 'waiting' ||
              ticket.regist2Status === 'success'
            ? 'Your team already submitted the abstract'
            : ticket.regist2Status === 'qualified'
            ? 'Congratulations, your team has passed the abstract submission stage'
            : ticket.regist2Status === 'failed'
            ? 'Your team failed on abstract submission stage'
            : children}
        </Button>
      </div>
    )
  );
}
