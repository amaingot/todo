import * as React from 'react';

import { List, Paper } from '@material-ui/core';

import withTodoList, { WithTodoListProps } from '../enhancers/withTodoList';
import TodoCard from './TodoCard';

class TodoList extends React.Component<WithTodoListProps, {}> {
  public componentDidMount() {
    this.props.subscribeToUpdateTodo();
    this.props.subscribeToCreateTodo();
    this.props.subscribeToDeleteTodo();
  }

  public render() {
    const { listTodos } = this.props;
    if (!listTodos || !listTodos.items) {
      return <div />;
    }
    const { items } = listTodos;

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

export default withTodoList<{}>()(TodoList);
