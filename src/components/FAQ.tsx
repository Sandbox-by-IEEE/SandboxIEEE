'use client';
import { useState } from 'react';

import ArrowDropdownIcon from '@/components/icons/ArrowDropdownIcon';

export const FAQ = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <button
      className='bg-dark-green p-5 lg:p-6 w-full flex flex-col '
      onClick={() => setIsOpen(!isOpen)}
    >
      {/* Container Question */}
      <div className='flex w-full justify-between items-center'>
        {/* Question */}
        <h3 className='font-poppins bg-gradient-brown text-left text-transparent bg-clip-text text-base sm:text-lg lg:text-xl font-semibold'>
          {question}
        </h3>
        {/* Arrow */}
        <ArrowDropdownIcon
          size={25}
          className={`fill-cream-secondary-normal transition-all duration-300 w-[25px] aspect-square ${
            isOpen ? 'rotate-0' : 'rotate-180'
          }`}
        />
      </div>
      {isOpen && (
        <p className='text-cream-secondary-light mt-6 text-sm sm:text-base lg:text-lg font-poppins text-left'>
          {answer}
        </p>
      )}
    </button>
  );
};
