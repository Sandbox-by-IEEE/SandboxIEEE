export default function CompetitionsLoading() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-[#0B0102] via-[#190204] to-[#0B0102] pt-24 pb-16 px-4'>
      <div className='max-w-6xl mx-auto'>
        {/* Header skeleton */}
        <div className='text-center mb-12 animate-pulse'>
          <div className='h-12 w-80 bg-[#5A2424]/30 rounded-lg mx-auto mb-4' />
          <div className='h-5 w-96 bg-[#5A2424]/20 rounded-lg mx-auto' />
        </div>

        {/* Competition cards skeleton */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className='animate-pulse bg-gradient-to-br from-[#5A2424]/30 to-[#3d1a1a]/20 rounded-2xl p-6 border border-white/10'
            >
              <div className='h-40 bg-[#5A2424]/20 rounded-xl mb-4' />
              <div className='h-7 w-48 bg-[#5A2424]/30 rounded mb-3' />
              <div className='space-y-2 mb-6'>
                <div className='h-4 w-full bg-[#5A2424]/20 rounded' />
                <div className='h-4 w-3/4 bg-[#5A2424]/20 rounded' />
              </div>
              <div className='flex justify-between items-center'>
                <div className='h-5 w-24 bg-[#5A2424]/20 rounded' />
                <div className='h-10 w-28 bg-[#5A2424]/30 rounded-xl' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
