import { User } from '@supabase/supabase-js';
import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from 'react';
import { createClient } from './client';

type AuthContext = {
  user: User | null;
};

export const AuthContext = createContext({} as AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);
      } catch (error: any) {
        console.error('Error fetching user:', error.message);
        setUser(null);
      }
    };

    fetchUser();
  }, [supabase]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
