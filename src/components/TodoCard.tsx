import * as React from 'react';

import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';

import { Todo } from '../types';

export interface TodoCardProps {
  divider: boolean;
  item: Todo;
  onCheckBoxToggle: () => void;
  onDeleteClick: () => void;
}

export default class TodoCard extends React.Component<TodoCardProps> {
  constructor(props: TodoCardProps) {
    super(props);
  }

  public render() {
    const { item, divider, onCheckBoxToggle, onDeleteClick } = this.props;

    return (
      <ListItem divider={divider}>
        <Checkbox
          className="checkboxxxx"
          onClick={onCheckBoxToggle}
          checked={item.done}
          disableRipple
        />
        <ListItemText primary={item.description} />
        <ListItemSecondaryAction>
          <IconButton aria-label="Delete Todo" onClick={onDeleteClick}>
            <DeleteOutlined />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}
