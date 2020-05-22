import React from "react";
import { Button, Grid, Paper, TextField, Typography } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import firebase from "firebase/app";
import { useSignUpMutation } from "../graphql/hooks";

const SignUpForm: React.FC = () => {
  const [signUpMutation] = useSignUpMutation();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string>();
  const [loading, setLoading] = React.useState(false);

  const login = async () => {
    setLoading(true);
    try {
      await signUpMutation({
        variables: {
          input: {
            email,
            password,
          },
        },
      });
      await firebase.auth().signInWithEmailAndPassword(email, password);
      setLoading(false);
    } catch (e) {
      setError(JSON.stringify(e));
    }
  };

  return (
    <Paper style={{ margin: 16, padding: 16 }}>
      <Typography variant="h3" gutterBottom>
        Sign Up
      </Typography>
      <form>
        <Grid container>
          <Grid xs={12} item>
            <TextField
              placeholder="Email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid xs={10} md={11} item style={{ paddingRight: 16 }}>
            <TextField
              placeholder="Password"
              value={password}
              type="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid xs={2} md={1} item>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={login}
              disabled={loading}
            >
              <ArrowForwardIcon />
            </Button>
          </Grid>
          {error && (
            <Grid xs={12} item>
              <Typography color="error">{error}</Typography>
            </Grid>
          )}
        </Grid>
      </form>
    </Paper>
  );
};

export default SignUpForm;
