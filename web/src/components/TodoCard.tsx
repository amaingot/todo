import * as React from "react";

import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";

import TodoCheckbox from "./TodoCheckbox";
import TodoDeleteButton from "./TodoDeleteButton";
import { useDeleteTodoMutation, useUpdateTodoMutation } from "../graphql/hooks";

export interface Props {
  divider: boolean;
  item: {
    id: string;
    done: boolean;
    description: string;
  };
}

const TodoCard: React.FC<Props> = (props) => {
  const { item, divider } = props;
  const [deleteTodo] = useDeleteTodoMutation({
    variables: { id: item.id },
    refetchQueries: ["ListTodos"],
  });

  const [toggleDone] = useUpdateTodoMutation({
    variables: {
      id: item.id,
      input: {
        description: item.description,
        done: !item.done,
      },
    },
  });

  return (
    <ListItem divider={divider}>
      <TodoCheckbox checked={item.done} toggleCheck={toggleDone} />
      <ListItemText primary={item.description} />
      <ListItemSecondaryAction>
        <TodoDeleteButton deleteTodo={deleteTodo} />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default TodoCard;
