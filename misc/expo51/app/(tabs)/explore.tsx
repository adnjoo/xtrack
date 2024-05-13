import { View } from 'react-native';
import 'react-native-url-polyfill/auto';
import { useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import Account from '@/components/Account';
import Auth from '@/components/Auth';
import { supabase } from '@/lib/supabase';

export default function Explore() {
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
    <View>
      {session && session.user ? (
        <Account key={session.user.id} session={session} />
      ) : (
        <Auth />
      )}
    </View>
  );
}
