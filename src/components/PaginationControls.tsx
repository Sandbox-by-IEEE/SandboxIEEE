'use client';

import { FC } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationControlProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  dataLength : number;
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

  // const dataLength = 10;

  return (
    <div className='flex gap-2 px-2 py-2'>
      <button
        className='bg-white text-black p-1 mx-1 my-1'
        style={{ borderRadius: '50%' }}
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(`/?page=${Number(page) - 1}&per_pages=${per_page}`);
        }}
      >
        <p className='font-bold text-xs'>&nbsp;&lt;&nbsp;</p>
      </button>

      <div className='flex flex-row text-white'>
        <p className='mx-5'>
          {page} / {Math.ceil(Number(dataLength) / Number(per_page))}
        </p>
        <p className='mx-5'>
          {page} / {Math.ceil(Number(dataLength) / Number(per_page))}
        </p>
        <p className='mx-5'>
          {page} / {Math.ceil(Number(dataLength) / Number(per_page))}
        </p>
        <p className='mx-5'>
          {page} / {Math.ceil(Number(dataLength) / Number(per_page))}
        </p>
        <p className='mx-5'>
          {page} / {Math.ceil(Number(dataLength) / Number(per_page))}
        </p>
      </div>

      <button
        className='bg-white text-black p-1 mx-1 my-1'
        style={{ borderRadius: '50%' }}
        disabled={!hasNextPage}
        onClick={() => {
          router.push(`/?page=${Number(page) + 1}&per_pages=${per_page}`);
        }}
      >
        <p className='font-bold text-xs'>&nbsp;&gt;&nbsp;</p>
      </button>
    </div>
  );
};

export default PaginationControls;
