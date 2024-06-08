import { useEffect, useState, createContext, useContext } from 'react';
import { supabase } from '@/src/lib/supabase';
import { Session } from '@supabase/supabase-js';
import { router, useSegments } from 'expo-router';

const SessionContext = createContext<Session | null>(null);

export const useSession = () => useContext(SessionContext);

function useProtectedRoute(session: Session | null) {
  const segments = useSegments();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (!session && inAuthGroup) {
      router.replace("/login");
    } else if (session && !inAuthGroup) {
      router.replace("/(auth)");
    }
  }, [session, segments]);
}


export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });
  }, []);

  useProtectedRoute(session);

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};
