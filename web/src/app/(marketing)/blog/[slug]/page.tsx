import { getPost } from '../functions';
import { PostBody } from '../components/PostBody';

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
      <h1 className='mb-6 mt-12 text-3xl sm:mt-24'>{post.title}</h1>
      <PostBody>{post.body}</PostBody>
    </div>
  );
}
