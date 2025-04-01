/*
 * k-cloud-frontend
 * Copyright(c) Kintaro Ponce
 * MIT Licensed
 */

import { ListItem, ListItemText, Box, Stack, LinearProgress, Typography, CircularProgress } from '@mui/material';
import { FileToUpload } from '../../../@types/files';
import { BLOB_SIZE, bytesFormat } from '../../../utils/files';
import { Trans } from 'react-i18next';
import { t } from 'i18next';

interface FileItemProps {
  path: string;
  fileP: FileToUpload | null;
}

export default function FileItem({ path, fileP }: FileItemProps) {
  if (fileP === null) return <></>;
  const { size, sended, totalBlobs, blobsSended, blobProgress, written, currentBlobSizeSend } = fileP;

  const fileName = path.split('/').reverse()[0]

  return (
    <ListItem>
      <ListItemText
        primary={
          <Stack spacing={1}>
            <Box>
              {fileName} <Trans i18nKey="ui.file_item.label_total">Total</Trans>: {bytesFormat(size)}
            </Box>
            <Box>
              {blobsSended}/{totalBlobs}
            </Box>
            <Stack direction="row" spacing={1}>
              <Typography variant="body1"><Trans i18nKey="ui.file_item.label_written">Escrito</Trans>: {bytesFormat(written)}</Typography>
              <CircularProgress variant="determinate" value={(written / size) * 100} />
            </Stack>
            <Stack direction="row" spacing={1}>
              <Typography variant="body1">
                <Trans i18nKey="ui.file_item.label_sended">Enviado</Trans>: {bytesFormat(sended + Math.floor(currentBlobSizeSend * blobProgress))}
              </Typography>
              <CircularProgress variant="determinate" value={(sended / size) * 100} />
            </Stack>
            <Stack direction="row" spacing={1}>
              <Typography variant="body1">Blob: {bytesFormat(Math.floor(currentBlobSizeSend * blobProgress))}</Typography>
              <CircularProgress variant="determinate" value={blobProgress * 100} />
            </Stack>
          </Stack>
        }
        secondary={`${t('ui.file_item.label_in')}:${path}`}
      />
    </ListItem>
  );
}
