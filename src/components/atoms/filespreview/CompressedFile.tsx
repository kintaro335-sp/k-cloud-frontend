/*
 * k-cloud-frontend
 * Copyright(c) Kintaro Ponce
 * MIT Licensed
 */

import { Box } from '@mui/material';
import { Icon } from '@iconify/react';
import zipfolderIcon from '@iconify/icons-material-symbols/folder-zip';

export default function CompressedFile() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
      <Icon icon={zipfolderIcon} width="220px" height="220px" />
    </Box>
  );
}