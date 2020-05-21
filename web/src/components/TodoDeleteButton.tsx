import * as React from 'react';

import { IconButton } from '@material-ui/core';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';

export interface Props {
  deleteTodo: () => void;
}

class TodoDeleteButton extends React.Component<Props> {
  public deleteTodo = () => {
    const { deleteTodo } = this.props;
    deleteTodo();
  };

  public render() {
    return (
      <IconButton aria-label="Delete Todo" onClick={this.deleteTodo}>
        <DeleteOutlined />
      </IconButton>
    );
  }
}

export default TodoDeleteButton;
