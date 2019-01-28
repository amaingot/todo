import * as React from 'react';
import { graphql, MutationFn } from 'react-apollo';

import { Button, Grid, Paper, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { createTodo } from '../graphql/mutations';
import {
  CreateTodoInput,
  CreateTodoMutationData,
  CreateTodoMutationVariables,
} from '../graphql/types';

interface RelayProps {
  createTodo?: MutationFn<CreateTodoMutationData, CreateTodoMutationVariables>;
}

export interface State {
  inputValue: string;
}

class CreateTodo extends React.Component<RelayProps, State> {
  constructor(props: RelayProps) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  public createTodo = () => {
    const newTodo: CreateTodoInput = {
      description: this.state.inputValue,
      done: false,
    };
    this.setState({
      inputValue: '',
    });

    // here we would create a new todo
    if (this.props.createTodo) {
      this.props.createTodo({
        variables: { input: newTodo },
      });
    }
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

export default graphql<{}, CreateTodoMutationData, CreateTodoMutationVariables, RelayProps>(
  createTodo,
  {
    props: r => ({
      createTodo: r.mutate,
    }),
  }
)(CreateTodo);
