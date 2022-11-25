import { Box } from '@mui/material';
// redux
import { useDispatch } from '../../../redux/store';
import { setPath } from '../../../redux/slices/session';

export default function ButtonBar({ name, to }: { name: string; to: string }) {
  const dispatch = useDispatch();

  const sendToPath = () => {
    dispatch(setPath(to));
  };

  return (
    <Box sx={{ padding: '3px', fontWeight: 600, textAlign: 'center' }} onClick={sendToPath}>
      {name}
    </Box>
  );
}
