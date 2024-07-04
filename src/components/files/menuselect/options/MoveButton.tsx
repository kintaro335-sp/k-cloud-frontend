import { useState, useEffect } from 'react';
import { Button, MenuItem, Dialog, AppBar, DialogContent, Grid, IconButton, Toolbar, Box, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { RouteBar } from '../../routebar';
import { FolderElement } from '../../../atoms';
import { useSnackbar } from 'notistack';
// icons
import { Icon } from '@iconify/react';
import CloseIcon from '@iconify/icons-material-symbols/close';
import moveIcon from '@iconify/icons-material-symbols/drive-file-move';
// hooks
import useFileSelect from '../../../../hooks/useFileSelect';
// redux
import { useSelector } from '../../../../redux/store';
// api
import { getListFiles, moveFiles } from '../../../../api/files';
// types
import { FileI } from '../../../../@types/files';
import { isAxiosError } from 'axios';

export default function OptionMove() {
  const { enqueueSnackbar } = useSnackbar();
  const { files, clearSelect } = useFileSelect();
  const { access_token, path } = useSelector((state) => state.session);
  const [pathTo, setPathTo] = useState('');
  const [filesListE, setFilesListE] = useState<FileI[]>([]);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const clickOpen = () => {
    setOpen(true);
  };

  const clickClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    async function getFiles() {
      const listfiles = await getListFiles(pathTo, access_token);
      setFilesListE(listfiles.list);
    }
    getFiles();
  }, [pathTo, access_token]);

  const clickMove = async () => {
    setLoading(true);
    await moveFiles(path, pathTo, files, access_token)
      .then(() => {
        enqueueSnackbar('file moved success', { variant: 'success' });
        clearSelect();
        setLoading(false);
      })
      .catch((err) => {
        if (isAxiosError(err)) {
          enqueueSnackbar(err.response?.data.message, { variant: 'error' });
        }
        setLoading(false);
      });
    clickClose();
  };

  const allowMove = path === pathTo;

  return (
    <>
      <Button onClick={clickOpen}>Mover</Button>
      <Dialog open={open} onClose={clickClose} maxWidth="lg">
        <AppBar position="relative">
          <Toolbar>
            <IconButton onClick={clickClose}>
              <Icon icon={CloseIcon} width="23px" height="23px" />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Box sx={{ margin: '10px' }}>
            <RouteBar
              title="Destino:/"
              path={pathTo}
              onChangePath={(newPath) => {
                setPathTo(newPath);
              }}
            />
          </Box>
          <Grid container spacing={2} sx={{ minWidth: '400px', minHeight: '150px' }}>
            {filesListE.map((f, i) => {
              if (files.includes(f.name) && files.map((fs) => `${pathTo}/${fs}`).includes(`${pathTo}/${f.name}`))
                return;
              return (
                <Grid item xs={12} md={6} lg={4} key={i}>
                  <FolderElement
                    file={f}
                    click={(filename) => {
                      setPathTo((av) => {
                        const diagonal = av === '' ? '' : '/';
                        return `${av}${diagonal}${filename}`;
                      });
                    }}
                  />
                </Grid>
              );
            })}
          </Grid>
          <Stack>
            <LoadingButton variant="contained" disabled={allowMove} onClick={clickMove} loading={loading}>
              Mover Aqui
            </LoadingButton>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}
