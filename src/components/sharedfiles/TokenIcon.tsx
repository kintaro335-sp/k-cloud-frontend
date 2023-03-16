import { FileType } from '../../@types/files';
import { Box } from '@mui/material';
import { Icon } from '@iconify/react';
import FileIcon from '@iconify/icons-ant-design/file';
import FolderIcon from '@iconify/icons-ant-design/folder';

export default function TokenIcon({ type }: { type: FileType }) {
  return (
    <Box sx={{ display: 'inline-block' }}>
      <Icon icon={type === 'file' ? FileIcon : FolderIcon} width="250px" height="250px" />
    </Box>
  );
}
