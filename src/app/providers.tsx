"use client";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "@/Providers/auth";
import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apollo";

// The chakra provider, apollo provider and the Auth (username, job title) provider
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider>
      <ApolloProvider client={client}>
        <AuthProvider>{children}</AuthProvider>
      </ApolloProvider>
    </ChakraProvider>
  );
}
