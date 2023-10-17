'use client';

import { useEffect, useState } from 'react';

import Toast from '@/components/Toast';

const ToasterProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  if (isMounted) return <Toast />;
};

export default ToasterProvider;
