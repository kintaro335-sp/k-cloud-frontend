import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, IconButton, Menu, MenuItem, Typography, Stack, Box } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';

// redux
import { useDispatch } from '../../redux/store';
import { setAccessToken } from '../../redux/slices/session';

export default function UserProfile() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const anchorRef = useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch();
  const { isAdmin, username } = useAuth();

  const clickOpen = () => {
    setOpen(true);
  };

  const clickClose = () => {
    setOpen(false);
  };

  const handleGotoFiles = () => {
    clickClose();
    navigate('/files');
  };

  const handleGotoTokens = () => {
    clickClose();
    navigate('/tokens');
  };

  const handleGoAdministration = () => {
    clickClose();
    navigate('/admin');
  };

  const handleChangePassword = () => {
    clickClose();
    navigate('/passwd');
  };

  const handleLogout = () => {
    clickClose();
    dispatch(setAccessToken(''));
    navigate('/');
  };

  return (
    <>
      <Stack direction="row" spacing={2}>
        <IconButton onClick={clickOpen} ref={anchorRef}>
          <Avatar />
        </IconButton>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="h6">{username}</Typography>
        </Box>
      </Stack>

      <Menu open={open} onClose={clickClose} anchorEl={anchorRef.current}>
        <MenuItem onClick={handleGotoFiles}>Tus Archivos</MenuItem>
        <MenuItem onClick={handleGotoTokens}>Tokens</MenuItem>
        {isAdmin && <MenuItem onClick={handleGoAdministration}>Administración</MenuItem>}
        <MenuItem onClick={handleChangePassword}>Cambiar Contraseña</MenuItem>
        <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
      </Menu>
    </>
  );
}
