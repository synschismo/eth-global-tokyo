import { GlobalProvider } from "../contexts/Global";
import "../styles/globals.css";
import type { AppProps } from "next/app";
// import { ApolloClient, InMemoryCache, gql } from "@apollo/client/core";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider>
      <Component {...pageProps} />
    </GlobalProvider>
  );
}

export default MyApp;
