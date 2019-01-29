import { buildSubscription } from 'aws-appsync';
import { DataValue, graphql, QueryOpts } from 'react-apollo';

import { listTodos } from '../graphql/queries';
import { onCreateTodo, onDeleteTodo, onUpdateTodo } from '../graphql/subscriptions';
import { ListTodosQueryData, ListTodosQueryVariables } from '../graphql/types';

export interface WithTodoListProps
  extends Partial<DataValue<ListTodosQueryData, ListTodosQueryVariables>> {
  subscribeToUpdateTodo: () => void;
  subscribeToCreateTodo: () => void;
  subscribeToDeleteTodo: () => void;
}

const withTodoList = <TProps extends {}>(
  variables?: (props: TProps) => QueryOpts<ListTodosQueryVariables>
) =>
  graphql<TProps, ListTodosQueryData, ListTodosQueryVariables, WithTodoListProps>(listTodos, {
    options: props => {
      const generatedOptions = variables ? variables(props) : {};
      return {
        fetchPolicy: 'cache-and-network',
        ...generatedOptions,
      };
    },
    props: r => {
      const { data } = r;
      if (!data) {
        // We need to figure out something cool to do here.
        return {
          subscribeToUpdateTodo: () => {
            return;
          },
          subscribeToCreateTodo: () => {
            return;
          },
          subscribeToDeleteTodo: () => {
            return;
          },
        };
      }
      return {
        subscribeToUpdateTodo: () =>
          data.subscribeToMore(buildSubscription(onUpdateTodo, listTodos)),
        subscribeToCreateTodo: () =>
          data.subscribeToMore(buildSubscription(onCreateTodo, listTodos)),
        subscribeToDeleteTodo: () =>
          data.subscribeToMore(buildSubscription(onDeleteTodo, listTodos)),
        ...data,
      };
    },
  });

export default withTodoList;
