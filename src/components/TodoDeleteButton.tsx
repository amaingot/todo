import * as React from 'react';
import { graphql } from 'react-apollo';

import { IconButton } from '@material-ui/core';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';

import { deleteTodo } from '../graphql/mutations';
import { DeleteTodoMutationData, DeleteTodoMutationVariables } from '../graphql/types';

export interface ReactProps {
  todoId: string;
}

interface ApolloProps {
  performDelete?: () => void;
}

class TodoDeleteButton extends React.Component<ReactProps & ApolloProps, any> {
  public render() {
    const { performDelete } = this.props;
    return (
      <IconButton aria-label="Delete Todo" onClick={performDelete}>
        <DeleteOutlined />
      </IconButton>
    );
  }
}

export default graphql<
  ReactProps,
  DeleteTodoMutationData,
  DeleteTodoMutationVariables,
  ApolloProps
>(deleteTodo, {
  options: props => ({
    variables: {
      input: {
        id: props.todoId,
      },
    },
  }),
  props: r => ({ performDelete: r.mutate }),
})(TodoDeleteButton);
