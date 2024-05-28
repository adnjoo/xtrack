import { Badge } from '@/components/ui/badge';
import { createClient } from '@/utils/supabase/server';
import { CreateNote } from './create';
import { Note } from './note';

export default async function Page() {
  const supabase = createClient();
  const { data: notes } = await supabase.from('notes').select();
  const points = notes?.map((note) => note.done).reduce((a, b) => a + b, 0);
  return (
    <div className='mt-12 max-w-5xl'>
      <Badge>⭐️ {points}</Badge>
      <div className='my-6 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-8'>
        {notes
          ?.filter((note) => !note.done)
          .map((note) => <Note key={note.id} note={note} />)}
      </div>
      <CreateNote />
    </div>
  );
}
