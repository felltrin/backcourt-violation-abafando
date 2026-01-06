import { createYoga } from "graphql-yoga";
import { schema } from "~/server/graphql/schema";
import { prisma } from "~/server/db";

const { handleRequest } = createYoga({
  schema,
  graphqlEndpoint: "/api/graphql",

  // Enable GraphiQL in development
  graphiql: {
    title: "TrackFit GraphQL API",
  },

  // Context passed to all resolvers
  context: async () => ({
    prisma,
  }),

  // Fetch API configuration
  fetchAPI: { Response },
});

export {
  handleRequest as GET,
  handleRequest as POST,
  handleRequest as OPTIONS,
};
