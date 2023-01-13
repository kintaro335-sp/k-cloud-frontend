import { Box, LinearProgress, Typography, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { FileToUpload } from '../../../@types/files';

interface FileItemProps {
  path: string;
  fileP: FileToUpload;
}

export default function FileItem({ path, fileP }: FileItemProps) {
  const { size, sended, file, blobSended } = fileP;
  return <ListItem>
    
  </ListItem>;
}
