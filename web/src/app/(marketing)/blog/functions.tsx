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
    const timeToRead = calculateTimeToRead(content);

    return {
      ...data,
      id,
      body: content,
      timeToRead,
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
};

/**
 * Calculates the estimated time to read the content based on an average reading speed.
 *
 * @param {string} content - The content of the post
 * @return {number} The estimated time to read in minutes
 */
function calculateTimeToRead(content: string) {
  // Average reading speed in words per minute (adjust as needed)
  const wordsPerMinute = 200;

  // Count the number of words in the content
  const wordCount = content.split(/\s+/).length;

  // Calculate the estimated time to read
  const timeInMinutes = wordCount / wordsPerMinute;

  // Round up to the nearest integer
  return Math.ceil(timeInMinutes);
};
