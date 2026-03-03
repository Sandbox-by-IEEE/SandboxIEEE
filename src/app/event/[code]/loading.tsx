export default function EventDetailLoading() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-[#0B0102] via-[#190204] to-[#0B0102] pt-24 pb-16 px-4'>
      <div className='max-w-4xl mx-auto'>
        {/* Hero skeleton */}
        <div className='animate-pulse mb-8'>
          <div className='h-64 bg-gradient-to-br from-[#5A2424]/30 to-[#3d1a1a]/20 rounded-2xl border border-white/10 mb-6' />
          <div className='h-10 w-72 bg-[#5A2424]/30 rounded-lg mx-auto mb-3' />
          <div className='h-5 w-56 bg-[#5A2424]/20 rounded mx-auto' />
        </div>

        {/* About section skeleton */}
        <div className='animate-pulse mb-12'>
          <div className='h-8 w-64 bg-[#5A2424]/30 rounded-lg mx-auto mb-6' />
          <div className='bg-gradient-to-br from-[#5A2424]/30 to-[#3d1a1a]/20 rounded-3xl border border-white/10 p-8'>
            <div className='space-y-3'>
              <div className='h-4 w-full bg-[#5A2424]/20 rounded' />
              <div className='h-4 w-full bg-[#5A2424]/20 rounded' />
              <div className='h-4 w-2/3 bg-[#5A2424]/20 rounded mx-auto' />
            </div>
          </div>
        </div>

        {/* LinkTree skeleton */}
        <div className='animate-pulse mb-12 max-w-md mx-auto'>
          <div className='h-8 w-40 bg-[#5A2424]/30 rounded-lg mx-auto mb-6' />
          <div className='space-y-4'>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className='h-12 bg-gradient-to-r from-[#5A2424]/30 to-[#3d1a1a]/20 rounded-full border border-white/10'
              />
            ))}
          </div>
        </div>

        {/* Speaker section skeleton */}
        <div className='animate-pulse'>
          <div className='h-8 w-72 bg-[#5A2424]/30 rounded-lg mx-auto mb-8' />
          <div className='bg-gradient-to-br from-[#5A2424]/30 to-[#3d1a1a]/20 rounded-3xl border border-white/10 p-8 space-y-8'>
            {[1, 2].map((i) => (
              <div key={i} className='flex gap-6 items-center'>
                <div className='flex-1 space-y-3'>
                  <div className='h-4 w-full bg-[#5A2424]/20 rounded' />
                  <div className='h-4 w-full bg-[#5A2424]/20 rounded' />
                  <div className='h-4 w-3/4 bg-[#5A2424]/20 rounded' />
                </div>
                <div className='w-48 h-56 bg-[#5A2424]/20 rounded-2xl shrink-0' />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
