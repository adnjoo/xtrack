import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { Code } from 'bright';

export const mdxComponents = {
  pre: Code,
  h2: (props: any) => <h2 className='text-2xl font-semibold' {...props} />,
  h3: (props: any) => <h3 className='my-4 text-xl font-semibold' {...props} />,
  p: (props: any) => <p className='my-4' {...props} />,
  a: (props: any) => (
    <a
      className='underline text-blue-500'
      href={props.href}
      target='_blank'
      rel='noopener noreferrer'
    >
      {props.children}
    </a>
  ),
  hr: (props: any) => <hr className='my-4' {...props} />,
  li: (props: any) => <li className='my-2 list-disc' {...props} />,
};

export function PostBody({ children }: { children: string }) {
  return (
    <MDXRemote
      source={children}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      }}
      components={mdxComponents}
    />
  );
}
