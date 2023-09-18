'use client';
import React, { useState } from 'react';

import Dropdown from '@/components/Dropdown';

export default function Home() {
  // Dummy data for demonstration
  /* eslint-disable */
  const data = [
    {
      name: 'John Doe',
      division: 'Resource Management',
    },
    {
      name: 'Jane Smith',
      division: 'Marketing',
    },
    {
      name: 'Bob Johnson',
      division: 'Web Development',
    },
    // Add more data items as needed
  ];
  /* eslint-enable */

  const options = [
    'Resource Management',
    'Resource Development',
    'Marketing',
    'Partnership',
    'Competition',
    'Project',
    'Paper',
    'Event',
    'Logistic',
    'Web Development',
    'Finance',
    'Sponsorship',
  ];

  // State for the selected option in the dropdown
  const [selectedOption, setSelectedOption] = useState<string>('');

  return (
    <main className='flex min-h-screen w-full bg-red-500 flex-col items-baseline justify-center'>
      <div className='w-full flex items-center justify-center gap-10'>
        <Dropdown
          color='green'
          options={options}
          placeholder='Division'
          setSelectedOption={setSelectedOption}
          selectedOption={selectedOption}
        />
        <Dropdown
          color='light'
          options={options}
          placeholder='Division'
          setSelectedOption={setSelectedOption}
          selectedOption={selectedOption}
        />
        <Dropdown
          color='trans-green'
          options={options}
          placeholder='Division'
          setSelectedOption={setSelectedOption}
          selectedOption={selectedOption}
        />
      </div>
      {/* You can map through the filteredData to display the results */}
    </main>
  );
}
