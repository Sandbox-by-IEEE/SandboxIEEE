'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { callToast } from '@/components/Toast';

const ClientHome = () => {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }
  }, [mounted]);

  useEffect(() => {
    const message = searchParams.get('activationMsg');
    const resetMessage = searchParams.get('resetMsgErr');
    if (mounted && message) {
      callToast({
        status: 'error',
        description: message || '',
      });
      router.push('/');
    }
    if (mounted && resetMessage) {
      callToast({
        status: 'error',
        description: resetMessage || '',
      });
      router.push('/');
    }
  }, [mounted, router, searchParams]);
  if (!mounted) return null;
  return <></>;
};

export default ClientHome;
