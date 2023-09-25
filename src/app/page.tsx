import Tooltip from '@/components/Tooltip';

export default function Home() {
  return (
    <main className='flex flex-col gap-10 w-screen min-h-screen justify-center items-center p-10 bg-slate-900 py-20'>
      {/* Tooltip */}
      <p className='text-slate-400 font-extrabold'>Tooltips</p>

      <Tooltip message='left me' position='left'>
        <p className='border-2 border-slate-600 p-1 text-white w-[100px]'>
          leftsadklj asjkldklas jdkasjd me
        </p>
      </Tooltip>
      <Tooltip message='right me' position='right'>
        <p className='border-2 border-slate-600 p-1 text-white w-[100px]'>
          right haslkdjkas udlkajd klasd me
        </p>
      </Tooltip>
      <Tooltip message='top me' position='top'>
        <p className='border-2 border-slate-600 p-1 text-white w-[100px]'>
          top ajshdjka hdjk me
        </p>
      </Tooltip>
      <Tooltip message='bottom me' position='bottom'>
        <p className='border-2 border-slate-600 p-1 text-white w-[100px]'>
          bottom aslkdjlka jdkla me
        </p>
      </Tooltip>

      <Tooltip message='left me' position='left' isWhite={false}>
        <p className='border-2 border-slate-600 p-1 text-white'>left me</p>
      </Tooltip>
      <Tooltip message='right me' position='right' isWhite={false}>
        <p className='border-2 border-slate-600 p-1 text-white'>right me</p>
      </Tooltip>
      <Tooltip message='top me' position='top' isWhite={false}>
        <p className='border-2 border-slate-600 p-1 text-white'>top me</p>
      </Tooltip>
      <Tooltip message='bottom me' position='bottom' isWhite={false}>
        <p className='border-2 border-slate-600 p-1 text-white'>bottom me</p>
      </Tooltip>
    </main>
  );
}
