import { Box } from '@mui/material';
import { ChangePasswordForm } from '../components/settings';

export default function ChangePassword() {
  return (
    <Box sx={{ width: '100vw', height: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <ChangePasswordForm />
    </Box>
  );
}
