import Link from 'next/link';
import { PAGES } from '@/lib/constants';
import { PostBody } from '../components/PostBody';
import { getPost } from '../functions';

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  let post = null;
  try {
    post = await getPost(params.slug);
  } catch (error) {
    console.error('Error fetching post:', error);
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className='mx-4 md:mx-24'>
      <Link href={PAGES.BLOG.href} passHref>
        <h3 className='mb-6 mt-12 sm:mt-24 hover:underline'>Back to Blog</h3>
      </Link>

      <h1 className='mb-6 text-3xl'>{post.title}</h1>

      <p className='text-gray-600'>
        {post.author} | {post.timeToRead} min read |{' '}
        {new Date(post.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>
      <PostBody>{post.body}</PostBody>
    </div>
  );
}
