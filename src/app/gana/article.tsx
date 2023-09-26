import Link from 'next/link';

import { allArticles } from '@/server/api/CMS';

interface articleType {
  id: string;
  slug: string;
  title: string;
}

function Articles({ articles }: { articles: articleType[] }) {
  return (
    <>
      {articles.map((article) => {
        <Link key={`article-${article.id}`} href={`/articles/${article.slug}`}>
          <div> article.title</div>
        </Link>;
      })}
    </>
  );
}

export async function getStaticProps() {
  const articles = await allArticles();

  return {
    props: {
      articles,
    },
  };
}
