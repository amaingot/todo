import React from "react";
import { CircularProgress } from "@material-ui/core";

import Layout from "./components/Layout";
import CreateTodo from "./components/CreateTodo";
import TodoList from "./components/TodoList";
import LoginForm from "./components/LoginForm";
import { useAuth } from "./contexts/AuthContext";
import SignUpForm from "./components/SignUpForm";

const App: React.FC = () => {
  const { loggedIn, loading } = useAuth();
  return (
    <Layout>
      {loading ? (
        <CircularProgress
          size={64}
          style={{ margin: "4rem auto", display: "block" }}
        />
      ) : (
        <>
          {loggedIn ? (
            <>
              <CreateTodo />
              <TodoList />
            </>
          ) : (
            <>
              <LoginForm />
              <SignUpForm />
            </>
          )}
        </>
      )}
    </Layout>
  );
};

export default App;
