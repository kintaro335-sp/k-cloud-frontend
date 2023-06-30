import { Button } from '@mui/material';
import { useSnackbar } from 'notistack';

// hooks
import useFileSelect from '../../../../hooks/useFileSelect';
// redux
import { useSelector } from '../../../../redux/store';
// api
import { StopShareFiles } from '../../../../api/sharedfiles';

export default function StopShareButton() {
  const { files, clearSelect } = useFileSelect();
  const { path, access_token } = useSelector((state) => state.session);
  const { enqueueSnackbar } = useSnackbar();

  const onClickStopShare = () => {
    enqueueSnackbar(`Compartiendo ${files.length} archivos`, { variant: 'success' });
    StopShareFiles(path, files, access_token).then((result) => {
      let count = 0;
      result.forEach((n) => {
        count += n;
      });
      enqueueSnackbar(`Compartidos ${count} de ${result.length} Archivos`, { variant: 'success' });
    });
    clearSelect();
  };

  return <Button onClick={onClickStopShare}>Dejar de Compartir</Button>;
}
