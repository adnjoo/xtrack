'use client';

import { useState } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { queryClientConfig } from '@/lib/queryClient';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SidebarContextProvider } from '@/components/context/sidebar-provider';
import { AuthProvider } from '@/utils/supabase/auth';

const Providers = ({ children }: any) => {
  const [queryClient] = useState(() => new QueryClient(queryClientConfig));

  return (
    <QueryClientProvider client={queryClient}>
      <SidebarContextProvider>
        <AuthProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </AuthProvider>
        {/* <ReactQueryDevtools buttonPosition='bottom-right' /> */}
      </SidebarContextProvider>
    </QueryClientProvider>
  );
};

export default Providers;
