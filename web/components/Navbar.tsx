import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import AuthButton from './AuthButton';

export async function Navbar() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <nav className='w-full px-4 py-6 flex items-center justify-between'>
      <div className='text-2xl font-bold text-black'>MyApp</div>
      <Link href='/'>Home</Link>
      {user && (
        <>
          <Link href='/notes'>Notes</Link>
          <Link href='/protected'>Protected</Link>
        </>
      )}
      <AuthButton />
    </nav>
  );
}
