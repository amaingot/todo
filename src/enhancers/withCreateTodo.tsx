/* tslint:disable:no-console */

import { DataValue, graphql } from 'react-apollo';

import { createTodo as CreateTodoQuery } from 'src/graphql/mutations';
import { ListTodosQuery } from 'src/graphql/queries';
import {
  CreateTodoInput,
  CreateTodoMutationData,
  CreateTodoMutationVariables,
  ListTodosQueryData,
  ListTodosQueryVariables,
  Todo,
} from 'src/graphql/types';
import { uuidv4 } from 'src/utils';

const OPTIMISTIC_PREFIX = 'temp-';

export interface WithCreateTodoProps {
  performCreateTodo: (input: CreateTodoInput) => void;
  createTodoData?: DataValue<CreateTodoMutationData, CreateTodoMutationVariables>;
}

const withCreateTodo = (listQueryVariables?: ListTodosQueryVariables) =>
  graphql<{}, CreateTodoMutationData, CreateTodoMutationVariables, WithCreateTodoProps>(
    CreateTodoQuery,
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
                const newTodo = options.data.createTodo as Todo;
                const indexOfOptimisticRecord = readQuery.listTodos.items.findIndex(
                  t =>
                    t !== null &&
                    t.done === newTodo.done &&
                    t.description === newTodo.description &&
                    (t.id === newTodo.id || newTodo.id.startsWith(OPTIMISTIC_PREFIX))
                );
                if (indexOfOptimisticRecord === -1) {
                  readQuery.listTodos.items.push(newTodo);
                } else {
                  readQuery.listTodos.items[indexOfOptimisticRecord] = newTodo;
                }
                proxy.writeQuery({
                  query: ListTodosQuery,
                  data: options.data,
                  variables: listQueryVariables,
                });
              }
            }
          } catch (e) {
            console.warn('Could not update the cache on createTodo mutation: ', e);
          }
        },
      },
      props: r => {
        const { data } = r;
        return {
          performCreateTodo: (input: CreateTodoInput) =>
            r.mutate &&
            r.mutate({
              variables: { input },
              optimisticResponse: {
                createTodo: {
                  __typename: 'Todo',
                  id: `${OPTIMISTIC_PREFIX}${uuidv4()}`,
                  description: input.description || '',
                  done: input.done || false,
                },
              },
            }),
          createTodoData: data,
        };
      },
    }
  );

export default withCreateTodo;
