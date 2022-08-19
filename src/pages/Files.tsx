import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import FileElement from '../components/files/FileElement';
import AddFolder from '../components/files/AddFolder';
import AddFile from '../components/files/AddFile';
import UpFolder from '../components/files/UpFolder';
import { useSnackbar } from 'notistack';

// redux
import { useDispatch, useSelector } from '../redux/store';
import { SessionState, setFiles } from '../redux/slices/session';
// api
import { getListFiles, FileP } from '../api/files';
// hooks
import useAuth from '../hooks/useAuth';

export default function Files() {
  const { isAuthenticated } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { access_token, path, files } = useSelector((state: { session: SessionState }) => state.session);

  useEffect(() => {
    async function getFiles() {
      const { list } = await getListFiles(path, access_token).catch(() => {
        dispatch(setFiles([]));
        enqueueSnackbar('Error al obtener los archivos', { variant: 'error' });
        return { list: [] };
      });
      console.log(list);
      dispatch(setFiles(list));
    }
    getFiles();
  }, [access_token, path]);

  return (
    <>
      <Box>Tu Carpeta/{path}</Box>
      <Box sx={{ width: '100vw', height: '85vh' }}>
        {!isAuthenticated && <Navigate to="/login" />}
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} lg={3}>
            <AddFolder />
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <AddFile />
          </Grid>
          {path !== '' && (
            <Grid item xs={12} md={4} lg={3}>
              <UpFolder />
            </Grid>
          )}
          {files?.map((file: FileP, i) => (
            <Grid item key={file.name + i} xs={12} md={4} lg={3}>
              <FileElement {...file} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
