import { Toolbar } from '@mui/material';
import { BackButton } from '../../components/atoms';

export default function Stats() {
  return (
    <>
      <Toolbar>
        <BackButton to="/admin" />
      </Toolbar>
    </>
  );
}
