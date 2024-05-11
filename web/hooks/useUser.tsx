'use client';

import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/client';

/**
 * Hook to fetch user data from Supabase authentication.
 * @returns {User | null} The user object if authenticated, or null if no user is authenticated.
 */
export const useUser = (): User | null => {
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
  }, []);

  return user;
};
