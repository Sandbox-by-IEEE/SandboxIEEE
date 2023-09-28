'use client';
import React, { useState } from 'react';

import RadioButtons from '@/components/radio';

export default function Home() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionChange = (value: string | null) => {
    setSelectedOption(value);
  };

  const handleRemoveOption = () => {
    setSelectedOption(null);
  };

  const options = [
    {
      value: 'option1',
      label: 'Option 1',
    },
    {
      value: 'option2',
      label: 'Option 2',
    },
    {
      value: 'option3',
      label: 'Option 3',
    },
  ];

  console.log(selectedOption);
  return (
    <main className='flex min-h-screen bg-black flex-col items-center p-24'>
      <div>
        <RadioButtons options={options} onChange={handleOptionChange} />
      </div>
      {/* You can map through the filteredData to display the results */}
    </main>
  );
}
