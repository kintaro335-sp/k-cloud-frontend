import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import FileElement from '../components/files/FileElement';

// redux
import { useDispatch, useSelector } from '../redux/store';
import { setPath, SessionState } from '../redux/slices/session';
// api
import { getListFiles, File } from '../api/files';
// hooks
import useAuth from '../hooks/useAuth';

export default function Files() {
  const { isAuthenticated } = useAuth();
  const dispatch = useDispatch();
  const { access_token, path } = useSelector((state: { session: SessionState }) => state.session);
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    async function getFiles() {
      const { list } = await getListFiles(path, access_token);
      console.log(list);
      setFiles(list);
    }
    getFiles();
  }, [access_token, path]);

  return (
    <>
      <Box>Tu Carpeta/{path}</Box>
      <Box sx={{ width: '100vw', height: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {!isAuthenticated && <Navigate to="/login" />}
        <Grid container spacing={2}>
          {files.map((file: File, i) => (
            <Grid item key={file.name + i} xs={12} md={4} lg={3}>
              <FileElement {...file} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
