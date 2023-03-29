import { Link, useLocation } from 'react-router-dom';
import { AppBar, Container, Toolbar, Typography, Box, Button, Stack, Grid } from '@mui/material';
import { UserProfile, LateralMenu } from './bar';
import useAuth from '../hooks/useAuth';

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
            <Stack spacing={2} direction="row">
              {!isAuthenticated && (
                <>
                  {pathname !== '/login' && (
                    <Button component={Link} to="/login" variant="contained" sx={{ float: 'right' }}>
                      Login
                    </Button>
                  )}
                </>
              )}
              {isAuthenticated && <UserProfile />}
              {pathname !== '/shared-files' && (
                <Button component={Link} to="/shared-files" variant="contained" sx={{ float: 'right' }}>
                  Shared Files
                </Button>
              )}
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      <Box sx={{ height: '64px' }} />
      <Grid container spacing={1} sx={{ height: '90vh' }}>
        <Grid item xs={2} sx={{ display: showMenuL ? 'block' : 'none', height: '100%' }}>
          <LateralMenu />
        </Grid>
        <Grid item xs={showMenuL ? 10 : 12} sx={{ height: '100%' }}>
          {children}
        </Grid>
      </Grid>
    </>
  );
}
