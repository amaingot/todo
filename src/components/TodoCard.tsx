import * as React from 'react';

import { ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';

import { Todo } from '../graphql/types';
import TodoCheckbox from './TodoCheckbox';
import TodoDeleteButton from './TodoDeleteButton';

export interface Props {
  divider: boolean;
  item: Todo;
}

class TodoCard extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    const { item, divider } = this.props;

    return (
      <ListItem divider={divider}>
        <TodoCheckbox item={item} />
        <ListItemText primary={item.description} />
        <ListItemSecondaryAction>
          <TodoDeleteButton todoId={item.id} />
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

export default TodoCard;
