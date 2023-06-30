import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, Box, Tooltip, Typography, Stack, Checkbox } from '@mui/material';
import { ImgFile, VideoFile, OtherFile, Folder } from './filetypes';
import MenuFile from './MenuFile';
import { DownloadButton } from '../atoms/';
import { bytesFormat } from '../../utils/files';
import { FileI } from '../../@types/files';
// hooks
import useFileSelect from '../../hooks/useFileSelect';
// api
import { apiUrl } from '../../config';

// redux
import { useSelector, useDispatch } from '../../redux/store';
import { setPath as setPathSession } from '../../redux/slices/session';
import { setPath as setPathSF } from '../../redux/slices/sharedfile';
//css
import './css/fileelement.css';

interface FileInfoProps {
  file: FileI;
  children: JSX.Element;
  url: string;
  urlComplete: string;
  sf?: boolean;
}

function FileInfo({ file, children, url, urlComplete, sf }: FileInfoProps) {
  const { id } = useParams();
  const { files, select, deselect } = useFileSelect();
  const selected = files.includes(file.name);
  return (
    <Card className="cardfile">
      <CardContent>
        {!sf && (
          <Box
            sx={{ display: selected ? 'block !important' : undefined, top: '20px', zIndex: 100 }}
            className="checkfile"
          >
            <Checkbox
              checked={selected}
              onClick={() => {
                selected ? deselect(file.name) : select(file.name);
              }}
            />
          </Box>
        )}
        {children}
      </CardContent>
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
            {file.type} {!sf && <>T:{file.tokens}</>} {bytesFormat(file.size)}
          </Box>
        }
        action={
          sf ? (
            <Stack direction="row" spacing={0}>
              {file.type === 'file' ? (
                <DownloadButton url={`${urlComplete}?d=1`} name={file.name} />
              ) : (
                <DownloadButton url={`${apiUrl}/shared-file/zip/${id}/${url}`} name={file.name} variant="zip" />
              )}
            </Stack>
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
  arrayIndex: number;
  sf?: boolean;
}

export default function FileElement({ file, sf = false, arrayIndex }: FileElementProps) {
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
    if (mime_type.includes('image/')) {
      return (
        <FileInfo file={{ name, size, tokens, type, mime_type, extension }} url={url} urlComplete={urlComplete} sf={sf}>
          <ImgFile url={urlComplete} arrayIndex={arrayIndex} sfc={sf} />
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
