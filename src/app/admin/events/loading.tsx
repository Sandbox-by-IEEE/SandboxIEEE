export default function EventRegistrationsLoading() {
  return (
    <div className='space-y-6 animate-pulse'>
      <div>
        <div className='h-8 bg-gray-200 rounded w-64 mb-2' />
        <div className='h-4 bg-gray-200 rounded w-96' />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className='bg-white rounded-xl p-6 border border-gray-200'
          >
            <div className='h-6 bg-gray-200 rounded w-20 mb-2' />
            <div className='h-8 bg-gray-200 rounded w-12 mb-1' />
            <div className='h-4 bg-gray-200 rounded w-24' />
          </div>
        ))}
      </div>

      <div className='bg-white rounded-xl border border-gray-200 p-6'>
        <div className='space-y-4'>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className='h-12 bg-gray-100 rounded-lg' />
          ))}
        </div>
      </div>
    </div>
  );
}
