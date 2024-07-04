import { ListItem, ListItemText, Box, Stack, LinearProgress, Typography, CircularProgress } from '@mui/material';
import { FileToUpload } from '../../../@types/files';
import { BLOB_SIZE, bytesFormat } from '../../../utils/files';

interface FileItemProps {
  path: string;
  fileP: FileToUpload | null;
}

export default function FileItem({ path, fileP }: FileItemProps) {
  if (fileP === null) return <></>;
  const { size, sended, totalBlobs, blobsSended, blobProgress, written } = fileP;
  const blobSizeReal = size < BLOB_SIZE ? size : BLOB_SIZE;

  const fileName = path.split('/').reverse()[0]

  return (
    <ListItem>
      <ListItemText
        primary={
          <Stack spacing={1}>
            <Box>
              {fileName} Total: {bytesFormat(size)}
            </Box>
            <Box>
              {blobsSended}/{totalBlobs}
            </Box>
            <Stack direction="row" spacing={1}>
              <Typography variant="body1">Escrito: {bytesFormat(written)}</Typography>
              <CircularProgress variant="determinate" value={(written / size) * 100} />
            </Stack>
            <Stack direction="row" spacing={1}>
              <Typography variant="body1">
                Enviado: {bytesFormat(sended + Math.floor(blobSizeReal * blobProgress))}
              </Typography>
              <CircularProgress variant="determinate" value={(sended / size) * 100} />
            </Stack>
            <Stack direction="row" spacing={1}>
              <Typography variant="body1">Blob: {bytesFormat(Math.floor(blobSizeReal * blobProgress))}</Typography>
              <CircularProgress variant="determinate" value={blobProgress * 100} />
            </Stack>
          </Stack>
        }
        secondary={`en:${path}`}
      />
    </ListItem>
  );
}
