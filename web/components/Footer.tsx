import { GithubIcon, TwitterIcon } from 'lucide-react';
import Link from 'next/link';

const navigation = {
  product: [
    { name: 'Notes', href: '/notes' },
    { name: 'Login', href: '/login' },
  ],
  social: [
    {
      name: 'X',
      href: 'https://x.com/adnjoo',
      icon: (props: any) => <TwitterIcon {...props} />,
    },
    {
      name: 'GitHub',
      href: 'https://github.com/adnjoo/xtrack',
      icon: (props: any) => <GithubIcon {...props} />,
    },
  ],
};

export default function Footer() {
  return (
    <footer className='bg-gray-900' aria-labelledby='footer-heading'>
      <h2 id='footer-heading' className='sr-only'>
        Footer
      </h2>
      <div className='mx-auto max-w-7xl px-6 pb-8 pt-8 sm:pt-12 lg:px-8'>
        <div className='lg:grid lg:grid-cols-3 xl:gap-8'>
          <div className='space-y-8 text-gray-300'>
            🫠 Xtrack
            <p className='text-sm leading-6 text-gray-300'>
              Streamlining your tasks so you can GSD faster.
            </p>
            <div className='flex space-x-6'>
              {navigation.social.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className='text-gray-500 hover:text-gray-400'
                  target='_blank'
                >
                  <span className='sr-only'>{item.name}</span>
                  <item.icon className='h-6 w-6' aria-hidden='true' />
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className='mt-4 text-sm font-semibold leading-6 text-white lg:mt-0'>
              Product
            </h3>
            <ul role='list' className='mt-6 space-y-4'>
              {navigation.product.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className='text-sm leading-6 text-gray-300 hover:text-white'
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className='mt-6 border-t border-white/10 pt-8 sm:mt-20 lg:mt-12'>
          <p className='text-xs leading-5 text-gray-400'>
            &copy; {new Date().getFullYear()} Xtrack. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
