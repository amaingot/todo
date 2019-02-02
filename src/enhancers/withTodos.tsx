import { buildSubscription, CacheUpdatesOptions } from 'aws-appsync';
import { compose, DataValue, graphql } from 'react-apollo';

import withTodoMutations, { WithTodosMutationsProps } from 'src/enhancers/withTodoMutations';
import { ListTodosQuery } from 'src/graphql/queries';
import { onCreateTodo, onDeleteTodo, onUpdateTodo } from 'src/graphql/subscriptions';
import { ListTodosQueryData, ListTodosQueryVariables } from 'src/graphql/types';

export type WithTodosProps = WithTodoListProps & WithTodosMutationsProps;

interface WithTodoListProps {
  subscribeToUpdateTodo: () => void;
  subscribeToCreateTodo: () => void;
  subscribeToDeleteTodo: () => void;
  listTodosData?: DataValue<ListTodosQueryData, ListTodosQueryVariables>;
}

const withTodos = <TProps extends {}>(queryVariables?: ListTodosQueryVariables) => {
  if (!queryVariables) {
    queryVariables = {
      limit: 500,
    };
  }
  const cacheUpdateOptions: CacheUpdatesOptions = {
    query: ListTodosQuery,
    variables: queryVariables,
  };

  return compose(
    graphql<TProps, ListTodosQueryData, ListTodosQueryVariables, WithTodoListProps>(
      ListTodosQuery,
      {
        options: {
          fetchPolicy: 'cache-and-network',
          variables: queryVariables,
        },
        props: r => {
          const { data } = r;
          return {
            subscribeToUpdateTodo: () =>
              data && data.subscribeToMore(buildSubscription(onUpdateTodo, cacheUpdateOptions)),
            subscribeToCreateTodo: () =>
              data && data.subscribeToMore(buildSubscription(onCreateTodo, cacheUpdateOptions)),
            subscribeToDeleteTodo: () =>
              data && data.subscribeToMore(buildSubscription(onDeleteTodo, cacheUpdateOptions)),
            listTodosData: data,
          };
        },
      }
    ),
    withTodoMutations(cacheUpdateOptions)
  ) as (
    WrappedComponent: React.ComponentType<WithTodosProps & TProps>
  ) => React.ComponentClass<TProps, any>;
};

export default withTodos;
