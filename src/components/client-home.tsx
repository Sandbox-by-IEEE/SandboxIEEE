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
    const token = searchParams.get('token');
    const func = async () => {
      const response = await fetch(`/api/user/activate/${token}`);
      const body = await response.json();

      if (!response.ok) {
        callToast({
          status: 'error',
          description: body.message,
        });
        router.push('/');
      } else {
        callToast({
          status: 'success',
          description: body.message,
        });
        router.push('/login');
        // const resLogin = await signIn('credentials', {
        //   username: body.user.username,
        //   password: body.user.password,
        //   redirect: false,
        //   callbackUrl: '/',
        // });

        // if (resLogin?.error) {
        //   callToast({
        //     status: 'error',
        //     description: resLogin?.error || 'Login failed',
        //   });
        //   router.push('/login');
        // } else {
        //   callToast({ status: 'success', description: 'Login succesfull' });
        //   router.push('/');
        // }
      }
    };

    if (token && mounted) func();
  }, [mounted]);
  if (!mounted) return null;
  return <></>;
};

export default ClientHome;
