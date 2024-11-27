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
      className='bg-gradient-to-r from-[#28575c] to-[#0d2d32] p-2 lg:p-6 w-full flex flex-col cursor-pointer'
      onClick={() => setIsOpen(!isOpen)}
      data-aos={aos || 'flip-down'}
    >
      {/* Container Question */}
      <div className='flex w-full justify-between items-center'>
        {/* Question */}
        <h4
          data-aos='zoom-in'
          className='font-poppins bg-gradient-to-tr from-[#af8954] via-[#cfb57c] to-[#ede1a2] text-left text-white bg-clip-text text-sm sm:text-base lg:text-base font-semibold'
        >
          {question}
        </h4>
        {/* Arrow */}
        <ArrowDropdownIcon
          size={25}
          className={`fill-white transition-all duration-300 w-5 mr-2 aspect-square ${
            isOpen ? 'rotate-0' : 'rotate-180'
          }`}
        />
      </div>

      {/* Garis Pembatas */}
      <div
        className={`transition-all duration-300 ${
          isOpen ? 'opacity-100 my-4' : 'opacity-0 h-0'
        }`}
      >
        <hr className='border-t border-gray-400/50' />
      </div>

      {/* Answer */}
      <span
        className={`${
          isOpen
            ? 'opacity-100 mt-6 h-full pointer-events-none'
            : 'opacity-0 m-0 h-0 pointer-events-none'
        } transition-all duration-300 text-white text-sm sm:text-base lg:text-base font-poppins text-left`}
      >
        <StructuredText data={answer} />
      </span>
    </div>
  );
};
