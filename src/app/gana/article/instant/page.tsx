'use client';
import {
  type Document,
  type Node,
  type Record,
  type StructuredText as STType,
} from 'datocms-structured-text-utils';
import { StructuredText } from 'react-datocms/structured-text';
import { useQuerySubscription } from 'react-datocms/use-query-subscription';

import NavBar from '@/components/NavBar';
import { ALL_ARTICLES, query } from '@/lib/CMS/query';

const statusMessage = {
  connecting: 'Connecting to DatoCMS...',
  connected: 'Connected to DatoCMS, receiving live updates!',
  closed: 'Connection closed',
};

interface ArticleType {
  id: string;
  title: string;
  slug: string;
  body: Document | Node | STType<Record, Record> | null | undefined;
}

interface ArticlesData {
  allArticles: ArticleType[];
}

export default function InstantArticle() {
  const { data, error, status } = useQuerySubscription<ArticlesData>(
    query(ALL_ARTICLES),
  );

  return (
    <div className='mx-5'>
      <p>Connection status: {statusMessage[status]}</p>
      <ol className='list-disc'>
        <li>hello</li>
        <li>hello</li>
      </ol>
      {error && (
        <div>
          <h1>Error: {error.code}</h1>
          <div>{error.message}</div>
          {error.response && (
            <pre>{JSON.stringify(error.response, null, 2)}</pre>
          )}
        </div>
      )}
      {data &&
        data.allArticles.map((article) => (
          <StructuredText
            data={article.body}
            renderInlineRecord={({ record }: { record: ArticleType }) => {
              switch (record.__typename) {
                case 'BlogPostRecord':
                  return <a href={`/blog/${record.slug}`}>{record.title}</a>;
                default:
                  return null;
              }
            }}
            renderLinkToRecord={({ record, children }) => {
              switch (record.__typename) {
                case 'BlogPostRecord':
                  return <a href={`/blog/${record.slug}`}>{children}</a>;
                default:
                  return null;
              }
            }}
            renderBlock={({ record }) => {
              switch (record.__typename) {
                case 'ImageBlockRecord':
                  return <img src={record.image.url} alt={record.image.alt} />;
                default:
                  return null;
              }
            }}
            key={article.id}
          />
        ))}
    </div>
  );
}
