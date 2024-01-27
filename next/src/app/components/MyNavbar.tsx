'use client';

import Link from 'next/link';
import { Navbar } from 'flowbite-react';
import { UserButton, SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';

import { APP_NAME, PAGES } from '@/app/lib/constants';

export default function MyNavbar() {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand as={Link} href={PAGES.HOME.href}>
        <img src='/logo.svg' className='mr-3 h-9' alt='XT Logo' />
        <span className='hidden whitespace-nowrap text-xl font-semibold dark:text-white sm:block'>
          {APP_NAME}
        </span>
      </Navbar.Brand>
      <Navbar.Collapse>
        {Object.values(PAGES).map((page) => (
          <Navbar.Link key={page.label} as={Link} href={page.href}>
            {page.label}
          </Navbar.Link>
        ))}
      </Navbar.Collapse>
      <div className=''>
        <SignedIn>
          <UserButton afterSignOutUrl='/' />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <Navbar.Toggle className='ml-2' />
      </div>
    </Navbar>
  );
}
