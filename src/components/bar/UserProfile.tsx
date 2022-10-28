import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';

// redux
import { useDispatch, useSelector } from '../../redux/store';
import { setAccessToken } from '../../redux/slices/session';

export default function UserProfile() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const anchorRef = useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch();
  const { isAdmin } = useAuth();

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
  };

  return (
    <>
      <IconButton onClick={clickOpen} ref={anchorRef}>
        <Avatar />
      </IconButton>
      <Menu open={open} onClose={clickClose} anchorEl={anchorRef.current}>
        <MenuItem onClick={handleGotoFiles}>Files</MenuItem>
        {isAdmin && <MenuItem onClick={handleGoAdministration}>Administración</MenuItem>}
        <MenuItem onClick={handleChangePassword}>Change Password</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
}
