import { TreeItem } from '@mui/lab';
import FileItemTree from './FileItemTree';
import { Folder } from '../../../@types/files';

interface FolderItemTreeProps {
  folder: Folder;
  level: number;
  index: number;
}

export default function FolderItemTree({ folder, index, level }: FolderItemTreeProps) {
  const { name, content } = folder;
  return (
    <TreeItem nodeId={`${name}-${index}-${level}`} label={name}>
      {content.map((elem, i) => {
        if (elem.type === 'Folder') {
          return <FolderItemTree folder={elem} index={i} level={level + 1} />;
        }
        if (elem.type === 'file') {
          return <FileItemTree file={elem} index={i} level={level + 1} />;
        }
      })}
    </TreeItem>
  );
}
