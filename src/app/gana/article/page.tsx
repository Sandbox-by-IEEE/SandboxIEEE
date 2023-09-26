import { revalidateTag } from 'next/cache';

import SText from '@/components/SText';
import { getAllArticles } from '@/server/api/CMS';

export default async function Article() {
  revalidateTag('articles');
  console.log('reloading...');
  const allArticles = await getAllArticles();
  console.log(allArticles);
  return <SText data={allArticles}></SText>;
}
