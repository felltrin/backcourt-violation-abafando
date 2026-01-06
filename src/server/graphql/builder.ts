import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import type PrismaTypes from "@pothos/plugin-prisma/generated";
import { prisma } from "../../lib/prisma";

export const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
  Context: {
    prisma: typeof prisma;
  };
}>({
  plugins: [PrismaPlugin],
  prisma: {
    client: prisma,
    // defaults to false, uses /// comments from prisma schema as descriptions
    // for object types, relations and exposed fields.
    exposeDescriptions: true,
    // use where clause from prismaRelatedConnection for totalCount (will true by default in next major version)
    filterConnectionTotalCount: true,
  },
});

// Define base Query and Mutation types
builder.queryType({
  description: "Root Query type",
});

builder.mutationType({
  description: "Root Mutation type",
});
