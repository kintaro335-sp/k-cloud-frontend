import { useState, useEffect } from 'react';
import { Button, MenuItem, Dialog, AppBar, DialogContent, Grid, IconButton, Toolbar, Box } from '@mui/material';
import { RouteBar } from '../routebar';
import FolderElement from './FolderElement';
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
}

export default function OptionMove({ pathFrom, filesToMove, menuItem = false }: OptionMoveProps) {
  const { access_token } = useSelector((state) => state.session);
  const [pathTo, setPathTo] = useState('');
  const [files, setFiles] = useState<FileI[]>([]);

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
      setFiles(listfiles.list);
    }
    getFiles();
  }, [pathTo, access_token]);

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
      <Dialog open={open} onClose={clickClose} fullScreen>
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
              title="Ruta"
              path={pathTo}
              onChangePath={(newPath) => {
                setPathTo(newPath);
              }}
            />
          </Box>
          <Grid container spacing={2}>
            {files.map((f, i) => (
              <Grid item xs={12} md={6} lg={3} key={i}>
                <FolderElement file={f} click={() => {}} />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}
