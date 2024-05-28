import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import AuthButton from './AuthButton';

export const Navbar = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <div className='w-full flex justify-center border-b border-b-foreground/10 h-16'>
      <div className='w-full max-w-5xl flex justify-between items-center p-3 text-sm'>
        <Link href='/'>Home</Link>

        <div className='flex gap-4 items-center'>
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
