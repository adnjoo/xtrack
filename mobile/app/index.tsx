import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Checkbox } from '~/components/ui/checkbox';
import { Text } from '~/components/ui/text';

import Auth from '@/components/auth';
import { supabase } from '@/lib/supabase';

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
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
        .eq('user_id', session?.user.id);

      setNotes(data);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <>
      <View>{!session && !session?.user ? <Auth /> : null}</View>
      <View>
        {notes.map((note) => (
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
