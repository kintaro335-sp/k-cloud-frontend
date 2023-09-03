import { useState, useRef } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { CustomDialog } from '../molecules';
import NewTokenForm from '../files/tokens/NewTokenForm';
import { TokenElement } from '../../@types/sharedfiles';
import { useSnackbar } from 'notistack';
// icons
import { Icon } from '@iconify/react';
import iconMoreOptions from '@iconify/icons-ant-design/more-outline';
import iconEdit from '@iconify/icons-material-symbols/edit';
import iconDelete from '@iconify/icons-ant-design/delete-outlined';
// redux
import { useSelector } from '../../redux/store';
// api
import { deleteToken } from '../../api/sharedfiles';

interface TokenMenuProps {
  token: TokenElement;
}

export default function TokenMenu({ token }: TokenMenuProps) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const { enqueueSnackbar } = useSnackbar();
  const { access_token } = useSelector((state) => state.session);

  const clickOpen = () => {
    setOpen(true);
  };

  const clickClose = () => {
    setOpen(false);
  };

  const handleDeleteToken = async () => {
    if (window.confirm(`desea eliminar ${token.id}?`)) {
      await deleteToken(token.id, access_token);
      enqueueSnackbar('Token Eliminado', { variant: 'success' });
    }
  };

  return (
    <>
      <IconButton onClick={clickOpen} ref={anchorRef}>
        <Icon icon={iconMoreOptions} width="25px" height="height" />
      </IconButton>
      <Menu open={open} onClose={clickClose} anchorEl={anchorRef.current}>
        <CustomDialog
          Button={(onlcickB) => (
            <MenuItem onClick={onlcickB}>
              <Icon icon={iconEdit} width="25px" height="25px" /> Editar
            </MenuItem>
          )}
        >
          <NewTokenForm url="" edit token={token} />
        </CustomDialog>
        <MenuItem onClick={handleDeleteToken}>
          <Icon icon={iconDelete} width="25px" height="25px" /> Eliminar
        </MenuItem>
      </Menu>
    </>
  );
}
