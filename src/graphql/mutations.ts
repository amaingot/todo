import gql from 'graphql-tag';

export const createTodoMutation = gql`
  mutation CreateTodo($input: CreateTodoInput!) {
    createTodo(input: $input) {
      id
      description
      done
    }
  }
`;
export const updateTodoMutation = gql`
  mutation UpdateTodo($input: UpdateTodoInput!) {
    updateTodo(input: $input) {
      id
      description
      done
    }
  }
`;
export const deleteTodoMutation = gql`
  mutation DeleteTodo($input: DeleteTodoInput!) {
    deleteTodo(input: $input) {
      id
      description
      done
    }
  }
`;
