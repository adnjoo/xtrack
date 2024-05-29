'use client';

import { useQuery } from '@tanstack/react-query';
import { ChevronUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { createClient } from '@/utils/supabase/client';
import { CreateNote } from './create';
import LoadingNote from './loading-note';
import { Note } from './note';

export default function Page() {
  const supabase = createClient();

  const fetchNotesAndPoints = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { notes: [], points: [] };
    }
    const { data: notes } = await supabase
      .from('notes')
      .select()
      .eq('user_id', user.id);
    const { data: points } = await supabase
      .from('points')
      .select()
      .eq('user_id', user.id);
    return { notes, points };
  };

  const { data: { notes = [], points = [] } = {}, isLoading } = useQuery({
    queryKey: ['notes'],
    queryFn: fetchNotesAndPoints,
  });

  const renderLoadingNotes = () =>
    Array.from({ length: 6 }).map((_, i) => <LoadingNote key={i} />);

  const renderNotes = () =>
    notes
      ?.sort((a, b) => (a.done === b.done ? 0 : a.done ? 1 : -1))
      .map((note) => <Note key={note.id} note={note} />);

  return (
    <div className='lg:w-5xl mt-12 w-full max-w-5xl'>
      <div className='flex w-full items-center gap-8'>
        <CreateNote />
        <Badge className='max-h-[24px]'>⭐️ {points?.length}</Badge>
      </div>
      <div className='my-6 grid grid-cols-1 gap-4 sm:gap-8 md:grid-cols-2 lg:grid-cols-3'>
        {isLoading ? renderLoadingNotes() : renderNotes()}
        {!isLoading && notes?.length === 0 && (
          <div>
            <ChevronUp className='h-8 w-8 animate-bounce' /> Get started by creating a note 😊
          </div>
        )}
      </div>
    </div>
  );
}
