import React from 'react';

export default function Home() {
  return (
    <main className='bg-black text-white flex min-h-screen flex-col items-center justify-between p-24'>
      <div>
        <a className='hover:underline' href='/login'>
          <h1>Login page</h1>
        </a>
      </div>
      {/* You can map through the filteredData to display the results */}
    </main>
  );
}
