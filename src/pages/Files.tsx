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
import { setFiles, setTree, onSetInterval, cancelFilesInterval, setPath } from '../redux/slices/session';
// api
import { getListFiles, getTreeAPI } from '../api/files';
import { isAxiosError } from 'axios';
import { FileI } from '../@types/files';

export default function Files() {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { access_token, path, files } = useSelector((state) => state.session);

  useEffect(() => {
    cancelFilesInterval();
    async function getFiles() {
      const { list } = await getListFiles(path, access_token).catch((err) => {
        if (isAxiosError(err)) {
          if(err.code === '404'){
            dispatch(setPath(''))
          }
          enqueueSnackbar('Network error', { variant: 'error' });
        } else {
          enqueueSnackbar('Error al obtener los archivos', { variant: 'error' });
        }
        dispatch(setFiles([]));
        return { list: [] };
      });
      dispatch(setFiles(list));
      const tree = await getTreeAPI('', access_token).catch((err) => {
        if (isAxiosError(err)) {
          enqueueSnackbar(err.response?.data.message, { variant: 'error' });
        } else {
          enqueueSnackbar('Error al obtener los archivos', { variant: 'error' });
        }
        return [];
      });
      dispatch(setTree(tree));
    }
    getFiles();

    onSetInterval(
      // @ts-ignore
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
              <RouteBar
                path={path}
                onChangePath={(newPath) => {
                  dispatch(setPath(newPath));
                }}
              />
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
      <Box sx={{ width: '100%', height: '68%', marginTop: '2ex', overflowY: 'scroll' }}>
        <Grid container spacing={2}>
          {files.map((file: FileI, i) => (
            <Grid item key={file.name + i} xs={6} md={3} lg={2}>
              <FileElement file={file} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
