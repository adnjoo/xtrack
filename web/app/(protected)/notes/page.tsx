import { createClient } from '@/utils/supabase/server';

import { NotesBody } from './NotesBody';

export default async function Page() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className='mt-12'>You need to be logged in to view this page</div>
    );
  }

  return <NotesBody user={user} />;
}
