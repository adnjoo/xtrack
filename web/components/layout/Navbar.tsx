'use client';

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

import { MenuIcon, MountainIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { APP_NAME } from '@/lib/constants';
import { createClient } from '@/utils/supabase/client';

export const Navbar = () => {
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();
  }, []);

  const [isVisible, setIsVisible] = useState(true);
  let lastScrollY = 0;

  const handleScroll = () => {
    if (typeof window !== 'undefined') {
      const currentScrollY = window.scrollY;
      setIsVisible(lastScrollY > currentScrollY || currentScrollY < 300);
      lastScrollY = currentScrollY;
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    redirect('/login');
  };

  return (
    <header
      className={`shadow-neo-brutal fixed left-0 top-0 z-50 flex h-20 w-full shrink-0 items-center border-b-4 border-black bg-white px-4 transition-transform md:px-6 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <Sheet>
        <SheetTrigger asChild>
          <Button variant='outline' size='icon' className='lg:hidden'>
            <MenuIcon className='h-6 w-6' />
            <span className='sr-only'>Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side='left'>
          <Link href='/' className='mr-6 hidden lg:flex' prefetch={false}>
            <MountainIcon className='h-6 w-6' />
            <span className='sr-only'>{APP_NAME}</span>
          </Link>
          <div className='grid gap-2 py-6'>
            <SheetClose asChild>
              <Link
                href='/'
                className='flex w-full items-center py-2 text-lg font-semibold'
                prefetch={false}
              >
                Home
              </Link>
            </SheetClose>
            {/* {user ? (
              <SheetClose asChild>
                <Link
                  href='/notes'
                  className='flex w-full items-center py-2 text-lg font-semibold'
                  prefetch={false}
                >
                  Notes
                </Link>
              </SheetClose>
            ) : null} */}
            <SheetClose asChild>
              <Link
                href='/blog'
                className='flex w-full items-center py-2 text-lg font-semibold'
                prefetch={false}
              >
                Blog
              </Link>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>

      <Link href='/' className='mr-6 hidden lg:flex' prefetch={false}>
        <MountainIcon className='h-6 w-6' />
        <span className='sr-only'>{APP_NAME}</span>
      </Link>

      <nav className='ml-auto hidden gap-6 lg:flex'>
        {user ? (
          <Link
            href='/notes'
            className='group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50'
            prefetch={false}
          >
            Notes
          </Link>
        ) : null}
        <Link
          href='/blog'
          className='group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50'
          prefetch={false}
        >
          Blog
        </Link>
      </nav>

      <div className='ml-auto flex items-center lg:ml-4'>
        {user ? (
          <Button onClick={signOut}>logout</Button>
        ) : (
          <Button asChild>
            <Link
              href='/login'
              className='bg-btn-background hover:bg-btn-background-hover flex rounded-md px-4 py-2 no-underline'
            >
              Login
            </Link>
          </Button>
        )}
      </div>
    </header>
  );
};
