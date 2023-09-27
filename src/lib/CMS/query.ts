const TOKEN = '1d614db69949061793efff792a19f8';

type ALL_ARTICLES = `
query MyQuery {
  allArticles {
    id
    slug
    title
    body {
      value
      links
      blocks
    }
  }
}
`;

export const ALL_ARTICLES = `
query MyQuery {
  allArticles {
    id
    slug
    title
    body {
      value
      links
      blocks
    }
  }
}
`;

type queryType = ALL_ARTICLES;

export function query(query: queryType) {
  return {
    query,
    token: TOKEN,
  };
}
