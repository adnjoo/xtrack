import { redirect } from 'next/navigation';

import Header from '@/components/layout/Header';
import { createClient } from '@/utils/supabase/server';

export default async function Index() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect('/notes');
  }

  return (
    <div className='flex w-full flex-1 flex-col items-center gap-20'>
      <div className='mt-16 flex max-w-4xl flex-1 flex-col gap-20 px-3 opacity-0 animate-in md:mt-32'>
        <Header />
      </div>
    </div>
  );
}
