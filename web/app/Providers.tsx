'use client';

import { useState } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { queryClientConfig } from '@/lib/queryClient';
import { TooltipProvider } from '@/components/ui/tooltip';

const Providers = ({ children }: any) => {
  const [queryClient] = useState(() => new QueryClient(queryClientConfig));

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>{children}</TooltipProvider>
      <ReactQueryDevtools buttonPosition='bottom-left' />
    </QueryClientProvider>
  );
};

export default Providers;
