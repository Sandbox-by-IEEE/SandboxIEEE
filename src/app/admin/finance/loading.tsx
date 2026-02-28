export default function FinanceLoading() {
  return (
    <div className='space-y-6'>
      {/* Header skeleton */}
      <div className='animate-pulse'>
        <div className='h-8 w-56 bg-gray-200 rounded mb-2' />
        <div className='h-4 w-96 bg-gray-100 rounded' />
      </div>

      {/* Stats cards skeleton */}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className='animate-pulse bg-white rounded-xl p-6 border border-gray-200'
          >
            <div className='flex items-center gap-3 mb-3'>
              <div className='w-10 h-10 bg-gray-100 rounded-lg' />
              <div className='h-4 w-24 bg-gray-100 rounded' />
            </div>
            <div className='h-8 w-32 bg-gray-200 rounded mb-1' />
            <div className='h-3 w-20 bg-gray-100 rounded' />
          </div>
        ))}
      </div>

      {/* Secondary stats skeleton */}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className='animate-pulse bg-white rounded-xl p-4 border border-gray-200'
          >
            <div className='h-4 w-28 bg-gray-100 rounded mb-2' />
            <div className='h-7 w-16 bg-gray-200 rounded' />
          </div>
        ))}
      </div>

      {/* Table skeleton */}
      <div className='animate-pulse bg-white rounded-xl border border-gray-200 overflow-hidden'>
        {/* Filters */}
        <div className='p-4 bg-gray-50 border-b border-gray-200 space-y-3'>
          <div className='h-10 w-full bg-gray-100 rounded-lg' />
          <div className='flex gap-2'>
            <div className='h-8 w-48 bg-gray-100 rounded-lg' />
            <div className='h-8 w-36 bg-gray-100 rounded-lg' />
          </div>
        </div>
        {/* Rows */}
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className='px-4 py-4 flex gap-4 border-b last:border-0'>
            <div className='h-4 w-4 bg-gray-100 rounded' />
            <div className='h-4 w-40 bg-gray-100 rounded' />
            <div className='h-4 w-16 bg-gray-100 rounded' />
            <div className='h-4 w-20 bg-gray-100 rounded' />
            <div className='h-4 w-24 bg-gray-100 rounded' />
            <div className='h-4 w-20 bg-gray-100 rounded' />
            <div className='h-4 w-12 bg-gray-100 rounded' />
            <div className='h-4 w-20 bg-gray-100 rounded' />
          </div>
        ))}
      </div>
    </div>
  );
}
