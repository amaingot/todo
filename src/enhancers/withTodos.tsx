import { compose } from 'react-apollo';
import withCreateTodo, { WithCreateTodoProps } from 'src/enhancers/withCreateTodo';
import withDeleteTodo, { WithDeleteTodoProps } from 'src/enhancers/withDeleteTodo';
import withTodoList, { WithTodoListProps } from 'src/enhancers/withTodoList';
import withUpdateTodo, { WithUpdateTodoProps } from 'src/enhancers/withUpdateTodo';
import { ListTodosQueryVariables } from 'src/graphql/types';

export type WithTodosProps = WithTodoListProps &
  WithDeleteTodoProps &
  WithCreateTodoProps &
  WithUpdateTodoProps;

const withTodos = <TProps extends {}>(queryVariables?: ListTodosQueryVariables) => {
  if (!queryVariables) {
    queryVariables = {
      limit: 500,
    };
  }

  return compose(
    withTodoList<TProps>(queryVariables),
    withDeleteTodo<TProps>(queryVariables),
    withCreateTodo(queryVariables),
    withUpdateTodo(queryVariables)
  );
};

export default withTodos;
