'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function PaginatedArticles({
  allArticles,
}: {
  allArticles: any[];
}) {
  const searchParams = useSearchParams();
  const pageParam = searchParams?.get('page'); // Mendapatkan nilai 'page' dari query parameter
  const currentPage = parseInt(pageParam || '1', 10); // Default ke halaman 1 jika tidak ada parameter
  const pageSize = 3;
  const totalPages = Math.ceil(allArticles.length / pageSize);

  // Ambil artikel berdasarkan halaman
  const paginatedArticles = allArticles.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const renderPagination = () => {
    const paginationItems: JSX.Element[] = [];
    const maxVisible = 2;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - maxVisible && i <= currentPage + maxVisible)
      ) {
        paginationItems.push(
          <Link
            key={i}
            href={`?page=${i}`}
            className={`px-3 py-1 mx-1 rounded ${
              currentPage === i ? ' bg-gray-900 text-white' : 'bg-inherit'
            }`}
          >
            {i}
          </Link>,
        );
      } else if (
        (i === currentPage - maxVisible - 1 ||
          i === currentPage + maxVisible + 1) &&
        totalPages > maxVisible * 2
      ) {
        paginationItems.push(
          <span key={`ellipsis-${i}`} className='px-3 py-1 mx-1 text-gray-400'>
            ...
          </span>,
        );
      }
    }

    return paginationItems;
  };

  return (
    <div className='container mx-auto px-4'>
      <h1 className='text-4xl font-bold text-white'>Blog</h1>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'>
        {paginatedArticles.map((article) => (
          <div key={article.id} className='p-4 rounded-lg'>
            {article.image?.url && (
              <Image
                src={article.image.url}
                alt={article.title}
                width={500}
                height={200}
                className='object-cover rounded-t-lg'
              />
            )}
            <div className='flex items-center mt-3 gap-2'>
              <p className='text-white text-sm'>By {article.author},</p>
              <p className='text-white text-sm'>{article.date}</p>
            </div>
            <Link href={`/article/${article.id}`}>
              <h2 className='text-2xl font-semibold mt-2 text-white'>
                {article.title}
              </h2>
            </Link>
            <p className='mt-2 text-white text-xs'>
              {article.body.length > 100
                ? `${article.body.slice(0, 100)}...`
                : article.body}
            </p>
          </div>
        ))}
      </div>

      <div className='flex items-center justify-between mt-8 text-white gap-2'>
        <button
          onClick={() => {
            if (currentPage > 1) {
              window.location.href = `?page=${currentPage - 1}`;
            }
          }}
          disabled={currentPage === 1}
          className='flex items-center gap-2 ml-4'
        >
          <Image
            src='/previous_arrow.svg'
            alt='Previous'
            width={15}
            height={15}
          />
          Previous
        </button>

        <div className='flex items-center'>{renderPagination()}</div>

        <button
          onClick={() => {
            if (currentPage < totalPages) {
              window.location.href = `?page=${currentPage + 1}`;
            }
          }}
          disabled={currentPage === totalPages}
          className='flex items-center gap-2 mr-4'
        >
          Next
          <Image src='/next_arrow.svg' alt='Next' width={15} height={15} />
        </button>
      </div>
    </div>
  );
}
