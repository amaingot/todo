import * as React from 'react';

import { Checkbox } from '@material-ui/core';

import withUpdateTodo, { WithUpdateTodoProps } from '../enhancers/withUpdateTodo';
import { Todo } from '../graphql/types';

interface Props {
  item: Todo;
}

class TodoCheckbox extends React.Component<Props & WithUpdateTodoProps> {
  public toggleDone = () => {
    const { performUpdateTodo, item } = this.props;

    performUpdateTodo({
      ...item,
      done: !item.done,
    });
  };
  public render() {
    const { item } = this.props;
    return (
      <Checkbox
        className="checkboxxxx"
        onClick={this.toggleDone}
        checked={item.done}
        disableRipple
      />
    );
  }
}

export default withUpdateTodo<Props>()(TodoCheckbox);
