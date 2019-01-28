import gql from 'graphql-tag';

export const onCreateTodo = gql`
  subscription OnCreateTodo {
    onCreateTodo {
      id
      description
      done
    }
  }
`;
export const onUpdateTodo = gql`
  subscription OnUpdateTodo {
    onUpdateTodo {
      id
      description
      done
    }
  }
`;
export const onDeleteTodo = gql`
  subscription OnDeleteTodo {
    onDeleteTodo {
      id
      description
      done
    }
  }
`;
