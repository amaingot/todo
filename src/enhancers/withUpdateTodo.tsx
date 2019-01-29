import { DataValue, graphql } from 'react-apollo';

import { updateTodo } from '../graphql/mutations';
import {
  UpdateTodoInput,
  UpdateTodoMutationData,
  UpdateTodoMutationVariables,
} from '../graphql/types';

export interface WithUpdateTodoProps
  extends Partial<DataValue<UpdateTodoMutationData, UpdateTodoMutationVariables>> {
  performUpdateTodo: (input: UpdateTodoInput) => void;
}

const withUpdateTodo = <TProps extends {}>() =>
  graphql<TProps, UpdateTodoMutationData, UpdateTodoMutationVariables, WithUpdateTodoProps>(
    updateTodo,
    {
      props: r => {
        const { data } = r;
        return {
          performUpdateTodo: (input: UpdateTodoInput) =>
            r.mutate && r.mutate({ variables: { input } }),
          ...data,
        };
      },
    }
  );

export default withUpdateTodo;
