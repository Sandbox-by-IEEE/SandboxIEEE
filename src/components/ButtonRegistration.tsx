'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React from 'react';

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

    // Ticket Validation
    if (ticket?.buy && ticket?.verified === 'verified') {
      showToast(
        'error',
        'You have purchased this ticket, Your ticket has been validated',
      );
      return;
    }

    // Ticket Verification
    if (ticket?.buy && ticket?.verified === 'pending') {
      showToast(
        'error',
        'You have purchased this ticket, Waiting for validation',
      );
      return;
    }

    if (ticket?.buy && ticket?.verified === 'rejected') {
      showToast(
        'error',
        'You have purchased this ticket, Your ticket rejected',
      );
      return;
    }

    // Ticket Purchase
    router.push(`/events/${type.toLowerCase()}/registration`);
  };

  return (
    <div>
      <Button
        color={color}
        isDisabled={
          type === 'PTC'
            ? sessionData?.user.ticket?.PTC.buy
            : sessionData?.user.ticket?.TPC.buy
        }
        isFullWidth
        onClick={onClick}
      >
        {sessionData?.user.ticket?.[type].verified === 'verified'
          ? 'Your registration has been verified'
          : sessionData?.user.ticket?.[type].verified === 'pending'
          ? 'Your registration is being processed'
          : sessionData?.user.ticket?.[type].verified === 'rejected'
          ? 'Your registration rejected'
          : children}
      </Button>
    </div>
  );
}
