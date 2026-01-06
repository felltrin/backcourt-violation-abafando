import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { getApolloServer } from "~/server/graphql/apollo-server";
import { NextRequest } from "next/server";

async function handler(req: NextRequest) {
  const server = await getApolloServer();
  const handleRequest = startServerAndCreateNextHandler(server);
  return handleRequest(req);
}

export { handler as GET, handler as POST };
