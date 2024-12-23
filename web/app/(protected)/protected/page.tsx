import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  return (
    <div className='flex w-full flex-1 flex-col items-center gap-20'>
      <div className='w-full'>
        <div className='bg-purple-950 py-6 text-center font-bold'>
          This is a protected page that you can only see as an authenticated
          user
        </div>
      </div>
    </div>
  );
}
