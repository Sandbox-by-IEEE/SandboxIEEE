'use client';
import React, { useState } from 'react';

import RadioButtons from '@/components/radio';

export default function Home() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
  };

  const handleRemoveOption = () => {
    setSelectedOption(null);
  };

  const options = [
    {
      value: 'option1',
      label: 'Option 1',
      checked: selectedOption === 'option1',
      onChange: handleOptionChange,
    },
    {
      value: 'option2',
      label: 'Option 2',
      checked: selectedOption === 'option2',
      onChange: handleOptionChange,
    },
    {
      value: 'option3',
      label: 'Option 3',
      checked: selectedOption === 'option3',
      onChange: handleOptionChange,
    },
  ];

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
    <main className='flex min-h-screen flex-col items-center p-24'>
      <div>
        <RadioButtons
          options={options}
          selectedValue={selectedOption}
          onChange={handleOptionChange}
          onRemove={handleRemoveOption}
          removeButton={!!selectedOption}
        />
      </div>
      {/* You can map through the filteredData to display the results */}
    </main>
  );
}
