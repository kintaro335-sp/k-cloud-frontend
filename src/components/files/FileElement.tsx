import { Box } from '@mui/material';
import { ImgFile } from './filetypes';
// api
import { File } from '../../api/files';
import { apiUrl } from '../../config';

// redux
import { SessionState } from '../../redux/slices/session';
import { useSelector } from '../../redux/store';

export default function FileElement({ name, extension, size, type, mime_type }: File) {
  const { path, access_token } = useSelector((state: { session: SessionState }) => state.session);
  const diagonal = path? '/' : '';

  const url = `${apiUrl}/files/${path}${diagonal}${name}?t=${access_token}`;

  if (type === 'file') {
    if (mime_type.includes('image')) {
      return <ImgFile url={url} />;
    }
  }

  return <Box></Box>;
}
