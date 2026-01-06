import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";

let serverInstance: ApolloServer | null = null;

export async function getApolloServer() {
  if (!serverInstance) {
    serverInstance = new ApolloServer({
      typeDefs,
      resolvers,
      introspection: process.env.NODE_ENV !== "production",
    });
    await serverInstance.start();
  }
  return serverInstance;
}
