import { Box } from '@mui/material';
import LoginForm from '../components/auth/LoginForm';

export default function Login() {
  return (
    <Box sx={{ width: '100vw', height: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <LoginForm sx={{ width: { xs: '65vw', md: '44vw', lg: '33vw' } }} />
    </Box>
  );
}
