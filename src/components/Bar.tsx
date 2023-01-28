import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  Button,
  Stack,
  Drawer,
  IconButton,
  Paper
} from '@mui/material';
import FileList from './files/upload/FileList';
import { UserProfile } from './bar';
import useAuth from '../hooks/useAuth';
import { Icon } from '@iconify/react';
import barsI from '@iconify/icons-ant-design/bars-outlined';
import { useSelector } from '../redux/store';

export default function Bar() {
  const { isAuthenticated } = useAuth();
  const { filesDir } = useSelector((state) => state.files);
  const [open, setOpen] = useState<boolean>(false);

  const clickOpen = () => {
    setOpen(true);
  };

  const clickClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AppBar position="fixed">
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            {isAuthenticated && (
              <IconButton onClick={clickOpen} sx={{ margin: '3px' }}>
                {filesDir.length === 0 ? <Icon icon={barsI} width="22px" height="22px" /> : <>{filesDir.length}</>}
              </IconButton>
            )}
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
      <Drawer variant="temporary" open={open} onClose={clickClose}>
        <Paper sx={{ width: 300 }}>
          <FileList />
        </Paper>
      </Drawer>
    </>
  );
}
