import { Box } from '@mui/material';
import RegisterForm from '../components/auth/RegisterForm';

export default function Register() {
  return (
    <Box sx={{ width: '100vw', height: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <RegisterForm sx={{ maxWidth: '33vw', minWidth: '28vw' }} />
    </Box>
  );
}
