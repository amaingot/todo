import React from "react";
import { auth, User } from "firebase/app";

interface AuthContextState {
  loggedIn: boolean;
  user?: User;
}

const AuthContext = React.createContext<AuthContextState>({
  loggedIn: false,
});

export const useAuth = () => React.useContext(AuthContext);

export const AuthContextProvider: React.FC = (props) => {
  const [user, setUser] = React.useState<User>();

  React.useEffect(() => {
    auth().onAuthStateChanged((u) => {
      if (u) {
        setUser(u);
      } else {
        setUser(undefined);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn: user !== undefined, user }}>
      {props.children}
    </AuthContext.Provider>
  );
};
