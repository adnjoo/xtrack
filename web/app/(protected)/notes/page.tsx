'use client';

import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import { createClient } from '@/utils/supabase/client';
import { CreateNote } from './create';
import LoadingNote from './loading-note';
import { Note } from './note';

export default function Page() {
  const supabase = createClient();
  const { data: notes, isLoading } = useQuery({
    queryKey: ['notes'],
    queryFn: async () => {
      const { data } = await supabase.from('notes').select();
      return data;
    },
  });

  const { data: points } = useQuery({
    queryKey: ['points'],
    queryFn: async () => {
      const { data } = await supabase.from('notes').select().eq('done', true);
      return data;
    },
  });

  return (
    <div className='mt-12 max-w-5xl'>
      <div className='flex w-full items-center gap-8'>
        <CreateNote />
        <Badge className='max-h-[24px]'>⭐️ {points?.length}</Badge>
      </div>
      <div className='my-6 grid grid-cols-1 gap-4 md:grid-cols-2 sm:gap-8 lg:grid-cols-3'>
        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => <LoadingNote key={i} />)}
        {notes
          ?.sort((a, b) => (a.done === b.done ? 0 : a.done ? 1 : -1))
          ?.map((note) => <Note key={note.id} note={note} />)}
      </div>
    </div>
  );
}
