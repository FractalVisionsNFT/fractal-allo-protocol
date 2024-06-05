"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

export const queryClient = new QueryClient({});
const apollo_client = new ApolloClient({
  uri: "https://grants-stack-indexer-v2.gitcoin.co/graphql",
  cache: new InMemoryCache(),
});

type Props = {
  children: ReactNode;
};

export function AppProvider({ children }: Props) {
  return (
    <>
      <ApolloProvider client={apollo_client}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ApolloProvider>
    </>
  );
}
