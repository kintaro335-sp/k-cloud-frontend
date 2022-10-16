import { Link } from 'react-router-dom';
import { AppBar, Container, Toolbar, Typography, Box, Button, Stack } from '@mui/material';
import { UserProfile } from './bar';
import useAuth from '../hooks/useAuth';

export default function Bar() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <AppBar position="fixed">
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Typography variant="h6" sx={{ marginRight: '5px', color: 'white', textDecoration: 'none' }} component={Link} to="/">
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
    </>
  );
}
