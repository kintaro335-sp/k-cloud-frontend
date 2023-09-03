import { FileType } from '../../@types/files';
import { Box } from '@mui/material';
import { Icon } from '@iconify/react';
import FileIcon from '@iconify/icons-ant-design/file';
import FolderIcon from '@iconify/icons-ant-design/folder';
import { VideoFile } from '../files/filetypes';
import { ImgFileT } from '../sharedfiles/filetypes';

export default function TokenIcon({ type, mime_type, url }: { type: FileType; mime_type: string; url: string }) {
  if (type === 'folder') {
    return (
      <Box sx={{ display: 'inline-block' }}>
        <Icon icon={FolderIcon} width="250px" height="250px" />
      </Box>
    );
  }

  if (mime_type.includes('video/')) {
    return <VideoFile url={url} />;
  }

  if (mime_type.includes('image/')) {
    return <ImgFileT url={url} />;
  }

  return (
    <Box sx={{ display: 'inline-block' }}>
      <Icon icon={FileIcon} width="250px" height="250px" />
    </Box>
  );
}
