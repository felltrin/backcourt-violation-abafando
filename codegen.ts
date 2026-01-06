import { type CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "./src/server/graphql/schema.graphql",
  generates: {
    "src/server/graphql/types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: "./context#Context",
        mappers: {
          User: "@prisma/client#User",
          Post: "@prisma/client#Post",
        },
      },
    },
  },
};

export default config;
