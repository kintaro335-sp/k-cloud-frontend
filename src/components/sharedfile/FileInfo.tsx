import { Box } from '@mui/material';

// redux
import { useSelector } from '../../redux/store';

export default function FileInfo() {
  const { info } = useSelector((state) => state.sharedfile);

  return <Box></Box>;
}
