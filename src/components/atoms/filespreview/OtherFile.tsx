import { Box } from '@mui/material';
import { Icon } from '@iconify/react';
import fileIcon from '@iconify/icons-ant-design/file-filled';

export default function OtherFile({ url }: { url: string }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
      <Icon icon={fileIcon} width="220px" height="220px" />
    </Box>
  );
}
