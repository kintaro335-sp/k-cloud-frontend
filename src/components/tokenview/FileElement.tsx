import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, Box, Tooltip, Typography, Stack } from '@mui/material';
import { Folder } from '../files/filetypes';
import { FileIcon } from '../../components/atoms';
import { DownloadButton } from '../atoms/';
import { bytesFormat } from '../../utils/files';
import { FileI } from '../../@types/files';
// api
import { apiUrl } from '../../config';

// redux
import { useSelector, useDispatch } from '../../redux/store';
import { setPath as setPathSF } from '../../redux/slices/tokenview';
import { explorerContext } from '../../@types/general';

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
  context?: explorerContext;
}

export default function FileElement({ file, arrayIndex, context = 'default' }: FileElementProps) {
  const { name, size, type, mime_type, extension, tokens } = file;
  const { id } = useParams();
  const session = useSelector((state) => state.session);
  const sharedfile = useSelector((state) => state.tokenview);
  const pathSelected = sharedfile.path;

  const diagonal = pathSelected === '' ? '' : '/';

  const url = `${sharedfile.path}${diagonal}${name}`;
  const urlComplete = `${apiUrl}/shared-file/tokens/user/content/${id}/${sharedfile.path}${diagonal}${name}?t=${session.access_token}`;

  const onClickFolder = () => {
    setPathSF(url);
  };

  if (type === 'file') {
    return (
      <FileInfo file={{ name, size, tokens, type, mime_type, extension }} url={url} urlComplete={urlComplete} sf>
        <FileIcon type={type} mime_type={mime_type} url={urlComplete} context={context} arrayIndex={arrayIndex} />
      </FileInfo>
    );
  }

  return (
    <FileInfo file={{ name, size, tokens, type, mime_type, extension }} url={url} urlComplete={urlComplete} sf>
      <Folder click={onClickFolder} />
    </FileInfo>
  );
}
