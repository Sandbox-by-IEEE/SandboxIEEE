import Timeline from '@/components/Timeline';

export default function Home() {
  return (
    <main className='flex min-h-screen w-screen flex-col overflow-x-clip font-museo-muderno bg-slate-800'>
      <div className='h-fit w-full'>
        <Timeline
          items={[
            { date: new Date(2023, 0, 12), text: 'Open Regist PTC' },
            { date: new Date(2023, 10, 12), text: 'Open Regist PTC' },
            { date: new Date(2023, 10, 12), text: 'Open Regist PTC' },
            { date: new Date(2023, 10, 12), text: 'Open Regist PTC' },
            { date: new Date(2023, 10, 12), text: 'Open Regist PTC' },
          ]}
        />
      </div>
    </main>
  );
}
