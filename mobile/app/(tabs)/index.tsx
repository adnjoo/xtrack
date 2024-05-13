import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { Link } from 'expo-router';
import Expenses from '@/components/Expenses';
import { supabase } from '@/lib/supabase';

export default function HomeScreen() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <View style={styles.container}>
      {session ? (
        <Expenses session={session} />
      ) : (
        <Link href='/settings'>Login to see your expenses</Link>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loginText: {
    fontSize: 18,
    textAlign: 'center',
  },
});
