import { ListItem, ListItemText, Box, Stack, LinearProgress, Typography } from '@mui/material';
import { FileToUpload } from '../../../@types/files';
import { BLOB_SIZE, bytesFormat } from '../../../utils/files';

interface FileItemProps {
  path: string;
  fileP: FileToUpload | null;
}

export default function FileItem({ path, fileP }: FileItemProps) {
  if (fileP === null) return <></>;
  const { size, sended, totalBlobs, blobsSended, file, blobProgress, written } = fileP;

  return (
    <ListItem>
      <ListItemText
        primary={
          <Stack spacing={1}>
            <Box>{file.name}</Box>
            <Box>
              {blobsSended}/{totalBlobs}
            </Box>
            <Box>
              <Typography variant="body1">{bytesFormat(written)}/{bytesFormat(size)}</Typography>
              <LinearProgress variant="determinate" value={(written / size) * 100} />
            </Box>
            <Box>
              <Typography variant="body1">{bytesFormat(sended + Math.floor(BLOB_SIZE * blobProgress))}</Typography>
              <LinearProgress variant="determinate" value={(sended / size) * 100} />
            </Box>
            <Box>
              <LinearProgress variant="determinate" value={blobProgress * 100} />
            </Box>
          </Stack>
        }
        secondary={`en:${path}`}
      />
    </ListItem>
  );
}
