import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, Box, Tooltip, Typography, Stack } from '@mui/material';
import { CopyClipboard } from '../atoms';
import { ImgFile, VideoFile, OtherFile, Folder } from './filetypes';
import MenuFile from './MenuFile';
import DownloadButton from './DownloadButton';
import Numeral from 'numeral';
import { FileI } from '../../@types/files';
// api
import { apiUrl } from '../../config';

// redux
import { useSelector, useDispatch } from '../../redux/store';
import { setPath as setPathSession } from '../../redux/slices/session';
import { setPath as setPathSF } from '../../redux/slices/sharedfile';

interface FileInfoProps {
  file: FileI;
  children: JSX.Element;
  url: string;
  urlComplete: string;
  sf?: boolean;
}

function FileInfo({ file, children, url, urlComplete, sf }: FileInfoProps) {
  return (
    <Card>
      <CardContent>{children}</CardContent>
      <CardHeader
        title={
          <Tooltip title={<Typography>{file.name}</Typography>}>
            <Box sx={{ width: '9ex' }}>
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
            {file.type} {!sf && <>T:{file.tokens}</>} {file.type === 'file' && Numeral(file.size).format('0.0 ib')}
          </Box>
        }
        action={
          sf ? (
            file.type === 'file' && (
              <Stack direction="row" spacing={2}>
                <DownloadButton url={`${urlComplete}?d=1`} name={file.name} />
                <CopyClipboard url={urlComplete} title="Compiar Enlace Directo" />
                <CopyClipboard url={`${urlComplete}?d=1`} title="Compiar Enlace de Descarga" />
              </Stack>
            )
          ) : (
            <MenuFile url={url} file={file} urlComplete={urlComplete} />
          )
        }
      />
    </Card>
  );
}

interface FileElementProps {
  file: FileI;
  sf?: boolean;
}

export default function FileElement({ file, sf = false }: FileElementProps) {
  const { name, size, type, mime_type, extension, tokens } = file;
  const { id } = useParams();
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session);
  const sharedfile = useSelector((state) => state.sharedfile);
  const pathSelected = sf ? sharedfile.path : session.path;

  const diagonal = pathSelected ? '/' : '';

  const url = sf ? `${sharedfile.path}${diagonal}${name}` : `${session.path}${diagonal}${name}`;
  const urlComplete = sf
    ? `${apiUrl}/shared-file/content/${id}/${sharedfile.path}${diagonal}${name}`
    : `${apiUrl}/files/list/${session.path}${diagonal}${name}?t=${session.access_token}`;

  const onClickFolder = () => {
    if (sf) {
      setPathSF(url);
    } else {
      dispatch(setPathSession(url));
    }
  };

  if (type === 'file') {
    if (mime_type.includes('/image')) {
      return (
        <FileInfo file={{ name, size, tokens, type, mime_type, extension }} url={url} urlComplete={urlComplete} sf={sf}>
          <ImgFile url={urlComplete} />
        </FileInfo>
      );
    }
    if (mime_type.includes('video')) {
      return (
        <FileInfo file={{ name, size, tokens, type, mime_type, extension }} url={url} urlComplete={urlComplete} sf={sf}>
          <VideoFile url={urlComplete} />
        </FileInfo>
      );
    }
    return (
      <FileInfo file={{ name, size, tokens, type, mime_type, extension }} url={url} urlComplete={urlComplete} sf={sf}>
        <OtherFile url={urlComplete} />
      </FileInfo>
    );
  }

  return (
    <FileInfo file={{ name, size, tokens, type, mime_type, extension }} url={url} urlComplete={urlComplete} sf={sf}>
      <Folder click={onClickFolder} />
    </FileInfo>
  );
}
