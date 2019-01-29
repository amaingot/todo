import { DataValue, graphql } from 'react-apollo';

import { deleteTodo } from '../graphql/mutations';
import { DeleteTodoMutationData, DeleteTodoMutationVariables } from '../graphql/types';

interface ExpectedProps {
  todoId: string;
}

export interface WithDeleteTodoProps
  extends Partial<DataValue<DeleteTodoMutationData, DeleteTodoMutationVariables>> {
  performDeleteTodo: () => void;
}

const withDeleteTodo = <TProps extends ExpectedProps>() =>
  graphql<TProps, DeleteTodoMutationData, DeleteTodoMutationVariables, WithDeleteTodoProps>(
    deleteTodo,
    {
      options: props => ({
        variables: {
          input: {
            id: props.todoId,
          },
        },
      }),
      props: r => {
        const { data } = r;
        return {
          performDeleteTodo: () => r.mutate && r.mutate(),
          ...data,
        };
      },
    }
  );

export default withDeleteTodo;
