import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, Box, IconButton, Menu, TextField } from '@mui/material';
import { Icon } from '@iconify/react';
import folderAddIcon from '@iconify/icons-ant-design/folder-add-filled';
import { useSnackbar } from 'notistack';

// api
import { createFolder, getListFiles } from '../../api/files';

// redux
import { SessionState, setFiles } from '../../redux/slices/session';
import { useSelector, useDispatch } from '../../redux/store';

export default function AddFolder() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const anchorRef = useRef<HTMLButtonElement>(null);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { path, access_token } = useSelector((state: { session: SessionState }) => state.session);

  const clickOpen = () => {
    setOpen(true);
  };

  const clickClose = () => {
    setOpen(false);
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', aligItems: 'center', justifyContent: 'center', width: '100%' }}>
          <IconButton onClick={clickOpen} ref={anchorRef}>
            <Icon icon={folderAddIcon} width="220px" height="220px" />
          </IconButton>
          <Menu open={open} onClose={clickClose} anchorEl={anchorRef.current}>
            <TextField
              label="Nombre"
              variant="outlined"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              onKeyDown={(e) => {
                const KeyP = e.key;
                if (KeyP === 'Enter') {
                  if (name !== '' && !['/'].includes(name)) {
                    createFolder(`${path}${name}`, access_token).then((res) => {
                      enqueueSnackbar(res.message, { variant: 'success' });
                      getListFiles(path, access_token).then((response) => {
                        dispatch(setFiles(response.list));
                        clickClose();
                        setName('');
                      });
                    });
                  } else {
                    enqueueSnackbar('Nombre no valido', { variant: 'error' });
                  }
                }
              }}
            />
          </Menu>
        </Box>
      </CardContent>
      <CardHeader title="Nueva Carpeta" />
    </Card>
  );
}
