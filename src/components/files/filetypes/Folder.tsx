import { Box } from '@mui/material';
import { Icon } from '@iconify/react';
import folderIcon from '@iconify/icons-ant-design/folder-filled';

interface FolderProps {
  click: () => void;
}

export default function Folder({ click }: FolderProps) {

  return (
    <Box sx={{ display: 'flex', aligItems: 'center', justifyContent: 'center', width: '100%' }} onDoubleClick={click}>
      <Icon icon={folderIcon} width="220px" height="220px" />
    </Box>
  );
}
