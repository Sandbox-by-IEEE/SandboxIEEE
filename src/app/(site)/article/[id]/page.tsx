import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getArticleById, getArticleSlugs } from '@/lib/datocms-queries';

export async function generateStaticParams() {
  const { allArticles } = await getArticleSlugs();

  return allArticles.map((article) => ({
    id: article.id.toString(),
  }));
}

export default async function ArticleDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { article } = await getArticleById(params.id);

  if (!article) {
    notFound();
  }

  return (
    <div className='container mx-auto px-4 max-w-2xl'>
      <div className='flex justify-start mt-4 ml-4'>
        <Link href='/article'>
          <div className='bg-black p-2 rounded'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 text-white'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                clipRule='evenodd'
              />
            </svg>
          </div>
        </Link>
      </div>
      <h1 className='text-4xl font-bold my-8'>{article.title}</h1>
      <div className='flex items-center mb-6'>
        <p className='text-gray-600'>By {article.author}</p>
        <span className='mx-2'>•</span>
        <p className='text-gray-500'>{article.date}</p>
      </div>
      {article.image && (
        <img
          src={article.image.url}
          alt={article.title}
          className='w-full h-96 object-cover rounded-lg mb-6'
        />
      )}
      <div className='prose'>{article.body}</div>
    </div>
  );
}

export const revalidate = 60;
