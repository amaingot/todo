import * as React from "react";

import { List, Paper } from "@material-ui/core";
import {
  useListTodosQuery,
  useOnTodoEventSubscription,
} from "../graphql/hooks";
import TodoCard from "./TodoCard";

const TodoList: React.FC = () => {
  const todoListResponse = useListTodosQuery();
  useOnTodoEventSubscription({
    onSubscriptionData: () => todoListResponse.refetch(),
  });

  const todos = todoListResponse.data?.listTodos?.data || [];

  return (
    <Paper style={{ margin: 16 }}>
      <List style={{ overflow: "scroll" }}>
        {todos.map((todo, i) => (
          <TodoCard
            key={todo.id}
            item={todo}
            divider={i !== todos.length - 1}
          />
        ))}
      </List>
    </Paper>
  );
};

export default TodoList;
