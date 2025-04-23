/*
 * k-cloud-frontend
 * Copyright(c) Kintaro Ponce
 * MIT Licensed
 */

import { Box } from '@mui/material';
import { Icon } from '@iconify/react';
import pdfIcon from '@iconify/icons-ant-design/file-pdf-filled';
// hooks
import usePDFViewer from '../../../hooks/usePDFViewer';

interface PDFFileProps {
  name: string;
  url: string;
}

export default function PDFFile({ name, url }: PDFFileProps) {
  const { openFile } = usePDFViewer();

  const clickOpen = () => {
    openFile(url, name);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', cursor: 'pointer' }} onClick={clickOpen}>
      <Icon icon={pdfIcon} width="220px" height="220px" />
    </Box>
  );
}
