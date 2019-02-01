import { buildSubscription } from 'aws-appsync';
import { DataValue, graphql } from 'react-apollo';

import { ListTodosQuery } from 'src/graphql/queries';
import { onCreateTodo, onDeleteTodo, onUpdateTodo } from 'src/graphql/subscriptions';
import { ListTodosQueryData, ListTodosQueryVariables } from 'src/graphql/types';

export interface WithTodoListProps {
  subscribeToUpdateTodo: () => void;
  subscribeToCreateTodo: () => void;
  subscribeToDeleteTodo: () => void;
  listTodosData?: DataValue<ListTodosQueryData, ListTodosQueryVariables>;
}

const withTodoList = <TProps extends {}>(listQueryVariables?: ListTodosQueryVariables) =>
  graphql<TProps, ListTodosQueryData, ListTodosQueryVariables, WithTodoListProps>(ListTodosQuery, {
    options: {
      fetchPolicy: 'cache-and-network',
      variables: listQueryVariables,
    },
    props: r => {
      const { data } = r;
      return {
        subscribeToUpdateTodo: () =>
          data && data.subscribeToMore(buildSubscription(onUpdateTodo, ListTodosQuery)),
        subscribeToCreateTodo: () =>
          data && data.subscribeToMore(buildSubscription(onCreateTodo, ListTodosQuery)),
        subscribeToDeleteTodo: () =>
          data && data.subscribeToMore(buildSubscription(onDeleteTodo, ListTodosQuery)),
        listTodosData: data,
      };
    },
  });

export default withTodoList;
