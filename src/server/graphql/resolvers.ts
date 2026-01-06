import { type Context } from "./context";

export const resolvers = {
  Query: {
    users: async (_parent: unknown, _args: unknown, ctx: Context) => {
      return ctx.prisma.user.findMany({
        include: { posts: true },
      });
    },

    user: async (_parent: unknown, args: { id: string }, ctx: Context) => {
      return ctx.prisma.user.findUnique({
        where: { id: args.id },
        include: { posts: true },
      });
    },

    posts: async (_parent: unknown, _args: unknown, ctx: Context) => {
      return ctx.prisma.post.findMany({
        include: { author: true },
      });
    },

    post: async (_parent: unknown, args: { id: string }, ctx: Context) => {
      return ctx.prisma.post.findUnique({
        where: { id: args.id },
        include: { author: true },
      });
    },

    publishedPosts: async (_parent: unknown, _args: unknown, ctx: Context) => {
      return ctx.prisma.post.findMany({
        where: { published: true },
        include: { author: true },
      });
    },
  },

  Mutation: {
    createUser: async (
      _parent: unknown,
      args: { email: string; name?: string },
      ctx: Context,
    ) => {
      return ctx.prisma.user.create({
        data: {
          email: args.email,
          name: args.name,
        },
        include: { posts: true },
      });
    },

    updateUser: async (
      _parent: unknown,
      args: { id: string; email?: string; name?: string },
      ctx: Context,
    ) => {
      return ctx.prisma.user.update({
        where: { id: args.id },
        data: {
          ...(args.email && { email: args.email }),
          ...(args.name && { name: args.name }),
        },
        include: { posts: true },
      });
    },

    deleteUser: async (
      _parent: unknown,
      args: { id: string },
      ctx: Context,
    ) => {
      return ctx.prisma.user.delete({
        where: { id: args.id },
        include: { posts: true },
      });
    },

    createPost: async (
      _parent: unknown,
      args: { title: string; content?: string; authorId: string },
      ctx: Context,
    ) => {
      return ctx.prisma.post.create({
        data: {
          title: args.title,
          content: args.content,
          authorId: args.authorId,
        },
        include: { author: true },
      });
    },

    updatePost: async (
      _parent: unknown,
      args: {
        id: string;
        title?: string;
        content?: string;
        published?: boolean;
      },
      ctx: Context,
    ) => {
      return ctx.prisma.post.update({
        where: { id: args.id },
        data: {
          ...(args.title && { title: args.title }),
          ...(args.content !== undefined && { content: args.content }),
          ...(args.published !== undefined && { published: args.published }),
        },
        include: { author: true },
      });
    },

    deletePost: async (
      _parent: unknown,
      args: { id: string },
      ctx: Context,
    ) => {
      return ctx.prisma.post.delete({
        where: { id: args.id },
        include: { author: true },
      });
    },

    publishPost: async (
      _parent: unknown,
      args: { id: string },
      ctx: Context,
    ) => {
      return ctx.prisma.post.update({
        where: { id: args.id },
        data: { published: true },
        include: { author: true },
      });
    },
  },

  User: {
    posts: async (parent: { id: string }, _args: unknown, ctx: Context) => {
      return ctx.prisma.post.findMany({
        where: { authorId: parent.id },
      });
    },
  },

  Post: {
    author: async (
      parent: { authorId: string },
      _args: unknown,
      ctx: Context,
    ) => {
      return ctx.prisma.user.findUnique({
        where: { id: parent.authorId },
      });
    },
  },
};
