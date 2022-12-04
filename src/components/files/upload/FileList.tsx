import { List } from '@mui/material';
import FileItem from './FileItem';
import useFiles from '../../../hooks/useFiles';

export default function FilesList() {
  const { files } = useFiles();

  const listF = Object.keys(files);

  return (
    <>
      <List>
        {listF.map((path) => {
          const fileP = files[path];
          if (fileP === null) return;

          return <FileItem path={path} fileP={fileP} />;
        })}
      </List>
    </>
  );
}
