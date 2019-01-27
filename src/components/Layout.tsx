import * as React from 'react';

import { AppBar, Paper, Toolbar, Typography } from '@material-ui/core';

export interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.SFC<LayoutProps> = props => {
  const { children } = props;

  return (
    <Paper elevation={0} style={{ padding: 0, margin: 0, backgroundColor: '#fafafa' }}>
      <AppBar color="primary" position="static" style={{ height: 64 }}>
        <Toolbar style={{ height: 64 }}>
          <Typography color="inherit">TODO APP</Typography>
        </Toolbar>
      </AppBar>
      {children}
    </Paper>
  );
};

export default Layout;
