export default function AdminDashboardLoading() {
  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Header skeleton */}
        <div className='animate-pulse mb-8'>
          <div className='h-8 w-56 bg-gray-200 rounded mb-2' />
          <div className='h-4 w-80 bg-gray-100 rounded' />
        </div>

        {/* Stats cards skeleton */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-8'>
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className='animate-pulse bg-white rounded-xl p-5 shadow-sm border'
            >
              <div className='h-4 w-24 bg-gray-100 rounded mb-3' />
              <div className='h-8 w-16 bg-gray-200 rounded' />
            </div>
          ))}
        </div>

        {/* Table skeleton */}
        <div className='animate-pulse bg-white rounded-xl shadow-sm border p-6'>
          <div className='h-6 w-48 bg-gray-200 rounded mb-6' />
          <div className='space-y-4'>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className='flex gap-4'>
                <div className='h-4 w-32 bg-gray-100 rounded' />
                <div className='h-4 w-48 bg-gray-100 rounded' />
                <div className='h-4 w-24 bg-gray-100 rounded' />
                <div className='h-4 w-20 bg-gray-100 rounded' />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
