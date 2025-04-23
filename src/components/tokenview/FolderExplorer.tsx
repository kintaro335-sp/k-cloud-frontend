/*
 * k-cloud-frontend
 * Copyright(c) Kintaro Ponce
 * MIT Licensed
 */

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// mui
import { Grid, Box, Stack, Typography } from '@mui/material';
import { RouteBar } from '../files/routebar';
import FileElement from './FileElement';
import Loading from '../../pages/Loading';
// redux
import { useSelector } from '../../redux/store';
import { setPath, setContent } from '../../redux/slices/tokenview';
// api
import { getContentTokenByUser, getContentTokenPathByUser } from '../../api/sharedfiles';
// utils
import { fullDateFormat } from '../../utils/dateformat';

export default function FolderExplorer() {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { path, content, info } = useSelector((state) => state.tokenview);
  const { access_token } = useSelector((state) => state.session);
  const [showQ, setShowQ] = useState<number>(48);

  const handleShowMore = () => {
    setShowQ((prev) => prev + 4);
  };

  useEffect(() => {
    async function getContentEffect(path_a: string = '') {
      if (id === undefined) return;
      setLoading(true);
      setShowQ(48);
      if (path === '') {
        const content = await getContentTokenByUser(id, access_token);
        setContent(content.list);
        setLoading(false);
      } else {
        const content = await getContentTokenPathByUser(id, path, access_token);
        if (path === path_a) {
          setContent(content.list);
          setLoading(false);
        }
      }
    }
    getContentEffect(path);
  }, [path, id]);

  return (
    <Box>
      <Box sx={{ margin: '5px' }}>
        <Stack spacing={2} direction="column">
          <Stack spacing={1} direction="row">
            <Typography variant="h5">{info?.name}</Typography>
            <Typography variant="body1">Creado: {fullDateFormat(info?.createdAt || 0)}</Typography>
            {info?.expire && <Typography variant="body1">expira: {fullDateFormat(info?.expires)}</Typography>}
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
      <Box
        sx={{ height: '74vh', overflowY: 'scroll' }}
        onScroll={(e) => {
          const { scrollTop, scrollHeight } = e.currentTarget;
          if (scrollTop / scrollHeight >= 0.82) {
            handleShowMore();
          }
        }}
      >
        {loading && <Loading width="100%" height="100%" />}
        {!loading && (
          <Grid container spacing={2}>
            {content.slice(0, showQ).map((file, i) => (
              <Grid key={`${file.name}-${i}`} item xs={12} md={4} lg={3}>
                <FileElement file={file} arrayIndex={i} context="tokenView" />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
}
