import PaginatedArticles from '@/components/pagination/article';
import { getAllArticles } from '@/lib/datocms-queries';

export default async function ArticlesPage() {
  const { allArticles } = await getAllArticles();

  return (
    <div className='w-full min-h-screen mt-[100px]'>
      <PaginatedArticles allArticles={allArticles} />
    </div>
  );
}

// Untuk revalidasi di App Router
export const revalidate = 60;
