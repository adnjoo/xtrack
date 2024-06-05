import Link from 'next/link';

import AuthButton from '@/components/AuthButton';
import { createClient } from '@/utils/supabase/server';

export const Navbar = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <header className='fixed z-50 left-0 top-0 h-16 w-full justify-center border-b border-b-foreground/10 bg-white'>
      <div className='mx-auto flex max-w-7xl items-center justify-between px-6 py-3 text-sm lg:px-8'>
        <Link href='/' className=''>
          🫠 Xtrack
        </Link>

        <div className='flex items-center gap-4'>
          {user ? (
            <>
              <Link href='/notes'>Notes</Link>
              {/* <Link href='/protected'>Protected</Link> */}
            </>
          ) : null}
          <AuthButton />
        </div>
      </div>
    </header>
  );
};
