import { useTheme } from '@mui/material/styles';
import { IconButton, Tooltip } from '@mui/material';
// icon
import { Icon } from '@iconify/react';
import CopyclipIcon from '@iconify/icons-material-symbols/content-copy';
// notistack
import { useSnackbar } from 'notistack';

interface CopyClipboardProps {
  url: string;
  title?: string;
}

export default function CopyClipboard({ url, title }: CopyClipboardProps) {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const onClickCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      enqueueSnackbar('copiado', { variant: 'success' });
    });
  };

  return (
    <Tooltip title={title || 'Copiar al Portapapeles'}>
      <IconButton onClick={onClickCopy}>
        <Icon icon={CopyclipIcon} width="20px" height="20px" color={theme.palette.text.secondary} />
      </IconButton>
    </Tooltip>
  );
}
