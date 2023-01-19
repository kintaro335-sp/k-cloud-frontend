import { useState } from 'react';
import { List, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import FileItem from './FileItem';
import useFiles from '../../../hooks/useFiles';

export default function FilesList() {
  const { files, uploadFiles } = useFiles();
  const [loading, setLoading] = useState(false);
  const listF = Object.keys(files);

  const numberFiles = listF.filter((f) => files[f] !== null).length;

  const onUploadFiles = async () => {
    setLoading(true);
    uploadFiles();
  };

  return (
    <>
      {numberFiles === 0 && <Typography variant="subtitle1">No hay Archivos por subir</Typography>}
      {numberFiles !== 0 && (
        <LoadingButton loading={loading} onClick={onUploadFiles}>
          Subir
        </LoadingButton>
      )}
      <List>
        {listF.map((path, i) => {
          const fileP = files[path];
          console.log(fileP);
          if (fileP === null) return;
          return <FileItem key={i} path={path} fileP={fileP} />;
        })}
      </List>
    </>
  );
}
