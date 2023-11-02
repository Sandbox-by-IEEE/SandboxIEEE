'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

import { callToast } from '@/components/Toast';

const ClientHome = () => {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  console.log(session?.user);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }
  }, [mounted]);

  useEffect(() => {
    const message = searchParams.get('activationMsg');
    if (mounted && message) {
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
