'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { Dialog, DialogPanel, Description } from '@headlessui/react';

import { MainNavItem } from '@/types';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import { buttonVariants } from '@/components/ui/button';
import { useUser } from '@/hooks/useUser';
import { mainNav, authNav } from '@/config/marketing';

export function MainNav() {
  const user = useUser();
  const segment = useSelectedLayoutSegment();
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

  const items = user ? authNav : mainNav;

  return (
    <div className='flex w-full justify-between gap-6 md:gap-1'>
      <Link href='/' className='hidden items-center space-x-2 md:flex'>
        <Icons.logo />
        <span className='hidden font-bold sm:inline-block'>
          {siteConfig.name}
        </span>
      </Link>

      {items?.length && (
        <nav className='hidden gap-6 md:flex'>
          <div className='flex flex-row gap-6'>
            {items?.map((item, index) => (
              <Link
                key={index}
                href={item.disabled ? '#' : item.href}
                className={cn(
                  'hover:text-foreground/80 flex items-center text-lg font-medium transition-colors sm:text-sm',
                  item.href.startsWith(`/${segment}`)
                    ? 'text-foreground'
                    : 'text-foreground/60',
                  item.disabled && 'cursor-not-allowed opacity-80',
                  item.desktopOnly && 'hidden'
                )}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </nav>
      )}

      <div className='hidden md:flex'>
        {!user ? (
          <Link
            href='/login'
            className={cn(
              buttonVariants({ variant: 'secondary', size: 'sm' }),
              'px-4'
            )}
          >
            Login
          </Link>
        ) : (
          <Link
            href='/logout'
            className={cn(
              buttonVariants({ variant: 'secondary', size: 'sm' }),
              'px-4'
            )}
          >
            Logout
          </Link>
        )}
      </div>

      <button
        className='flex items-center space-x-2 md:hidden'
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? <Icons.close /> : <Icons.logo />}
        <span className='font-bold'>Menu</span>
      </button>

      {/* Mobile menu */}
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
