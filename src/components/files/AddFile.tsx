import { useRef, useState } from 'react';
import { Card, CardContent, CardHeader, Box, IconButton, LinearProgress } from '@mui/material';
import { Icon } from '@iconify/react';
import fileAddIcon from '@iconify/icons-ant-design/file-add-filled';
import { uploadFile, getListFiles } from '../../api/files';
// redux
import { useSelector, useDispatch } from '../../redux/store';
import { SessionState, setFiles } from '../../redux/slices/session';

export default function AddFile() {
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();
  const { path, access_token } = useSelector((state: { session: SessionState }) => state.session);
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <IconButton onClick={() => fileRef.current?.click()}>
            <Icon icon={fileAddIcon} width="200px" height="200px" />
          </IconButton>
        </Box>
        <input
          type="file"
          ref={fileRef}
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              uploadFile(path, file, access_token, (p) => {
                setProgress((p.loaded / p.total) * 100);
              }).then(() => {
                getListFiles(path, access_token).then((response) => {
                  dispatch(setFiles(response.list));
                });
              });
            }
          }}
        />
        <LinearProgress value={progress} variant="determinate" />
      </CardContent>
      <CardHeader title="Nuevo Archivo" />
    </Card>
  );
}
