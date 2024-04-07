import matter from 'gray-matter';
import fs from 'fs/promises';
import path from 'path';
import { cache } from 'react';

export const getPosts = cache(async (returnArchive = false) => {
  const posts = await fs.readdir(path.join(process.cwd(), 'posts'));

  const postPromises = posts.map(async (post) => {
    const postContent = await fs.readFile(`./posts/${post}`, 'utf-8');
    const { data, content } = matter(postContent);
    const id = post.replace(/\.mdx$/, '');

    return {
      ...data,
      id,
      body: content,
    };
  }) as any;

  const sortedPosts = (await Promise.all(postPromises)).sort((a, b) => {
    return b.date.localeCompare(a.date);
  });

  if (returnArchive) {
    return sortedPosts;
  } else {
    return sortedPosts.filter((post) => !post.archive);
  }
});

/**
 * Retrieves a post by its slug from the list of posts.
 *
 * @param {string} slug - The slug of the post to retrieve
 * @param {boolean} returnArchive - Flag to indicate whether to include archived posts
 * @return {object | undefined} The post object if found, otherwise undefined
 */
export async function getPost(slug: string, returnArchive = false) {
  const posts = await getPosts(returnArchive);
  return posts.find((post) => post.id === slug);
}
