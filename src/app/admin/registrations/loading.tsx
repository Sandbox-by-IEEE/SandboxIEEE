export default function AdminRegistrationsLoading() {
  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Header with filters skeleton */}
        <div className='animate-pulse mb-6 flex justify-between items-center'>
          <div className='h-8 w-48 bg-gray-200 rounded' />
          <div className='flex gap-3'>
            <div className='h-10 w-32 bg-gray-100 rounded-lg' />
            <div className='h-10 w-32 bg-gray-100 rounded-lg' />
          </div>
        </div>

        {/* Table skeleton */}
        <div className='animate-pulse bg-white rounded-xl shadow-sm border overflow-hidden'>
          {/* Table header */}
          <div className='bg-gray-50 px-6 py-3 flex gap-4 border-b'>
            {['Team', 'Competition', 'Leader', 'Status', 'Date', 'Actions'].map(
              (_, i) => (
                <div key={i} className='h-4 w-24 bg-gray-200 rounded' />
              ),
            )}
          </div>
          {/* Table rows */}
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className='px-6 py-4 flex gap-4 border-b last:border-0'
            >
              <div className='h-4 w-32 bg-gray-100 rounded' />
              <div className='h-4 w-20 bg-gray-100 rounded' />
              <div className='h-4 w-40 bg-gray-100 rounded' />
              <div className='h-6 w-20 bg-gray-100 rounded-full' />
              <div className='h-4 w-24 bg-gray-100 rounded' />
              <div className='h-8 w-20 bg-gray-100 rounded-lg' />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
