import { buildSubscription, CacheUpdatesOptions } from 'aws-appsync';
import * as React from 'react';
import { compose, DataValue, graphql } from 'react-apollo';

import withTodoMutations, { WithTodosMutationsProps } from 'src/enhancers/withTodoMutations';
import { listTodosQuery } from 'src/graphql/queries';
import {
  onCreateTodoSubscription,
  onDeleteTodoSubscription,
  onUpdateTodoSubscription,
} from 'src/graphql/subscriptions';
import { ListTodosQueryData, ListTodosQueryVariables } from 'src/graphql/types';

export type WithTodosProps = WithTodoListProps & WithTodosMutationsProps;

interface WithTodoListProps {
  subscribeToUpdateTodo: () => () => void;
  subscribeToCreateTodo: () => () => void;
  subscribeToDeleteTodo: () => () => void;
  listTodosData: DataValue<ListTodosQueryData, ListTodosQueryVariables>;
}

const withTodos = <TProps extends {}>(
  mapPropsToQueryVariables?: (props: TProps) => ListTodosQueryVariables
) => (Component: React.ComponentType<TProps & WithTodosProps>) => {
  return class Parent extends React.Component<TProps, {}> {
    public render() {
      const mappedQueryVariables = mapPropsToQueryVariables
        ? mapPropsToQueryVariables(this.props)
        : {};

      const queryVariables: ListTodosQueryVariables = {
        // default query variables
        limit: 500,
        // mapped query variables (they will override the default)
        ...mappedQueryVariables,
      };

      const cacheUpdateOptions: CacheUpdatesOptions = {
        query: listTodosQuery,
        variables: queryVariables,
      };

      const NewComponent = compose(
        graphql<TProps, ListTodosQueryData, ListTodosQueryVariables, WithTodoListProps>(
          listTodosQuery,
          {
            options: {
              fetchPolicy: 'cache-and-network',
              variables: queryVariables,
            },
            props: r => {
              const { data } = r;
              if (!data) {
                throw new Error(
                  'This stucks, the data at WithTodos was not there when we needed it!'
                );
              }
              return {
                subscribeToUpdateTodo: () =>
                  data.subscribeToMore(
                    buildSubscription(onUpdateTodoSubscription, cacheUpdateOptions)
                  ),
                subscribeToCreateTodo: () =>
                  data.subscribeToMore(
                    buildSubscription(onCreateTodoSubscription, cacheUpdateOptions)
                  ),
                subscribeToDeleteTodo: () =>
                  data.subscribeToMore(
                    buildSubscription(onDeleteTodoSubscription, cacheUpdateOptions)
                  ),
                listTodosData: data,
              };
            },
          }
        ),
        withTodoMutations(cacheUpdateOptions)
      )(Component);

      return <NewComponent {...this.props} />;
    }
  };
};

export default withTodos;
