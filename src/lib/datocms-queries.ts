// src/lib/datocms-queries.ts
import { performRequest } from './datocms';

export async function getAllArticles() {
  const query = `
    query {
      allArticles {
        id
        title
        author
        date
        image {
          url
        }
        body {
          value
          links
          blocks
        } 
      }
    }
  `;

  return await performRequest({ query });
}

export async function getArticleById(id: string) {
  const query = `
    query ($id: ItemId) {
      article(filter: { id: { eq: $id } }) {
        id
        title
        author
        date
        image {
          url
        }
        body {
          value
          links
          blocks
        }
      }
    }
  `;

  return await performRequest({
    query,
    variables: { id },
  });
}

export async function getArticleSlugs() {
  const query = `
    query {
      allArticles {
        id
      }
    }
  `;

  return await performRequest({ query });
}
