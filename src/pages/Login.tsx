import { Box } from '@mui/material';
import LoginForm from '../components/auth/LoginForm';

export default function Login() {
  return (
    <Box sx={{ width: '100vw', height: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <LoginForm sx={{ maxWidth: '33vw', minWidth: '28vw' }} />
    </Box>
  );
}
