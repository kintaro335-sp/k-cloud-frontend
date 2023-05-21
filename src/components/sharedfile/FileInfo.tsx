import { useParams } from 'react-router-dom';
import { Box, Card, CardHeader, CardContent, Button, Stack, Typography } from '@mui/material';
import { ImagePreview, CommonFile, VideoPreview } from './filepreview';
// config
import { apiUrl } from '../../config';
// redux
import { useSelector } from '../../redux/store';
import { bytesFormat } from '../../utils/files';
import moment from 'moment';

function FilePreview({ mime, url }: { mime: string; url: string }) {
  if (mime.includes('image/')) {
    return <ImagePreview url={url} />;
  }

  if (mime.includes('video')) {
    return <VideoPreview url={url} />;
  }

  return <CommonFile />;
}

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
          <FilePreview mime={info?.mime_type} url={urlDirect} />
        </CardContent>
        <CardHeader
          title={<>{info?.name}</>}
          subheader={
            <Stack>
              <Typography>{info.type === 'file' && bytesFormat(info.size)}</Typography>
              <Typography>Creado: {moment(info.createdAt).format('YYYY-MM-DD h:mm:s a')}</Typography>
              {info.expire && <Typography>Expira: {moment(info.expires).format('YYYY-MM-DD h:mm:s a')}</Typography>}
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
