/*
 * k-cloud-frontend
 * Copyright(c) Kintaro Ponce
 * MIT Licensed
 */

import { Box } from '@mui/material';
import { Icon } from '@iconify/react';
import pdfIcon from '@iconify/icons-ant-design/file-pdf-filled';

export default function PDFFile() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
      <Icon icon={pdfIcon} width="220px" height="220px" />
    </Box>
  );
}
