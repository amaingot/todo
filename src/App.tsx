import * as React from 'react';

import CreateTodo from './components/CreateTodo';
import Layout from './components/Layout';
import TodoList from './components/TodoList';
import { Todo } from './types';
import { uuidv4 } from './utils';

interface State {
  todos: Todo[];
  inputValue: string;
}

class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      todos: [],
      inputValue: '',
    };
  }

  public createTodo = () => {
    const id = uuidv4();

    this.setState((prevState: State) => {
      prevState.todos.push({
        id,
        description: prevState.inputValue,
        done: false,
      });

      return {
        todos: prevState.todos,
        inputValue: '',
      };
    });
  };

  public deleteTodo = (i: number) => {
    this.setState(prevState => {
      prevState.todos.splice(i, 1);
      return {
        todos: prevState.todos,
      };
    });
  };

  public toggleTodo = (i: number) => {
    this.setState(prevState => {
      prevState.todos[i].done = !prevState.todos[i].done;
      return {
        todos: prevState.todos,
      };
    });
  };

  public handleKeyInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.which === 13 || e.keyCode === 13) {
      this.createTodo();
    }
  };

  public handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      inputValue: e.currentTarget.value,
    });
  };

  public render() {
    return (
      <Layout>
        <CreateTodo
          inputValue={this.state.inputValue}
          onInputChange={this.handleInputChange}
          onCreate={this.createTodo}
          onInputKeyPress={this.handleKeyInput}
        />
        <TodoList
          items={this.state.todos}
          deleteTodo={this.deleteTodo}
          toggleTodo={this.toggleTodo}
        />
      </Layout>
    );
  }
}

export default App;
