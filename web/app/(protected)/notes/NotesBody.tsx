'use client';

import { useQuery } from '@tanstack/react-query';
import { ChevronUp } from 'lucide-react';
import { useEffect } from 'react';

import { CreateNote } from '@/app/(protected)/notes/create';
import { LoadingNote, Note } from '@/components/notes/note';
import { Badge } from '@/components/ui/badge';
import { getSupabaseClient } from '@/utils/supabase/client';

export function NotesBody({ user }: { user: any }) {
  const supabase = getSupabaseClient();

  useEffect(() => {
    refetch();
  }, []);

  const fetchNotesAndPoints = async () => {
    let { data: notes } = await supabase
      .from('notes')
      .select()
      .eq('user_id', user?.id)

    const points = notes?.filter((note) => note.archived).length;

    notes = notes?.filter((note) => !note.archived) as any;

    return { notes, points };
  };

  const {
    data: { notes = [], points = [] } = {},
    isLoading,
    refetch,
  } = useQuery({
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
    <div className='mt-12 w-full px-6 lg:px-8'>
      <div className='flex w-full items-center gap-8'>
        <CreateNote />
        <Badge className='max-h-[24px]'>⭐️ {points}</Badge>
      </div>
      <div className='my-6 grid grid-cols-1 gap-4 sm:gap-8 md:grid-cols-2 lg:grid-cols-3'>
        {isLoading ? renderLoadingNotes() : renderNotes()}
        {!isLoading && notes?.length === 0 && (
          <div>
            <ChevronUp className='h-8 w-8 animate-bounce' /> Get started by
            creating a note 😊
          </div>
        )}
      </div>
    </div>
  );
}
