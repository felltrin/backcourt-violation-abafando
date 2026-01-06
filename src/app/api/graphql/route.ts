import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { apolloServer } from "~/server/graphql/apollo-server";

const handler = startServerAndCreateNextHandler(apolloServer);

export async function GET(request: Request) {
  return handler(request);
}

export async function POST(request: Request) {
  return handler(request);
}
