import Image from 'next/image';
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
    <div className='text-white min-h-screen'>
      <div className='relative h-[250px] flex items-center justify-center'>
        <div
          className='absolute inset-0 bg-cover bg-center opacity-50'
          style={{
            backgroundImage: `url(${article.image.url})`,
          }}
        ></div>
        <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black'></div>
        <div className='relative flex flex-row justify-center items-center gap-5 w-[90%] max-w-4xl'>
          <Link href='/article'>
            <Image
              src='/previous_arrow.svg'
              alt='Previous Arrow'
              width={30}
              height={30}
            />
          </Link>
          <div className='flex flex-col'>
            <div className='flex items-center gap-1'>
              <p>By {article.author},</p>
              <p>{article.date}</p>
            </div>
            <h1 className='text-4xl font-bold'>{article.title}</h1>
          </div>
        </div>
      </div>

      <div className='container mx-auto px-4 py-8 max-w-4xl'>
        <div className='prose prose-invert lg:prose-xl max-w-none leading-relaxed'>
          {article.body}
        </div>
      </div>
    </div>
  );
}
export const revalidate = 60;
