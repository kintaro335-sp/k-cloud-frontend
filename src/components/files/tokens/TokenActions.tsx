import { Stack, IconButton } from '@mui/material';
import { CopyClipboard } from '../../atoms';
// icons
import { Icon } from '@iconify/react';
import deleteIcon from '@iconify/icons-ant-design/delete-fill';
import { useSnackbar } from 'notistack';
// redux
import { useSelector } from '../../../redux/store';
// api
import { deleteToken } from '../../../api/sharedfiles';

interface TokenActionsProps {
  id: string;
}

export default function TokenActions({ id }: TokenActionsProps) {
  const { access_token } = useSelector((state) => state.session);
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async () => {
    if (window.confirm(`desea eliminar ${id}?`)) {
      await deleteToken(id, access_token);
      enqueueSnackbar('eliminado', { variant: 'success' });
    }
  };

  const urlToken = `${window.origin}/shared-files/id/${id}`;

  return (
    <Stack direction="row">
      <IconButton onClick={handleDelete}>
        <Icon icon={deleteIcon} width="33px" height="33px" />
      </IconButton>
      <CopyClipboard url={urlToken} />
    </Stack>
  );
}