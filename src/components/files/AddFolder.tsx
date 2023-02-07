import { useState, useRef } from 'react';
import { Button, TextField, Paper, Grid, Stack } from '@mui/material';
import { Icon } from '@iconify/react';
import folderAddIcon from '@iconify/icons-ant-design/folder-add-filled';
import { useSnackbar } from 'notistack';

// api
import { createFolder, getListFiles } from '../../api/files';

// redux
import { setFiles } from '../../redux/slices/session';
import { useSelector, useDispatch } from '../../redux/store';

export default function AddFolder() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { path, access_token } = useSelector((state) => state.session);

  const clickOpen = () => {
    setOpen(true);
  };

  const clickClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        onClick={clickOpen}
        ref={anchorRef}
        variant="contained"
        startIcon={<Icon icon={folderAddIcon} width="25px" height="25px" />}
      >
        Agregar Carpeta
      </Button>
      {open && (
        <Paper sx={{ position: 'fixed', zindex: 9999, top: '133px', padding: '8px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Nombre"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                onKeyDown={(e) => {
                  const KeyP = e.key;
                  if (KeyP === 'Enter') {
                    if (name !== '' && !['/'].includes(name)) {
                      createFolder(`${path}/${name}`, access_token).then((res) => {
                        enqueueSnackbar(res.message, { variant: 'success' });
                        getListFiles(path, access_token).then((response) => {
                          dispatch(setFiles(response.list));
                          clickClose();
                          setName('');
                          setOpen(false);
                        });
                      });
                    } else {
                      enqueueSnackbar('Nombre no valido', { variant: 'error' });
                    }
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1} direction="row">
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Cancelar
                </Button>{' '}
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => {
                    if (name !== '' && !['/'].includes(name)) {
                      createFolder(`${path}/${name}`, access_token).then((res) => {
                        enqueueSnackbar(res.message, { variant: 'success' });
                        getListFiles(path, access_token).then((response) => {
                          dispatch(setFiles(response.list));
                          clickClose();
                          setName('');
                          setOpen(false);
                        });
                      });
                    } else {
                      enqueueSnackbar('Nombre no valido', { variant: 'error' });
                    }
                  }}
                >
                  Crear
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      )}
    </>
  );
}
