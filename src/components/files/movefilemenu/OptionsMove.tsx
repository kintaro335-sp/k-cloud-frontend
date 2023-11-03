import { useState, useEffect } from 'react';
import { Button, MenuItem, Dialog, AppBar, DialogContent, Grid, IconButton, Toolbar, Box, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { RouteBar } from '../routebar';
import FolderElement from './FolderElement';
import { useSnackbar } from 'notistack';
// icons
import { Icon } from '@iconify/react';
import CloseIcon from '@iconify/icons-material-symbols/close';
import moveIcon from '@iconify/icons-material-symbols/drive-file-move';
// redux
import { useSelector } from '../../../redux/store';
// api
import { moveFile, getListFiles } from '../../../api/files';
// types
import { FileI } from '../../../@types/files';

interface OptionMoveProps {
  pathFrom: string;
  filesToMove: string[];
  menuItem?: boolean;
  onClose?: VoidFunction;
}

export default function OptionMove({ pathFrom, filesToMove, menuItem = false, onClose }: OptionMoveProps) {
  const { enqueueSnackbar } = useSnackbar();
  const { access_token } = useSelector((state) => state.session);
  const [pathTo, setPathTo] = useState('');
  const [files, setFiles] = useState<FileI[]>([]);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const clickOpen = () => {
    setOpen(true);
  };

  const clickClose = () => {
    setOpen(false);
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  useEffect(() => {
    async function getFiles() {
      const listfiles = await getListFiles(pathTo, access_token);
      setFiles(listfiles.list);
    }
    getFiles();
  }, [pathTo, access_token]);

  const clickMove = async () => {
    setLoading(true);
    if (filesToMove.length === 1) {
      await moveFile(pathFrom, pathTo, filesToMove[0], access_token).then(() => {
        enqueueSnackbar('file moved success', { variant: 'success' });
      });
      setLoading(false);
    } else if (filesToMove.length !== 0) {
    }
    clickClose();
  };

  const allowMove = pathFrom === pathTo;

  return (
    <>
      {menuItem ? (
        <MenuItem onClick={clickOpen}>
          <Icon icon={moveIcon} width="22px" height="22px" /> Mover
        </MenuItem>
      ) : (
        <Button variant="contained" onClick={clickOpen}>
          Mover
        </Button>
      )}
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
            {files.map((f, i) => {
              if (f.name === filesToMove[0] && pathFrom === pathTo) return;
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
