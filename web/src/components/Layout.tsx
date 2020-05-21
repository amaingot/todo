import * as React from "react";

import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  CssBaseline,
} from "@material-ui/core";

export interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.SFC<LayoutProps> = (props) => {
  const { children } = props;

  return (
    <>
      <CssBaseline />
      <AppBar color="primary" position="static" style={{ height: 64 }}>
        <Toolbar style={{ height: 64 }}>
          <Typography color="inherit">Todo App</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">{children}</Container>
    </>
  );
};

export default Layout;
