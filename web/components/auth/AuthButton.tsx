'use client';

import Link from 'next/link';
import { redirect } from 'next/navigation';

import { useAuthUser } from '@/app/hooks/useAuthUser';
import { Button } from '@/components/ui/button';
import { getSupabaseClient } from '@/utils/supabase/client';

export default function AuthButton() {
  const supabase = getSupabaseClient();
  const { user } = useAuthUser();

  const signOut = async () => {
    await supabase.auth.signOut();
    return redirect('/login');
  };

  return user ? (
    <div className='flex items-center gap-4'>
      <span className='hidden sm:block'>Hey, {user.email}!</span>
      <form action={signOut}>
        <Button className='' variant='default'>
          Logout
        </Button>
      </form>
    </div>
  ) : (
    <Button asChild>
      <Link
        href='/login'
        className='bg-btn-background hover:bg-btn-background-hover flex rounded-md px-4 py-2 no-underline'
      >
        Login
      </Link>
    </Button>
  );
}
