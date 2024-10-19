'use client';

import { useQuery } from '@tanstack/react-query';

import { getSupabaseClient } from '@/utils/supabase/client';

export const useAuthUser = () => {
  const supabase = getSupabaseClient();

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      return user;
    },
  });

  return {
    user: data,
    error,
    isLoading,
    refetch,
  };
};
