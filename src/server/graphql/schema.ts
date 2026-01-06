import { gql } from "graphql-tag";

export const typeDefs = gql`
  type User {
    id: String!
    email: String!
    name: String
    posts: [Post!]!
  }

  type Post {
    id: String!
    title: String!
    content: String
    published: Boolean!
    author: User!
    authorId: String!
  }

  type Query {
    users: [User!]!
    user(id: String!): User
    posts(published: Boolean): [Post!]!
    post(id: String!): Post
    userPosts(userId: String!): [Post!]!
  }

  type Mutation {
    createUser(email: String!, name: String): User!
    updateUser(id: String!, email: String, name: String): User!
    deleteUser(id: String!): User!

    createPost(
      title: String!
      content: String
      authorId: String!
      published: Boolean
    ): Post!
    updatePost(
      id: String!
      title: String
      content: String
      published: Boolean
    ): Post!
    deletePost(id: String!): Post!
    publishPost(id: String!): Post!
  }
`;
