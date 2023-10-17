// Optimizing calls to datocms

import { cache } from 'react';

// Defining a function 'dedupedFetch' that uses caching.
const dedupedFetch = cache(async (serializedInit: any) => {
  // Making a fetch request to 'https://graphql.datocms.com/' with the provided 'serializedInit' data.
  const response = await fetch(
    'https://graphql.datocms.com/',
    JSON.parse(serializedInit),
  );

  // Parsing the response body as JSON.
  const responseBody = await response.json();

  // Checking if the response is not OK (i.e., has an error status).
  if (!response.ok) {
    // If there's an error, throwing an error with the status, status text, and response body.
    throw new Error(
      `${response.status} ${response.statusText}: ${JSON.stringify(
        responseBody,
      )}`,
    );
  }

  // If everything is fine, returning the parsed response body.
  return responseBody;
});

// Exporting an async function 'performRequest'.
export async function performRequest({
  // Destructuring the input object parameters.
  query,
  variables = {},
  includeDrafts = false,
  excludeInvalid = false,
  visualEditingBaseUrl,
  revalidate,
}: {
  // Specifying the types for the input parameters.
  query: string;
  variables?: Record<string, any>;
  includeDrafts?: boolean;
  excludeInvalid?: boolean;
  visualEditingBaseUrl?: string;
  revalidate?: number;
}) {
  // Making the actual request by calling 'dedupedFetch' with the serialized data.
  const { data } = await dedupedFetch(
    JSON.stringify({
      method: 'POST',
      headers: {
        // Including the 'Authorization' header with the provided API token from environment variables.
        Authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`,

        // Including additional headers based on the provided options.
        ...(includeDrafts ? { 'X-Include-Drafts': 'true' } : {}),
        ...(excludeInvalid ? { 'X-Exclude-Invalid': 'true' } : {}),
        ...(visualEditingBaseUrl
          ? {
              'X-Visual-Editing': 'vercel-v1',
              'X-Base-Editing-Url': visualEditingBaseUrl,
            }
          : {}),
      },
      // Serializing the body of the request as JSON, including the provided 'query', 'variables', and 'revalidate'.
      body: JSON.stringify({ query, variables, revalidate }),
      next: { revalidate }, // This line seems to be incorrect since 'next' is not part of the fetch options.
    }),
  );

  // Returning the 'data' property from the response.
  return data;
}
