import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Container, Toolbar, Typography, Box, Button, Stack, Drawer, IconButton, Paper } from '@mui/material';
import FileList from './files/upload/FileList';
import { UserProfile } from './bar';
import useAuth from '../hooks/useAuth';
import { Icon } from '@iconify/react';
import barsI from '@iconify/icons-ant-design/bars-outlined';
import { useSelector } from '../redux/store';

interface BarProps {
  children: React.ReactNode;
}

export default function Bar({ children }: BarProps) {
  const { isAuthenticated } = useAuth();
  const { filesDir } = useSelector((state) => state.files);

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
      {children}
    </>
  );
}
