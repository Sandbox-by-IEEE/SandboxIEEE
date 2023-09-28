'use client';

import Breadcrumbs from '@/components/Breadcrumbs';

export default function Home() {
  return (
    <main className='bg-black flex min-h-screen flex-col items-center justify-between p-24'>
      <div>
        <Breadcrumbs />
      </div>
    </main>
  );
}
