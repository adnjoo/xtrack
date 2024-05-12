import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { MainNavItem } from '@/types';

interface MobileNavProps {
  items: MainNavItem[];
  children?: React.ReactNode;
}

export function MobileNav({ items, children }: MobileNavProps) {
  return (
    <div className='fixed inset-0 top-16 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md md:hidden'>
      <div className='bg-popover text-popover-foreground relative z-20 grid gap-6 rounded-md bg-white/100 p-4 shadow-md'>
        <nav className='grid grid-flow-row auto-rows-max text-sm'>
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? '#' : item.href}
              className={cn(
                'flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline',
                item.disabled && 'cursor-not-allowed opacity-60'
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
        {children}
      </div>
    </div>
  );
}
