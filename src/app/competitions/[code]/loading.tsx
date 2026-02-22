export default function CompetitionDetailLoading() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-[#0B0102] via-[#190204] to-[#0B0102] pt-24 pb-16 px-4'>
      <div className='max-w-4xl mx-auto'>
        {/* Hero skeleton */}
        <div className='animate-pulse mb-8'>
          <div className='h-64 bg-gradient-to-br from-[#5A2424]/30 to-[#3d1a1a]/20 rounded-2xl border border-white/10 mb-6' />
          <div className='h-10 w-72 bg-[#5A2424]/30 rounded-lg mb-3' />
          <div className='h-5 w-full bg-[#5A2424]/20 rounded mb-2' />
          <div className='h-5 w-2/3 bg-[#5A2424]/20 rounded' />
        </div>

        {/* Info cards skeleton */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className='animate-pulse bg-gradient-to-br from-[#5A2424]/30 to-[#3d1a1a]/20 rounded-xl p-4 border border-white/10'
            >
              <div className='h-4 w-20 bg-[#5A2424]/20 rounded mb-2' />
              <div className='h-6 w-16 bg-[#5A2424]/30 rounded' />
            </div>
          ))}
        </div>

        {/* Timeline skeleton */}
        <div className='animate-pulse bg-gradient-to-br from-[#5A2424]/30 to-[#3d1a1a]/20 rounded-2xl p-6 border border-white/10'>
          <div className='h-7 w-32 bg-[#5A2424]/30 rounded mb-6' />
          <div className='space-y-4'>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className='flex gap-4 items-center'>
                <div className='w-3 h-3 bg-[#5A2424]/30 rounded-full' />
                <div className='flex-1'>
                  <div className='h-4 w-48 bg-[#5A2424]/20 rounded mb-1' />
                  <div className='h-3 w-32 bg-[#5A2424]/15 rounded' />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
