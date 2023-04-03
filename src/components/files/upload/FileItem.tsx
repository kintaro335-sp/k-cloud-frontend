import { CircularProgress, ListItem, ListItemIcon, ListItemText, Box, Stack, LinearProgress } from '@mui/material';
import { FileToUpload } from '../../../@types/files';

interface FileItemProps {
  path: string;
  fileP: FileToUpload | null;
}

export default function FileItem({ path, fileP }: FileItemProps) {
  if (fileP === null) return <></>;
  const { size, sended, totalBlobs, blobsSended, file, blobProgress } = fileP;

  return (
    <ListItem>
      <ListItemIcon>
        <CircularProgress variant="determinate" value={(sended / size) * 100} />
      </ListItemIcon>
      <ListItemText
        primary={
          <Stack spacing={1}>
            <Box>{file.name}</Box>
            <Box>
              {blobsSended}/{totalBlobs}
            </Box>
            <Box>
              <LinearProgress variant='determinate' value={blobProgress} />
            </Box>
          </Stack>
        }
        secondary={`en:${path}`}
      />
    </ListItem>
  );
}
