import { DataValue, graphql } from 'react-apollo';

import { updateTodo } from 'src/graphql/mutations';
import { ListTodosQuery } from 'src/graphql/queries';
import {
  ListTodosQueryData,
  ListTodosQueryVariables,
  UpdateTodoInput,
  UpdateTodoMutationData,
  UpdateTodoMutationVariables,
} from 'src/graphql/types';

export interface WithUpdateTodoProps {
  performUpdateTodo: (input: UpdateTodoInput) => void;
  updateTodoData?: DataValue<UpdateTodoMutationData, UpdateTodoMutationVariables>;
}

const withUpdateTodo = <TProps extends {}>(listQueryVariables?: ListTodosQueryVariables) =>
  graphql<TProps, UpdateTodoMutationData, UpdateTodoMutationVariables, WithUpdateTodoProps>(
    updateTodo,
    {
      options: {
        update: (proxy, options) => {
          try {
            const readQuery = proxy.readQuery<ListTodosQueryData, ListTodosQueryVariables>({
              query: ListTodosQuery,
              variables: listQueryVariables,
            });
            if (readQuery !== null && readQuery.listTodos && readQuery.listTodos.items) {
              if (options.data && options.data.createTodo) {
                // readQuery.listTodos.items.push(options.data.createTodo);
                // proxy.writeQuery({ query: ListTodosQuery, data: options.data });
              }
            }
          } catch (e) {
            // something here
            console.warn('Could not update the cache on createTodo mutation: ', e);
          }
        },
      },
      props: r => {
        const { data } = r;
        return {
          performUpdateTodo: (input: UpdateTodoInput) =>
            r.mutate &&
            r.mutate({
              variables: { input },
              optimisticResponse: {
                updateTodo: {
                  __typename: 'Todo',
                  id: input.id,
                  description: input.description || '',
                  done: input.done || true,
                },
              },
            }),
          updateTodoData: data,
        };
      },
    }
  );

export default withUpdateTodo;
