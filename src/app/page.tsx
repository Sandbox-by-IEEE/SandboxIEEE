'use client';

import Cards from '@/components/Card';

export default function Home() {
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
      {/* You can map through the filteredData to display the results */}
    </main>
  );
}
