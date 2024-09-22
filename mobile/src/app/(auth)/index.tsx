import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import { fetchName, getNotes, getPoints } from '@/src/app/(auth)/helpers';
import { useSession } from '@/src/app/context/SessionProvider';
import AddNoteDialog from '@/src/components/create-note';
import { Note } from '@/src/components/note';
import { Badge } from '@/src/components/ui/badge';
import { cn } from '@/src/lib/utils';

export default function App() {
  const session = useSession();

  const { data: name } = useQuery({
    queryKey: ['name'],
    queryFn: () => fetchName(session?.user?.id as string),
    enabled: !!session,
  });

  const { data: notes, refetch: refetchNotes } = useQuery({
    queryKey: ['notes'],
    queryFn: () => getNotes(session?.user?.id as string),
    enabled: !!session,
  });

  const { data: points } = useQuery({
    queryKey: ['points'],
    queryFn: () => getPoints(session?.user?.id as string),
    enabled: !!session,
  });

  return (
    <>
      <View className={cn('p-3', notes?.length > 3 ? 'pb-[120px]' : '')}>
        <View className='mb-6 border-b border-gray-500'>
          {name && <Text className='my-4 text-xl font-bold'>👋, {name}</Text>}
          <Badge className='my-2 w-[64px] py-2'>
            <Text className='text-white'>⭐️ {points}</Text>
          </Badge>
        </View>
        <ScrollView className='h-full'>
          {notes?.map((note: any) => <Note key={note.id} note={note} />)}
        </ScrollView>
      </View>
      <View className='absolute bottom-1 right-4 z-50'>
        <AddNoteDialog />
      </View>
    </>
  );
}
