import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';

import { useSession } from '@/src/app/context/SessionProvider';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import { Checkbox } from '@/src/components/ui/checkbox';
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

export default function App() {
  const session = useSession();
  const [notes, setNotes] = useState([]);
  const { data: name } = useQuery({
    queryKey: ['name'],
    queryFn: () => fetchName(session?.user?.id as string),
    enabled: !!session,
  });

  useEffect(() => {
    if (session) {
      getNotes();
    }
  }, [session]);

  async function getNotes() {
    try {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('user_id', session?.user?.id);

      if (error) throw error;

      setNotes(data);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }
  }

  return (
    <View className='p-3'>
      {name && <Text className='my-4 text-xl font-bold'>👋, {name}</Text>}
      {notes?.map((note) => (
        <Card key={note.id} className='my-1'>
          <CardHeader>
            <CardTitle>{note.title}</CardTitle>
            <CardDescription>
              {new Date(note.updated_at).toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Checkbox checked={note.done} onCheckedChange={() => {}} />
          </CardContent>
        </Card>
      ))}
    </View>
  );
}
