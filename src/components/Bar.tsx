import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { AppBar, Container, Toolbar, Typography, Box, Stack, Grid, useMediaQuery } from '@mui/material';
import { UserProfile, LateralMenu, Uploads, LinkBar } from './bar';
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
              component={RouterLink}
              to="/"
            >
              Cloud
            </Typography>
            {isAuthenticated && <UserProfile />}
            <Stack spacing={2} direction="row" sx={{ display: 'flex', float: 'right' }}>
              {!isAuthenticated && pathname !== '/login' && <LinkBar to="/login">Login</LinkBar>}
              {pathname !== '/shared-files' && <LinkBar to="/shared-files">Shared Files</LinkBar>}
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
