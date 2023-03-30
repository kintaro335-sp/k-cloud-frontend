import { IconButton } from '@mui/material';
// icons
import { Icon } from '@iconify/react';
import DownloadIcon from '@iconify/icons-ant-design/download-outlined';

interface DownloadButtonProps {
  url: string;
  name: string;
}

export default function DownloadButton({ url, name }: DownloadButtonProps) {
  return (
    <IconButton href={url} download={name} LinkComponent="a">
      <Icon icon={DownloadIcon} width="30px" height="30px" />
    </IconButton>
  );
}
