import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import AuthButton from './AuthButton';

export const Navbar = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <div className='flex h-16 w-full justify-center border-b border-b-foreground/10'>
      <div className='flex w-full max-w-5xl items-center justify-between p-3 text-sm'>
        <Link href='/' className='px-4'>
          Home
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
    </div>
  );
};
