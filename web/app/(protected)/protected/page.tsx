'use client';

import { redirect } from 'next/navigation';

import { useAuthUser } from '@/app/hooks/useAuthUser';

export default async function ProtectedPage() {
  const { user } = useAuthUser();

  if (!user) {
    return redirect('/login');
  }

  return (
    <div className='mt-12 flex w-full flex-1 flex-col items-center gap-20'>
      <div className='py-6 text-center font-bold'>
        This is a protected page that you can only see as an authenticated user
      </div>
    </div>
  );
}
