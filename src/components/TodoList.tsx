import * as React from 'react';

import { List, Paper } from '@material-ui/core';

import { Todo } from '../graphql/types';
import TodoCard from './TodoCard';

interface Props {
  todos: Todo[];
  toggleDone: (id: string, done: boolean) => void;
  deleteTodo: (id: string) => void;
}

class TodoList extends React.Component<Props, {}> {
  public toggleDone = (id: string, done: boolean) => () => {
    const { toggleDone } = this.props;
    toggleDone(id, done);
  };

  public deleteTodo = (id: string) => () => {
    const { deleteTodo } = this.props;
    deleteTodo(id);
  };

  public render() {
    const { todos } = this.props;

    return (
      <Paper style={{ margin: 16 }}>
        <List style={{ overflow: 'scroll' }}>
          {todos.map((todo, i) => (
            <TodoCard
              toggleDone={this.toggleDone(todo.id, !todo.done)}
              deleteTodo={this.deleteTodo(todo.id)}
              key={todo.id}
              item={todo}
              divider={i !== todos.length - 1}
            />
          ))}
        </List>
      </Paper>
    );
  }
}

export default TodoList;
