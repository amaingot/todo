import * as React from 'react';

import { Button, Grid, Paper, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import withCreateTodo, { WithCreateTodoProps } from '../enhancers/withCreateTodo';

export interface State {
  inputValue: string;
}

class CreateTodo extends React.Component<WithCreateTodoProps, State> {
  constructor(props: WithCreateTodoProps) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  public createTodo = () => {
    const newTodo = {
      description: this.state.inputValue,
      done: false,
    };
    this.setState({
      inputValue: '',
    });

    this.props.performCreateTodo(newTodo);
  };

  public onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      inputValue: e.currentTarget.value,
    });
  };

  public onInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.which === 13 || e.keyCode === 13) {
      this.createTodo();
    }
  };

  public render() {
    const disableButton = !this.state.inputValue;

    return (
      <Paper style={{ margin: 16, padding: 16 }}>
        <Grid container>
          <Grid xs={10} md={11} item style={{ paddingRight: 16 }}>
            <TextField
              placeholder="Add Todo here"
              value={this.state.inputValue}
              onChange={this.onInputChange}
              onKeyPress={this.onInputKeyPress}
              fullWidth
            />
          </Grid>
          <Grid xs={2} md={1} item>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.createTodo}
              disabled={disableButton}
            >
              <AddIcon /> Add
            </Button>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default withCreateTodo()(CreateTodo);
