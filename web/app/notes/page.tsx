import { createClient } from '@/utils/supabase/server';
import { Note } from './note';

export default async function Page() {
  const supabase = createClient();
  const { data: notes } = await supabase.from('notes').select();
  const points = notes?.map((note) => note.done).reduce((a, b) => a + b, 0);
  return (
    <div>
      {notes?.map((note) => <Note note={note} />)}
      <div>total points: {points}</div>
      <div>make note</div>
    </div>
  );
}
