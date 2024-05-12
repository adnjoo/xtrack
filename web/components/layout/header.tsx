'use client';

import { useSidebar } from '@/components/context/sidebar-provider';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const MenuIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='currentColor'
    aria-hidden='true'
    className='m-auto h-6 w-6 text-black dark:text-white'
  >
    <title>Open menu</title>
    <path
      fillRule='evenodd'
      d='M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z'
      clipRule='evenodd'
    ></path>
  </svg>
);

export default function LayoutHeader({ title }: { title: string }) {
  const { show, setShow } = useSidebar();
  return (
    <>
      <div
        className='flex w-full flex-row items-center justify-between p-3 pl-4 pr-4
        text-gray-950 dark:text-gray-200'
      >
        <div className='flex'>
          <Button
            className='mr-2 mt-[-1px] p-1 sm:hidden'
            onClick={() => setShow(!show)}
            variant={'ghost'}
          >
            <MenuIcon />
          </Button>
          <h2
            className={`text-2xl font-extrabold capitalize leading-snug tracking-tight`}
          >
            {title}
          </h2>
        </div>
      </div>

      <Separator />
    </>
  );
}
