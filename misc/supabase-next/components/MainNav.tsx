'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { Dialog, DialogPanel, Description } from '@headlessui/react';

import { MainNavItem } from '@/types';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';

interface MainNavProps {
  items?: MainNavItem[];
  children?: React.ReactNode;
}

export function MainNav({ items }: MainNavProps) {
  const segment = useSelectedLayoutSegment();
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

  return (
    <div className='flex gap-6 md:gap-10'>
      <Link href='/' className='hidden items-center space-x-2 md:flex'>
        <Icons.logo />
        <span className='hidden font-bold sm:inline-block'>
          {siteConfig.name}
        </span>
      </Link>
      {items?.length ? (
        <nav className='hidden gap-6 md:flex'>
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? '#' : item.href}
              className={cn(
                'flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm',
                item.href.startsWith(`/${segment}`)
                  ? 'text-foreground'
                  : 'text-foreground/60',
                item.disabled && 'cursor-not-allowed opacity-80'
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}
      <button
        className='flex items-center space-x-2 md:hidden'
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? <Icons.close /> : <Icons.logo />}
        <span className='font-bold'>Menu</span>
      </button>

      <Dialog
        open={showMobileMenu}
        onClose={() => setShowMobileMenu(false)}
        className='relative z-50'
      >
        <div className='fixed inset-0 top-[2.5em] flex w-screen p-4'>
          <DialogPanel className='max-h-[150px] w-full space-y-4 rounded-xl border bg-white p-2'>
            <Description>
              {items &&
                items.map((item, index) => (
                  <Link
                    key={index}
                    href={item.disabled ? '#' : item.href}
                    className={cn(
                      'flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline',
                      item.disabled && 'cursor-not-allowed opacity-60'
                    )}
                    onClick={() => setShowMobileMenu(false)}
                  >
                    {item.title}
                  </Link>
                ))}
            </Description>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}
