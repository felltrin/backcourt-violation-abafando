import { prisma } from "../../lib/prisma";
import type { Resolvers } from "./generated/graphql";

export const resolvers: Resolvers = {
  Query: {
    users: async () => {
      return (await prisma.user.findMany({
        include: { posts: true },
      })) as any;
    },
    user: async (_, { id }) => {
      return (await prisma.user.findUnique({
        where: { id },
        include: { posts: true },
      })) as any;
    },
    posts: async (_, { published }) => {
      return (await prisma.post.findMany({
        where: (published !== undefined ? { published } : undefined) as any,
        include: { author: true },
      })) as any;
    },
    post: async (_, { id }) => {
      return (await prisma.post.findUnique({
        where: { id },
        include: { author: true },
      })) as any;
    },
    userPosts: async (_, { userId }) => {
      return (await prisma.post.findMany({
        where: { authorId: userId },
        include: { author: true },
      })) as any;
    },
  },
  Mutation: {
    createUser: async (_, { email, name }) => {
      return (await prisma.user.create({
        data: { email, name },
        include: { posts: true },
      })) as any;
    },
    updateUser: async (_, { id, email, name }) => {
      return (await prisma.user.update({
        where: { id },
        data: {
          ...(email && { email }),
          ...(name && { name }),
        },
        include: { posts: true },
      })) as any;
    },
    deleteUser: async (_, { id }) => {
      // Delete all posts first due to relation
      await prisma.post.deleteMany({
        where: { authorId: id },
      });

      return (await prisma.user.delete({
        where: { id },
        include: { posts: true },
      })) as any;
    },
    createPost: async (_, { title, content, authorId, published }) => {
      return (await prisma.post.create({
        data: {
          title,
          content,
          published: published ?? false,
          authorId,
        },
        include: { author: true },
      })) as any;
    },
    updatePost: async (_, { id, title, content, published }) => {
      return (await prisma.post.update({
        where: { id },
        data: {
          ...(title && { title }),
          ...(content !== undefined && { content }),
          ...(published !== undefined && { published }),
        } as any,
        include: { author: true },
      })) as any;
    },
    deletePost: async (_, { id }) => {
      return (await prisma.post.delete({
        where: { id },
        include: { author: true },
      })) as any;
    },
    publishPost: async (_, { id }) => {
      return (await prisma.post.update({
        where: { id },
        data: { published: true },
        include: { author: true },
      })) as any;
    },
  },
  User: {
    posts: async (parent) => {
      return (await prisma.post.findMany({
        where: { authorId: parent.id },
      })) as any;
    },
  },
  Post: {
    author: async (parent) => {
      return (await prisma.user.findUnique({
        where: { id: parent.authorId },
      })) as any;
    },
  },
};
