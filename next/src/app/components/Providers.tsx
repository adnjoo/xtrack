'use client';

import { useState } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { queryClientConfig } from '@/app/lib/queryClient';

const Providers = ({ children }: any) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default Providers;
