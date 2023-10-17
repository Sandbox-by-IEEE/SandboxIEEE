'use client';
import {
  type Document,
  type Node,
  type Record,
  type StructuredText as STType,
} from 'datocms-structured-text-utils';
import { StructuredText } from 'react-datocms/structured-text';

import useCMSQuery from '@/lib/CMSquery';

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

const CMS_QUERY = `
query MyQuery {
  allArticles {
    id
    slug
    title
    body {
      blocks
      value
    }
  }
}`;

export default function InstantArticle() {
  const { data, status } = useCMSQuery<ArticlesData>(CMS_QUERY);

  return (
    <div className='mx-5'>
      <p>Connection status: {statusMessage[status]}</p>
      <ol className='list-disc'>
        <li>hello</li>
        <li>hello</li>
      </ol>
      {data &&
        data.allArticles.map((article) => (
          <StructuredText data={article.body} key={article.id} />
        ))}
    </div>
  );
}
