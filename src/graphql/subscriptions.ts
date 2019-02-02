import gql from 'graphql-tag';

export const onCreateTodoSubscription = gql`
  subscription OnCreateTodo {
    onCreateTodo {
      id
      description
      done
    }
  }
`;
export const onUpdateTodoSubscription = gql`
  subscription OnUpdateTodo {
    onUpdateTodo {
      id
      description
      done
    }
  }
`;
export const onDeleteTodoSubscription = gql`
  subscription OnDeleteTodo {
    onDeleteTodo {
      id
      description
      done
    }
  }
`;
