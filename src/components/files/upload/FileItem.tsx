import { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { FileToUpload } from '../../../@types/files';

interface FileItemProps {
  path: string;
  fileP: FileToUpload | null;
}

export default function FileItem({ path, fileP }: FileItemProps) {
  if (fileP === null) return <></>;
  const { size, sended, file, blobSended } = fileP;
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    setProgress((size / sended) * 100);
  }, [sended, size]);

  return (
    <ListItem>
      <ListItemIcon>
        <CircularProgress variant="determinate" value={progress} />
      </ListItemIcon>
      <ListItemText primary={file.name} secondary={`en:${path}`} />
    </ListItem>
  );
}
