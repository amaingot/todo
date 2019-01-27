import * as React from 'react';

import { List, Paper } from '@material-ui/core';

import { Todo } from '../types';
import TodoCard from './TodoCard';

export interface TodoListProps {
  items: Todo[];
  deleteTodo: (index: number) => void;
  toggleTodo: (index: number) => void;
}

const TodoList: React.SFC<TodoListProps> = props => {
  return (
    <>
      {props.items.length > 0 && (
        <Paper style={{ margin: 16 }}>
          <List style={{ overflow: 'scroll' }}>
            {props.items.map((todo, idx) => (
              <TodoCard
                item={todo}
                key={`TodoItem.${idx}`}
                divider={idx !== props.items.length - 1}
                onDeleteClick={() => props.deleteTodo(idx)}
                onCheckBoxToggle={() => props.toggleTodo(idx)}
              />
            ))}
          </List>
        </Paper>
      )}
    </>
  );
};

export default TodoList;
