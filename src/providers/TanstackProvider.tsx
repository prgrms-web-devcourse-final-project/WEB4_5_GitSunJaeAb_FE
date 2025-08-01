'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export default function TanstackProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [client] = useState(() => new QueryClient());
  return (
    <>
      <QueryClientProvider client={client}>
        {children}
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}
