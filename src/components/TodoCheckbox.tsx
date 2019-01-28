import * as React from 'react';
import { graphql } from 'react-apollo';

import { Checkbox } from '@material-ui/core';
import { updateTodo } from '../graphql/mutations';
import { Todo, UpdateTodoMutationData, UpdateTodoMutationVariables } from '../graphql/types';

interface ReactProps {
  item: Todo;
}

interface ApolloProps {
  toggleDone?: () => void;
}

class TodoCheckbox extends React.Component<ReactProps & ApolloProps> {
  public render() {
    const { item, toggleDone } = this.props;
    return (
      <Checkbox className="checkboxxxx" onClick={toggleDone} checked={item.done} disableRipple />
    );
  }
}

export default graphql<
  ReactProps,
  UpdateTodoMutationData,
  UpdateTodoMutationVariables,
  ApolloProps
>(updateTodo, {
  options: props => ({
    variables: {
      input: {
        id: props.item.id,
        description: props.item.description,
        done: !props.item.done,
      },
    },
  }),
  props: r => {
    return { toggleDone: r.mutate };
  },
})(TodoCheckbox);
