import { Card, CardContent, CardHeader, Box } from '@mui/material';
import { ImgFile, VideoFile, OtherFile, Folder } from './filetypes';
import MenuFile from './MenuFile';
// api
import { FileP } from '../../api/files';
import { apiUrl } from '../../config';

// redux
import { SessionState } from '../../redux/slices/session';
import { useSelector } from '../../redux/store';

function FileInfo({ file, children, url }: { file: FileP; children: JSX.Element; url: string }) {
  return (
    <Card>
      <CardContent>{children}</CardContent>
      <CardHeader
        title={
          <Box sx={{ width: '220px', whiteSpace: 'noWrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
            {file.name}
          </Box>
        }
        subheader={file.type}
        action={<MenuFile url={url} />}
      />
    </Card>
  );
}

export default function FileElement({ name, size, type, mime_type, extension }: FileP) {
  const { path, access_token } = useSelector((state: { session: SessionState }) => state.session);
  const diagonal = path ? '/' : '';

  const url = `${path}${diagonal}${name}`;
  const urlComplete = `${apiUrl}/files/${path}${diagonal}${name}?t=${access_token}`;

  if (type === 'file') {
    if (mime_type.includes('image')) {
      return (
        <FileInfo file={{ name, size, type, mime_type, extension }} url={url}>
          <ImgFile url={urlComplete} />
        </FileInfo>
      );
    }
    if (mime_type.includes('video')) {
      return (
        <FileInfo file={{ name, size, type, mime_type, extension }} url={url}>
          <VideoFile url={urlComplete} />
        </FileInfo>
      );
    }
    return (
      <FileInfo file={{ name, size, type, mime_type, extension }} url={url}>
        <OtherFile url={urlComplete} />
      </FileInfo>
    );
  }

  return (
    <FileInfo file={{ name, size, type, mime_type, extension }} url={url}>
      <Folder url={url} />
    </FileInfo>
  );
}
