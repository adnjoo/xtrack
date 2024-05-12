import { User } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/server';

export const useAuthServer = async function (): Promise<User | null> {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return user || null;
};
