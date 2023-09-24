// pages/page/[page].tsx
import { useRouter } from 'next/router';
import { GetStaticProps, GetStaticPaths } from 'next';
import { Post } from '../../interfaces/Post';
import { posts, itemsPerPage } from '../../data';
import Pagination from '../../components/Pagination';

interface PageProps {
  posts: Post[];
  currentPage: number;
  totalItems: number;
}

const Page: React.FC<PageProps> = ({ posts, currentPage, totalItems }) => {
  return (
    <div>
      <h1>Posts - Page {currentPage}</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
      <Pagination currentPage={currentPage} totalItems={totalItems} />
    </div>
  );
};

export default Page;

export const getStaticPaths: GetStaticPaths = async () => {
  const totalPages = Math.ceil(posts.length / itemsPerPage);
  const paths = Array.from({ length: totalPages }, (_, index) => ({
    params: { page: `${index + 1}` },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const page = params?.page ? parseInt(params.page as string, 10) : 1;
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedPosts = (posts || []).slice(start, end);

  return {
    props: {
      posts: paginatedPosts,
      currentPage: page,
      totalItems: (posts || []).length,
    },
  };
};
