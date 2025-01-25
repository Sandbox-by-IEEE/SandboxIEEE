'use client';

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
  const pageSize = 6;
  const totalPages = Math.ceil(allArticles.length / pageSize);

  // Ambil artikel berdasarkan halaman
  const paginatedArticles = allArticles.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <div className='container mx-auto px-4'>
      <h1 className='text-4xl font-bold my-8'>Articles</h1>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {paginatedArticles.map((article) => (
          <div key={article.id} className='border p-4 rounded-lg'>
            {article.image?.url && (
              <img
                src={article.image.url}
                alt={article.title}
                className='w-full h-48 object-cover rounded-t-lg'
              />
            )}
            <Link href={`/article/${article.id}`}>
              <h2 className='text-2xl font-semibold mt-4'>{article.title}</h2>
            </Link>
            <p className='text-gray-600'>By {article.author}</p>
            <p className='text-sm text-gray-500'>{article.date}</p>
          </div>
        ))}
      </div>
      <div className='flex justify-center mt-4'>
        {Array.from({ length: totalPages }, (_, i) => (
          <Link
            key={i + 1}
            href={`/article?page=${i + 1}`}
            className={`px-4 py-2 rounded-lg ${
              currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {i + 1}
          </Link>
        ))}
      </div>
    </div>
  );
}
