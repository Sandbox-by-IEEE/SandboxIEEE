import React from 'react';

import Footer from '@/components/footer';

export default function Home() {
  return (
    <main className='bg-black flex min-h-screen flex-col items-center justify-between p-24'>
      <div>
        <Footer />
      </div>
      {/* You can map through the filteredData to display the results */}
    </main>
  );
}
