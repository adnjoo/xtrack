import Link from 'next/link';
import { getPosts } from './functions';

export default async function Blog() {
  const posts = await getPosts();

  return (
    <div className='bg-white py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl lg:mx-0'>
          <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
            From the blog
          </h2>
          <p className='mt-2 text-lg leading-8 text-gray-600'>
            Learn how to better manage your finances!
          </p>
        </div>
        <div className='mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
          {posts.map((post) => (
            <article
              key={post.id}
              className='flex max-w-xl flex-col items-start justify-between gap-2'
            >
              <Link
                className='cursor-pointer overflow-hidden rounded-lg'
                href={`/blog/${post.id}`}
              >
                <img
                  src={post.image}
                  alt=''
                  className='w-48 rounded-lg object-cover duration-300 hover:scale-110'
                />
              </Link>

              <h3 className='text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600'>
                <Link href={`/blog/${post.id}`}>{post.title}</Link>
              </h3>

              <div className='flex items-center gap-x-4 text-xs text-gray-600'>
                {post.timeToRead} min read |{' '}
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>

              <p className='line-clamp-3 text-sm leading-6 text-gray-600'>
                {post.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
