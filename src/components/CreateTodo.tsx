import * as React from 'react';

import { Button, Grid, Paper, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

export interface CreateTodoProps {
  inputValue: string;
  onInputChange: React.ChangeEventHandler<HTMLInputElement>;
  onInputKeyPress: React.KeyboardEventHandler<HTMLInputElement>;
  onCreate: () => void;
}

const CreateTodo: React.SFC<CreateTodoProps> = props => {
  return (
    <Paper style={{ margin: 16, padding: 16 }}>
      <Grid container>
        <Grid xs={10} md={11} item style={{ paddingRight: 16 }}>
          <TextField
            placeholder="Add Todo here"
            value={props.inputValue}
            onChange={props.onInputChange}
            onKeyPress={props.onInputKeyPress}
            fullWidth
          />
        </Grid>
        <Grid xs={2} md={1} item>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={props.onCreate}
            disabled={!props.inputValue.length}
          >
            <AddIcon /> Add
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CreateTodo;
