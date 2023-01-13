import { Stack, Box } from '@mui/material';
// redux
import { useDispatch } from '../../../redux/store';
import { setPath } from '../../../redux/slices/session';
import { Icon } from '@iconify/react';
import rightC from '@iconify/icons-ant-design/caret-right-fill';

export default function ButtonBar({ name, to, index }: { name: string; to: string; index: number }) {
  const dispatch = useDispatch();

  const sendToPath = () => {
    dispatch(setPath(to));
  };

  return (
    <Stack direction="row">
      {index !== -1 && (
        <Box sx={{ padding: '3px', display: 'flex', alignItems: 'center' }}>
          <Icon icon={rightC} width="16px" height="16px" />
        </Box>
      )}
      <Box sx={{ padding: '3px', fontWeight: 600, textAlign: 'center' }} onClick={sendToPath}>
        {name}
      </Box>
    </Stack>
  );
}
