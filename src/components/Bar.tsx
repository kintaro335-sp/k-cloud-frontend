import { Link, useLocation } from 'react-router-dom';
import { AppBar, Container, Toolbar, Typography, Box, Button, Stack, Grid } from '@mui/material';
import FileList from './files/upload/FileList';
import { UserProfile } from './bar';
import useAuth from '../hooks/useAuth';
// import { Icon } from '@iconify/react';
// import barsI from '@iconify/icons-ant-design/bars-outlined';

interface BarProps {
  children: React.ReactNode;
}

export default function Bar({ children }: BarProps) {
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();
  const pagesShowList = ['/files'];
  const showMenuL = isAuthenticated && pagesShowList.includes(pathname);

  return (
    <>
      <AppBar position="fixed">
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              sx={{ marginRight: '5px', color: 'white', textDecoration: 'none' }}
              component={Link}
              to="/"
            >
              Cloud
            </Typography>
            <Stack>
              {!isAuthenticated && (
                <Button component={Link} to="/login" variant="contained" sx={{ float: 'right' }}>
                  Login
                </Button>
              )}
              {isAuthenticated && <UserProfile />}
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      <Box sx={{ height: '64px' }} />
      <Grid container spacing={1}>
        <Grid item xs={2} sx={{ display: showMenuL ? 'block' : 'none' }}>
          <FileList />
        </Grid>
        <Grid item xs={showMenuL ? 10 : 12}>
          {children}
        </Grid>
      </Grid>
    </>
  );
}
