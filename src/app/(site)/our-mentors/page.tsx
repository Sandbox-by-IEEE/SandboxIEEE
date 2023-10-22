'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function PastEvents() {
  const router = useRouter();
  useEffect(() => {
    router.push('/coming-soon');
  }, [router]);
  return;
}
