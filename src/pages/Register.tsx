import { Box } from '@mui/material';
import RegisterForm from '../components/auth/RegisterForm';

export default function Register() {
  return (
    <Box sx={{ width: '100vw', height: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <RegisterForm cardProps={{ sx: { width: { xs: '65vw', md: '44vw', lg: '33vw' } } }} />
    </Box>
  );
}
