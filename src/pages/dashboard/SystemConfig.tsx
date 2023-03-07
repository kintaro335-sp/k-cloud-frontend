import { Toolbar, Box } from '@mui/material';
import { BackButton } from '../../components/atoms';
import { DedcatedSpaceForm } from '../../components/dashboard/system';

export default function SystemConfig() {
  return (
    <>
      <Toolbar>
        <BackButton to="/admin" />
      </Toolbar>
      <Box>
        <DedcatedSpaceForm />
      </Box>
    </>
  );
}
