import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
// mui
import { Grid, Box, Stack, Typography } from '@mui/material';
import { RouteBar } from '../files/routebar';
import FileElement from '../files/FileElement';
// redux
import { useSelector } from '../../redux/store';
import { setPath, setContent } from '../../redux/slices/sharedfile';
// api
import { getContentToken, getContentTokenPath } from '../../api/sharedfiles';
// moment
import moment from 'moment';

export default function FolderExplorer() {
  const { id } = useParams();
  const { path, content, info } = useSelector((state) => state.sharedfile);

  useEffect(() => {
    async function getContentEffect() {
      if (id === undefined) return;
      if (path === '') {
        const content = await getContentToken(id);
        setContent(content.list);
      } else {
        const content = await getContentTokenPath(id, path);
        setContent(content.list);
      }
    }
    getContentEffect();
  }, [path, id]);

  return (
    <Box>
      <Box sx={{ margin: '5px' }}>
        <Stack spacing={2} direction="column">
          <Stack spacing={1} direction="row">
            <Typography variant="h5">{info?.name}</Typography>
            <Typography variant="body1">Creado: {moment(info?.createdAt).format('YYYY-MM-DD h:mm:s a')}</Typography>
            {info?.expire && (
              <Typography variant="body1">expira: {moment(info?.expires).format('YYYY-MM-DD h:mm:s a')}</Typography>
            )}
          </Stack>
          <RouteBar
            title={info?.name}
            path={path}
            onChangePath={(newPath) => {
              setPath(newPath);
            }}
          />
        </Stack>
      </Box>
      <Box sx={{ height: '74vh', overflowY: 'scroll' }}>
        <Grid container spacing={2}>
          {content.map((file, i) => (
            <Grid key={`${file.name}-${i}`} item xs={6} md={3} lg={2}>
              <FileElement file={file} sf />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
