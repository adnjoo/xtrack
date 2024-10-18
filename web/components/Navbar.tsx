import Link from 'next/link';

import AuthButton from '@/components/AuthButton';
import { Button } from '@/components/ui/button';
import { APP_NAME } from '@/lib/constants';
import { createClient } from '@/utils/supabase/server';

export const Navbar = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className='shadow-neo-brutal fixed left-0 top-0 z-50 h-20 w-full border-b-4 border-black bg-white px-6 py-3'>
      <div className='mx-auto flex max-w-7xl items-center justify-between'>
        <Link href='/' className='text-xl font-extrabold'>
          🫠 {APP_NAME}
        </Link>

        <div className='flex items-center gap-4'>
          {user ? (
            <Button asChild>
              <Link
                href='/notes'
                className='group inline-flex h-9 w-max items-center justify-center rounded-md border-2 border-black px-4 py-2 text-sm font-extrabold'
              >
                Notes
              </Link>
            </Button>
          ) : null}
          <AuthButton />
        </div>
      </div>
    </header>
  );
};
