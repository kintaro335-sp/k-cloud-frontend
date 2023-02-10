import { Card, CardContent, CardHeader, Box } from '@mui/material';
import { ImgFile, VideoFile, OtherFile, Folder } from './filetypes';
import MenuFile from './MenuFile';
import Numeral from 'numeral';
// api
import { FileP } from '../../api/files';
import { apiUrl } from '../../config';

// redux
import { useSelector } from '../../redux/store';

function FileInfo({
  file,
  children,
  url,
  urlComplete
}: {
  file: FileP;
  children: JSX.Element;
  url: string;
  urlComplete: string;
}) {
  return (
    <Card>
      <CardContent>{children}</CardContent>
      <CardHeader
        title={
          <Box sx={{ whiteSpace: 'noWrap', textOverflow: 'ellipsis', overflowWrap: 'anywhere', fontSize: '1.6ex' }}>
            {file.name}
          </Box>
        }
        subheader={
          <Box>
          {file.type} {file.type === 'file' && Numeral(file.size).format('0.0 b')}
          </Box>
        }
        action={<MenuFile url={url} file={file} urlComplete={urlComplete} />}
      />
    </Card>
  );
}

export default function FileElement({ name, size, type, mime_type, extension }: FileP) {
  const { path, access_token } = useSelector((state) => state.session);
  const diagonal = path ? '/' : '';

  const url = `${path}${diagonal}${name}`;
  const urlComplete = `${apiUrl}/files/list/${path}${diagonal}${name}?t=${access_token}`;

  if (type === 'file') {
    if (mime_type.includes('image')) {
      return (
        <FileInfo file={{ name, size, type, mime_type, extension }} url={url} urlComplete={urlComplete}>
          <ImgFile url={urlComplete} />
        </FileInfo>
      );
    }
    if (mime_type.includes('video')) {
      return (
        <FileInfo file={{ name, size, type, mime_type, extension }} url={url} urlComplete={urlComplete}>
          <VideoFile url={urlComplete} />
        </FileInfo>
      );
    }
    return (
      <FileInfo file={{ name, size, type, mime_type, extension }} url={url} urlComplete={urlComplete}>
        <OtherFile url={urlComplete} />
      </FileInfo>
    );
  }

  return (
    <FileInfo file={{ name, size, type, mime_type, extension }} url={url} urlComplete={urlComplete}>
      <Folder url={url} />
    </FileInfo>
  );
}
