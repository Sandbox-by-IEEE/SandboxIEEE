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
    </main>
  );
}
