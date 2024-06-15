import { FileType } from '../../@types/files';
import { explorerContext } from '../../@types/general';
import { Box } from '@mui/material';
import { Icon } from '@iconify/react';
import FileIcon from '@iconify/icons-ant-design/file';
import FolderIcon from '@iconify/icons-ant-design/folder';
import { VideoFile } from '../files/filetypes';
import { ImgFileT } from '../sharedfiles/filetypes';

export default function TokenIcon({ type, mime_type, url, context }: { type: FileType; mime_type: string; url: string, context: explorerContext }) {
  const name = url.split('/').pop() || '';

  if (type === 'folder') {
    return (
      <Box sx={{ display: 'inline-block' }}>
        <Icon icon={FolderIcon} width="250px" height="250px" />
      </Box>
    );
  }

  if (mime_type.includes('video/')) {
    return <VideoFile url={url} nameFile={name} />;
  }

  if (mime_type.includes('image/')) {
    return <ImgFileT url={url} context={context}  />;
  }

  return (
    <Box sx={{ display: 'inline-block' }}>
      <Icon icon={FileIcon} width="250px" height="250px" />
    </Box>
  );
}
