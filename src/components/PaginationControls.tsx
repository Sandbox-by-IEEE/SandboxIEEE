'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { FC } from 'react';
import { useState } from 'react';

interface PaginationControlProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  dataLength: number;
}

const PaginationControls: FC<PaginationControlProps> = ({
  hasNextPage,
  hasPrevPage,
  dataLength,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get('page') ?? '1';
  const per_page = searchParams.get('per_page') ?? '5';

  const numbers: number[] = [];

  // Using a for loop to generate numbers from 1 to 5
  for (let i = 1; i <= 5; i++) {
    numbers.push(i);
  }

  const [values, setValues] = useState(numbers);

  const handleClickPlus = () => {
    const addedValues = values.map((num) => num + 5);
    setValues(addedValues);
  };

  const handleClickMinus = () => {
    const addedValues = values.map((num) => num - 5);
    setValues(addedValues);
  };

  return (
    <div className='flex gap-2 px-2 py-2 font-poppins'>
      <button
        className='bg-white text-black p-1 mx-1 my-1 h-1/2'
        style={{ borderRadius: '50%' }}
        disabled={!hasPrevPage}
        onClick={handleClickMinus}
      >
        <p className='font-bold text-xs'>&nbsp;&lt;&nbsp;</p>
      </button>

      {/* if page == number */}
      {/* page background ganti */}
      <div className='flex text-white'>
        {values.map((num, index) => (
          <button
            key={index}
            className='text-white p-1 mx-4 my-1 active:bg-green-900 rounded-full'
            // disabled={!hasPrevPage}
            onClick={() => {
              router.push(`/?page=${num}&per_pages=${per_page}`);
            }}
          >
            <p className='mx-2' key={num}>
              {num}
            </p>
          </button>
        ))}
      </div>

      <button
        className='bg-white text-black p-1 mx-1 my-1 h-1/2'
        style={{ borderRadius: '50%' }}
        disabled={!hasNextPage}
        onClick={handleClickPlus}
      >
        <p className='font-bold text-xs'>&nbsp;&gt;&nbsp;</p>
      </button>
    </div>
  );
};

export default PaginationControls;
