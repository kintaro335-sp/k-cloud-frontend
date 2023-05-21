import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import RegisterForm from '../components/auth/RegisterForm';
// api
import { getIsConfigured } from '../api/setup';

export default function SetupUser() {
  const navigate = useNavigate();

  useEffect(() => {
    getIsConfigured().then((resp) => {
      if (resp.configured) {
        navigate('/');
      }
    });
  }, []);

  return (
    <Box sx={{ width: '100vw', height: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <RegisterForm setup cardProps={{ sx: { maxWidth: '33vw', minWidth: '28vw' } }} />
    </Box>
  );
}
