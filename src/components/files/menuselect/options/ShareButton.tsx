import { Button } from '@mui/material';
// icon
import { Icon } from '@iconify/react';
import shareIcon from '@iconify/icons-material-symbols/share';
import { useSnackbar } from 'notistack';
// redux
import { useSelector } from '../../../../redux/store';
// hooks
import useFileSelect from '../../../../hooks/useFileSelect';
// api
import { shareMultipleFiles } from '../../../../api/sharedfiles';

export default function ShareButton() {
  const { enqueueSnackbar } = useSnackbar();
  const { path, access_token } = useSelector((state) => state.session);
  const { files, clearSelect } = useFileSelect();

  const onClickShare = () => {
    shareMultipleFiles(path, files, access_token).then((result) => {
      enqueueSnackbar(`Compartido ${result.length} Archivos`, { variant: 'success' });
    });
    clearSelect();
  };

  return (
    <Button onClick={onClickShare}>
      <Icon icon={shareIcon} width="17px" height="17px" />
      Compartir
    </Button>
  );
}
