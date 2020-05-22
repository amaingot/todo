import React from "react";
import Layout from "./components/Layout";
import CreateTodo from "./components/CreateTodo";
import TodoList from "./components/TodoList";
import LoginForm from "./components/LoginForm";
import { useAuth } from "./contexts/AuthContext";
import SignUpForm from "./components/SignUpForm";

const App: React.FC = () => {
  const { loggedIn } = useAuth();
  return (
    <Layout>
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
    </Layout>
  );
};

export default App;
