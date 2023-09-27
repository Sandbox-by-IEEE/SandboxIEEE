import { performRequest } from '@/lib/datocms';

const ALL_ARTICLES = `
query MyQuery {
  allArticles {
    id
    slug
    title
  }
}
`;

async function getAllArticles() {
  const data = await performRequest({ query: ALL_ARTICLES });

  return data;
}

export { getAllArticles };
