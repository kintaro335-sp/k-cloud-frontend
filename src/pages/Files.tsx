import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteBar } from '../components/files/routebar';
import { Box, Grid, Card, CardContent } from '@mui/material';
import FileElement from '../components/files/FileElement';
import AddFolder from '../components/files/AddFolder';
import UpFolder from '../components/files/UpFolder';
import { useSnackbar } from 'notistack';
import DropFiles from '../components/files/DropFiles';

// redux
import { useDispatch, useSelector } from '../redux/store';
import { setFiles } from '../redux/slices/session';
// api
import { getListFiles, FileP } from '../api/files';

export default function Files() {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { access_token, path, files } = useSelector((state) => state.session);

  useEffect(() => {
    async function getFiles() {
      const { list } = await getListFiles(path, access_token).catch(() => {
        dispatch(setFiles([]));
        enqueueSnackbar('Error al obtener los archivos', { variant: 'error' });
        return { list: [] };
      });
      dispatch(setFiles(list));
    }
    getFiles();
  }, [access_token, path]);

  return (
    <>
      <Card sx={{ margin: '1ex' }}>
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <RouteBar path={path} />
            </Grid>
            <Grid item xs={12}>
              <DropFiles />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Box sx={{ width: '100vw', height: '85%', marginTop: '2ex' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} lg={3}>
            <AddFolder />
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
