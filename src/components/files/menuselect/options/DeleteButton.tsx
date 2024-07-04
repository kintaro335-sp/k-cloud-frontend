import { Button } from '@mui/material';
import { useSnackbar } from 'notistack';
// redux
import { useSelector } from '../../../../redux/store';
// hooks
import useFileSelect from '../../../../hooks/useFileSelect';
// api
import { deleteSelectedFiles } from '../../../../api/files';

export default function DeleteButton() {
  const { enqueueSnackbar } = useSnackbar();
  const { access_token, path } = useSelector((state) => state.session);
  const { files, clearSelect } = useFileSelect();

  const handleDeleteFiles = () => {
    if (window.confirm(`desea eliminar ${files.length} archivos`)) {
      deleteSelectedFiles(path, files, access_token).then((result) => {
        enqueueSnackbar(`Eliminando Archivos`, { variant: 'success' });
        clearSelect();
      });
    }
  };

  return <Button onClick={handleDeleteFiles}>Eliminar</Button>;
}
