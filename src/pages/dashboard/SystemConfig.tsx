import { Toolbar } from '@mui/material';
import { BackButton } from '../../components/atoms';

export default function SystemConfig() {
  return (
    <>
      <Toolbar>
        <BackButton to="/admin" />
      </Toolbar>
    </>
  );
}
