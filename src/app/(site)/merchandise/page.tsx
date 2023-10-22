'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function MerchandisePage() {
  const router = useRouter();
  useEffect(() => {
    router.push('/coming-soon');
  }, [router]);
  return <div>MerchandisePage</div>;
}
