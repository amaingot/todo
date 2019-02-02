import { CacheOperationTypes, CacheUpdatesOptions } from 'aws-appsync';
import { graphqlMutation } from 'aws-appsync-react';
import { compose } from 'react-apollo';

import { createTodo, deleteTodo, updateTodo } from 'src/graphql/mutations';
import {
  CreateTodoMutationVariables,
  DeleteTodoMutationVariables,
  UpdateTodoMutationVariables,
} from 'src/graphql/types';

export interface WithTodosMutationsProps {
  updateTodo: (variables: UpdateTodoMutationVariables) => void;
  deleteTodo: (variables: DeleteTodoMutationVariables) => void;
  createTodo: (variables: CreateTodoMutationVariables) => void;
}

const withTodoMutations = <TProps extends {}>(options: CacheUpdatesOptions) =>
  compose(
    graphqlMutation(deleteTodo, options, 'Todo', 'id', CacheOperationTypes.REMOVE),
    graphqlMutation(createTodo, options, 'Todo', 'id', CacheOperationTypes.ADD),
    graphqlMutation(updateTodo, options, 'Todo', 'id', CacheOperationTypes.UPDATE)
  ) as (
    WrappedComponent: React.ComponentType<TProps & WithTodosMutationsProps>
  ) => React.ComponentClass<TProps, any>;

export default withTodoMutations;
