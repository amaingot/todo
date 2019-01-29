import * as React from 'react';

import { IconButton } from '@material-ui/core';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';

import withDeleteTodo, { WithDeleteTodoProps } from '../enhancers/withDeleteTodo';

export interface Props {
  todoId: string;
}

class TodoDeleteButton extends React.Component<Props & WithDeleteTodoProps, any> {
  public render() {
    const { performDeleteTodo } = this.props;
    return (
      <IconButton aria-label="Delete Todo" onClick={performDeleteTodo}>
        <DeleteOutlined />
      </IconButton>
    );
  }
}

export default withDeleteTodo<Props>()(TodoDeleteButton);
