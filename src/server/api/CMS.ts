import query from '@/server/api/query';

const ALL_ARTICLES = `
query(
  allArticles(orderBy: title_ASC){
    id
    slug
    title
  }
)`;

async function allArticles() {
  const result = await query({ query: ALL_ARTICLES });
  return result;
}

export { allArticles };
