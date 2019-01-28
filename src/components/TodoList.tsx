import { buildSubscription } from 'aws-appsync';
import * as React from 'react';
import { DataValue, graphql } from 'react-apollo';

import { List, Paper } from '@material-ui/core';

import { listTodos } from '../graphql/queries';
import { onCreateTodo, onDeleteTodo, onUpdateTodo } from '../graphql/subscriptions';
import { ListTodosQueryData, ListTodosQueryVariables } from '../graphql/types';
import TodoCard from './TodoCard';

export interface TodoListProps {
  data?: DataValue<ListTodosQueryData, ListTodosQueryVariables>;
}

class TodoList extends React.Component<TodoListProps, {}> {
  public componentDidMount() {
    const { data } = this.props;
    if (!data) {
      return;
    }
    data.subscribeToMore(buildSubscription(onUpdateTodo, listTodos));
    data.subscribeToMore(buildSubscription(onCreateTodo, listTodos));
    data.subscribeToMore(buildSubscription(onDeleteTodo, listTodos));
  }

  public render() {
    const { data } = this.props;
    if (!data || !data.listTodos || !data.listTodos.items) {
      return <div />;
    }
    const { items } = data.listTodos;

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
  options: {
    fetchPolicy: 'cache-and-network',
  },
  props: r => {
    return {
      data: r.data,
    };
  },
})(TodoList);
