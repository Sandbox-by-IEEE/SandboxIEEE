import React from 'react';

export default function Home() {
  return (
    <main className='bg-black flex min-h-screen flex-col items-center justify-between p-24'>
      <div>
        <a href={'../register'} target='' rel='noopener noreferrer'>
          <p className='text-white hover:underline mb-1'>Register</p>
        </a>
      </div>
      {/* You can map through the filteredData to display the results */}
    </main>
  );
}
