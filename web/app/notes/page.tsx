import { createClient } from '@/utils/supabase/server';
import { Note } from './note';

export default async function Page() {
  const supabase = createClient();
  const { data: notes } = await supabase.from('notes').select();

  return (
    <div>
      {notes?.map((note) => <Note note={note} />)}

      <div>make note</div>
    </div>
  );
}
