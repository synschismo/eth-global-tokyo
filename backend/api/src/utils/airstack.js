import { ApolloClient, InMemoryCache } from "@apollo/client";

const AIRSTACK_API_KEY = process.env.AIRSTACK_API_KEY

const client = new ApolloClient({
    uri: "https://api.airstack.xyz/gql",
    cache: new InMemoryCache(),
    // headers: { Authorization: AIRSTACK_API_KEY },
    headers: { Authorization: AIRSTACK_API_KEY },
});

export default client;