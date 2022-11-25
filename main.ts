import { ApolloServer } from "npm:@apollo/server@^4.1";
import { startStandaloneServer } from "npm:@apollo/server@^4.1/standalone";
import { graphql } from "npm:graphql@^16.6";

import { resolvers } from "./graphql/resolvers.ts";
import { typeDefs } from "./graphql/types.ts";

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const{ url } = await startStandaloneServer(server, {
    listen: { port: 8000},
});

console.log(`Server runnng on: ${url}`)