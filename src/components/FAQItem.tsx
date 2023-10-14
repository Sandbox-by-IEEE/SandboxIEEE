import React from 'react';

import ArrowDropdownIcon from '@/components/icons/ArrowDropdownIcon';

const FAQItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  return (
    <details className='group bg-[#071D10] p-4 sm:p-6 font-poppins text-[#FFE1B9] font-thin'>
      <summary className='list-none py-3'>
        <div className='relative w-full flex justify-between'>
          <div className='rounded-[4px] overflow-hidden transition-all duration-300 w-full'>
            <p className='text-transparent bg-clip-text bg-gradient-to-tr from-[#af8954] via-[#cfb57c] to-[#ede1a2] text-[20px] font-extrabold tracking-wider shadow-lg flex justify-between w-full'>
              {question}
              <span className='group-open:hidden mr-4 h-auto my-auto'>
                <ArrowDropdownIcon
                  size={20}
                  className='text-white'
                  fill='#FFFBB9'
                />
              </span>
              <span className='hidden group-open:inline mr-4 h-auto my-auto'>
                <ArrowDropdownIcon
                  size={20}
                  className='text-white rotate-180'
                  fill='#FFFBB9'
                />
              </span>
            </p>
          </div>
          <div className='absolute top-0 blur-[4px] rounded-[4px] overflow-hidden transition-all duration-300 z-50 w-full'>
            <p className='text-transparent bg-clip-text bg-gradient-to-tr from-[#af8954] via-[#cfb57c] to-[#ede1a2] text-[20px] font-extrabold tracking-wider shadow-lg flex justify-between w-full'>
              {question}
              <span className='group-open:hidden mr-4 h-auto my-auto'>
                <ArrowDropdownIcon
                  size={20}
                  className='text-white'
                  fill='#FFFBB9'
                />
              </span>
              <span className='hidden group-open:inline mr-4 h-auto my-auto'>
                <ArrowDropdownIcon
                  size={20}
                  className='text-white rotate-180'
                  fill='#FFFBB9'
                />
              </span>
            </p>
          </div>
        </div>
      </summary>
      <p className='py-2'>{answer}</p>
    </details>
  );
};

export default FAQItem;
