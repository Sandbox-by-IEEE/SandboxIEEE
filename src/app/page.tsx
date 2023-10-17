'use client';

import 'react-vertical-timeline-component/style.min.css';

import Timeline from '@/components/Timeline';

export default function Home() {
  return (
    <main className='flex h-0 min-h-screen w-0 min-w-[100vw] flex-col overflow-y-scroll overflow-x-clip font-museo-muderno bg-slate-800'>
      <Timeline
        items={[
          { date: '15 Oktober 2023', text: 'Open Regist PTC' },
          { date: '15 Oktober 2023', text: 'Open Regist PTC' },
          { date: '15 Oktober 2023', text: 'Open Regist PTC' },
          { date: '15 Oktober 2023', text: 'Open Regist PTC' },
          { date: '15 Oktober 2023', text: 'Open Regist PTC' },
        ]}
      />
    </main>
  );
}
