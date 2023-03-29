import { List, Box } from '@mui/material';
import FileItem from './FileItem';
import { useSelector } from '../../../redux/store';

export default function FilesList() {
  const { filesDir, files } = useSelector((state) => state.files);

  return (
    <List>

      {filesDir.map((dir, i) => {
        const FD = files[dir];
        return <FileItem key={i} path={dir} fileP={FD} />;
      })}
    </List>
  );
}
