import { Link } from 'react-router-dom';
import { AppBar, Container, Toolbar, Typography, Box, Button, Stack } from '@mui/material';
import useAuth from '../hooks/useAuth';

export default function Bar() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <AppBar position="fixed">
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Typography variant="h6">Cloud</Typography>
            <Stack sx={{ float: 'right', display: 'flex' }}>
              {!isAuthenticated && (
                <Button component={Link} to="/login" variant="contained">
                  Login
                </Button>
              )}
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      <Box sx={{ height: '64px' }} />
    </>
  );
}
