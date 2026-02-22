export default function DashboardLoading() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-[#0B0102] via-[#190204] to-[#0B0102] pt-24 pb-16 px-4'>
      <div className='max-w-6xl mx-auto'>
        {/* Header skeleton */}
        <div className='mb-8 animate-pulse'>
          <div className='h-10 w-64 bg-[#5A2424]/30 rounded-lg mb-4' />
          <div className='h-5 w-96 bg-[#5A2424]/20 rounded-lg' />
        </div>

        {/* Status banner skeleton */}
        <div className='mb-8 animate-pulse'>
          <div className='h-24 bg-gradient-to-r from-[#5A2424]/30 to-[#3d1a1a]/20 rounded-2xl border border-white/10' />
        </div>

        {/* Team info card skeleton */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
          <div className='animate-pulse bg-gradient-to-br from-[#5A2424]/30 to-[#3d1a1a]/20 rounded-2xl p-6 border border-white/10'>
            <div className='h-6 w-32 bg-[#5A2424]/30 rounded mb-4' />
            <div className='space-y-3'>
              <div className='h-4 w-full bg-[#5A2424]/20 rounded' />
              <div className='h-4 w-3/4 bg-[#5A2424]/20 rounded' />
              <div className='h-4 w-1/2 bg-[#5A2424]/20 rounded' />
            </div>
          </div>
          <div className='animate-pulse bg-gradient-to-br from-[#5A2424]/30 to-[#3d1a1a]/20 rounded-2xl p-6 border border-white/10'>
            <div className='h-6 w-40 bg-[#5A2424]/30 rounded mb-4' />
            <div className='space-y-3'>
              <div className='h-4 w-full bg-[#5A2424]/20 rounded' />
              <div className='h-4 w-2/3 bg-[#5A2424]/20 rounded' />
            </div>
          </div>
        </div>

        {/* Phase progress skeleton */}
        <div className='animate-pulse bg-gradient-to-br from-[#5A2424]/30 to-[#3d1a1a]/20 rounded-2xl p-6 border border-white/10'>
          <div className='h-6 w-48 bg-[#5A2424]/30 rounded mb-6' />
          <div className='flex justify-between items-center'>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className='flex flex-col items-center gap-2'>
                <div className='w-10 h-10 bg-[#5A2424]/30 rounded-full' />
                <div className='h-3 w-16 bg-[#5A2424]/20 rounded' />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
