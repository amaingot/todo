import React from "react";

import { Fab, Grid, Paper, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useCreateTodoMutation } from "../graphql/hooks";
import { useAuth } from "../contexts/AuthContext";

const CreateTodo: React.FC = () => {
  const [description, setDescription] = React.useState("");

  const [createTodoMutation, result] = useCreateTodoMutation({
    refetchQueries: ["ListTodos"],
  });
  const { user } = useAuth();

  const disableButton = !description;

  const createTodo = async () => {
    await createTodoMutation({
      variables: {
        input: {
          description,
          userId: user?.uid || "",
        },
      },
    });
    setDescription("");
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.currentTarget.value);
  };

  const onInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.which === 13 || e.keyCode === 13) {
      createTodo();
    }
  };

  return (
    <Paper style={{ margin: 16, padding: 16 }}>
      <Grid container>
        <Grid xs={10} md={11} item style={{ paddingRight: 16 }}>
          <TextField
            placeholder="Add Todo here"
            value={description}
            onChange={onInputChange}
            onKeyPress={onInputKeyPress}
            fullWidth
            disabled={result.loading}
          />
        </Grid>
        <Grid xs={2} md={1} item>
          <Fab
            color="primary"
            onClick={createTodo}
            disabled={disableButton || result.loading}
            size="small"
          >
            <AddIcon />
          </Fab>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CreateTodo;
