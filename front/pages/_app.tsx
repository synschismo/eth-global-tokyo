import { GlobalProvider } from "../contexts/Global";
import "../styles/globals.css";
import type { AppProps } from "next/app";
// import { ApolloClient, InMemoryCache, gql } from "@apollo/client/core";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import '../styles/globals.css'
import { WagmiConfig, createClient } from 'wagmi'
import { getDefaultProvider } from 'ethers'

function MyApp({ Component, pageProps }: AppProps) {
  const client = createClient({
    autoConnect: true,
    provider: getDefaultProvider(),
  })

  return (
    <WagmiConfig client={client}>
      <GlobalProvider>
        <Component {...pageProps} />
      </GlobalProvider>
    </WagmiConfig>
  )
}

export default MyApp;
