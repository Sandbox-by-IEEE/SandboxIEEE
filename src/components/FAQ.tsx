'use client';
import {
  type Document,
  type Node,
  type Record,
  type StructuredText as STType,
} from 'datocms-structured-text-utils';
import { useState } from 'react';
import { StructuredText } from 'react-datocms/structured-text';

import ArrowDropdownIcon from '@/components/icons/ArrowDropdownIcon';

export const FAQ = ({
  question,
  answer,
  aos,
}: {
  question: string;
  answer: Document | Node | STType<Record, Record> | null | undefined;
  aos?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className='bg-dark-green p-5 lg:p-6 w-full flex flex-col cursor-pointer'
      onClick={() => setIsOpen(!isOpen)}
      data-aos={aos || 'flip-down'}
    >
      {/* Container Question */}
      <div className='flex w-full justify-between items-center'>
        {/* Question */}
        <h4
          data-aos='zoom-in'
          className='font-poppins bg-gradient-to-tr from-[#af8954] via-[#cfb57c] to-[#ede1a2] text-left text-transparent bg-clip-text text-base sm:text-lg lg:text-xl font-semibold'
        >
          {question}
        </h4>
        {/* Arrow */}
        <ArrowDropdownIcon
          size={25}
          className={`fill-cream-secondary-normal transition-all duration-300 w-[25px] aspect-square ${
            isOpen ? 'rotate-0' : 'rotate-180'
          }`}
        />
      </div>
      <span
        className={`${
          isOpen
            ? 'opacity-100 mt-6 h-full pointer-events-none'
            : ' opacity-0 m-0 h-0 pointer-events-none'
        } transition-all duration-300 text-cream-secondary-light text-sm sm:text-base lg:text-lg font-poppins text-left`}
      >
        <StructuredText data={answer} />
      </span>
    </div>
  );
};
