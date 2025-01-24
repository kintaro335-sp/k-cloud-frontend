/*
 * k-cloud-frontend
 * Copyright(c) 2022 Kintaro Ponce
 * MIT Licensed
 */

import { useEffect, useState, useRef } from 'react';
import { RouteBar } from '../components/files/routebar';
import { Grid, Card, CardContent } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import FilesList from '../components/files/FilesList';
import GoToFiles from '../components/files/GoToFiles';
import { useSnackbar } from 'notistack';
import DropFiles from '../components/files/DropFiles';
import { ContextualMenuSelect } from '../components/files/menuselect';
// redux
import { useSelector } from '../redux/store';
import { setFiles, setTree, setPath, addFile, substituteFile } from '../redux/slices/session';
// hooks
import useAuth from '../hooks/useAuth';
// api
import { getListFiles, getTreeAPI } from '../api/files';
import { isAxiosError } from 'axios';
import { UpdateFileEvent } from '../@types/files';
import useFileSelect from '../hooks/useFileSelect';

export default function Files() {
  const theme = useTheme();
  const { socketClient } = useAuth();
  const { access_token, path } = useSelector((state) => state.session);
  const pathM = useRef<string>(path);
  const { enqueueSnackbar } = useSnackbar();
  const { showOptions } = useFileSelect();
  const [loading, setLoading] = useState(false);

  async function getFiles(path: string = '') {
    const { list } = await getListFiles(path, access_token).catch((err) => {
      if (isAxiosError(err)) {
        if (err.response?.status === 404) {
          setPath('');
          enqueueSnackbar('No Encontrado', { variant: 'error' });
        }
      } else {
        enqueueSnackbar('Error al obtener los archivos', { variant: 'error' });
      }
      return { list: [] };
    });
    if (pathM.current === path) {
      setLoading(false);
      setFiles(list);
    }
  }

  function getTree() {
    getTreeAPI('', access_token)
      .then((tree) => {
        setTree(tree);
      })
      .catch((err) => {
        console.error(err);
        return [];
      });
  }

  useEffect(() => {
    socketClient.on('tree-update', () => {
      getTree();
    });
    socketClient.on('file-change', (data) => {
      console.log('file-change', data);
      if (pathM.current === data.path) {
        getFiles();
      }
    });
    socketClient.on('file-update', (event) => {
      const { type, content } = event as UpdateFileEvent;
      if (event.path !== pathM.current) return;
      switch (type) {
        case 'add':
          addFile(content);
          break;
        case 'substitute':
          substituteFile(content);
          break;
      }
    });

    // socket.current.connect();
    // socket.current.emit('auth', access_token);

    return () => {
      socketClient.removeListener('tree-update');
      socketClient.removeListener('file-change');
      socketClient.removeListener('file-update');
    };
  }, [pathM.current]);

  useEffect(() => {
    setLoading(true);
    getFiles(path);
    pathM.current = path;
  }, [path]);

  useEffect(() => {
    getTree();
  }, []);

  return (
    <>
      <Card sx={{ margin: '2px' }}>
        <CardContent>
          <Grid container spacing={1}>
            <Grid item lg={12} xs={12} sm={12}>
              <RouteBar
                path={path}
                onChangePath={(newPath) => {
                  setPath(newPath);
                }}
              />
            </Grid>
            <Grid item lg={11} xs={12} sm={12}>
              <DropFiles />
            </Grid>
            <Grid item lg={1} xs={12} sm={12}>
              <GoToFiles />
            </Grid>
          </Grid>
          {showOptions && (
            <Grid item xs={12}>
              <ContextualMenuSelect />
            </Grid>
          )}
        </CardContent>
      </Card>
      <FilesList loading={loading} />
    </>
  );
}
