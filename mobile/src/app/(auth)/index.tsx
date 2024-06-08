import { useQuery } from '@tanstack/react-query';
import { Alert, ScrollView, Text, View } from 'react-native';

import { useSession } from '@/src/app/context/SessionProvider';
import { Note } from '@/src/components/note';
import { Badge } from '@/src/components/ui/badge';
import { supabase } from '@/src/lib/supabase';

const fetchName = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('username')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data.username;
};

const getNotes = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;

    return data;
  } catch (error) {
    if (error instanceof Error) {
      Alert.alert(error.message);
    }
  }
};

const getPoints = async (userId: string) => {
  const { data, error } = await supabase
    .from('points')
    .select()
    .eq('user_id', userId);

  const points = data?.[0]?.points || 0;
  return points;
};

export default function App() {
  const session = useSession();
  const { data: name } = useQuery({
    queryKey: ['name'],
    queryFn: () => fetchName(session?.user?.id as string),
    enabled: !!session,
  });

  const { data: notes } = useQuery({
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
    <View className='p-3'>
      <View className='mb-6 border-b border-gray-500'>
        {name && <Text className='my-4 text-xl font-bold'>👋, {name}</Text>}
        <Badge className='my-2 w-[64px] py-2'>
          <Text className='text-white'>⭐️ {points}</Text>
        </Badge>
      </View>
      <ScrollView className=''>
        {notes?.map((note) => <Note key={note.id} note={note} />)}
      </ScrollView>
    </View>
  );
}
