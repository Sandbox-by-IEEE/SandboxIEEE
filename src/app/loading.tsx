export default function Loading() {
  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-b from-[#190204] to-[#080203]'>
      <div className='flex flex-col items-center gap-4'>
        <div className='relative w-16 h-16 animate-spin'>
          <div className='absolute inset-0 border-4 border-[#E8B4A8] border-t-transparent rounded-full'></div>
        </div>
        <p className='text-[#E8B4A8] font-gemunu text-xl'>Loading...</p>
      </div>
    </div>
  );
}
