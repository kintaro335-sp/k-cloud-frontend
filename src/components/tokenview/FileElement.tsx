import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, Box, Tooltip, Typography, Stack } from '@mui/material';
import { ImgFile, VideoFile, OtherFile, Folder } from '../files/filetypes';
import { ImagePreview } from './filepreview'
import { DownloadButton } from '../atoms/';
import { bytesFormat } from '../../utils/files';
import { FileI } from '../../@types/files';
// api
import { apiUrl } from '../../config';

// redux
import { useSelector, useDispatch } from '../../redux/store';
import { setPath as setPathSF } from '../../redux/slices/tokenview';

interface FileInfoProps {
  file: FileI;
  children: JSX.Element;
  url: string;
  urlComplete: string;
  sf?: boolean;
}

function FileInfo({ file, children, url, urlComplete, sf }: FileInfoProps) {
  const { id } = useParams();

  return (
    <Card>
      <CardContent>{children}</CardContent>
      <CardHeader
        title={
          <Tooltip title={<Typography variant="body2">{file.name}</Typography>}>
            <Box sx={{ width: { xs: '12ex', md: '15ex', lg: '17ex' } }}>
              <Box
                sx={{
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  fontSize: '1.6ex',
                  width: '100%',
                  overflow: 'hidden'
                }}
              >
                {file.name}
              </Box>
            </Box>
          </Tooltip>
        }
        subheader={
          <Box>
            {file.type} T:{file.tokens} {bytesFormat(file.size)}
          </Box>
        }
        action={
          <Stack direction="row" spacing={0}>
            <DownloadButton url={`${urlComplete}?d=1`} name={file.name} />
            <DownloadButton url={`${apiUrl}/shared-file/zip/${id}/${url}`} name={file.name} variant="zip" />
          </Stack>
        }
      />
    </Card>
  );
}

interface FileElementProps {
  file: FileI;
  arrayIndex: number;
  sf?: boolean;
}

export default function FileElement({ file, arrayIndex }: FileElementProps) {
  const { name, size, type, mime_type, extension, tokens } = file;
  const { id } = useParams();
  const session = useSelector((state) => state.session);
  const sharedfile = useSelector((state) => state.sharedfile);
  const pathSelected = sharedfile.path;

  const diagonal = pathSelected ? '/' : '';

  const url = `${sharedfile.path}${diagonal}${name}`;
  const urlComplete = `${apiUrl}/shared-file/tokens/user/content/${id}/${sharedfile.path}${diagonal}${name}?t=${session.access_token}`;

  const onClickFolder = () => {
    setPathSF(url);
  };

  if (type === 'file') {
    if (mime_type.includes('image/')) {
      return (
        <FileInfo file={{ name, size, tokens, type, mime_type, extension }} url={url} urlComplete={urlComplete} sf>
          <ImagePreview url={urlComplete} arrayIndex={arrayIndex} />
        </FileInfo>
      );
    }
    if (mime_type.includes('video')) {
      return (
        <FileInfo file={{ name, size, tokens, type, mime_type, extension }} url={url} urlComplete={urlComplete} sf>
          <VideoFile url={urlComplete} nameFile={name} />
        </FileInfo>
      );
    }
    return (
      <FileInfo file={{ name, size, tokens, type, mime_type, extension }} url={url} urlComplete={urlComplete} sf>
        <OtherFile url={urlComplete} />
      </FileInfo>
    );
  }

  return (
    <FileInfo file={{ name, size, tokens, type, mime_type, extension }} url={url} urlComplete={urlComplete} sf>
      <Folder click={onClickFolder} />
    </FileInfo>
  );
}
