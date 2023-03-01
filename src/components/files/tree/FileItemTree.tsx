import { TreeItem } from '@mui/lab';
import { FileI } from '../../../@types/files';

interface FileItemTreeProps {
  file: FileI;
  level: number;
  index: number;
}

export default function FileItemTree({ file, index, level }: FileItemTreeProps) {
  const { name } = file;
  return <TreeItem nodeId={`${name}-${index}-${level}`} label={name}></TreeItem>;
}
