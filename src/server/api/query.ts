import { GraphQLClient, type Variables } from 'graphql-request';

export default async function query({
  query,
  variables,
}: {
  query: string;
  variables?: Variables;
}) {
  const endpoint = 'https://graphql.datocms.com/';
  const TOKEN = '1d614db69949061793efff792a19f8';
  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${TOKEN}`,
    },
  });

  return client.request(query, variables);
}
