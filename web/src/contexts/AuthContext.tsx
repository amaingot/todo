import React from "react";
import auth, { User } from "../utils/auth";

interface AuthContextState {
  loggedIn: boolean;
  loading: boolean;
  user?: User;
}

const AuthContext = React.createContext<AuthContextState>({
  loggedIn: false,
  loading: true,
});

export const useAuth = () => React.useContext(AuthContext);

export const AuthContextProvider: React.FC = (props) => {
  const [user, setUser] = React.useState<User>();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    auth.onAuthStateChanged((u) => {
      if (u) {
        setUser(u);
      } else {
        setUser(undefined);
      }
      setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ loading, loggedIn: user !== undefined, user }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
