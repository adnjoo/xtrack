import { getPost } from '../functions';
import { PostBody } from '../components/PostBody';

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post:any = await getPost(params.slug, true);

  //   console.log(post);
  return (
    <div className='mx-4 md:mx-24'>
      <h1 className='text-3xl mt-12 sm:mt-24 mb-6'>{post.title}</h1>
      <PostBody>{post.body}</PostBody>
      
    </div>
  );
}

