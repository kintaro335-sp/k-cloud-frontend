import { useTheme } from '@mui/material/styles'
import { IconButton } from '@mui/material';
// icons
import { Icon } from '@iconify/react';
import DownloadIcon from '@iconify/icons-ant-design/download-outlined';

interface DownloadButtonProps {
  url: string;
  name: string;
}

export default function DownloadButton({ url, name }: DownloadButtonProps) {
  const theme = useTheme()
  return (
    <IconButton href={url} download={name} LinkComponent="a">
      <Icon icon={DownloadIcon} width="30px" height="30px" color={theme.palette.text.secondary} />
    </IconButton>
  );
}
