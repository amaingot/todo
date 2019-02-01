import { DataValue, graphql } from 'react-apollo';

import { deleteTodo } from 'src/graphql/mutations';
import { ListTodosQuery } from 'src/graphql/queries';
import {
  DeleteTodoInput,
  DeleteTodoMutationData,
  DeleteTodoMutationVariables,
  ListTodosQueryData,
  ListTodosQueryVariables,
} from 'src/graphql/types';

export interface WithDeleteTodoProps {
  performDeleteTodo: (input: DeleteTodoInput) => void;
  deleteTodoData?: DataValue<DeleteTodoMutationData, DeleteTodoMutationVariables>;
}

const withDeleteTodo = <TProps extends Partial<{ todoId: any }>>(
  listQueryVariables?: ListTodosQueryVariables
) =>
  graphql<TProps, DeleteTodoMutationData, DeleteTodoMutationVariables, WithDeleteTodoProps>(
    deleteTodo,
    {
      options: {
        update: (proxy, options) => {
          try {
            const readQuery = proxy.readQuery<ListTodosQueryData, ListTodosQueryVariables>({
              query: ListTodosQuery,
              variables: listQueryVariables,
            });
            if (readQuery !== null && readQuery.listTodos && readQuery.listTodos.items) {
              if (options.data && options.data.deleteTodo) {
                const todoToDelete = options.data.deleteTodo;
                const indexOfTodo = readQuery.listTodos.items.findIndex(
                  t => t !== null && t.id === todoToDelete.id
                );
                if (indexOfTodo !== -1) {
                  readQuery.listTodos.items.splice(indexOfTodo, 1);
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
        const { data, ownProps } = r;
        return {
          performDeleteTodo: (input?: DeleteTodoInput) => {
            if (r.mutate) {
              // something cool;
              if (!!input && ownProps.todoId && typeof ownProps.todoId === 'string') {
                r.mutate({ variables: { input: { id: ownProps.todoId } } });
              } else if (input) {
                r.mutate({
                  variables: { input },
                  optimisticResponse: {
                    deleteTodo: {
                      __typename: 'Todo',
                      id: input.id || '',
                      description: '',
                      done: false,
                    },
                  },
                });
              } else {
                throw Error(
                  'withDeleteTodoError: On mutation: There was no todoId supplied by the parent' +
                    ' component and there was no input passed to the mutation function sent in' +
                    ' via props to the child component'
                );
              }
            }
          },
          deleteTodoData: data,
        };
      },
    }
  );

export default withDeleteTodo;
