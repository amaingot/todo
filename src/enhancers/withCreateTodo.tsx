import { DataValue, graphql } from 'react-apollo';

import { createTodo } from '../graphql/mutations';
import {
  CreateTodoInput,
  CreateTodoMutationData,
  CreateTodoMutationVariables,
} from '../graphql/types';

export interface WithCreateTodoProps
  extends Partial<DataValue<CreateTodoMutationData, CreateTodoMutationVariables>> {
  performCreateTodo: (input: CreateTodoInput) => void;
}

const withCreateTodo = () =>
  graphql<{}, CreateTodoMutationData, CreateTodoMutationVariables, WithCreateTodoProps>(
    createTodo,
    {
      props: r => {
        const { data } = r;
        return {
          performCreateTodo: (input: CreateTodoInput) =>
            r.mutate && r.mutate({ variables: { input } }),
          ...data,
        };
      },
    }
  );

export default withCreateTodo;
