// data.ts
import { Post } from './interfaces/Post';

export const posts: Post[] = [
  { id: 1, title: 'Post 1', body: 'This is the first post.' },
  { id: 2, title: 'Post 2', body: 'This is the second post.' },
  { id: 3, title: 'Post 2', body: 'This is the second post.' },
  { id: 4, title: 'Post 2', body: 'This is the second post.' },
  { id: 5, title: 'Post 2', body: 'This is the second post.' },

  // Add more posts as needed
];

export const itemsPerPage = 5;
