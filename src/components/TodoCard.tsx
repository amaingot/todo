import * as React from 'react';

import { ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';

import { Todo } from '../graphql/types';
import TodoCheckbox from './TodoCheckbox';
import TodoDeleteButton from './TodoDeleteButton';

export interface Props {
  divider: boolean;
  item: Todo;
  deleteTodo: () => void;
  toggleDone: () => void;
}

class TodoCard extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    const { item, divider, deleteTodo, toggleDone } = this.props;

    return (
      <ListItem divider={divider}>
        <TodoCheckbox checked={item.done} toggleCheck={toggleDone} />
        <ListItemText primary={item.description} />
        <ListItemSecondaryAction>
          <TodoDeleteButton deleteTodo={deleteTodo} />
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

export default TodoCard;
