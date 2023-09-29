'use client';
import React from 'react';

import PaginationControls from '@/components/PaginationControls';

const data = [
  'data 1',
  'data 2',
  'data 3',
  'data 4',
  'data 5',
  'data 6',
  'data 7',
  'data 8',
  'data 9',
  'data 10',
  'data 11',
  'data 12',
  'data 13',
  'data 14',
  'data 15',
  'data 16',
  'data 17',
  'data 18',
  'data 19',
  'data 20',
  'data 21',
  'data 22',
  'data 23',
  'data 24',
  'data 25',
  'data 26',
  'data 27',
  'data 28',
  'data 29',
  'data 30',
  'data 31',
  'data 32',
  'data 33',
  'data 34',
  'data 35',
  'data 36',
  'data 37',
  'data 38',
  'data 39',
  'data 40',
];

const dataLength = data.length;

// halo

export default function Home({
  // add searchParams for paging
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // add constPage for searchparams
  const page = searchParams['page'] ?? '1';
  const per_page = searchParams['per_page'] ?? '5';

  // add mocked, skipped and limited in the real app
  const start = (Number(page) - 1) * Number(per_page); // 0,5,10,...
  const end = start + Number(per_page); // 5,10,15,..

  const entries = data.slice(start, end);

  // here

  return (
    <main className='flex min-h-screen bg-black flex-col items-center p-24'>
      <div className='flex flex-col gap-2 items-center justify-center'>
        {entries.map((data) => (
          <p key={data}>{data}</p>
        ))}

        <div className='bg-black'>
          {' '}
          <PaginationControls
            hasNextPage={end < data.length}
            hasPrevPage={start > 0}
            dataLength={dataLength}
          />
        </div>
      </div>
      {/* You can map through the filteredData to display the results */}
    </main>
  );
}
