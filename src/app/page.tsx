import Tooltip from '@/components/Tooltip';

export default function Home() {
  return (
    <main className='flex flex-col gap-10 w-screen h-screen justify-center items-center p-10 bg-slate-900'>
      <div className='flex-col hidden space-y-2'>
        <div className='w-16 overflow-hidden inline-block'>
          <div className=' h-11 w-11 bg-black rotate-45 transform origin-bottom-left'></div>
        </div>

        <div className='w-16 overflow-hidden inline-block'>
          <div className=' h-11 w-11 bg-black -rotate-45 transform origin-top-left'></div>
        </div>

        <div className='w-11  overflow-hidden inline-block'>
          <div className=' h-16  bg-black -rotate-45 transform origin-top-right'></div>
        </div>

        <div className='w-11  overflow-hidden inline-block'>
          <div className=' h-16  bg-black rotate-45 transform origin-top-left'></div>
        </div>

        <div className='w-11  overflow-hidden inline-block'>
          <div className=' h-16  bg-black -rotate-45 transform origin-bottom-right'></div>
        </div>

        <div className='w-11  overflow-hidden inline-block'>
          <div className=' h-16  bg-black rotate-45 transform origin-bottom-left'></div>
        </div>

        <div className='w-11  overflow-hidden inline-block'>
          <div className=' h-16  bg-black -rotate-45 transform origin-top-left'></div>
        </div>

        <div className='w-11  overflow-hidden inline-block'>
          <div className=' h-16  bg-black rotate-45 transform origin-top-right'></div>
        </div>
      </div>
      {/* Tooltip */}
      <p className='text-slate-400 font-extrabold'>Tooltips</p>

      <Tooltip
        message='left me'
        position='left'
        translationX='-180px'
        translationY='0px'
      >
        <p className='border-2 border-slate-600 p-1 text-white'>left me</p>
      </Tooltip>
      <Tooltip message='right me' position='right' translationY='-10px'>
        <p className='border-2 border-slate-600 p-1 text-white'>right me</p>
      </Tooltip>
      <Tooltip
        message='top me'
        position='top'
        translationX='-15px'
        translationY='-54px'
      >
        <p className='border-2 border-slate-600 p-1 text-white'>top me</p>
      </Tooltip>
      <Tooltip message='bottom me' position='bottom' translationY='40px'>
        <p className='border-2 border-slate-600 p-1 text-white'>bottom me</p>
      </Tooltip>

      <Tooltip
        message='left me'
        position='left'
        translationX='-180px'
        translationY='0px'
        isWhite={false}
      >
        <p className='border-2 border-slate-600 p-1 text-white'>left me</p>
      </Tooltip>
      <Tooltip
        message='right me'
        position='right'
        translationY='-10px'
        isWhite={false}
      >
        <p className='border-2 border-slate-600 p-1 text-white'>right me</p>
      </Tooltip>
      <Tooltip
        message='top me'
        position='top'
        translationX='-15px'
        translationY='-54px'
        isWhite={false}
      >
        <p className='border-2 border-slate-600 p-1 text-white'>top me</p>
      </Tooltip>
      <Tooltip
        message='bottom me'
        position='bottom'
        translationY='40px'
        isWhite={false}
      >
        <p className='border-2 border-slate-600 p-1 text-white'>bottom me</p>
      </Tooltip>
    </main>
  );
}
