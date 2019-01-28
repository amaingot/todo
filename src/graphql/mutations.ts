import gql from 'graphql-tag';

export const createTodo = gql`
  mutation CreateTodo($input: CreateTodoInput!) {
    createTodo(input: $input) {
      id
      description
      done
    }
  }
`;
export const updateTodo = gql`
  mutation UpdateTodo($input: UpdateTodoInput!) {
    updateTodo(input: $input) {
      id
      description
      done
    }
  }
`;
export const deleteTodo = gql`
  mutation DeleteTodo($input: DeleteTodoInput!) {
    deleteTodo(input: $input) {
      id
      description
      done
    }
  }
`;
