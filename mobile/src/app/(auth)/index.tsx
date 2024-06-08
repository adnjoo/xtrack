import { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import { Checkbox } from '@/src/components/ui/checkbox';

import { supabase } from '@/src/lib/supabase';
import { useSession } from '@/src/app/context/SessionProvider';

export default function App() {
  const session = useSession();
  const [notes, setNotes] = useState([]);

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
    <>
      <View>
        {notes?.map((note) => (
          <Card key={note.id} className='m-4'>
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
    </>
  );
}
