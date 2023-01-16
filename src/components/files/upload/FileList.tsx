import { List, Typography } from '@mui/material';
import FileItem from './FileItem';
import useFiles from '../../../hooks/useFiles';

export default function FilesList() {
  const { files } = useFiles();

  const listF = Object.keys(files);

  const numberFiles = listF.filter((f) => files[f] !== null).length;

  return (
    <>
      {numberFiles === 0 && <Typography variant="subtitle1">No hay Archivos por subir</Typography>}
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
