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

interface FAQItem {
  id: string;
  question: string;
  answer: Document | Node | STType<Record, Record> | null | undefined;
}
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
      className='p-5 lg:p-6 w-full flex flex-col cursor-pointer'
      onClick={() => setIsOpen(!isOpen)}
      data-aos={aos || 'flip-down'}
    >
      <hr className='border-t-2 border-white mb-4' />
      <div className='flex w-full justify-between items-center'>
        <h4
          data-aos='zoom-in'
          className='font-poppins text-white text-left text-transparent bg-clip-text text-sm:text-base lg:text-base font-semibold max-w-[235px] sm:max-w-full'
        >
          {question}
        </h4>
        <ArrowDropdownIcon
          size={10}
          className={`fill-white transition-all duration-300 w-[20px] aspect-square ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </div>
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
