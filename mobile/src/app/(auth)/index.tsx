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

export default function App() {
  const session = useSession();
  const [notes, setNotes] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    if (session) {
      getNotes();
      getName();
    }
  }, [session]);

  async function getName() {
    try {
      const { data } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', session?.user.id)
        .single();

      if (data) {
        setName(data.username);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }
  }

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
      <Text className='my-4 text-xl font-bold'>👋, {name}</Text>
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
