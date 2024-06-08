import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';

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
          <View key={note.id}>
            <Text className='text-3xl text-red-500 underline'>
              {note.title}
            </Text>
          </View>
        ))}
      </View>
    </>
  );
}
