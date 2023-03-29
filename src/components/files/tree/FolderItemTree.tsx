import { Typography } from '@mui/material';
import { TreeItem } from '@mui/lab';
import { Folder } from '../../../@types/files';
// redux
import { useDispatch } from '../../../redux/store';
import { setPath } from '../../../redux/slices/session';
// icon
import { Icon } from '@iconify/react';
import FolderIcon from '@iconify/icons-material-symbols/folder';

interface FolderItemTreeProps {
  folder: Folder;
  level: number;
  index: number;
  path?: string;
}

export default function FolderItemTree({ folder, index, level, path }: FolderItemTreeProps) {
  const { name, content } = folder;
  const dispatch = useDispatch();
  return (
    <TreeItem
      icon={content.length === 0 && <Icon icon={FolderIcon} />}
      nodeId={`${name}-${index}-${level}`}
      label={
        <Typography
          onDoubleClick={() => {
            if (!path) {
              dispatch(setPath(`${name}`));
            } else {
              dispatch(setPath(`${path}/${name}`));
            }
          }}
          variant="body2"
        >
          {name}
        </Typography>
      }
    >
      {content.map((elem, i) => {
        if (!elem) return;
        if (elem.type === 'Folder') {
          return (
            <FolderItemTree
              key={`${elem.name}-${i}-${level + 1}`}
              folder={elem}
              index={i}
              level={level + 1}
              path={`${name}`}
            />
          );
        }
      })}
    </TreeItem>
  );
}
