'use client';

import { useQuerySubscription } from 'react-datocms/use-query-subscription';

const TOKEN = '1d614db69949061793efff792a19f8';

const ALL_ARTICLES = `
query MyQuery {
  allArticles {
    id
    slug
    title
  }
}
`;

export default function InstantArticle() {
  const { data, error, status } = useQuerySubscription({
    query: ALL_ARTICLES,
    token: TOKEN,
  });

  const statusMessage = {
    connecting: 'Connecting to DatoCMS...',
    connected: 'Connected to DatoCMS, receiving live updates!',
    closed: 'Connection closed',
  };

  console.log(data);

  return (
    <div>
      <p>Connection status: {statusMessage[status]}</p>
      {error && (
        <div>
          <h1>Error: {error.code}</h1>
          <div>{error.message}</div>
          {error.response && (
            <pre>{JSON.stringify(error.response, null, 2)}</pre>
          )}
        </div>
      )}
    </div>
  );
}
