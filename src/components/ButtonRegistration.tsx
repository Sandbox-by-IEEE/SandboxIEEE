'use client';
import { useSession } from 'next-auth/react';
import React from 'react';

import Button from '@/components/Button';

export default function ButtonRegistration({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { data: sessionData } = useSession();
  return <Button color='green'>{children}</Button>;
}
