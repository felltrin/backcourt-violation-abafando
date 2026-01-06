import { builder } from "../builder";
import { prisma } from "~/server/db";

// Define the User GraphQL type
builder.prismaObject("User", {
  description: "A user in the system",
  fields: (t) => ({
    id: t.exposeID("id"),
    email: t.exposeString("email"),
    name: t.exposeString("name", { nullable: true }),
    posts: t.relation("posts", {
      description: "All posts by this user",
    }),
  }),
});

// Add DateTime scalar
// builder.scalarType("DateTime", {
//   serialize: (value) => (value as Date).toISOString(),
//   parseValue: (value) => new Date(value as string),
// });

// Query fields for User
builder.queryFields((t) => ({
  users: t.prismaField({
    type: ["User"],
    description: "Get all users",
    resolve: async (query) => {
      return prisma.user.findMany({
        ...query,
        // orderBy: { createdAt: "desc" },
      });
    },
  }),

  user: t.prismaField({
    type: "User",
    nullable: true,
    description: "Get a user by ID",
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args) => {
      return prisma.user.findUnique({
        ...query,
        where: { id: args.id },
      });
    },
  }),

  userByEmail: t.prismaField({
    type: "User",
    nullable: true,
    description: "Get a user by email",
    args: {
      email: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args) => {
      return prisma.user.findUnique({
        ...query,
        where: { email: args.email },
      });
    },
  }),
}));

// Mutation fields for User
builder.mutationFields((t) => ({
  createUser: t.prismaField({
    type: "User",
    description: "Create a new user",
    args: {
      email: t.arg.string({ required: true }),
      name: t.arg.string(),
    },
    resolve: async (query, _parent, args) => {
      return prisma.user.create({
        ...query,
        data: {
          email: args.email,
          name: args.name,
        },
      });
    },
  }),

  updateUser: t.prismaField({
    type: "User",
    description: "Update an existing user",
    args: {
      id: t.arg.string({ required: true }),
      email: t.arg.string(),
      name: t.arg.string(),
    },
    resolve: async (query, _parent, args) => {
      return prisma.user.update({
        ...query,
        where: { id: args.id },
        data: {
          ...(args.email && { email: args.email }),
          ...(args.name !== undefined && { name: args.name }),
        },
      });
    },
  }),

  deleteUser: t.prismaField({
    type: "User",
    description: "Delete a user",
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args) => {
      // Delete user's posts first (due to relation)
      await prisma.post.deleteMany({
        where: { authorId: args.id },
      });

      return prisma.user.delete({
        ...query,
        where: { id: args.id },
      });
    },
  }),
}));
