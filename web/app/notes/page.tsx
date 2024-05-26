import { createClient } from '@/utils/supabase/server';
import { Note } from './note';

export default async function Page() {
  const supabase = createClient();
  const { data: notes } = await supabase.from('notes').select();
  const points = notes?.map((note) => note.done).reduce((a, b) => a + b, 0);
  return (
    <div className='mt-12'>
      <div className='gap-4 flex flex-col'>
        {notes?.map((note) => <Note note={note} />)}
      </div>
      <div>total points: {points}</div>
      <div>make note</div>
    </div>
  );
}
