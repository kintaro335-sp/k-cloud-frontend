import { FileType } from '../../@types/files';
import { Icon } from '@iconify/react';
import FileIcon from '@iconify/icons-ant-design/file';
import FolderIcon from '@iconify/icons-ant-design/folder';

export default function TokenIcon({ type }: { type: FileType }) {
  return <Icon icon={type === 'file' ? FileIcon : FolderIcon} width="50px" height="50px" />;
}
