import { useTheme } from '@mui/material/styles';
import { IconButton, Tooltip } from '@mui/material';
// icons
import { Icon } from '@iconify/react';
import DownloadIcon from '@iconify/icons-ant-design/download-outlined';
import FolderZipIcon from '@iconify/icons-material-symbols/folder-zip';

interface DownloadButtonProps {
  url: string;
  name: string;
  variant?: 'normal' | 'zip';
}

export default function DownloadButton({ url, name, variant = 'normal' }: DownloadButtonProps) {
  const theme = useTheme();

  const getIcon = () => {
    switch (variant) {
      case 'zip':
        return FolderZipIcon;
      case 'normal':
      default:
        return DownloadIcon;
    }
  };

  return (
    <Tooltip title={variant === 'normal' ? 'Download' : 'Download as Zip'}>
      <IconButton href={url} download={name} LinkComponent="a">
        <Icon icon={getIcon()} width="30px" height="30px" color={theme.palette.text.secondary} />
      </IconButton>
    </Tooltip>
  );
}
