import * as React from 'react';
// import { compose } from 'react-apollo';

import CreateTodo from 'src/components/CreateTodo';
import Layout from 'src/components/Layout';
import TodoList from 'src/components/TodoList';
import withTodos, { WithTodosProps } from 'src/enhancers/withTodos';
import { Todo } from 'src/graphql/types';

class App extends React.Component<WithTodosProps, {}> {
  constructor(props: WithTodosProps) {
    super(props);
    props.subscribeToCreateTodo();
    props.subscribeToDeleteTodo();
    props.subscribeToUpdateTodo();
  }

  public createTodo = (description: string) => {
    const { createTodo } = this.props;
    createTodo({ input: { description, done: false } });
  };

  public deleteTodo = (todo: Todo) => {
    const { deleteTodo } = this.props;
    deleteTodo({ input: { id: todo.id } });
  };

  public toggleDone = (todo: Todo) => {
    const { updateTodo } = this.props;
    updateTodo({ input: { id: todo.id, description: todo.description, done: !todo.done } });
  };

  public render() {
    const { listTodosData } = this.props;

    const todos: Todo[] = [];

    if (listTodosData && listTodosData.listTodos && listTodosData.listTodos.items) {
      listTodosData.listTodos.items.forEach(t => {
        if (t !== null) {
          todos.push(t);
        }
      });
    }

    return (
      <Layout>
        <CreateTodo performCreateTodo={this.createTodo} />
        <TodoList todos={todos} deleteTodo={this.deleteTodo} toggleDone={this.toggleDone} />
      </Layout>
    );
  }
}

export default withTodos()(App);
