import * as React from 'react';
import { graphql } from 'react-apollo';

import { List, Paper } from '@material-ui/core';

import { listTodos } from '../graphql/queries';
import { ListTodosQueryData, ListTodosQueryVariables, Todo } from '../graphql/types';
import TodoCard from './TodoCard';

export interface TodoListProps {
  items: Array<Todo | null>;
  // deleteTodo: (index: number) => void;
  // toggleTodo: (index: number) => void;
}

class TodoList extends React.Component<TodoListProps, {}> {
  public render() {
    const { items } = this.props;

    return (
      <>
        {items.length > 0 && (
          <Paper style={{ margin: 16 }}>
            <List style={{ overflow: 'scroll' }}>
              {items.map(
                (todo, idx) =>
                  todo && <TodoCard key={todo.id} item={todo} divider={idx !== items.length - 1} />
              )}
            </List>
          </Paper>
        )}
      </>
    );
  }
}

export default graphql<{}, ListTodosQueryData, ListTodosQueryVariables, TodoListProps>(listTodos, {
  props: r => {
    if (r.data && r.data.listTodos && r.data.listTodos.items && r.data.listTodos.items !== null) {
      return {
        items: r.data.listTodos.items || [],
      };
    } else {
      return { items: [] };
    }
  },
})(TodoList);
