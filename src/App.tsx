import * as React from 'react';
// import { compose } from 'react-apollo';

import CreateTodo from 'src/components/CreateTodo';
import Layout from 'src/components/Layout';
import TodoList from 'src/components/TodoList';
import withTodos, { WithTodosProps } from 'src/enhancers/withTodos';
// import withCreateTodo, { WithCreateTodoProps } from 'src/enhancers/withCreateTodo';
// import withDeleteTodo, { WithDeleteTodoProps } from 'src/enhancers/withDeleteTodo';
// import withTodoList, { WithTodoListProps } from 'src/enhancers/withTodoList';
// import withUpdateTodo, { WithUpdateTodoProps } from 'src/enhancers/withUpdateTodo';
import { Todo } from 'src/graphql/types';

// type Props = WithTodoListProps & WithCreateTodoProps & WithDeleteTodoProps & WithUpdateTodoProps;

class App extends React.Component<WithTodosProps, {}> {
  constructor(props: WithTodosProps) {
    super(props);
  }

  public createTodo = (description: string): boolean => {
    const { performCreateTodo } = this.props;
    try {
      performCreateTodo({ description, done: false });
      return true;
    } catch (e) {
      return false;
    }
  };

  public deleteTodo = (id: string) => {
    const { performDeleteTodo, listTodosData } = this.props;
    const todo: Todo = {
      __typename: 'Todo',
      id,
      description: '',
      done: false,
    };

    if (listTodosData && listTodosData.listTodos && listTodosData.listTodos.items) {
      const index = 
    }

    performDeleteTodo(todo);
  };

  public toggleDone = (id: string, done: boolean) => {
    const { performUpdateTodo } = this.props;
    performUpdateTodo({ id, done });
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
        <TodoList todos={todos} deleteTodo={this.deleteTodo} toggleDone={this.deleteTodo} />
      </Layout>
    );
  }
}

// export default compose(
//   withTodoList(),
//   withCreateTodo(),
//   withUpdateTodo(),
//   withDeleteTodo()
// )(App);
export default withTodos()(App);
