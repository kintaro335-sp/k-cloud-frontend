import { Toolbar, Box } from '@mui/material';
import { BackButton } from '../../components/atoms';
import { DedicatedSpaceForm } from '../../components/dashboard/system';

export default function SystemConfig() {
  return (
    <>
      <Toolbar>
        <BackButton to="/admin" />
      </Toolbar>
      <Box>
        <DedicatedSpaceForm />
      </Box>
    </>
  );
}
