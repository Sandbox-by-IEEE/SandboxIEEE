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
  }, []);

  useEffect(() => {
    const message = searchParams.get('activationMsg');
    if (mounted) {
      callToast({
        status: 'error',
        description: message || '',
      });
      router.push('/');
    }
  }, [mounted]);
  if (!mounted) return null;
  return <></>;
};

export default ClientHome;
