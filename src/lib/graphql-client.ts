const GRAPHQL_ENDPOINT = "/api/graphql";

export async function graphqlRequest<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await response.json();

  if (json.errors) {
    throw new Error(json.errors[0]?.message ?? "GraphQL request failed");
  }

  return json.data as T;
}

// Example usage with typed queries
export const queries = {
  GET_USERS: `
    query GetUsers {
      users {
        id
        email
        name
        posts {
          id
          title
        }
      }
    }
  `,

  GET_USER: `
    query GetUser($id: ID!) {
      user(id: $id) {
        id
        email
        name
        posts {
          id
          title
          content
          published
        }
      }
    }
  `,

  GET_POSTS: `
    query GetPosts {
      posts {
        id
        title
        content
        published
        author {
          id
          name
          email
        }
      }
    }
  `,

  GET_PUBLISHED_POSTS: `
    query GetPublishedPosts {
      publishedPosts {
        id
        title
        content
        author {
          id
          name
          email
        }
      }
    }
  `,
};

export const mutations = {
  CREATE_USER: `
    mutation CreateUser($email: String!, $name: String) {
      createUser(email: $email, name: $name) {
        id
        email
        name
      }
    }
  `,

  CREATE_POST: `
    mutation CreatePost($title: String!, $content: String, $authorId: String!) {
      createPost(title: $title, content: $content, authorId: $authorId) {
        id
        title
        content
        published
      }
    }
  `,

  PUBLISH_POST: `
    mutation PublishPost($id: ID!) {
      publishPost(id: $id) {
        id
        title
        published
      }
    }
  `,
};
