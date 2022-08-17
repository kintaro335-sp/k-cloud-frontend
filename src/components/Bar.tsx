import { Link } from 'react-router-dom';
import { AppBar, Container, Toolbar, Typography, Box, Button } from '@mui/material';

export default function Bar() {
  return (
    <>
      <AppBar position="fixed">
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Typography variant="h6">Cloud</Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Box sx={{ height: '64px' }} />
    </>
  );
}
