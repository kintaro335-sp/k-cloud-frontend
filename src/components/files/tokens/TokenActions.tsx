import { Stack, IconButton, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { CopyClipboard } from '../../atoms';
import { CustomDialog } from '../../molecules';
import NewTokenForm from './NewTokenForm';
// icons
import { Icon } from '@iconify/react';
import deleteIcon from '@iconify/icons-ant-design/delete-fill';
import editIcon from '@iconify/icons-material-symbols/edit';
import { useSnackbar } from 'notistack';
// redux
import { useSelector } from '../../../redux/store';
// api
import { deleteToken } from '../../../api/sharedfiles';
import { TokenElement } from '../../../@types/sharedfiles';

interface TokenActionsProps {
  id: string;
  token: TokenElement;
}

export default function TokenActions({ id, token }: TokenActionsProps) {
  const { access_token } = useSelector((state) => state.session);
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();

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
        <Icon icon={deleteIcon} width="33px" height="33px" color={theme.palette.text.primary} />
      </IconButton>
      <CustomDialog
        Button={(onClick) => (
          <MenuItem onClick={onClick}>
            <Icon icon={editIcon} width="25px" height="25px" />
          </MenuItem>
        )}
      >
        <NewTokenForm url="" edit token={token} />
      </CustomDialog>
      <CopyClipboard url={urlToken} />
    </Stack>
  );
}
