/*
 * k-cloud-frontend
 * Copyright(c) Kintaro Ponce
 * MIT Licensed
 */

import { Box } from '@mui/material';
import { Icon } from '@iconify/react';
import audioIcon from '@iconify/icons-ant-design/audio-filled';

export default function AudioFile() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', cursor: 'pointer' }}>
      <Icon icon={audioIcon} width="250px" height="250px" />
    </Box>
  );
}
