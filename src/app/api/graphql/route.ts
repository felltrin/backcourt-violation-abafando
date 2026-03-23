import { createYoga } from "graphql-yoga";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { readFileSync } from "fs";
import { join } from "path";
import { resolvers } from "~/server/graphql/resolvers";
import { createContext } from "~/server/graphql/context";
// import { NextResponse } from "next/server";

const typeDefs = readFileSync(
  join(process.cwd(), "src/server/graphql/schema.graphql"),
  "utf-8",
);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const { handleRequest } = createYoga({
  schema,
  context: createContext,
  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Response },
});

export { handleRequest as GET, handleRequest as POST };

// export async function GET() {
//   return NextResponse.json({
//     message: "GraphQL endpoint is working!",
//     timestamp: new Date().toISOString(),
//   });
// }

// export async function POST() {
//   return NextResponse.json({
//     message: "GraphQL POST endpoint is working!",
//   });
// }

// export const dynamic = "force-dynamic";
