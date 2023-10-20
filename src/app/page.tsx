'use client';
import Link from 'next/link';

import Button from '@/components/Button';

export default function Home() {
  return (
    <main className='relative flex min-h-screen min-w-screen bg-[#0F3015] flex-col items-center p-24'>
      <div>
        <Link href='/not-found.tsx'>
          <Button color='gold'>ke 404</Button>
        </Link>
      </div>
    </main>
  );
}
