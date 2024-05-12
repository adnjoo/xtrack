'use client';

import Link from 'next/link';
// import { SignInButton, useUser, UserButton } from '@clerk/nextjs';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { APP_NAME, PAGES } from '@/lib/constants';

export default function MyNavbar() {
  // const { isSignedIn, user } = useUser();

  const showPages = Object.values(PAGES).filter((page) => page.menu);
  return (
    <Disclosure as='nav' className='border-b border-black bg-white'>
      {({ open }) => (
        <>
          <section className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
            <div className='relative flex h-16 items-center justify-between'>
              <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                {/* Mobile menu button*/}
                <Disclosure.Button className='relative inline-flex items-center justify-center rounded-md p-2 text-black hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                  <span className='absolute -inset-0.5' />
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>

              <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
                <Link
                  href={PAGES.HOME.href}
                  passHref
                  className='flex flex-shrink-0 items-center text-black'
                >
                  <img src='/logo.svg' className='mr-3 h-9' alt='XT Logo' />
                  <span className='hidden sm:flex'>{APP_NAME}</span>
                </Link>
                <div className='hidden sm:ml-6 sm:block'>
                  <div className='flex space-x-4'>
                    {Object.values(showPages).map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className='rounded-md px-3 py-2 text-sm font-medium text-black hover:underline'
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <section className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                {/* Profile */}
                {/* {isSignedIn && user ? (
                  <UserButton afterSignOutUrl='/' />
                ) : (
                  <SignInButton>
                    <button className='flex h-[42px] w-[100px] items-center justify-center rounded-lg bg-indigo-600 text-white transition-all duration-300 hover:bg-indigo-800 hover:shadow-lg'>
                      Sign In
                    </button>
                  </SignInButton>
                )} */}
              </section>
            </div>
          </section>

          <Disclosure.Panel className='sm:hidden'>
            <div className='space-y-1 px-2 pb-3 pt-2'>
              {Object.values(PAGES)
                .filter((page) => page.menu)
                .map((item) => (
                  <Disclosure.Button
                    key={item.label}
                    as={Link}
                    href={item.href}
                    className='block rounded-md px-3 py-2 text-base font-medium text-black hover:underline'
                  >
                    {item.label}
                  </Disclosure.Button>
                ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
