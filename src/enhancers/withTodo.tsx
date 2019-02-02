import { buildSubscription, CacheUpdatesOptions } from 'aws-appsync';
import * as React from 'react';
import { compose, DataValue, graphql } from 'react-apollo';

import withTodoMutations, { WithTodosMutationsProps } from 'src/enhancers/withTodoMutations';
import { getTodoQuery } from 'src/graphql/queries';
import {
  onCreateTodoSubscription,
  onDeleteTodoSubscription,
  onUpdateTodoSubscription,
} from 'src/graphql/subscriptions';
import { GetTodoQueryData, GetTodoQueryVariables } from 'src/graphql/types';

export type WithTodoProps = WithSingleTodoProps & WithTodosMutationsProps;

interface WithSingleTodoProps {
  subscribeToUpdateTodo: () => void;
  subscribeToCreateTodo: () => void;
  subscribeToDeleteTodo: () => void;
  todoData?: DataValue<GetTodoQueryData, GetTodoQueryVariables>;
}

interface WithTodoIdProp {
  id: string;
}

const withTodo = <TProps extends WithTodoIdProp>(
  mapPropsToQueryVariables?: (props: TProps) => GetTodoQueryVariables
) => (Component: React.ComponentType<TProps & WithTodoProps>) => {
  return class Parent extends React.Component<TProps, {}> {
    public render() {
      const mappedQueryVariables = mapPropsToQueryVariables
        ? mapPropsToQueryVariables(this.props)
        : {};

      const queryVariables: GetTodoQueryVariables = {
        // default query variables
        id: this.props.id,
        // mapped query variables (they will override the default)
        ...mappedQueryVariables,
      };

      const cacheUpdateOptions: CacheUpdatesOptions = {
        query: getTodoQuery,
        variables: queryVariables,
      };

      const NewComponent = compose(
        graphql<TProps, GetTodoQueryData, GetTodoQueryVariables, WithSingleTodoProps>(
          getTodoQuery,
          {
            options: {
              fetchPolicy: 'cache-and-network',
              variables: queryVariables,
            },
            props: r => {
              const { data } = r;
              return {
                subscribeToUpdateTodo: () =>
                  data &&
                  data.subscribeToMore(
                    buildSubscription(onUpdateTodoSubscription, cacheUpdateOptions)
                  ),
                subscribeToCreateTodo: () =>
                  data &&
                  data.subscribeToMore(
                    buildSubscription(onCreateTodoSubscription, cacheUpdateOptions)
                  ),
                subscribeToDeleteTodo: () =>
                  data &&
                  data.subscribeToMore(
                    buildSubscription(onDeleteTodoSubscription, cacheUpdateOptions)
                  ),
                todoData: data,
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

export default withTodo;
