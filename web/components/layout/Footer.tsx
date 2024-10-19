import { GithubIcon, TwitterIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { APP_NAME } from '@/lib/constants';

const navigation = {
  product: [
    { name: 'Notes', href: '/notes' },
    { name: 'Login', href: '/login' },
  ],
  company: [{ name: 'Privacy', href: '/privacy', }, { name: 'Blog', href: '/blog', }],
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
    <footer
      className='flex w-full justify-center border-t-4 border-black bg-white text-black'
      aria-labelledby='footer-heading'
    >
      <div className='w-full max-w-7xl'>
        <h2 id='footer-heading' className='sr-only'>
          Footer
        </h2>
        <div className='mx-auto max-w-7xl px-6 pb-8 pt-8 sm:pt-12 lg:px-8'>
          <div className='lg:grid lg:grid-cols-3 xl:gap-8'>
            <div className='space-y-4 '>
              <span className='text-3xl font-bold'>🫠 {APP_NAME}</span>
              <p className='text-lg font-semibold leading-6'>
                Streamlining your tasks so you can GTD faster.
              </p>
              <div className='flex space-x-6'>
                {navigation.social.map((item) => (
                  <Button asChild>
                    <Link
                      key={item.name}
                      href={item.href}
                      className='hover:underline !p-3'
                      target='_blank'
                    >
                      <span className='sr-only'>{item.name}</span>
                      <item.icon
                        className='h-8 w-8'
                        aria-hidden='true'
                      />
                    </Link>
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className='mt-4 border-b-4 border-black text-xl font-bold uppercase leading-6 lg:mt-0'>
                Product
              </h3>
              <ul role='list' className='mt-6 space-y-4'>
                {navigation.product.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className='text-lg font-semibold leading-6 hover:underline'
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className='mt-4 border-b-4 border-black text-xl font-bold uppercase leading-6 lg:mt-0'>
                Company
              </h3>
              <ul role='list' className='mt-6 space-y-4'>
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className='text-lg font-semibold leading-6 hover:underline'
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className='mt-6 border-t-4 border-black pt-8 sm:mt-20 lg:mt-12'>
            <p className='text-base font-bold'>
              &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
