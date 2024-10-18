'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { API_URL } from '@/app/(auth)/login/page';
import { MenuIcon, MountainIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { APP_NAME } from '@/lib/constants';

export default function Component() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Fetch current user from the Rails API
    fetch(`${API_URL}/show_current_user`, {
      method: 'GET',
      credentials: 'include', // Include session cookie in request
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.email) {
          setUser(data);
        }
      })
      .catch((err) => console.error('Not logged in', err));
  }, []);

  const handleLogout = () => {
    fetch(`${API_URL}/users/sign_out`, {
      method: 'DELETE',
      credentials: 'include', // Include session cookie
    })
      .then(() => {
        setUser(null); // Clear user state on logout
      })
      .catch((err) => console.error('Logout failed', err));
  };

  return (
    <header className='shadow-neo-brutal flex h-20 w-full items-center border-b-4 border-black bg-white px-4 md:px-6'>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant='outline'
            size='icon'
            className='border-2 border-black lg:hidden'
          >
            <MenuIcon className='h-6 w-6' />
            <span className='sr-only'>Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side='left'
          className='border-4 border-black bg-white p-4'
        >
          <Link href='#' className='mr-6 hidden lg:flex' prefetch={false}>
            <MountainIcon className='h-6 w-6' />
            <span className='sr-only'>{APP_NAME}</span>
          </Link>
          <div className='grid gap-4 py-6'>
            <Link
              href='/'
              className='flex w-full items-center py-2 text-lg font-extrabold'
              prefetch={false}
            >
              Home
            </Link>
            {user ? (
              <>
                <span className='flex w-full items-center py-2 text-lg font-extrabold'>
                  Hey, {user.email}!
                </span>
                <Button
                  onClick={handleLogout}
                  className='flex w-full items-center py-2 text-lg font-extrabold'
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link
                href='/login'
                className='flex w-full items-center py-2 text-lg font-extrabold'
                prefetch={false}
              >
                Login
              </Link>
            )}
          </div>
        </SheetContent>
      </Sheet>
      <Link href='/' className='mr-6 hidden lg:flex' prefetch={false}>
        <MountainIcon className='h-6 w-6' />
        <span className='sr-only'>Acme Inc</span>
      </Link>
      <nav className='ml-auto hidden gap-6 lg:flex'>
        {user ? (
          <>
            <span className='group inline-flex h-9 w-max items-center justify-center rounded-md border-2 border-black px-4 py-2 text-sm font-extrabold text-white'>
              Hey, {user.email}!
            </span>
            <Button
              onClick={handleLogout}
              className='group inline-flex h-9 w-max items-center justify-center rounded-md border-2 border-black px-4 py-2 text-sm font-extrabold'
            >
              Logout
            </Button>
          </>
        ) : (
          <Button asChild>
            <Link
              href='/login'
              className='group inline-flex h-9 w-max items-center justify-center rounded-md border-2 border-black px-4 py-2 text-sm font-extrabold'
              prefetch={false}
            >
              Login
            </Link>
          </Button>
        )}
      </nav>
    </header>
  );
}
