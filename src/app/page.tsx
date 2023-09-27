'use client';

import Cards from '@/components/Card';
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
];

let dataLength = data.length;

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
  const cardData = [
    {
      title: 'Sample Card 1',
      imageUrl: '/google-logo.png', // Replace with the actual image path
      children:
        'Lorem ipsum dolor sit ameta siudahsok dhjahsdljks hasjkdahsgdjkas hdjkas hdjka dhjkah sdjkh ...',
      leftTag: 'Tag1',
      rightTag: 'Tag2',
      horizontal: false,
      buttonText: 'Click Me',
      onClick: () => {
        // Handle button click
      },
    },
    {
      title: 'Sample Card 2',
      imageUrl: '/google-logo.png', // Replace with the actual image path
      children:
        'Another card with different content dasjhd kjahsd jka hsdjkha sjdh ajkshd jkashdjk a hdkjash djkas hdjkhas djaksdhjk ashd jk...',
      leftTag: 'Tag3',
      rightTag: 'Tag4',
      horizontal: true,
      buttonText: 'Explore',
      onClick: () => {
        // Handle button click
      },
    },
    {
      title: 'Sample Card 1',
      imageUrl: '/google-logo.png', // Replace with the actual image path
      children:
        'Lorem ipsum dolor sit ameta siudahsok dhjahsdljks hasjkdahsgdjkas hdjkas hdjka dhjkah sdjkh ...',
      leftTag: 'Tag1',
      rightTag: 'Tag2',
      horizontal: false,
      onClick: () => {
        // Handle button click
      },
    },
    {
      title: 'Sample Card 2',
      imageUrl: '/google-logo.png', // Replace with the actual image path
      children:
        'Another card with different content dasjhd kjahsd jka hsdjkha sjdh ajkshd jkashdjk a hdkjash djkas hdjkhas djaksdhjk ashd jk...',
      leftTag: 'Tag3',
      rightTag: 'Tag4',
      horizontal: true,
      onClick: () => {
        // Handle button click
      },
    },
    {
      title: 'Sample Card 2',
      imageUrl: '/google-logo.png', // Replace with the actual image path
      children:
        'Another card with different content dasjhd kjahsd jka hsdjkha sjdh ajkshd jkashdjk a hdkjash djkas hdjkhas djaksdhjk ashd jk...',
      leftTag: 'Tag3',
      rightTag: 'Tag4',
      horizontal: false,
      buttonText: 'yuhu',
      onClick: () => {
        // Handle button click
      },
    },

    // Add more card data objects as needed
  ];

  return (
    <main className='flex min-h-screen w-full bg-red-500 flex-col items-baseline justify-center px-10 py-20'>
      <div className='w-full flex items-center justify-center gap-10 flex-wrap'>
        {cardData.map((data, index) => (
          <Cards key={index} {...data} />
        ))}
      </div>

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
