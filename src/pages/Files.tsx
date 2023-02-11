import { useEffect } from 'react';
import { RouteBar } from '../components/files/routebar';
import { Box, Grid, Stack, Card, CardContent } from '@mui/material';
import FileElement from '../components/files/FileElement';
import AddFolder from '../components/files/AddFolder';
import UploadSingleFile from '../components/files/UploadSingleFile';
import { useSnackbar } from 'notistack';
import DropFiles from '../components/files/DropFiles';

// redux
import { useDispatch, useSelector } from '../redux/store';
import { setFiles, onSetInterval, cancelInterval } from '../redux/slices/session';
// api
import { getListFiles, FileP } from '../api/files';
import { isAxiosError } from 'axios';

export default function Files() {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { access_token, path, files } = useSelector((state) => state.session);

  useEffect(() => {
    cancelInterval();
    async function getFiles() {
      const { list } = await getListFiles(path, access_token).catch((err) => {
        if (isAxiosError(err)) {
          enqueueSnackbar(err.response?.data.message, { variant: 'error' });
        } else {
          enqueueSnackbar('Error al obtener los archivos', { variant: 'error' });
        }
        dispatch(setFiles([]));
        return { list: [] };
      });
      dispatch(setFiles(list));
    }
    getFiles();
    onSetInterval(
      setInterval(() => {
        getFiles();
      }, 1000)
    );
  }, [access_token, path]);

  return (
    <>
      <Card sx={{ margin: '1ex' }}>
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs={9}>
              <RouteBar path={path} />
            </Grid>
            <Grid item xs={3}>
              <Stack spacing={1} direction="row">
                <UploadSingleFile />
                <AddFolder />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <DropFiles />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Box sx={{ width: '100vw', height: '85%', marginTop: '2ex' }}>
        <Grid container spacing={2}>
          {files.map((file: FileP, i) => (
            <Grid item key={file.name + i} xs={6} md={3} lg={2}>
              <FileElement {...file} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
