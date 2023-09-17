'use client';
import React, { useState } from 'react';

import CheckboxGroup from '@/components/checkBox';

export default function Home() {
  const initialOptions = [
    { label: 'Option 1', checked: true },
    { label: 'Option 2', checked: false },
    { label: 'Option 3', checked: false },
  ];

  const [selectedOptions, setSelectedOptions] = useState(initialOptions);

  const handleCheckboxGroupChange = (newOptions: typeof initialOptions) => {
    setSelectedOptions(newOptions);
  };

  return (
    <>
      <main className='bg-black flex min-h-screen flex-col items-center justify-between p-24'>
        <CheckboxGroup
          options={selectedOptions}
          onChange={handleCheckboxGroupChange}
        />
      </main>
    </>
  );
}
