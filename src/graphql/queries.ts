import gql from 'graphql-tag';

export const getTodoQuery = gql`
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      description
      done
    }
  }
`;
export const listTodosQuery = gql`
  query ListTodos($filter: ModelTodoFilterInput, $limit: Int, $nextToken: String) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        description
        done
      }
      nextToken
    }
  }
`;
