import { useEffect, useState, useMemo, useRef } from 'react';
import { RouteBar } from '../components/files/routebar';
import { Box, Grid, Stack, Card, CardContent, Button } from '@mui/material';
import FileElement from '../components/files/FileElement';
import AddFolder from '../components/files/AddFolder';
import UploadSingleFile from '../components/files/UploadSingleFile';
import { useSnackbar } from 'notistack';
import DropFiles from '../components/files/DropFiles';
import { ContextualMenuSelect } from '../components/files/menuselect';
import Loading from './Loading';
// redux
import { useDispatch, useSelector } from '../redux/store';
import { setFiles, setTree, setPath, addFile, substituteFile } from '../redux/slices/session';
// api
import { getListFiles, getTreeAPI } from '../api/files';
import { isAxiosError } from 'axios';
import { createNewSocket } from '../api/websocket';
import { FileI, UpdateFileEvent } from '../@types/files';
import useFileSelect from '../hooks/useFileSelect';

export default function Files() {
  const socketClient = useRef(createNewSocket());
  const scrollElement = useRef<HTMLDivElement>(null)
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { showOptions } = useFileSelect();
  const { access_token, path, files } = useSelector((state) => state.session);
  const [start, setStart] = useState<number>(0);
  const [showQ, setShowQ] = useState<number>(48);
  const [loading, setLoading] = useState(false);

  const handleShowMore = () => {
    if (files.length < showQ) return;
    if (showQ >= 96) return;
    setShowQ((prev) => prev + 8);
  };

  const handleChangeStart = (direction: 'back' | 'go') => {
    if (direction === 'back') {
      setStart((st) => {
        const scrollHeight = scrollElement.current?.scrollHeight as number
        scrollElement.current?.scroll({ top: scrollHeight * 0.93 })
        const newVal = st - 96;
        if (newVal < 0) {
          return 0;
        }
        return newVal;
      });
    }
    if (direction === 'go' && showQ >= 96) {
      setStart((st) => {
        const scrollHeight = scrollElement.current?.scrollHeight as number
        scrollElement.current?.scroll({ top: scrollHeight * 0.001 })
        const newVal = st + 96;
        if (newVal > files.length) {
          return files.length;
        }
        return newVal;
      });
    }
  };

  async function getFiles() {
    const { list } = await getListFiles(path, access_token).catch((err) => {
      if (isAxiosError(err)) {
        if (err.response?.status === 404) {
          dispatch(setPath(''));
          enqueueSnackbar('No Encontrado', { variant: 'error' });
        }
      } else {
        enqueueSnackbar('Error al obtener los archivos', { variant: 'error' });
      }
      dispatch(setFiles([]));
      return { list: [] };
    });
    dispatch(setFiles(list));
  }

  function getTree() {
    getTreeAPI('', access_token)
      .then((tree) => {
        dispatch(setTree(tree));
      })
      .catch((err) => {
        console.error(err);
        return [];
      });
  }

  useEffect(() => {
    const newSocket = createNewSocket();
    newSocket.removeAllListeners();
    newSocket.auth = { access_token };
    newSocket.on('tree-update', () => {
      getTree();
    });
    newSocket.on('file-change', (data) => {
      if (path === data.path) getFiles();
    });
    newSocket.on('file-update', (event) => {
      const { type, content } = event as UpdateFileEvent;
      if (event.path !== path) return;
      switch (type) {
        case 'add':
          addFile(content);
          break;
        case 'substitute':
          substituteFile(content);
          break;
      }
    });
    socketClient.current = newSocket;
    setLoading(true);
    getTree();
    getFiles().then(() => {
      setLoading(false);
    });
    setShowQ(48);
    setStart(0)
  }, [access_token, path]);

  const filesMemo = useMemo(() => files, [files]);

  return (
    <>
      <Card sx={{ margin: '2px' }}>
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
          {showOptions && (
            <Grid item xs={12}>
              <ContextualMenuSelect />
            </Grid>
          )}
        </CardContent>
      </Card>
      {loading ? (
        <Loading width="100%" height="68%" />
      ) : (
        <Box
          sx={{ width: '100%', height: '68%', marginTop: '1ex', overflowY: 'scroll' }}
          ref={scrollElement}
          onScroll={(e) => {
            const { scrollTop, scrollHeight } = e.currentTarget;
            const scrollH = scrollTop / scrollHeight;
            console.log(scrollH)
            if (scrollH === 0) {
              handleChangeStart('back');
            }
            if (scrollH >= 0.7) {
              handleShowMore();
            }
            if (scrollH >= 0.945) {
              handleChangeStart('go');
            }
          }}
        >
          <Grid container spacing={2}>
            {filesMemo.slice(start, start + showQ).map((file: FileI, i) => (
              <Grid item key={file.name + i} xs={12} md={4} lg={3}>
                <FileElement file={file} arrayIndex={i} />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Box sx={{ padding: '100px' }} />
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
}
