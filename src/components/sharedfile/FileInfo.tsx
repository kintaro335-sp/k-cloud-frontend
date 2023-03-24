import { useParams } from 'react-router-dom';
import { Box, Card, CardHeader, CardContent, Button, Stack } from '@mui/material';
import { ImagePreview, CommonFile } from './filepreview';
// config
import { apiUrl } from '../../config';
// redux
import { useSelector } from '../../redux/store';

function FilePreview({ mime, url }: { mime: string; url: string }) {
  if (mime.includes('image')) {
    return <ImagePreview url={url} />;
  }

  return <CommonFile />;
}

export default function FileInfo() {
  const { id } = useParams();
  const { info } = useSelector((state) => state.sharedfile);

  if (info === null) return <></>;

  const urlDownload = `${apiUrl}/shared-file/content/${id}`;

  return (
    <Box>
      <Card sx={{ width: '30%' }}>
        <CardContent>
          <FilePreview mime={info?.mime_type} url={urlDownload} />
        </CardContent>
        <CardHeader title={<>{info?.name}</>} />
        <Stack sx={{ margin: '20px' }} direction="row">
          <Button LinkComponent="a" href={urlDownload} download={info.name} variant="contained">
            Descargar
          </Button>
        </Stack>
      </Card>
    </Box>
  );
}
