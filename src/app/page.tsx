import dynamic from 'next/dynamic';

const Countdown = dynamic(() => import('@/components/Countdown'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className='flex min-h-screen w-full bg-white flex-col items-baseline justify-center'>
      <div className='w-full flex items-center justify-center'>
        <Countdown targetDate={new Date('2023-12-22')} />
      </div>
    </main>
  );
}
