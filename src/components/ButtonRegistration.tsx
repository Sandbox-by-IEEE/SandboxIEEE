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
}) {
  const { data: sessionData, status } = useSession();
  const router = useRouter();
  const onClick = () => {
    if (status === 'loading') return;

    const ticket = sessionData?.user.ticket?.[type];

    // Login Validation
    if (!sessionData?.user) {
      showToast('error', 'Unauthorized, please login first');
      return;
    }

    if (ticket?.buy == false) {
      showToast('error', 'You cannot access this page!');
    }

    if (ticket?.buy && ticket?.verified !== 'verified') {
      showToast(
        'error',
        'You failed on document validation stage. Thank you for your participation!',
      );
    }

    return router.push(`/events/${type.toLowerCase()}/abstract-submission`);
  };

  return (
    sessionData?.user.ticket?.[type].buy && (
      <div>
        {sessionData?.user.ticket?.[type].verified === 'verified' ? (
          // Button disable is already sent abstract submission
          <Button
            color={color}
            isFullWidth
            onClick={onClick}
            isDisabled={false}
          >
            Abstract Submission
          </Button>
        ) : (
          <Button color={color} isDisabled isFullWidth>
            {sessionData?.user.ticket?.[type].verified === 'pending'
              ? 'Your registration is being processed'
              : sessionData?.user.ticket?.[type].verified === 'rejected'
              ? 'Your registration rejected'
              : children}
          </Button>
        )}
      </div>
    )
  );
}
