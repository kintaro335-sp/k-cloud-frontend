import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { AppBar, Container, Toolbar, Typography, Box, Button, Stack, Grid, useMediaQuery } from '@mui/material';
import { UserProfile, LateralMenu, Uploads } from './bar';
import useAuth from '../hooks/useAuth';

interface BarProps {
  children: React.ReactNode;
}

export default function Bar({ children }: BarProps) {
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();
  const pagesShowList = ['/files'];
  const showMenuL = isAuthenticated && pagesShowList.includes(pathname);
  const theme = useTheme();
  const bk = useMediaQuery(theme.breakpoints.up('md'));
  const mobile = useMediaQuery(theme.breakpoints.down('md'));

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
              {mobile && isAuthenticated && <Uploads />}
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      <Box sx={{ height: '64px' }} />
      <Grid container spacing={1} sx={{ height: '90vh' }}>
        <Grid item xs={2} sx={{ display: { xs: 'none', md: showMenuL ? 'block' : 'none' }, height: '100%' }}>
          <LateralMenu />
        </Grid>
        <Grid item xs={showMenuL && bk ? 10 : 12} sx={{ height: '100%' }}>
          {children}
        </Grid>
      </Grid>
    </>
  );
}
