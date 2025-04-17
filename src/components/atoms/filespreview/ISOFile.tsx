/*
 * k-cloud-frontend
 * Copyright(c) Kintaro Ponce
 * MIT Licensed
 */

import { Box } from '@mui/material';
import { Icon } from '@iconify/react';
import isoIcon from '@iconify/icons-carbon/iso-filled';

export default function ISOFile() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
      <Icon icon={isoIcon} width="220px" height="220px" />
    </Box>
  );
}