/*
 * k-cloud-frontend
 * Copyright(c) Kintaro Ponce
 * MIT Licensed
 */

import { useParams } from 'react-router-dom';
import { Box, Card, CardHeader, CardContent, Button, Stack, Typography } from '@mui/material';
import { FileIcon } from '../atoms';
// config
import { apiUrl } from '../../config';
// redux
import { useSelector } from '../../redux/store';
import { bytesFormat } from '../../utils/files';
import dayjs from 'dayjs';

export default function FileInfo() {
  const { id } = useParams();
  const { info } = useSelector((state) => state.sharedfile);

  if (info === null) return <></>;

  const urlDownload = `${apiUrl}/shared-file/content/${id}?d=1`;
  const urlDirect = `${apiUrl}/shared-file/content/${id}`;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card sx={{ width: { xs: '70%', md: '50%', lg: '30%' } }}>
        <CardContent>
          <FileIcon
            type={info?.type}
            mime_type={info?.mime_type}
            url={urlDirect}
            context="sharedFile"
            fileName={info?.name}
          />
        </CardContent>
        <CardHeader
          title={<>{info?.name}</>}
          subheader={
            <Stack>
              <Typography>{info.type === 'file' && bytesFormat(info.size)}</Typography>
              <Typography>Creado: {dayjs(info.createdAt).format('YYYY-MM-DD h:mm:s a')}</Typography>
              {info.expire && <Typography>Expira: {dayjs(info.expires).format('YYYY-MM-DD h:mm:s a')}</Typography>}
            </Stack>
          }
        />
        <Stack sx={{ margin: '20px' }} spacing={2}>
          <Button LinkComponent="a" href={urlDirect} variant="contained" target="_blank">
            Link Directo
          </Button>
          <Button LinkComponent="a" href={urlDownload} download={info.name} variant="contained">
            Descargar
          </Button>
        </Stack>
      </Card>
    </Box>
  );
}
