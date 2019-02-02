import * as React from 'react';

import { List, Paper } from '@material-ui/core';

import { Todo } from '../graphql/types';
import TodoCard from './TodoCard';

interface Props {
  todos: Todo[];
  toggleDone: (todo: Todo) => void;
  deleteTodo: (todo: Todo) => void;
}

class TodoList extends React.Component<Props, {}> {
  public toggleDone = (todo: Todo) => () => {
    const { toggleDone } = this.props;
    toggleDone(todo);
  };

  public deleteTodo = (todo: Todo) => () => {
    const { deleteTodo } = this.props;
    deleteTodo(todo);
  };

  public render() {
    const { todos } = this.props;

    return (
      <Paper style={{ margin: 16 }}>
        <List style={{ overflow: 'scroll' }}>
          {todos.map((todo, i) => (
            <TodoCard
              toggleDone={this.toggleDone(todo)}
              deleteTodo={this.deleteTodo(todo)}
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
