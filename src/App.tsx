import * as React from 'react';

import CreateTodo from './components/CreateTodo';
import Layout from './components/Layout';
import TodoList from './components/TodoList';

const App: React.SFC = () => (
  <Layout>
    <CreateTodo />
    <TodoList />
  </Layout>
);

export default App;
