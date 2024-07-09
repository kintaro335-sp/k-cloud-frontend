import { TreeItem } from '@mui/x-tree-view';
import { FileI } from '../../../@types/files';

interface FileItemTreeProps {
  file: FileI;
  level: number;
  index: number;
}

export default function FileItemTree({ file, index, level }: FileItemTreeProps) {
  const { name } = file;
  return <TreeItem itemId={`${name}-${index}-${level}`} label={name}></TreeItem>;
}
