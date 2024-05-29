'use client';

import { useQuery } from '@tanstack/react-query';
import { ChevronUp } from 'lucide-react';
import { useEffect } from 'react';

import { CreateNote } from '@/app/(protected)/notes/create';
import { LoadingNote, Note } from '@/app/(protected)/notes/note';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { createClient } from '@/utils/supabase/client';

export default function Page() {
  const supabase = createClient();

  useEffect(() => {
    refetch();
  }, []);

  const fetchNotesAndPoints = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data: notes } = await supabase
      .from('notes')
      .select()
      .eq('user_id', user?.id);

    const { data: pointsData } = await supabase
      .from('points')
      .select()
      .eq('user_id', user?.id);

    const points = pointsData?.[0]?.points || 0;

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
    <div className={cn('mt-12 max-w-5xl', !notes?.length ? 'w-full' : '')}>
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
