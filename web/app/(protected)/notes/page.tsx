'use client';

import { NotesBody } from './NotesBody';
import { useAuthUser } from '@/app/hooks/useAuthUser';

export default function Page() {
  const { user } = useAuthUser();

  if (!user) {
    return (
      <div className='mt-12'>You need to be logged in to view this page</div>
    );
  }

  return <NotesBody user={user} />;
}
