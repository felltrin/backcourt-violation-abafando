import { builder } from "../builder";
import { prisma } from "~/server/db";

// Define the Post GraphQL type
builder.prismaObject("Post", {
  description: "A blog post",
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),
    content: t.exposeString("content", { nullable: true }),
    published: t.exposeBoolean("published"),
    author: t.relation("author", {
      description: "The author of this post",
    }),
    authorId: t.exposeString("authorId"),
  }),
});

// Query fields for Post
builder.queryFields((t) => ({
  posts: t.prismaField({
    type: ["Post"],
    description: "Get all posts",
    args: {
      published: t.arg.boolean(),
    },
    resolve: async (query, _parent, args) => {
      return prisma.post.findMany({
        ...query,
        where:
          args.published !== undefined
            ? { published: args.published }
            : undefined,
        // orderBy: { createdAt: "desc" },
      });
    },
  }),

  post: t.prismaField({
    type: "Post",
    nullable: true,
    description: "Get a post by ID",
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args) => {
      return prisma.post.findUnique({
        ...query,
        where: { id: args.id },
      });
    },
  }),

  postsByAuthor: t.prismaField({
    type: ["Post"],
    description: "Get all posts by a specific author",
    args: {
      authorId: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args) => {
      return prisma.post.findMany({
        ...query,
        where: { authorId: args.authorId },
      });
    },
  }),
}));

// Mutation fields for Post
builder.mutationFields((t) => ({
  createPost: t.prismaField({
    type: "Post",
    description: "Create a new post",
    args: {
      title: t.arg.string({ required: true }),
      content: t.arg.string(),
      authorId: t.arg.string({ required: true }),
      published: t.arg.boolean({ defaultValue: false }),
    },
    resolve: async (query, _parent, args) => {
      return prisma.post.create({
        ...query,
        data: {
          title: args.title,
          content: args.content,
          authorId: args.authorId,
          published: args.published,
        },
      });
    },
  }),

  updatePost: t.prismaField({
    type: "Post",
    description: "Update an existing post",
    args: {
      id: t.arg.string({ required: true }),
      title: t.arg.string(),
      content: t.arg.string(),
      published: t.arg.boolean(),
    },
    resolve: async (query, _parent, args) => {
      return prisma.post.update({
        ...query,
        where: { id: args.id },
        data: {
          ...(args.title && { title: args.title }),
          ...(args.content !== undefined && { content: args.content }),
          ...(args.published !== undefined && { published: args.published }),
        },
      });
    },
  }),

  publishPost: t.prismaField({
    type: "Post",
    description: "Publish a post",
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args) => {
      return prisma.post.update({
        ...query,
        where: { id: args.id },
        data: { published: true },
      });
    },
  }),

  unpublishPost: t.prismaField({
    type: "Post",
    description: "Unpublish a post",
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args) => {
      return prisma.post.update({
        ...query,
        where: { id: args.id },
        data: { published: false },
      });
    },
  }),

  deletePost: t.prismaField({
    type: "Post",
    description: "Delete a post",
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args) => {
      return prisma.post.delete({
        ...query,
        where: { id: args.id },
      });
    },
  }),
}));
