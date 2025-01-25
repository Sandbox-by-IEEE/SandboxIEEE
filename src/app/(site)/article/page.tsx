import PaginatedArticles from '@/components/pagination/article';
import { getAllArticles } from '@/lib/datocms-queries';

export default async function ArticlesPage() {
  const { allArticles } = await getAllArticles();

  return (
    <div>
      <PaginatedArticles allArticles={allArticles} />
    </div>
  );
}

// Untuk revalidasi di App Router
export const revalidate = 60;
