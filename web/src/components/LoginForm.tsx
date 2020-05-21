import React from "react";
import { Button, Grid, Paper, TextField, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import firebase from "firebase/app";

const LoginForm: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string>();
  const [loading, setLoading] = React.useState(false);

  const login = async () => {
    setLoading(true);
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      setLoading(false);
    } catch (e) {
      setError(JSON.stringify(e));
    }
  };

  return (
    <Paper style={{ margin: 16, padding: 16 }}>
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
              <AddIcon /> Add
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

export default LoginForm;
