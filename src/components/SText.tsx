import { StructuredText } from 'react-datocms/structured-text';

interface articleType {
  id: string;
  title: string;
  slug: string;
}

export default function SText({ data }: { data: articleType[] }) {
  const allArticles = data;
  return (
    <div>
      {allArticles.map((article) => (
        <article key={article.id}>
          <h2>{article.title}</h2>
          <StructuredText data={null} />
        </article>
      ))}
    </div>
  );
}
